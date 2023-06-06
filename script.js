// Initialize the map
var map = L.map('map').setView([38.731, -9.1373], 13);

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

// Load the GeoJSON file and add it to the map
fetch('NUTS_RG_01M_2021_4326_LEVL_3.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    L.geoJSON(data).addTo(map);
  })
  .catch(error => {
    console.error('Error:', error);
  });