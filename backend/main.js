

const fs = require('fs');
const path = require('path');

function searchPlaces(location, radius, type, keyword, apiKey) {
  // Construct the request string
  const requestString = `
### Search for ${keyword}s within a ${radius}-Mile Radius

GET https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius * 1609.34}&type=${type}&keyword=${keyword}&key=${apiKey}
`;

  // Write the request string to a temporary file
  const filePath = path.join(__dirname, 'temp_request.http');
  fs.writeFileSync(filePath, requestString);

  // Open the request file in VS Code using the REST Client extension
  const vscode = require('vscode');
  vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath));
}

// Example usage
const location = "50.8225,-0.1372"; // Brighton coordinates
const radius = 25; // 25 miles
const type = "bar"; // Search for bars (which includes pubs)
const keyword = "pub"; // Additional keyword to filter for pubs
const apiKey = "YOUR_API_KEY"; // Replace with your Google Maps API key

searchPlaces(location, radius, type, keyword, apiKey);