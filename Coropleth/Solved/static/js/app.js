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
//let geoData = "output.geojson"; // The './' represents the current directory.

//let geojson;

// You can implement the 'getColor' function based on your desired color scheme for the choropleth.
function getColor(techClusterValue) {
  if (techClusterValue === 0) { return 'green'; }
  if (techClusterValue === 1) { return 'blue'; }
  if (techClusterValue === 2) { return 'yellow'; }
  if (techClusterValue === 3) { return 'red'; }
}
// Get the data with d3.
d3.json('/geoJsonData').then(function (data) {
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
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.ADMIN + "</strong><br /><br />Technological cluster: " +
        feature.properties.TechCluster);
    }
  }).addTo(myMap);

// Fetch the data from the endpoint
fetch("/predictions")
.then(response => {
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  return response.json();
})
.then(data => {
  if (data.length > 0) {
    console.log("Data from /predictions endpoint:", data);
  } else {
    console.log("No data found in /predictions endpoint.");
  }
})
.catch(error => {
  console.error("Error fetching data from /predictions endpoint:", error);
});
});

//   populateSelectionCells("/predictions");
// });
// // Function to populate the country and year dropdowns
// function populateSelectionCells(data) {
//   const countrySelect = document.getElementById("countrySelect");
//   const yearSelect = document.getElementById("yearSelect");

//   // Extract unique countries and years from the data
//   const countries = Array.from(new Set(data.map(item => item["Country Name"])));
//   const years = Array.from(new Set(data.map(item => item["Year"])));

//   // Populate the country dropdown
//   countries.forEach(country => {
//     const option = document.createElement("option");
//     option.text = country;
//     countrySelect.add(option);
//   });

//   // Populate the year dropdown
//   years.forEach(year => {
//     const option = document.createElement("option");
//     option.text = year;
//     yearSelect.add(option);
//   });
// }

// // Function to fetch the prediction for the selected country and year
// function fetchPrediction() {
//   const selectedCountry = document.getElementById("countrySelect").value;
//   const selectedYear = parseInt(document.getElementById("yearSelect").value);

//   // Make a request to the "/predictions" endpoint with the selected country and year
//   fetch("/predictions")
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok.");
//       }
//       return response.json();
//     })
//     .then(data => {
//       const prediction = data.find(
//         item => item["Country Name"] === selectedCountry && item["Year"] === selectedYear
//       );
//       if (prediction) {
//         // Display the prediction on the page (you can customize how you want to display it)
//         alert(
//           `Prediction for ${selectedCountry} in ${selectedYear}: ${prediction["Predicted_Poverty_Count"]}`
//         );
//       } else {
//         alert("Prediction not available for the selected country and year.");
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching prediction data:", error);
//       alert("Error fetching prediction data. Please try again later.");
//     });
// }



