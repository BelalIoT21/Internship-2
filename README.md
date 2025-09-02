# Stock Level Monitor 📦

A real-time stock level monitoring system that provides instant alerts when inventory levels fall below critical thresholds. Built with JavaScript, TypeScript, Node.js, and HTML, this system ensures you never run out of essential stock items.

![Stock Monitor](https://img.shields.io/badge/Stock%20Monitor-Real%20Time-green)
[![GitHub stars](https://img.shields.io/github/stars/BelalIoT21/Stock-Level-Monitor)](https://github.com/BelalIoT21/Stock-Level-Monitor/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/BelalIoT21/Stock-Level-Monitor)](https://github.com/BelalIoT21/Stock-Level-Monitor/network)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)](https://github.com/BelalIoT21/Stock-Level-Monitor)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

## 🚀 Overview

The Stock Level Monitor is a comprehensive inventory management solution that provides real-time monitoring of stock levels across your warehouse or retail environment. With instant alerts, visual indicators, and audio notifications, you'll always stay informed about your inventory status and never face unexpected stockouts.

## ✨ Features

### 🔄 Real-Time Monitoring
- **WebSocket Communication**: Continuous real-time stock level updates
- **Live Dashboard**: Instant display of current inventory levels
- **Multi-Item Tracking**: Monitor multiple stock items simultaneously
- **Auto-Refresh**: Automatic updates without page reload

### 🚨 Advanced Alert System
- **Visual Alerts**: Color-coded indicators for stock status
- **Audio Notifications**: Customizable alarm sounds for critical alerts
- **Threshold-Based Alerts**: Configurable low-stock warning levels
- **Multiple Alert Types**: Info, Warning, Critical, and Emergency alerts

### 💻 User-Friendly Interface
- **Clean HTML5 Interface**: Simple and intuitive dashboard design
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Themes**: Customizable interface themes
- **Real-Time Charts**: Visual representation of stock trends

### ⚙️ Configurable Settings
- **Custom Thresholds**: Set individual alert levels for each item
- **Alert Preferences**: Customize notification types and sounds
- **Data Refresh Rates**: Adjustable monitoring intervals
- **User Permissions**: Role-based access control

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Usage Examples](#usage-examples)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## 🔧 Installation

### Prerequisites
- **Node.js** (v14.0.0 or higher): [Download here](https://nodejs.org/)
- **npm** (Node Package Manager): Usually included with Node.js
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge with HTML5 support
- **WebSocket Support**: Required for real-time communication

### Method 1: Clone Repository
```bash
# Clone the repository
git clone https://github.com/BelalIoT21/Stock-Level-Monitor.git

# Navigate to project directory
cd Stock-Level-Monitor

# Navigate to the stock monitor directory
cd "Stock level moniter"
```

### Method 2: Download ZIP
1. Download the repository as ZIP from GitHub
2. Extract to your desired location
3. Navigate to the `Stock level moniter` directory

### Install Dependencies
```bash
# Install WebSocket dependencies
npm install ws socket.io

# Install additional dependencies (if needed)
npm install express cors dotenv
```

## 🚀 Quick Start

### 1. Set Up WebSocket Server
Create a `server.js` file in the project directory:

```javascript
const WebSocket = require('ws');
const express = require('express');
const path = require('path');

// Create Express app for serving static files
const app = express();
app.use(express.static(path.join(__dirname)));

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Sample stock data
let stockItems = {
    'item1': { name: 'Product A', level: 50, threshold: 20 },
    'item2': { name: 'Product B', level: 15, threshold: 25 },
    'item3': { name: 'Product C', level: 80, threshold: 30 }
};

wss.on('connection', (ws) => {
    console.log('Client connected to Stock Monitor');
    
    // Send initial stock data
    ws.send(JSON.stringify({
        type: 'initial',
        data: stockItems
    }));
    
    // Simulate stock level updates every 5 seconds
    const updateInterval = setInterval(() => {
        // Simulate stock changes
        Object.keys(stockItems).forEach(key => {
            const change = Math.floor(Math.random() * 10) - 5; // Random change -5 to +5
            stockItems[key].level = Math.max(0, stockItems[key].level + change);
        });
        
        // Send updated stock data
        ws.send(JSON.stringify({
            type: 'update',
            data: stockItems,
            timestamp: new Date().toISOString()
        }));
    }, 5000);
    
    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected from Stock Monitor');
        clearInterval(updateInterval);
    });
    
    // Handle client messages
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'updateThreshold') {
                stockItems[data.itemId].threshold = data.threshold;
                console.log(`Threshold updated for ${data.itemId}: ${data.threshold}`);
            }
        } catch (error) {
            console.error('Error parsing client message:', error);
        }
    });
});

// Start HTTP server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`);
    console.log(`WebSocket server running on ws://localhost:8080`);
});
```

### 2. Start the Server
```bash
# Start the WebSocket server
node server.js

# Or use nodemon for auto-restart during development
npx nodemon server.js
```

### 3. Open the Application
```bash
# Open the HTML file in your browser
# If using the HTTP server
http://localhost:3000/Stock_Level.html

# Or open directly in browser
# Double-click Stock_Level.html
```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
WEBSOCKET_PORT=8080
NODE_ENV=development

# Database (if using persistent storage)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stock_monitor
DB_USER=admin
DB_PASS=password

# Alert Settings
DEFAULT_THRESHOLD=20
ALERT_CHECK_INTERVAL=5000
ENABLE_AUDIO_ALERTS=true

# Notification Settings
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-password

# Security
CORS_ORIGIN=http://localhost:3000
API_KEY=your-api-key-here
```

### Stock Configuration
Customize your stock items in `config/stock-items.js`:

```javascript
module.exports = {
    items: {
        'electronics_001': {
            name: 'iPhone 15 Pro',
            category: 'Electronics',
            level: 45,
            threshold: 15,
            maxCapacity: 100,
            unit: 'units',
            supplier: 'Apple Inc.',
            location: 'Warehouse A'
        },
        'clothing_002': {
            name: 'Nike Air Max',
            category: 'Footwear',
            level: 23,
            threshold: 20,
            maxCapacity: 200,
            unit: 'pairs',
            supplier: 'Nike',
            location: 'Warehouse B'
        }
    },
    alertLevels: {
        critical: 0.1,    // 10% of max capacity
        low: 0.25,        // 25% of max capacity
        medium: 0.5,      // 50% of max capacity
        high: 0.75        // 75% of max capacity
    }
};
```

### Alert Customization
Configure alert settings in `htmlScript.js`:

```javascript
const alertConfig = {
    visual: {
        enabled: true,
        colors: {
            normal: '#28a745',
            warning: '#ffc107',
            critical: '#dc3545',
            empty: '#6c757d'
        },
        animations: true
    },
    audio: {
        enabled: true,
        sounds: {
            warning: 'sounds/warning.mp3',
            critical: 'sounds/alarm.mp3',
            empty: 'sounds/emergency.mp3'
        },
        volume: 0.7
    },
    notifications: {
        browser: true,
        email: false,
        sms: false
    }
};
```

## 📊 API Documentation

### WebSocket Events

#### Client → Server Events
```javascript
// Update threshold for specific item
{
    "type": "updateThreshold",
    "itemId": "electronics_001",
    "threshold": 25
}

// Request current stock status
{
    "type": "getStatus",
    "itemId": "all" // or specific item ID
}

// Acknowledge alert
{
    "type": "acknowledgeAlert",
    "itemId": "electronics_001",
    "alertId": "alert_123"
}
```

#### Server → Client Events
```javascript
// Initial stock data
{
    "type": "initial",
    "data": {
        "electronics_001": {
            "name": "iPhone 15 Pro",
            "level": 45,
            "threshold": 15,
            "status": "normal"
        }
    }
}

// Stock level update
{
    "type": "update",
    "data": {
        "electronics_001": {
            "level": 42,
            "status": "normal",
            "lastUpdated": "2024-01-15T10:30:00Z"
        }
    },
    "timestamp": "2024-01-15T10:30:00Z"
}

// Alert notification
{
    "type": "alert",
    "severity": "critical",
    "itemId": "electronics_001",
    "message": "Stock level critical: Only 5 units remaining",
    "timestamp": "2024-01-15T10:30:00Z"
}
```

### REST API Endpoints (Optional)
If you implement HTTP API endpoints:

```javascript
// Get all stock items
GET /api/stock

// Get specific item
GET /api/stock/:itemId

// Update stock level
PUT /api/stock/:itemId
{
    "level": 30,
    "location": "Warehouse A"
}

// Get alerts history
GET /api/alerts?limit=50&offset=0

// Update alert threshold
POST /api/stock/:itemId/threshold
{
    "threshold": 25
}
```

## 💻 Usage Examples

### Basic Implementation
```html
<!DOCTYPE html>
<html>
<head>
    <title>Stock Monitor Dashboard</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div id="stock-dashboard">
        <h1>Stock Level Monitor</h1>
        <div id="stock-items"></div>
        <div id="alerts"></div>
    </div>

    <script>
        // Connect to WebSocket server
        const ws = new WebSocket('ws://localhost:8080');
        
        ws.onopen = function() {
            console.log('Connected to Stock Monitor');
            showStatus('Connected', 'success');
        };
        
        ws.onmessage = function(event) {
            const data = JSON.parse(event.data);
            handleStockUpdate(data);
        };
        
        function handleStockUpdate(data) {
            if (data.type === 'update') {
                updateStockDisplay(data.data);
                checkAlerts(data.data);
            }
        }
        
        function updateStockDisplay(items) {
            const container = $('#stock-items');
            container.empty();
            
            Object.keys(items).forEach(key => {
                const item = items[key];
                const status = getStatusColor(item.level, item.threshold);
                
                container.append(`
                    <div class="stock-item ${status}">
                        <h3>${item.name}</h3>
                        <div class="level">Level: ${item.level}</div>
                        <div class="threshold">Threshold: ${item.threshold}</div>
                        <div class="status">Status: ${status}</div>
                    </div>
                `);
            });
        }
    </script>
</body>
</html>
```

### Advanced Alert System
```javascript
class StockAlertManager {
    constructor() {
        this.alerts = [];
        this.audioEnabled = true;
        this.sounds = {
            warning: new Audio('sounds/warning.mp3'),
            critical: new Audio('sounds/alarm.mp3')
        };
    }
    
    checkStock(items) {
        Object.keys(items).forEach(key => {
            const item = items[key];
            const percentageRemaining = (item.level / item.threshold) * 100;
            
            if (item.level <= 0) {
                this.triggerAlert('critical', item, 'Stock depleted!');
            } else if (item.level <= item.threshold * 0.5) {
                this.triggerAlert('critical', item, 'Critical stock level!');
            } else if (item.level <= item.threshold) {
                this.triggerAlert('warning', item, 'Low stock warning!');
            }
        });
    }
    
    triggerAlert(severity, item, message) {
        const alert = {
            id: Date.now(),
            severity: severity,
            item: item,
            message: message,
            timestamp: new Date()
        };
        
        this.alerts.push(alert);
        this.displayAlert(alert);
        this.playAlertSound(severity);
        this.sendNotification(alert);
    }
    
    playAlertSound(severity) {
        if (this.audioEnabled && this.sounds[severity]) {
            this.sounds[severity].play();
        }
    }
}
```

## 🚀 Deployment

### Local Development
```bash
# Start development server
npm run dev

# Or start with nodemon
npm run start:dev
```

### Production Deployment

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose ports
EXPOSE 3000 8080

# Start application
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  stock-monitor:
    build: .
    ports:
      - "3000:3000"
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - WEBSOCKET_PORT=8080
    volumes:
      - ./data:/app/data
    restart: unless-stopped

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

#### PM2 Deployment
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# View logs
pm2 logs stock-monitor
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'stock-monitor',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      WEBSOCKET_PORT: 8080
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      WEBSOCKET_PORT: 8080
    }
  }]
};
```

#### Cloud Deployment (Heroku)
```bash
# Login to Heroku
heroku login

