<?php

// Start of main code

// Check if the request contains the user lat & long values to process this request
if(!isset($_REQUEST['userLat']) || !isset($_REQUEST['userLong'])) {
    // Return error status code
    errorResponse(400, 'Request must contain userLat and userLong parameters for current location.');
    return;
}

// Get the values
$userLat = $_REQUEST['userLat'];
$userLong = $_REQUEST['userLong'];
$searchRadius = 5000; // 5km / 5000m
if(isset($_REQUEST['searchRadius'])) {
    $searchRadius = $_REQUEST['searchRadius'];
}

// TODO: Sanatise user lat, long, search radius values before putting into sql statement

// Connect to the MySQL database
$conn = connectToMysql();

$cacheSettings = getCacheSettings();
// Covert user lat and long into square
if($cacheSettings["use_squaring"]) {
    $squareSize = $cacheSettings["square_size"];
    $userLat = $userLat - fmod($userLat, $squareSize);
    $userLong = $userLong - fmod($userLong, $squareSize);

    // Check the square cache for these values to see if they are up to date, otherwise cache new values
    $statement = $conn->prepare("SELECT `lastCacheTimestamp` FROM `tableSquareCache` WHERE locLat=? AND locLong=? AND squareSize=?");
    $statement->bind_param("ddd", $userLat, $userLong, $squareSize);
    $statement->execute();
    $result = $statement->get_result();

    $recache = false;
    if(!is_bool($result) && $result->num_rows > 0) {
        $lastCache = intval($result->fetch_assoc()["lastCacheTimestamp"]);
        var_dump($lastCache);

        if(time() - $lastCache > intval($cacheSettings["cache_expiry_ms"])) {
            $recache = true;
        }
    } else {
        $recache = true;
    }

    // The pubs need recaching
    if($recache) {
        cachePubs($userLat, $userLong, $searchRadius);
    }
}

// Search for pubs within a certain distance around the location
// Use prepared statement to parametise the input fields
$statement = $conn->prepare("SELECT `name`, `locLat`, `locLong`, dist(locLat, locLong, ?, ?) AS dist FROM tablePubs HAVING dist < ?");
$statement->bind_param("ddd", $userLat, $userLong, $searchRadius);
// Execute the statement and get results
$statement->execute();
$result = $statement->get_result();

// Turn results into an array that can then be json encoded
$arr = array();
// If the result is a boolean, something went wrong with the statement so do not try to get results
if(!is_bool($result)) {
    while($row = $result->fetch_assoc()) {
        $element = array(
            "name" => $row["name"], 
            "posLat" => $row["locLat"], 
            "posLong" => $row["locLong"],
            "dist" => $row["dist"]
        );
        array_push($arr, $element);
    }
} else {
    errorResponse(204, "No results. Position ($userLat, $userLong)");
}
$conn->close();

echo json_encode($arr);
// End of main code

// Functions
function sanatise($input) {

}

function connectToMysql() {
    $configFile = file_get_contents("./config.json");
    $json = json_decode($configFile, true);

    $host = $json["mysql"]["host"];
    $user = $json["mysql"]["user"];
    $pass = $json["mysql"]["password"];
    $db = $json["mysql"]["db_name"];

    if(!$json["production"]) {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    }
    $conn = new mysqli($host, $user, $pass, $db);

    // Check connection status
    if($conn->connect_error) {
        http_response_code(500); // Server error response code
        die("Server error");
    }

    return $conn;
}

function getCacheSettings() {
    $configFile = file_get_contents("./config.json");
    $json = json_decode($configFile, true);

    return $json["cache"];
}

function errorResponse($code, $message) {
    http_response_code($code);
    echo "{\"message\":\"$message\"}";
}

function cachePubs($userLat, $userLong, $searchRadius) {
    // Call to Google Maps API
}

?>