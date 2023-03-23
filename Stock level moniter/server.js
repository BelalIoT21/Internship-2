const express = require('express'); // Importera Express-biblioteket
const app = express(); // Skapa en instans av Express-appen
const http = require('http'); // Importera den inbyggda HTTP-modulen
const server = http.createServer(app); // Skapa en HTTP-server med Express-appen
const WebSocket = require('ws'); // Importera WebSocket-biblioteket
const wss = new WebSocket.Server({ server }); // Skapa en WebSocket-server med hjälp av HTTP-servern
const mqtt = require('mqtt'); // Importera MQTT-biblioteket
const client = mqtt.connect('mqtt://test.mosquitto.org'); // Anslut till MQTT-mäklaren på test.mosquitto.org

// Händelseavlyssnare för när MQTT-klienten ansluter till mäklaren
client.on('connect', () => {
  console.log('Connected to MQTT broker'); // Logga ett meddelande som indikerar lyckad anslutning
  client.subscribe('Stock_Level'); // Prenumerera på ämnet Stock_Level
});

// Händelseavlyssnare för när ett meddelande tas emot om ett prenumererat ämne
client.on('message', (topic, message) => {
  console.log(`Received message on topic "${topic}": ${message.toString()} cm`); // Logga det mottagna meddelandet
  const stock = (400 - parseInt(message.toString())) / 100; // Beräkna lagernivån
  wss.clients.forEach(function each(client) { // Gå igenom alla anslutna WebSocket-klienter
    if (client.readyState === WebSocket.OPEN) { // Kontrollera om klienten är ansluten
      client.send(stock.toString()); // Skicka den beräknade lagernivån till kunden
    }
  });
});

// Rutt för rot-URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Stock_Level.html'); // Servera filen Stock_Level.html
});

const port = 8080; // Definiera porten att lyssna på
server.listen(port, () => { // Starta servern och lyssna på den angivna porten
  console.log(`Server started on port ${port}`); // Logga ett meddelande som indikerar att servern har startat
});