# Create app
heroku create stock-level-monitor

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3000

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🧪 Testing

### Running Tests
```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Test Examples
```javascript
// tests/websocket.test.js
const WebSocket = require('ws');
const { server } = require('../server');

describe('WebSocket Server', () => {
    let ws;
    
    beforeEach((done) => {
        ws = new WebSocket('ws://localhost:8080');
        ws.on('open', done);
    });
    
    afterEach(() => {
        ws.close();
    });
    
    test('should receive initial stock data', (done) => {
        ws.on('message', (data) => {
            const message = JSON.parse(data);
            expect(message.type).toBe('initial');
            expect(message.data).toBeDefined();
            done();
        });
    });
    
    test('should handle threshold updates', (done) => {
        const updateMessage = {
            type: 'updateThreshold',
            itemId: 'test_item',
            threshold: 30
        };
        
        ws.send(JSON.stringify(updateMessage));
        
        ws.on('message', (data) => {
            const message = JSON.parse(data);
            if (message.type === 'thresholdUpdated') {
                expect(message.itemId).toBe('test_item');
                done();
            }
        });
    });
});
```

## 🔧 Troubleshooting

### Common Issues

#### WebSocket Connection Failed
```bash
# Check if server is running
netstat -an | grep 8080

# Check firewall settings
sudo ufw allow 8080

