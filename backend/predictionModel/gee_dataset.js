// Step 1: Define the Region of Interest (Faisalabad) and set up the map
var Faisalabad = ee.Geometry.Point([73.079109, 31.418715]); // Define the central point for Faisalabad
var FaisalabadRegion = Faisalabad.buffer(20000); // 20 km buffer around Faisalabad

