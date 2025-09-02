# Stock Level Monitor

This project monitors stock levels and provides alerts when levels fall below a threshold. It utilizes JavaScript, TypeScript, Node.js, and HTML to create a real-time monitoring system.

## Key Features & Benefits

*   **Real-time Monitoring:** Continuously monitors stock levels using WebSocket communication.
*   **Alert System:** Triggers audio and visual alerts when stock levels are low.
*   **User-Friendly Interface:** Provides a simple HTML interface to display stock levels and alerts.
*   **Configurable Threshold:** Allows users to set a custom threshold for low stock alerts (implementation in progress).

## Prerequisites & Dependencies

Before running this project, ensure you have the following installed:

*   **Node.js:** [https://nodejs.org/](https://nodejs.org/) (Required for running the WebSocket server).
*   **npm (Node Package Manager):** Usually comes with Node.js.
*   **A web browser** that supports JavaScript and HTML5.

## Installation & Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/BelalIoT21/Internship-2.git
    cd Internship-2
    ```

2.  **Navigate to the `Stock level moniter` directory:**

    ```bash
    cd "Stock level moniter"
    ```

3.  **Install Node.js Dependencies:**
    The project relies on WebSocket for communication. You may need to install socket.io or a similar library if you implement a server-side component.  Since the code provided does not include a server-side component, this step is tentative.
    ```bash
    # If a server side component is added
    # npm install socket.io
    ```

4.  **Set up a WebSocket Server (Example using Node.js):**  *(Requires Server-side implementation - Code not included in provided files)*

    Create a server-side script (e.g., `server.js`) using Node.js and a WebSocket library like `ws` or `socket.io`. This script will be responsible for simulating stock level data and sending it to the client.

    ```javascript
    // Example using ws (requires npm install ws)
    const WebSocket = require('ws');

    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', ws => {
      console.log('Client connected');

      // Simulate stock level updates every 5 seconds
      setInterval(() => {
        const stockLevel = Math.floor(Math.random() * 100); // Random stock level
        ws.send(stockLevel);
      }, 5000);

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    console.log('WebSocket server started on port 8080');
    ```

    Save the file as `server.js` in the `Stock level moniter` directory or a suitable location.

    **Run the Server:**

    ```bash
    node server.js  # or nodemon server.js for automatic restarts on changes
    ```

5.  **Open `Stock_Level.html` in your web browser.**

## Usage Examples & API Documentation

*   **Running the Application:**

    Open `Stock_Level.html` in your browser.  The page should automatically connect to the WebSocket server (running on `ws://localhost:8080`).

*   **Simulating Stock Level Updates:**

    The provided server-side example script sends random stock level data every 5 seconds.  The HTML page will update its display with the received data.

*   **Alert Trigger:**

    If the received `stockLevel` is below a predefined threshold (currently hardcoded or missing from the code provided), the application will display an alert message and play an audio alert.

## Configuration Options

Currently, the threshold for the alert is not configurable through the user interface in the provided `htmlScript.js`. The threshold needs to be added in the server-side implementation and passed as a parameter. Here is an example:

*   **WebSocket URL:**  Modify the `ws://localhost:8080` URL in `htmlScript.js` if your WebSocket server is running on a different host or port.

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Test your changes thoroughly.
5.  Submit a pull request with a clear description of your changes.

## License Information

License not specified. All rights reserved.

## Acknowledgments

*   The project uses jQuery for simplified DOM manipulation.
*   Inspiration from various online tutorials and examples for WebSocket communication.
*   The `alarm.mp3` file may be subject to separate licensing terms.  Please check its origin for details.

---
**Note:** This README.md is based on the provided files and information.  A complete and functional application would require a working server-side component with WebSocket implementation, proper error handling, and a robust mechanism for configuring alert thresholds.
