// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the button and the container elements
    const loadSensorDataButton = document.getElementById('loadSensorData');
    const sensorDataContainer = document.getElementById('sensorDataContainer');

    // Add event listener to the button
    loadSensorDataButton.addEventListener('click', function () {
        // Fetch the sensor data from the server
        fetch('/sensor-data')
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                let sensorDataHtml = "<h2>Sensor Data (JSON Format):</h2>";

                if (data) {
                    // Format the JSON data into a readable string with indentation
                    sensorDataHtml += "<pre>" + JSON.stringify(data, null, 4) + "</pre>";
                } else {
                    sensorDataHtml = "<p>No data available.</p>";
                }

                // Insert the formatted JSON data into the container
                sensorDataContainer.innerHTML = sensorDataHtml;
            })
            .catch(err => {
                console.error("Error fetching data", err);
                sensorDataContainer.innerHTML = "<p>Error loading data.</p>";
            });
    });
});
