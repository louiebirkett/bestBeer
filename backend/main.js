var fs = require('fs');
var lockfile = require('proper-lockfile');
var http = require('http');
var mysql = require('mysql');

// MySQL database connection
var conn = null;
// Path to configuration file
const config = './config.json';

// Function that listens to HTTP requests made to the server
const requestListener = (req, res) => {
    res.writeHead(200);
    res.write('Hello World!');
    res.end();
}

// Read the config json file to get MySQL login details and create the connection
fs.readFileSync(config, (err, data) => {
    if(err) {
        throw err;
    }

    // Parse the JSON object
    let configJson = JSON.parse(data);
    // Create the MySQL connection, using the supplied configuration values
    conn = mysql.createConnection({
        host: configJson.mysql.host,
        user: configJson.mysql.user,
        password: configJson.mysql.password,
        port: configJson.mysql.port
    });
});

// Lock the config file so that it cannot be read again,
// making it impossible for the config values to get exposed
// by the API
lockfile.lock(config).catch((err) => {
    if(err) {
        throw err;
    }
})

// Try and open the MySQL connection
conn.connect((error) => {
    if(error) {
        throw error;
    }
});

// Create the server, supplying the request listener to handle requests
const server = http.createServer(requestListener);

// Let the server start receiving traffic
server.listen();