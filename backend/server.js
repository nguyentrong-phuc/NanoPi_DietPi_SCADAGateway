const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Dummy Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ token: 'fake-jwt-token-123' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Network mock API
let lanConfig = {
  lan1: {
    ip: '192.168.30.1',
    netmask: '255.255.255.0',
    dhcpEnabled: true,
    dhcpStart: '192.168.30.2',
    dhcpEnd: '192.168.30.100',
    dns: '8.8.8.8',
    leaseTime: 1440
  },
  lan2: {
    ip: '192.168.40.1',
    netmask: '255.255.255.0',
    dhcpEnabled: false,
    dhcpStart: '192.168.40.2',
    dhcpEnd: '192.168.40.100',
    dns: '8.8.8.8',
    leaseTime: 1440
  }
};

app.get('/api/network', (req, res) => {
  res.json(lanConfig);
});

app.post('/api/network', (req, res) => {
  lanConfig = { ...lanConfig, ...req.body };
  // Here we would typically write to /etc/network/interfaces or invoke nmcli
  console.log('Updated network config:', lanConfig);
  res.json({ success: true, message: 'Network configuration updated' });
});

// System Management API (Export)
app.get('/api/system/export/:type', (req, res) => {
  const type = req.params.type;
  // Create a dummy JSON config to return as file
  const configData = {
    type: type,
    timestamp: new Date().toISOString(),
    settings: type === 'system' ? { hostname: 'WukongEdge', ntp: 'pool.ntp.org' } : { nodes: [] }
  };
  
  const filename = `${type}_config_${Date.now()}.json`;
  const filePath = path.join(__dirname, '..', 'config_data', filename);
  
  fs.writeFileSync(filePath, JSON.stringify(configData, null, 2));
  
  res.download(filePath, filename, (err) => {
    if (err) console.error("Error downloading file:", err);
    // Cleanup after download
    fs.unlinkSync(filePath);
  });
});

// Serve Frontend Static Files
// This allows us to build the frontend locally and let the backend serve it
const frontendDistPath = path.join(__dirname, 'public');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  // Catch-all route for React Router (SPA)
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send("Backend is running. Frontend build not found in /public folder.");
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SCADA Gateway Backend running on http://0.0.0.0:${PORT}`);
});
