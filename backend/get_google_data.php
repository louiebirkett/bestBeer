<?php

const FIELD_MASK = 'places.id,places.primaryType,places.displayName,places.formattedAddress,places.regularOpeningHours,places.priceLevel,places.rating,places.userRatingCount,places.websiteUri,places.allowsDogs,places.goodForWatchingSports,places.liveMusic,places.outdoorSeating,places.servesCocktails';

function searchPubs($api_key, $latitude, $longitude, $radius) {
    // TODO: radius must be between 0 and 50000
    if ($radius < 0 || $radius > 50000) {
        echo 'Invalid radius, radius must be between 0 and 50000 inclusive.';
        http_response_code(400);
        exit;
    }

    // Google Maps API endpoint
    $api_url = 'https://places.googleapis.com/v1/places:searchNearby';

    // Parameters for the API request
    $data = array(
        "includedPrimaryTypes" => array("bar", "night_club"),
        "locationRestriction" => array(
            "circle" => array(
                "center" => array(
                    "latitude" => $latitude,
                    "longitude" => $longitude
                ),
                "radius" => $radius
            )
        )
    );
    $payload = json_encode($data);

    // Initialize curl
    $ch = curl_init();

    // Set curl options
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'X-Goog-Api-Key: ' . $api_key, 'X-Goog-FieldMask: ' . FIELD_MASK));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute curl
    $response = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Check for errors
    if(curl_errno($ch)) {
        echo 'Error: Response from server: ' . $httpcode;
        http_response_code(400);
        exit;
    }

    // Close curl
    curl_close($ch);

    // Decode JSON response
    $result = json_decode($response, true);

    // Check if decoding was successful
    if ($result === null || !isset($result['places'])) {
        http_response_code(204);
        exit;
    }

    http_response_code(200);
    return $result['places'];
}
?>
