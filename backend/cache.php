<?php

require './get_google_data.php';

function cachePubs($conn, $latitude, $longitude, $radius) {
    $configFile = file_get_contents("./config.json");
    $json = json_decode($configFile, true);

    $api_key = $json["google"]["api_key"];
    $pubs = searchPubs($api_key, $latitude, $longitude, $radius);

    foreach($pubs as $pub) {
        print_r($pub['displayName']['text']);
    }
}
?>
