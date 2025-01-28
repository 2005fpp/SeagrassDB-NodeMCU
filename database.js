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
// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
