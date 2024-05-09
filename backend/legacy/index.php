<?php

// Allow cross origin requests
header('Access-Control-Allow-Origin: *');

require './cache.php';
require './get_google_data.php';

// Start of main code

// Check if the request contains the user lat & long values to process this request
if(!isset($_REQUEST['userLat']) || !isset($_REQUEST['userLong'])) {
    // Return error status code
    http_response_code(400);
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


if(shouldUseMysql()) {
    // Connect to the MySQL database
} else {
    // Query the Google API directly, avoiding mysql database and any cache that might exist
    // Get API key
    $configFile = file_get_contents("./config.json");
    $json = json_decode($configFile, true);
    $api_key = $json["google"]["api_key"];

    $pubs = searchPubs($api_key, $userLat, $userLong, $searchRadius);
    foreach($pubs as $pub) {
        $gid = $pub['id'];
        $name = $pub['displayName']['text'];
        $lat = $pub['location']['latitude'];
        $long = $pub['location']['longitude'];
        array_push($values, "('$gid', '$name', $lat, $long)");
    }
}
$conn = connectToMysql();

// Check if the cache needs updating
tryCache($conn, $userLat, $userLong, $searchRadius);

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

http_response_code(200);
echo json_encode($arr);
// End of main code

// Functions
function sanatise($input) {

}

function shouldUseMysql() {
    $configFile = file_get_contents("./config.json");
    $json = json_decode($configFile, true);

    return $json["mysql"]["use_mysql"];
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
?>