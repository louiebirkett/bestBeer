<?php 

// Constant global variables
// The current configration version, increment every time the config file is updated
const CONFIG_VERSION = 1;
// The field mask to use when querying the Google API, these are the results that will be returned
const FIELD_MASK = 'places.id,places.primaryType,places.displayName,places.location,places.formattedAddress,places.regularOpeningHours,places.priceLevel,places.rating,places.userRatingCount,places.websiteUri,places.allowsDogs,places.goodForWatchingSports,places.liveMusic,places.outdoorSeating,places.servesCocktails';

// The API class is the main class that handles the request and returns a response
class API {
    private $config;
    private $util;

    public function __construct() {
        // Allow cross origin requests
        header('Access-Control-Allow-Origin: *');
        
        // Load the config file
        $this->config = new Config();
        // Create the utility class
        $this->util = new Utility($this->config->prod);
    }

    // Handles all requests to the API
    public function handleRequest() {
        // Check if request method is GET, otherwise return [405 Method Not Allowed]
        if($_SERVER['REQUEST_METHOD'] != 'GET') {
            $this->util->sendErrorMessageAndExit(405, "Method Not Allowed");
        }

        $this->handleGet();
    }

    // Method seperated from handleRequest to future proof for other request methods
    private function handleGet() {
        // Check if the request contains BOTH the user lat & long values to process this request
        if(!isset($_REQUEST['userLat']) || !isset($_REQUEST['userLong'])) {
            // Return error status code
            $this->util->sendErrorMessageAndExit(400, "Latitude (userLat) and Longitude (userLong) values are required to process this request");
        }

        // Get the values
        $userLat = $_REQUEST['userLat'];
        $userLong = $_REQUEST['userLong'];
        $searchRadius = 5000; // 5000m / 5km
        // Check if a search radius was provided, if so, use that value
        if(isset($_REQUEST['searchRadius'])) {
            $searchRadius = $_REQUEST['searchRadius'];
        }

        // If config is set to use MySQL, connect to the MySQL database, otherwise query the Google API directly
        if($this->config->mysql_use) {
            // Create database conection
            $database = new Database($this->config, $this->util);
            $this->returnMysqlResults($database);
        } else {
            // Query the Google API directly, avoiding MySQL database and any cache that might exist
            $googleData = new GoogleData($this->config->api_key, $userLat, $userLong, $searchRadius, $this->util);
            $this->returnGoogleResults($googleData);
        }
    }

    private function returnMysqlResults($database) {
        http_response_code(200);
        echo "test";
        exit;
    }

    // Returns a response, which is data directly from the Google API
    private function returnGoogleResults($googleData) {
        // Get the data, which is formatted for us in the getData method
        $data = $googleData->getData();
        if($data === null) {
            // getData returns null when there are no results
            $this->util->sendErrorMessageAndExit(204, "No places found");
        }

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}

// Class that loads the configuration options from config.json
class Config {
    // Is this code current in production or development
    public $prod;
    // MySQL database details
    public $mysql_use;
    public $mysql_host;
    public $mysql_user;
    public $mysql_pass;
    public $mysql_db;
    // Cache settings
    public $cache_enabled;
    public $cache_always;
    public $cache_expiry_ms;
    // Google API key
    public $api_key;

    public function __construct() {
        $configFile = file_get_contents("./config.json");
        $json = json_decode($configFile, true);

        // Check the config version is correct
        if($json["configVersion"] != CONFIG_VERSION) {
            // Return error status code
            http_response_code(500);

            // Check if code is running in production or development
            if(!$json["production"]) {
                echo "Config file version is incorrect. Please update the config file to the latest version.";
            }

            exit;
        }

        // Is this code current in production or development
        $this->prod = $json["production"];

        // MySQL database details
        $this->mysql_use = $json["mysql"]["use_mysql"];
        $this->mysql_host = $json["mysql"]["host"];
        $this->mysql_user = $json["mysql"]["user"];
        $this->mysql_pass = $json["mysql"]["password"];
        $this->mysql_db = $json["mysql"]["db_name"];

        // Cache settings
        $this->cache_enabled = $json["cache"]["enabled"];
        $this->cache_always = $json["cache"]["always_cache"];
        $this->cache_expiry_ms = $json["cache"]["cache_expiry_ms"];

        // Goolge API key
        $this->api_key = $json["google"]["api_key"];
    }
}

// Class that connects to the MySQL database
class Database {
    private $conn;

