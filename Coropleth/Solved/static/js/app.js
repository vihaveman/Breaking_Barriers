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
});

// Fetch the data from the endpoint
fetch("/predictions2024")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return response.json();
  })
  .then(data => {
    if (data.length > 0) {
       console.log("Data from /predictions endpoint:", data);
      const countrySelect = document.getElementById("countrySelect");   
      // Assuming the "data" is an array of objects with a "Country" property containing the country name.
      data.forEach((item) => { console.log(item.Country)
        const country = item.Country;
        const option = document.createElement("option");
        option.text = country;
        option.value = country;
        countrySelect.appendChild(option);
      });
      // Add event listener to the "countrySelect" dropdown
      countrySelect.addEventListener("change", () => {
        const selectedCountry = countrySelect.value;
        // Find the corresponding item in the data array based on the selected country
        const selectedCountryData = data.find(item => item.Country === selectedCountry);
        if (selectedCountryData && selectedCountryData.Predicted_Poverty_Count !== null) {
          // Assuming the "Predicted_Poverty_Count" is a property of the data item representing the predicted poverty count.
          const predictedPovertyCount = selectedCountryData.Predicted_Poverty_Count;
          // Update the container with the predicted poverty count
          predictedPovertyContainer.textContent = `Predicted Poverty Count for ${selectedCountry}: ${predictedPovertyCount}`;
        } else {
          // If selected country data is not found or the predicted poverty count is null, display an error message
          predictedPovertyContainer.textContent = "No prediction available for the selected country.";
        }
      });
    } else {
      console.log("No data found in /predictions2024 endpoint.");
    }
  })
  .catch(error => {
    console.error("Error fetching data from /predictions2024 endpoint:", error);
  });

    //   } else {
  //     console.log("No data found in /predictions endpoint.");
  //   }
  // })
  // .catch(error => {
  //   console.error("Error fetching data from /predictions endpoint:", error);
  // });
      // Add event listener to the "Get Prediction" button







      