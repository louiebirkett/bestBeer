<?php

/* 
Google terms of service for maps usage: https://cloud.google.com/maps-platform/terms/?_ga#3-license
*/

require './get_google_data.php';

function tryCache($conn, $lat, $long, $radius) {
    $cacheSettings = getCacheSettings();
    if($cacheSettings["enabled"] == false) {
        return;
    }

    $recache = false;
    // Get grid square ID using maidenhead locator
    $gridSquare = getMaidenheadLocator($lat, $long);
    if($cacheSettings["always_cache"]) {
        $recache = true;
    } else {
        // Check the database to see if this grid square has been cached
        $statement = $conn->prepare("SELECT `lastCacheTimestamp` FROM `tableGridSquareCache` WHERE gridSquare=?");
        $statement->bind_param("s", $gridSquare);
        $statement->execute();
        $result = $statement->get_result();
        if($result->num_rows > 0) {
            $timestamp = $result->fetch_assoc()["lastCacheTimestamp"];
            // Has the cache expired?
            if(time() - $timestamp > intval($cacheSettings["cache_expiry_ms"])) {
                $recache = true;
            }
        } else {
            // Not cached
            $recache = true;
        }      
    }

    if($recache) {
        cachePubs($conn, $lat, $long, $radius);
        updateSquareCache($conn, $gridSquare);
    }
}

function getMaidenheadLocator($lat, $long) {
    // Add 180 to long and 90 to lat, making the ranges positive
    $long += 180;
    $lat += 90;

    // Divide long by 20 and lat by 10 to get the first coord pair
    $long1 = floor($long / 20); // Long ranges 0-360, divide by 20 for 18 bands
    $lat1 = floor($lat / 10); // Lat ranges 0-180, divide by 10 for 18 bands

    // Subtract these values from the current ones to get the remainders
    $long -= $long1 * 20;
    $lat -= $lat1 * 10;

    // Divide long by 2 and lat by 1 to get the second pair
    // And use the integer parts for the second pair
    $long2 = floor($long / 2);
    $lat2 = floor($lat);

    // Get remainders by subtracting integer parts
    $long -= $long2 * 2;
    $lat -= $lat2;

    // Divide into a sub-square, 1/12th and 1/24th of a degree
    // Dividing by a fraction is the same as multiplying by the denominator
    $long3 = floor($long * 12);
    $lat3 = floor($lat * 24);

    // Convert the integers to strings in the format SSiiss
    $square = chr($long1 + 65) . chr($lat1 + 65) . 
                strval($long2) . strval($lat2) . 
                chr($long3 + 97) . chr($lat3 + 97);
    return $square;
}

function getCacheSettings() {
    $configFile = file_get_contents("./config.json");
    $json = json_decode($configFile, true);

    return $json["cache"];
}

function cachePubs($conn, $latitude, $longitude, $radius) {
    $configFile = file_get_contents("./config.json");
    $json = json_decode($configFile, true);

    $api_key = $json["google"]["api_key"];
    $pubs = searchPubs($api_key, $latitude, $longitude, $radius);

    insertPubs($conn, $pubs);
}

function insertPubs($conn, $pubs) {
    $query = "REPLACE INTO tablePubs (`gid`, `name`, `locLat`, `locLong`) VALUES ";
    $values = array();

    foreach($pubs as $pub) {
        $gid = $pub['id'];
        $name = $pub['displayName']['text'];
        $lat = $pub['location']['latitude'];
        $long = $pub['location']['longitude'];
        array_push($values, "('$gid', '$name', $lat, $long)");
    }

    $values = implode(", ", $values); // Join the array values using a comma
    $query .= $values; // Append values to the query

    if($conn->query($query) !== TRUE) {
        http_response_code(500);
    }
}

function updateSquareCache($conn, $gridSquare) {
    // Insert or update the cache timestamp for the grid square
    $query = "INSERT INTO tableGridSquareCache (gridSquare, lastCacheTimestamp) VALUES (?, ?) ON DUPLICATE KEY UPDATE lastCacheTimestamp = ?";
    $statement = $conn->prepare($query);
    $time = time();
    $statement->bind_param("sdd", $gridSquare, $time, $time);
    $statement->execute();
    $statement->close();
}
?>