    public function __construct($config, $util) {
        if(!$config->prod) {
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        }

        $this->conn = new mysqli($config->mysql_host, $config->mysql_user, $config->mysql_pass, $config->mysql_db);

        // Check connection status
        if($this->conn->connect_error) {
            $util->sendErrorMessageAndExit(500, "Could not connect to MySQL database: " . $conn->connect_error);
        }
    }
}

// Class responsible for loading and caching data from the Google API
class Cache {
    public function __construct(private $conn) {}
}

// Class responsible for getting the data from the Google API
class GoogleData {
    private $util;
    private $result;
    private $lat;
    private $long;

    public function __construct($api_key, $latitude, $longitude, $radius, $util) {
        if($radius <= 100 || $radius > 50000) {
            $util->sendErrorMessageAndExit(400, "Radius must be between 100 and 50000 (inclusive)");
        }

        $this->util = $util;
        $this->lat = $latitude;
        $this->long = $longitude;

        // Google Maps API endpoint
        // Currently, this endpoint only returns 20 results at a time.
        // And the new nearby search API does not support pagination yet (like the old API did)
        // There is a feature request open for this to be added: https://issuetracker.google.com/issues/314796720
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
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json', 
            'X-Goog-Api-Key: ' . $api_key, 
            'X-Goog-FieldMask: ' . FIELD_MASK
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute curl
        $response = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // Check for errors
        if(curl_errno($ch)) {
            $util->sendErrorMessageAndExit(400, "Response from Google API: " . $httpcode);
        }

        // Close curl
        curl_close($ch);

        // Decode JSON response
        $this->result = json_decode($response, true);
    }

    // Formats the data to be returned
    public function getData() {
        // Check if data was returned
        if($this->result === null || !isset($this->result['places'])) {
            return null;
        }

        $places = $this->result['places'];
        $arr = array();

        foreach($places as $data) {
            $plat = $data['location']['latitude'];
            $plong = $data['location']['longitude'];

            // https://wiki.php.net/rfc/isset_ternary
            $element = array(
                "gid" => $data['id'] ?? "",
                "name" => $data['displayName']['text'] ?? "No name found",
                "type" => $data['primaryType'] ?? "",
                "lat" => $plat ?? null,
                "long" => $plong ?? null,
                "dist" => $this->util->distance($this->lat, $this->long, $plat, $plong) ?? 0,
                "rating" => $data['rating'] ?? 0,
                "userRatingCount" => $data['userRatingCount'] ?? 0,
                "hours" => $data['regularOpeningHours'] ?? null,
                "price" => $data['priceLevel'] ?? null,
                "outdoorSeating" => $data['outdoorSeating'] ?? false,
                "liveMusic" => $data['liveMusic'] ?? false,
                "servesCocktails" => $data['servesCocktails'] ?? false,
                "allowsDogs" => $data['allowsDogs'] ?? false
            );

            array_push($arr, $element);
        }

        return $arr;
    }
}

// Utility class
class Utility {
    private $prod;

    public function __construct($prod) {
        $this->prod = $prod;
    }

    // Sends an error code and 
    public function sendErrorMessageAndExit($code, $message = null) {
        http_response_code($code);
        if($message != null && !$this->prod) {
            echo json_encode(array("message" => $message));
        }
        exit;
    }

    // Calculates the distance between two pairs of coordinates
    public function distance($lat1, $long1, $lat2, $long2) {
        $lat1 = deg2rad($lat1);
        $long1 = deg2rad($long1);
        $lat2 = deg2rad($lat2);
        $long2 = deg2rad($long2);

        $dist = 6371000 * acos(cos($lat1) * cos($lat2) * 
                            cos($long2 - $long1) + 
                            sin($lat1) * sin($lat2));
        return $dist;
    }
}

// Main code
$api = new API();
$api->handleRequest();

?>