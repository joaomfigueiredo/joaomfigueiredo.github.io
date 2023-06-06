// Initialize the map
var map = L.map('map').setView([38.731, -9.1373], 13);

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Array of GeoJSON file names
var files = [
    'NUTS_RG_01M_2021_4326.geojson',
    'NUTS_RG_01M_2021_4326_LEVL_0.geojson',
    'NUTS_RG_01M_2021_4326_LEVL_1.geojson',
    'NUTS_RG_01M_2021_4326_LEVL_2.geojson',
    'NUTS_RG_01M_2021_4326_LEVL_3.geojson'
  ];  

var currentFileIndex = 0; // Index of the current GeoJSON file

// Function to load GeoJSON file and update the map
var geojsonLayer; // Declare the variable outside the function

// Function to load GeoJSON file and update the map
function loadGeoJSONFile(filename) {
    fetch(filename)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Clear the existing GeoJSON layer from the map
        if (map.hasLayer(geojsonLayer)) {
          map.removeLayer(geojsonLayer);
        }
        // Create a new GeoJSON layer and add it to the map
        geojsonLayer = L.geoJSON(data, {
          onEachFeature: function (feature, layer) {
            // Add tooltip to each polygon
            //layer.bindTooltip(feature.properties.name, { sticky: true });
          }
        }).addTo(map);
        // Update the filename display
        document.getElementById('filename').textContent = filename;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


// Function to go to the previous GeoJSON file
function goToPrevFile() {
  currentFileIndex--;
  if (currentFileIndex < 0) {
    currentFileIndex = files.length - 1;
  }
  var filename = files[currentFileIndex];
  loadGeoJSONFile(filename);
}

// Function to go to the next GeoJSON file
function goToNextFile() {
  currentFileIndex++;
  if (currentFileIndex >= files.length) {
    currentFileIndex = 0;
  }
  var filename = files[currentFileIndex];
  loadGeoJSONFile(filename);
}

// Initial load of the first GeoJSON file
loadGeoJSONFile(files[currentFileIndex]);

// Add event listeners to the navigation buttons
document.getElementById('prev-button').addEventListener('click', goToPrevFile);
document.getElementById('next-button').addEventListener('click', goToNextFile);