# Verify WebSocket URL in client
// Make sure it matches your server configuration
const ws = new WebSocket('ws://localhost:8080');
```

#### Audio Alerts Not Playing
```javascript
// Check browser audio permissions
navigator.permissions.query({name: 'notifications'}).then(function(result) {
    console.log(result.state);
});

// Ensure audio files exist and are accessible
const audio = new Audio('sounds/alarm.mp3');
audio.addEventListener('canplaythrough', () => {
    console.log('Audio file loaded successfully');
});
```

#### High CPU Usage
```javascript
// Optimize update intervals
const OPTIMAL_UPDATE_INTERVAL = 10000; // 10 seconds instead of 5

// Implement connection pooling
const connectionPool = new Map();
```

### Performance Optimization
```javascript
// Use connection pooling
const WebSocket = require('ws');
const connectionPool = new Set();

wss.on('connection', (ws) => {
    connectionPool.add(ws);
    
    ws.on('close', () => {
        connectionPool.delete(ws);
    });
});

// Batch updates for multiple clients
function broadcastUpdate(data) {
    const message = JSON.stringify(data);
    connectionPool.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });
}
```

## 🤝 Contributing

We welcome contributions from the community!

### How to Contribute
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines
```bash
# Setup development environment
git clone https://github.com/yourusername/Stock-Level-Monitor.git
cd Stock-Level-Monitor

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests before committing
npm test

