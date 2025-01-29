#include <WiFi.h>
#include <HTTPClient.h>

// Replace with your Wi-Fi credentials
const char* ssid = "user";  // Enter your Wi-Fi SSID here
const char* password = "pass";  // Enter your Wi-Fi password here

// Server endpoint (replace with your server's IP or domain)
const char* serverURL = "http://ip:3000/sensor-data";  // Replace with your server's address

void setup() {
  // Start serial communication for debugging
  Serial.begin(9600);
  delay(1000);

  // Connect to Wi-Fi
  connectWiFi();
}

// Connect to Wi-Fi
void connectWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  // Once connected, print the IP address
  Serial.println("Connected to Wi-Fi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  sendData();
  delay(60000);  // Post data every 60 seconds (60000 milliseconds)
}

// Function to send data via POST request
void sendData() {
  // Create an HTTPClient object
  HTTPClient http;

  // Begin HTTP connection
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");  // Set content type as JSON

  // Prepare the JSON payload (example sensor data)
  String payload = "{\"module_id\":\"PKN_AMN_001\","
                   "\"saltiness_PSU\":35.5,"
                   "\"wave_strength_m\":1.2,"
                   "\"light_intensity_lux\":750}";

  // Send POST request
  int httpResponseCode = http.POST(payload);

  // Check the response code
  if (httpResponseCode > 0) {
    Serial.println("Data sent successfully!");
    Serial.println("Response code: " + String(httpResponseCode));
  } else {
    Serial.println("Error in sending data. Response code: " + String(httpResponseCode));
  }

  // Close HTTP connection
  http.end();
}
