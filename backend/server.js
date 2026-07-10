const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Helper to determine OS and paths
const isLinux = os.platform() === 'linux';
const interfacesPath = isLinux ? '/etc/network/interfaces' : path.join(__dirname, '..', 'config_data', 'interfaces_mock.txt');
const dnsmasqPath = isLinux ? '/etc/dnsmasq.d/scada.conf' : path.join(__dirname, '..', 'config_data', 'dnsmasq_mock.conf');

// Ensure mock files exist in dev
if (!isLinux) {
  if (!fs.existsSync(interfacesPath)) fs.writeFileSync(interfacesPath, '# Mock Interfaces\n');
  if (!fs.existsSync(dnsmasqPath)) fs.writeFileSync(dnsmasqPath, '# Mock dnsmasq\n');
}

// Dummy Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ token: 'fake-jwt-token-123' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Network API
app.get('/api/network', (req, res) => {
  const nets = os.networkInterfaces();
  
  // Default structure
  let lanConfig = {
    lan1: { ip: '', netmask: '', mac: '', dhcpEnabled: false, dhcpStart: '', dhcpEnd: '', dns: '', leaseTime: 1440, status: 'Disconnected' },
    lan2: { ip: '', netmask: '', mac: '', dhcpEnabled: false, dhcpStart: '', dhcpEnd: '', dns: '', leaseTime: 1440, status: 'Disconnected' }
  };

  // Map eth0 to lan1 and eth1 to lan2
  const mapInterface = (ethName, lanKey) => {
    if (nets[ethName] && nets[ethName].length > 0) {
      const ipv4 = nets[ethName].find(n => n.family === 'IPv4' || n.family === 4);
      if (ipv4) {
        lanConfig[lanKey].ip = ipv4.address;
        lanConfig[lanKey].netmask = ipv4.netmask;
        lanConfig[lanKey].mac = ipv4.mac;
        lanConfig[lanKey].status = 'Connected';
      }
    }
  };

  mapInterface('eth0', 'lan1');
  mapInterface('eth1', 'lan2');

  // In a real app, you would parse the /etc/dnsmasq.d/scada.conf to get DHCP ranges
  // For simplicity in this example, we return defaults if no DHCP is found
  try {
    const dnsmasqContent = fs.readFileSync(dnsmasqPath, 'utf-8');
    if (dnsmasqContent.includes('interface=eth0')) lanConfig.lan1.dhcpEnabled = true;
    if (dnsmasqContent.includes('interface=eth1')) lanConfig.lan2.dhcpEnabled = true;
    
    // Simple parsing for ranges (e.g. dhcp-range=eth0,192.168.30.2,192.168.30.100,12h)
    const lines = dnsmasqContent.split('\n');
    lines.forEach(line => {
      if (line.startsWith('dhcp-range=')) {
        const parts = line.split('=')[1].split(',');
        const iface = parts[0];
        const lanKey = iface === 'eth0' ? 'lan1' : 'lan2';
        lanConfig[lanKey].dhcpStart = parts[1] || '';
        lanConfig[lanKey].dhcpEnd = parts[2] || '';
      }
    });
  } catch (e) {
    console.error("Could not read dnsmasq config", e.message);
  }

  res.json(lanConfig);
});

app.post('/api/network', (req, res) => {
  const config = req.body; // Expecting { lan1: {...}, lan2: {...} }
  
  try {
    // 1. Generate /etc/network/interfaces content
    let interfacesContent = `auto lo\niface lo inet loopback\n\n`;
    
    const generateIface = (ifaceName, lanData) => {
      if (!lanData || !lanData.ip) return;
      interfacesContent += `allow-hotplug ${ifaceName}\n`;
      interfacesContent += `iface ${ifaceName} inet static\n`;
      interfacesContent += `  address ${lanData.ip}\n`;
      interfacesContent += `  netmask ${lanData.netmask}\n`;
      interfacesContent += `\n`;
    };

    generateIface('eth0', config.lan1);
    generateIface('eth1', config.lan2);

    fs.writeFileSync(interfacesPath, interfacesContent);

    // 2. Generate dnsmasq config for DHCP
    let dnsmasqContent = '';
    const generateDhcp = (ifaceName, lanData) => {
      if (lanData && lanData.dhcpEnabled) {
        dnsmasqContent += `interface=${ifaceName}\n`;
        dnsmasqContent += `dhcp-range=${ifaceName},${lanData.dhcpStart},${lanData.dhcpEnd},${lanData.netmask},${lanData.leaseTime}m\n`;
        if (lanData.dns) {
          dnsmasqContent += `dhcp-option=${ifaceName},6,${lanData.dns}\n`; // Option 6 is DNS
        }
        dnsmasqContent += `\n`;
      }
    };

    generateDhcp('eth0', config.lan1);
    generateDhcp('eth1', config.lan2);

    fs.writeFileSync(dnsmasqPath, dnsmasqContent);

    // 3. Restart services if on Linux
    if (isLinux) {
      console.log('Restarting networking and dnsmasq...');
      execSync('systemctl restart networking || true'); // Some OS use NetworkManager, this might fail but we ignore
      execSync('systemctl restart dnsmasq || true');
    }

    res.json({ success: true, message: 'Network configuration updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to apply network configuration', details: error.message });
  }
});

// System Info API
app.get('/api/system/info', (req, res) => {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: os.uptime(),
    cpuModel: cpus[0] ? cpus[0].model : 'Unknown',
    cpuUsage: Math.floor(Math.random() * 20) + 5, // Fake CPU load for now, reading real cpu load requires delta calculations
    totalMem: totalMem,
    usedMem: usedMem,
    memUsagePct: Math.round((usedMem / totalMem) * 100)
  });
});

// System Management API (Export)
app.get('/api/system/export/:type', (req, res) => {
  const type = req.params.type;
  const configData = {
    type: type,
    timestamp: new Date().toISOString(),
    settings: type === 'system' ? { hostname: os.hostname() } : { nodes: [] }
  };
  
  const filename = `${type}_config_${Date.now()}.json`;
  const filePath = path.join(__dirname, '..', 'config_data', filename);
  
  fs.writeFileSync(filePath, JSON.stringify(configData, null, 2));
  
  res.download(filePath, filename, (err) => {
    if (err) console.error("Error downloading file:", err);
    fs.unlinkSync(filePath);
  });
});

// Serve Frontend Static Files
const frontendDistPath = path.join(__dirname, 'public');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.use((req, res) => {
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
