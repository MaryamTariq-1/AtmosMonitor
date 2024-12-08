// Step 1: Define the Region of Interest (Faisalabad) and set up the map
var Faisalabad = ee.Geometry.Point([73.079109, 31.418715]); // Define the central point for Faisalabad
var FaisalabadRegion = Faisalabad.buffer(20000); // 20 km buffer around Faisalabad

// Center the map over Faisalabad region
Map.centerObject(FaisalabadRegion, 10); // Zoom level 10

// Add a layer to highlight Faisalabad region with a buffer
Map.addLayer(FaisalabadRegion, {color: 'red'}, 'Faisalabad Region');

