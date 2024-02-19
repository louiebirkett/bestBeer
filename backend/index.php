<?php

function connectToMysql() {
    $configFile = file_get_contents("./config.json");
    $json = json_decode($configFile, true);

    $host = $json["mysql"]["host"];
    $user = $json["mysql"]["user"];
    $pass = $json["mysql"]["password"];
    $db = $json["mysql"]["db_name"];

    $conn = new mysqli($host, $user, $pass, $db);

    // Check connection status
    if($conn->connect_error) {
        die("Server error");
    }

    return $conn;
}

function errorResponse($code, $message) {
    http_response_code($code);
    echo "{\"message\":\"$message\"}";
}

// Check if the request contains the user lat & long values to process this request
if(!isset($_POST['userLat']) || !isset($_POST['userLong'])) {
    // Return error status code
    errorResponse(400, 'Request must contain userLat and userLong parameters for current location.');
    return;
}

// Get the values
$userLat = $_POST['userLat'];
$userLong = $_POST['userLong'];
$searchRadius = 5000; // 5km / 5000m
if(isset($_POST['searchRadius'])) {
    $searchRadius = $_POST['searchRadius'];
}

// TODO: Sanatise user lat, long, search radius values before putting into sql statement

// Connect to the MySQL database
$conn = connectToMysql();

// Search for pubs within a certain distance around the location
$sql = "SELECT name, dist(locLat, locLong, $userLat, $userLong) AS dist FROM tablePubs HAVING dist < $searchRadius;";
$result = $conn->query($sql);
$arr = array();
while($row = $result->fetch_assoc()) {
    //$element = array("name" => $row["name"], "alcPercent" => $row["alcPercent"]);
    //array_push($arr, $element);
    print_r($row);
}
$conn->close();

echo json_encode($arr);
?>