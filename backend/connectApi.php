<?php
function searchPubs($latitude, $longitude, $radius) {
    // Google Maps API endpoint
    $api_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

    // Google Maps API key (replace 'YOUR_API_KEY' with your actual API key)
    $api_key = 'AIzaSyA8WkVdelbke455KsAR_dzDz0FOEJja3iY';

    // Parameters for the API request
    $params = [
        'location' => $latitude . ',' . $longitude,
        'radius' => $radius,
        'type' => 'bar',
        'keyword' => 'pub',
        'key' => $api_key
    ];

    // Construct the full URL with query parameters
    $api_url .= '?' . http_build_query($params);

    // Initialize curl
    $ch = curl_init();

    // Set curl options
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute curl
    $response = curl_exec($ch);

    // Check for errors
    if(curl_errno($ch)) {
        echo 'Error: ' . curl_error($ch);
        exit;
    }

    // Close curl
    curl_close($ch);

    // Decode JSON response
    $data = json_decode($response, true);

    // Check if decoding was successful
    if ($data === null || !isset($data['results'])) {
        echo 'Error parsing JSON';
        exit;
    }

    return $data['results'];
}

// Example usage:
$latitude = 40.7128; // Latitude of the location
$longitude = -74.0060; // Longitude of the location
$radius = 5000; // Radius in meters

$pubs = searchPubs($latitude, $longitude, $radius);

// Output the results
foreach ($pubs as $pub) {
    echo $pub['name'] . ': ' . $pub['vicinity'] . '<br>';
}
?>