# Follow coding standards
npm run lint
npm run format
```

### Code Style
- Use ES6+ features where appropriate
- Follow consistent naming conventions
- Add comments for complex logic
- Include tests for new features
- Update documentation as needed

## 📄 License

**All Rights Reserved** - This project is proprietary software. 

For licensing inquiries or commercial use, please contact the repository owner through GitHub.

## 🙏 Acknowledgments

- **jQuery**: For simplified DOM manipulation and AJAX requests
- **WebSocket API**: For real-time bidirectional communication
- **Node.js Community**: For excellent WebSocket libraries and tools
- **Open Source Contributors**: For inspiration and best practices

### Third-Party Resources
- **Audio Files**: Alert sounds may be subject to separate licensing
- **Icons**: UI icons from various open-source icon libraries
- **Fonts**: Web fonts from Google Fonts and other providers

## 📞 Contact & Support

**Developer**: Belal IoT  
**GitHub**: [@BelalIoT21](https://github.com/BelalIoT21)  
**Repository**: [Stock-Level-Monitor](https://github.com/BelalIoT21/Stock-Level-Monitor)

### Support Channels
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/BelalIoT21/Stock-Level-Monitor/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/BelalIoT21/Stock-Level-Monitor/discussions)
- 📖 **Documentation**: [Project Wiki](https://github.com/BelalIoT21/Stock-Level-Monitor/wiki)

### Enterprise Support
For enterprise deployments, custom integrations, or commercial licensing, please create a discussion thread or contact through GitHub.

---

## 🚀 Getting Started Checklist

- [ ] Clone the repository
- [ ] Install Node.js and dependencies
- [ ] Configure WebSocket server
- [ ] Set up stock items configuration
- [ ] Test WebSocket connection
- [ ] Customize alert thresholds
- [ ] Add audio alert files
- [ ] Deploy to your environment

⭐ **Star this repository if it helps you manage your inventory!**

*Keeping your stock levels optimized, one alert at a time* 📦✨
