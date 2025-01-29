# 🌊 **Seagrass Database** 

Welcome to the **Seagrass DB** web application! This project demonstrates how to create a simple web application that fetches and displays sensor data from a MySQL database using **Node.js**, **Express**, and **MySQL**.

---

## 🛠️ **Tools**

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **API**: RESTful API
- **IoT device**: ESP32

---

## ⚙️ **Running the Application**
Before running the application, make sure you have configured the database connection in `database.js` with the correct credentials:
```js
const db = mysql.createConnection({
    host: 'ip',              // Your database host (e.g., 'localhost' or '192.168.0.x')
    user: 'user',            // Your MySQL username
    password: 'password',    // Your MySQL password
    database: 'seagrass_sensor_data', // Your database name
    port: 3306,              // MySQL port (default is 3306)
});
```

### 🛠️ **Install Dependencies**

```bash
npm install nodemon mysql2 express body-parser
```

### 🚀 **Start the Server**

```bash
npx nodemon database.js
```

### 🌐 **Access the Front-End**

```
http://localhost:3000
```
---

## 📧 Contact

📧 **Contact ME :** Feen0305  

---

Thanks! 😄 I’m glad you’re enjoying this! If you need anything else, just let me know. Have a blast coding! 🚀🎉
