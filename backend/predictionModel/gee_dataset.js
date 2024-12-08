// Step 1: Define the Region of Interest (Faisalabad) and set up the map
var Faisalabad = ee.Geometry.Point([73.079109, 31.418715]); // Define the central point for Faisalabad
var FaisalabadRegion = Faisalabad.buffer(20000); // 20 km buffer around Faisalabad

// Center the map over Faisalabad region
Map.centerObject(FaisalabadRegion, 10); // Zoom level 10

// Add a layer to highlight Faisalabad region with a buffer
Map.addLayer(FaisalabadRegion, {color: 'red'}, 'Faisalabad Region');

// Step 2: Use Sentinel-2 Surface Reflectance data for vegetation analysis
var sentinel = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(FaisalabadRegion)
  .filterDate('2023-01-01', '2023-12-31') // Filter by date (adjust as needed)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)) // Filter for low cloud cover
  .median(); // Take the median pixel value for the year

// Step 3: Calculate NDVI (NDVI = (NIR - Red) / (NIR + Red))
var ndvi = sentinel.normalizedDifference(['B8', 'B4']).rename('NDVI'); // Sentinel bands for NIR and Red

// Threshold NDVI values to detect trees (NDVI > 0.3 typically represents vegetation)
var treeCover = ndvi.gt(0.3).selfMask(); // Only show areas with NDVI > 0.3

// Clip tree cover to the Faisalabad region
var clippedTreeCover = treeCover.clip(FaisalabadRegion);

// Add tree cover layer to the map
Map.addLayer(clippedTreeCover, {palette: ['00FF00']}, 'Tree Cover');


