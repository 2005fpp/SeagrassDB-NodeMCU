document.addEventListener('DOMContentLoaded', function () {
    const loadSensorDataButton = document.getElementById('loadSensorData');
    const sensorDataContainer = document.getElementById('sensorDataContainer');

    // Add a loading state for better UX
    loadSensorDataButton.addEventListener('click', function () {
        // Display loading message
        sensorDataContainer.innerHTML = "<p>Loading data...</p>";

        // Fetch sensor data from the server
        fetch('/sensor-data')
            .then(response => response.json())
            .then(data => {
                let sensorDataHtml = "<h2>Sensor Data (JSON Format):</h2>";

                // Check if data is available
                if (data.length > 0) {
                    sensorDataHtml += "<pre>" + JSON.stringify(data, null, 4) + "</pre>";
                } else {
                    sensorDataHtml = "<p>No data available.</p>";
                }

                // Insert formatted data
                sensorDataContainer.innerHTML = sensorDataHtml;
            })
            .catch(err => {
                console.error("Error fetching data", err);
                sensorDataContainer.innerHTML = "<p>Error loading data. Please try again later.</p>";
            });
    });
});
