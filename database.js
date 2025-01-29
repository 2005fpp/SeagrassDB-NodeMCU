// npx nodemon database.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Configure the MySQL connection
const db = mysql.createConnection({
    host: 'ip',
    user: 'user',
    password: 'password',
    database: 'seagrass_sensor_data',
    port: 3306,
});

// Serve static files from the "public" folder
app.use(express.static('public'));

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
} );

app.get('/sensor-data', (req, res) => {
    db.query('SELECT * from sensor_data', (err, rows) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).send('Error querying data');
        }
        res.json(rows); // Sending the data back as JSON
    });
});

app.post('/sensor-data', (req, res) => {
    const { module_id, saltiness_PSU, wave_strength_m, light_intensity_lux } = req.body;

    // Check if required fields are present
    if (!module_id || !saltiness_PSU || !wave_strength_m || !light_intensity_lux) {
        return res.status(400).send('All fields except timestamp are required');
    }

    // Query to check if the module_id exists in the places table
    const checkModuleQuery = `SELECT module_id FROM places WHERE module_id = ?`;
    const checkModuleValues = [module_id];

    db.query(checkModuleQuery, checkModuleValues, (err, result) => {
        if (err) {
            console.error('Error checking module_id:', err);
            return res.status(500).send('Error checking module_id');
        }

        // If module_id not found, send error
        if (result.length === 0) {
            return res.status(404).send('Module not found');
        }

        // Insert the sensor data into the sensor_data table
        const insertQuery = `INSERT INTO sensor_data (module_id, saltiness_PSU, wave_strength_M, light_intensity_LUX) 
                             VALUES (?, ?, ?, ?)`;
        const insertValues = [module_id, saltiness_PSU, wave_strength_m, light_intensity_lux];

        db.query(insertQuery, insertValues, (err, result) => {
            if (err) {
                console.error('Error inserting sensor data:', err);
                return res.status(500).send('Error inserting sensor data');
            }

            // Return success response with the inserted data ID
            res.status(201).json({ message: 'Sensor data inserted successfully', id: result.insertId });
        });
    });
});


// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
