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

$conn = connectToMysql();

$sql = "SELECT * FROM tableBeerTypes";
$result = $conn->query($sql);
$arr = array();
while($row = $result->fetch_assoc()) {
    $element = array("name" => $row["name"], "alcPercent" => $row["alcPercent"]);
    array_push($arr, $element);
}
$conn->close();

echo json_encode($arr);
?>