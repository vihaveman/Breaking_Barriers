// Creating the map object
let myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data from the file with the full relative path.
let geoData = "./output.geojson"; // The './' represents the current directory.

let geojson;

// You can implement the 'getColor' function based on your desired color scheme for the choropleth.
function getColor(techClusterValue) {
    if (techClusterValue === 0) { return 'red'; }
    if (techClusterValue === 1) { return 'blue'; }
    if (techClusterValue === 2) { return 'purple'; }
    if (techClusterValue === 3) { return 'yellow'; }
    if (techClusterValue === 4) { return 'brown'; }
    if (techClusterValue === 5) {return 'rgba(0, 0, 0, 0)'; }
}

// Get the data with d3.
d3.json(geoData).then(function(data) {
  // Create a new GeoJSON layer and add it to the map.
  geojson = L.geoJSON(data, {
    style: function (feature) {
      // Get the 'TechCluster' value from the GeoJSON feature properties.
      let techClusterValue = feature.properties.TechCluster;

      // Apply a color based on the 'TechCluster' value using the 'getColor' function.
      return {
        fillColor: getColor(techClusterValue),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
    },
    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.ADMIN + "</strong><br /><br />Technological cluster: " +
        feature.properties.TechCluster);
    }
  }).addTo(myMap);
});



      // // Binding a popup to each layer
      // onEachFeature: function(feature, layer) {
      //   layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Estimated employed population with children age 6-17: " +
      //     feature.properties.DP03_16E + "<br /><br />Estimated Total Income and Benefits for Families: $" + feature.properties.DP03_75E);
      // }
//   // Set up the legend.
//   let legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     let div = L.DomUtil.create("div", "info legend");
//     let limits = geojson.options.limits;
//     let colors = geojson.options.colors;
//     let labels = [];

//     // Add the minimum and maximum.
//     let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

  // Adding the legend to the map
//   legend.addTo(myMap);

// });
