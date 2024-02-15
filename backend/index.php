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

print_r("<h1>Hello from Alex<h1>");
$conn = connectToMysql();

$result = mysqli_query($conn, "SELECT * FROM tableBeerTypes WHERE name = 'Stella'");
// get result as associative array
$row = mysqli_fetch_assoc($result);
// print result
/*
echo  ' Name '. $row['name'] . ' Alc percentage '. $row['alcPercent'];

$st = $conn->prepare("DELETE FROM `tableBeerTypes` WHERE name = 'Stella'");
$st->execute();
*/
$sql = "INSERT INTO tableBeerTypes (name, alcPercent, linkToImg)
VALUES ('Stella', '4.9', 'images/stella.png')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}



$conn->close();
?>