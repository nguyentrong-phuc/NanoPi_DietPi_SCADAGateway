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
  if (!fs.existsSync(path.join(__dirname, '..', 'config_data'))) fs.mkdirSync(path.join(__dirname, '..', 'config_data'));
  if (!fs.existsSync(interfacesPath)) fs.writeFileSync(interfacesPath, 'allow-hotplug eth0\niface eth0 inet dhcp\n\nallow-hotplug eth1\niface eth1 inet static\n  address 192.168.2.1\n  netmask 255.255.255.0\n');
  if (!fs.existsSync(dnsmasqPath)) fs.writeFileSync(dnsmasqPath, 'interface=eth1\ndhcp-range=eth1,192.168.2.10,192.168.2.100,255.255.255.0,24h\ndhcp-option=eth1,6,8.8.8.8\n');
}

// Auth
const authFilePath = path.join(__dirname, '..', 'config_data', 'auth.json');
if (!fs.existsSync(authFilePath)) {
  fs.writeFileSync(authFilePath, JSON.stringify({ username: 'admin', password: 'admin' }, null, 2));
}

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  try {
    const auth = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));
    if (username === auth.username && password === auth.password) {
      res.json({ token: 'fake-jwt-token-123', username: auth.username });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch(e) {
    res.status(500).json({ error: 'Auth error' });
  }
});

app.post('/api/auth/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const auth = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));
    if (currentPassword !== auth.password) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    auth.password = newPassword;
    fs.writeFileSync(authFilePath, JSON.stringify(auth, null, 2));
    res.json({ success: true, message: 'Password changed successfully' });
  } catch(e) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Network API (WAN: eth0, LAN: eth1)
app.get('/api/network', (req, res) => {
  const nets = os.networkInterfaces();
  
  let wanConfig = {
    mode: 'DHCP', dnsMode: 'Auto', dns1: '8.8.8.8', dns2: '8.8.4.4', mtu: '1500',
    staticIp: '', netmask: '255.255.255.0', gateway: '', mac: '', status: 'Disconnected'
  };
  let lanConfig = {
    ip: '192.168.2.1', netmask: '255.255.255.0', mac: '', dhcpEnabled: false, dhcpStart: '', dhcpEnd: '', dns: '8.8.8.8', leaseTime: 1440, status: 'Disconnected'
  };

  // 1. Parse /etc/network/interfaces
  try {
    if (fs.existsSync(interfacesPath)) {
      const ifaces = fs.readFileSync(interfacesPath, 'utf-8');
      
      const eth0BlockMatch = ifaces.match(/iface eth0 inet static[\s\S]*?(?=iface|$)/);
      if (eth0BlockMatch) {
        wanConfig.mode = 'Static IP';
        wanConfig.dnsMode = 'Manual';
        const block = eth0BlockMatch[0];
        const getVal = (key) => { const m = block.match(new RegExp(`^\\s*${key}\\s+(.+)`, 'm')); return m ? m[1].trim() : ''; };
        wanConfig.staticIp = getVal('address');
        wanConfig.netmask = getVal('netmask') || '255.255.255.0';
        wanConfig.gateway = getVal('gateway');
        wanConfig.mtu = getVal('mtu') || '1500';
        const dns = getVal('dns-nameservers');
        if (dns) {
          const dnsParts = dns.split(/\s+/);
          if(dnsParts[0]) wanConfig.dns1 = dnsParts[0];
          if(dnsParts[1]) wanConfig.dns2 = dnsParts[1];
        }
      }

      const eth1BlockMatch = ifaces.match(/iface eth1 inet static[\s\S]*?(?=iface|$)/);
      if (eth1BlockMatch) {
        const block = eth1BlockMatch[0];
        const getVal = (key) => { const m = block.match(new RegExp(`^\\s*${key}\\s+(.+)`, 'm')); return m ? m[1].trim() : ''; };
        lanConfig.ip = getVal('address') || '192.168.2.1';
        lanConfig.netmask = getVal('netmask') || '255.255.255.0';
      }
    }
  } catch(e) { console.error("Error reading interfaces:", e); }

  // 2. Parse dnsmasq config for LAN DHCP
  try {
    if (fs.existsSync(dnsmasqPath)) {
      const dnsmasqContent = fs.readFileSync(dnsmasqPath, 'utf-8');
      if (dnsmasqContent.includes('interface=eth1')) lanConfig.dhcpEnabled = true;
      const lines = dnsmasqContent.split('\n');
      lines.forEach(line => {
        if (line.trim().startsWith('dhcp-range=eth1')) {
          const parts = line.split('=')[1].split(',');
          lanConfig.dhcpStart = parts[1] || '';
          lanConfig.dhcpEnd = parts[2] || '';
        }
        if (line.trim().startsWith('dhcp-option=eth1,6,')) {
          lanConfig.dns = line.split(',').pop().trim();
        }
      });
    }
  } catch (e) { console.error("Error reading dnsmasq:", e); }

  // 3. Map live network interfaces (MAC and Live IP)
  const mapLive = (ethName, conf) => {
    if (nets[ethName] && nets[ethName].length > 0) {
      const ipv4 = nets[ethName].find(n => n.family === 'IPv4' || n.family === 4);
      if (ipv4) {
        conf.liveIp = ipv4.address;
        conf.mac = ipv4.mac;
        conf.status = 'Connected';
      }
    }
  };
  mapLive('eth0', wanConfig);
  mapLive('eth1', lanConfig);

  // 4. Try getting live gateway for WAN
  if (isLinux) {
    try {
      const gw = execSync("ip route show default dev eth0 | awk '{print $3}'").toString().trim();
      if (gw) wanConfig.liveGateway = gw;
    } catch(e) {}
  }

  res.json({ wan: wanConfig, lan: lanConfig });
});

app.post('/api/network', (req, res) => {
  const { wan, lan } = req.body;
  
  try {
    // 1. Generate /etc/network/interfaces content
    let interfacesContent = `# Auto-generated by SCADA Gateway\nauto lo\niface lo inet loopback\n\n`;
    
    // WAN
    if (wan) {
      interfacesContent += `allow-hotplug eth0\n`;
      if (wan.mode === 'DHCP') {
        interfacesContent += `iface eth0 inet dhcp\n`;
      } else {
        interfacesContent += `iface eth0 inet static\n`;
        interfacesContent += `  address ${wan.staticIp}\n`;
        interfacesContent += `  netmask ${wan.netmask}\n`;
        if (wan.gateway) interfacesContent += `  gateway ${wan.gateway}\n`;
        if (wan.dnsMode === 'Manual' && (wan.dns1 || wan.dns2)) {
           let dnsLine = `  dns-nameservers`;
           if (wan.dns1) dnsLine += ` ${wan.dns1}`;
           if (wan.dns2) dnsLine += ` ${wan.dns2}`;
           interfacesContent += dnsLine + `\n`;
        }
      }
      if (wan.mtu) interfacesContent += `  mtu ${wan.mtu}\n`;
      interfacesContent += `\n`;
    }

    // LAN
    if (lan) {
      interfacesContent += `allow-hotplug eth1\n`;
      interfacesContent += `iface eth1 inet static\n`;
      interfacesContent += `  address ${lan.ip}\n`;
      interfacesContent += `  netmask ${lan.netmask}\n\n`;
    }

    fs.writeFileSync(interfacesPath, interfacesContent);

    // 2. Generate dnsmasq config for LAN DHCP
    if (lan) {
      let dnsmasqContent = '';
      if (lan.dhcpEnabled) {
        dnsmasqContent += `interface=eth1\n`;
        dnsmasqContent += `dhcp-range=eth1,${lan.dhcpStart},${lan.dhcpEnd},${lan.netmask},${lan.leaseTime}m\n`;
        if (lan.dns) {
          dnsmasqContent += `dhcp-option=eth1,6,${lan.dns}\n`;
        }
      }
      fs.writeFileSync(dnsmasqPath, dnsmasqContent);
    }

    // 3. Restart services
    if (isLinux) {
      console.log('Restarting networking and dnsmasq...');
      try { execSync('systemctl restart networking'); } catch(e) {}
      try { execSync('systemctl restart dnsmasq'); } catch(e) {}
    }

    res.json({ success: true, message: 'Network configuration updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to apply network configuration', details: error.message });
  }
});

// System Time API
const timesyncdPath = isLinux ? '/etc/systemd/timesyncd.conf' : path.join(__dirname, '..', 'config_data', 'timesyncd_mock.conf');
if (!isLinux && !fs.existsSync(timesyncdPath)) {
  fs.writeFileSync(timesyncdPath, '[Time]\nNTP=ntp.aliyun.com ntp.gwadar.cn\n');
}

app.get('/api/system/time', (req, res) => {
  let config = {
    timeZone: 'UTC',
    ntpEnabled: true,
    ntpServer1: 'ntp.aliyun.com',
    ntpServer2: 'ntp.gwadar.cn',
    deviceTime: new Date().toISOString()
  };

  try {
    if (isLinux) {
      try { config.timeZone = execSync("cat /etc/timezone").toString().trim(); } catch(e){}
      try { 
        const ntpStatus = execSync("timedatectl show --property=NTP").toString().trim();
        config.ntpEnabled = ntpStatus.includes('yes');
      } catch(e){}
    }
    if (fs.existsSync(timesyncdPath)) {
      const timesyncdContent = fs.readFileSync(timesyncdPath, 'utf-8');
      const match = timesyncdContent.match(/^NTP=(.*)$/m);
      if (match && match[1]) {
        const servers = match[1].trim().split(/\s+/);
        config.ntpServer1 = servers[0] || '';
        config.ntpServer2 = servers[1] || '';
      }
    }
  } catch (e) { console.error("Error reading time config:", e); }

  config.deviceTime = new Date().toLocaleString('sv').replace('T', ' ');
  res.json(config);
});

app.post('/api/system/time', (req, res) => {
  const { action, payload } = req.body;
  try {
    if (action === 'apply_ntp') {
      const { ntpEnabled, ntpServer1, ntpServer2 } = payload;
      let timesyncdContent = `[Time]\n`;
      let servers = [];
      if (ntpServer1) servers.push(ntpServer1);
      if (ntpServer2) servers.push(ntpServer2);
      if (servers.length > 0) {
        timesyncdContent += `NTP=${servers.join(' ')}\n`;
      }
      fs.writeFileSync(timesyncdPath, timesyncdContent);
      
      if (isLinux) {
        try { execSync(`timedatectl set-ntp ${ntpEnabled ? 'true' : 'false'}`); } catch(e){}
        if (ntpEnabled) {
          try { execSync('systemctl restart systemd-timesyncd'); } catch(e){}
        }
      }
    } else if (action === 'set_time') {
      const { dateTime } = payload;
      if (isLinux && dateTime) {
        try { execSync(`timedatectl set-ntp false`); } catch(e){} // must disable ntp to set time manually
        try { execSync(`date -s "${dateTime}"`); } catch(e){}
        try { execSync(`hwclock -w`); } catch(e){} // save to RTC if available
      }
    } else if (action === 'set_timezone') {
      const { timeZone } = payload;
      if (isLinux && timeZone) {
        try { execSync(`timedatectl set-timezone "${timeZone}"`); } catch(e){}
      }
    }
    res.json({ success: true, message: 'Time configuration updated' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to apply time configuration', details: error.message });
  }
});

// Edge Computing JSON Storage API
app.get('/api/edge/:type', (req, res) => {
  const type = req.params.type;
  const filePath = path.join(__dirname, '..', 'config_data', `${type}.json`);
  if (fs.existsSync(filePath)) {
    try {
      res.json(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
    } catch (e) { res.json({ slaves: [], points: [] }); }
  } else {
    res.json({ slaves: [], points: [] });
  }
});

app.post('/api/edge/:type', (req, res) => {
  const type = req.params.type;
  const filePath = path.join(__dirname, '..', 'config_data', `${type}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Configuration saved' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to save configuration' });
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
    cpuUsage: Math.floor(Math.random() * 20) + 5, // TODO: calculate real usage
    totalMem: totalMem,
    usedMem: usedMem,
    memUsagePct: Math.round((usedMem / totalMem) * 100)
  });
});

// System Management API (Reboot)
app.post('/api/system/reboot', (req, res) => {
  try {
    if (isLinux) {
      console.log("Rebooting system...");
      execSync('reboot');
    }
    res.json({ success: true, message: 'System is rebooting...' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reboot system', details: error.message });
  }
});

// System Management API (Schedule Reboot via cron)
app.get('/api/system/schedule-reboot', (req, res) => {
  let enabled = false;
  let time = '04:00';
  try {
    if (isLinux) {
      const crontab = execSync('crontab -l 2>/dev/null || echo ""').toString();
      const match = crontab.match(/# SCADA_REBOOT\n(\d+) (\d+) \* \* \* \/sbin\/reboot/);
      if (match) {
        enabled = true;
        time = `${match[2].padStart(2,'0')}:${match[1].padStart(2,'0')}`;
      }
    } else {
      const cfgPath = path.join(__dirname, '..', 'config_data', 'schedule_reboot.json');
      if (fs.existsSync(cfgPath)) { const d = JSON.parse(fs.readFileSync(cfgPath)); enabled = d.enabled; time = d.time; }
    }
  } catch(e) {}
  res.json({ enabled, time });
});

app.post('/api/system/schedule-reboot', (req, res) => {
  const { enabled, time } = req.body;
  try {
    if (isLinux) {
      let crontab = '';
      try { crontab = execSync('crontab -l 2>/dev/null || echo ""').toString(); } catch(e) {}
      // Remove old SCADA_REBOOT lines
      crontab = crontab.split('\n').filter(l => !l.includes('# SCADA_REBOOT') && !l.match(/\d+ \d+ \* \* \* \/sbin\/reboot/)).join('\n');
      if (enabled && time) {
        const [hh, mm] = time.split(':');
        crontab += `\n# SCADA_REBOOT\n${mm} ${hh} * * * /sbin/reboot\n`;
      }
      const tmpFile = '/tmp/scada_cron';
      fs.writeFileSync(tmpFile, crontab.trim() + '\n');
      execSync(`crontab ${tmpFile}`);
      fs.unlinkSync(tmpFile);
    } else {
      const cfgPath = path.join(__dirname, '..', 'config_data', 'schedule_reboot.json');
      fs.writeFileSync(cfgPath, JSON.stringify({ enabled, time }, null, 2));
    }
    res.json({ success: true, message: 'Schedule reboot updated' });
  } catch(error) {
    res.status(500).json({ error: 'Failed to update schedule', details: error.message });
  }
});

// System Config Export (all config_data JSON files in a zip-like tar)
app.get('/api/system/config/export', (req, res) => {
  const configDir = path.join(__dirname, '..', 'config_data');
  const outFile = path.join(__dirname, '..', 'config_data', `scada_config_backup_${Date.now()}.tar.gz`);
  try {
    if (isLinux) {
      execSync(`tar -czf "${outFile}" -C "${path.dirname(configDir)}" config_data --exclude="*.tar.gz"`);
    } else {
      // On Windows dev: bundle all JSON files into a single JSON
      const files = fs.readdirSync(configDir).filter(f => f.endsWith('.json'));
      const bundle = {};
      files.forEach(f => {
        try { bundle[f] = JSON.parse(fs.readFileSync(path.join(configDir, f), 'utf-8')); } catch(e) {}
      });
      const devOut = outFile.replace('.tar.gz', '.json');
      fs.writeFileSync(devOut, JSON.stringify(bundle, null, 2));
      return res.download(devOut, 'scada_config_backup.json', () => { try { fs.unlinkSync(devOut); } catch(e) {} });
    }
    res.download(outFile, 'scada_config_backup.tar.gz', () => { try { fs.unlinkSync(outFile); } catch(e) {} });
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Export failed', details: error.message });
  }
});

// System Config Import (multipart upload)
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '..', 'config_data', 'tmp_uploads') });

app.post('/api/system/config/import', upload.single('config_file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const configDir = path.join(__dirname, '..', 'config_data');
  const uploadedPath = req.file.path;
  try {
    if (isLinux && req.file.originalname.endsWith('.tar.gz')) {
      execSync(`tar -xzf "${uploadedPath}" -C "${path.dirname(configDir)}"`);
    } else {
      // JSON bundle import (dev mode or if JSON file sent)
      const bundle = JSON.parse(fs.readFileSync(uploadedPath, 'utf-8'));
      Object.entries(bundle).forEach(([filename, data]) => {
        if (filename.endsWith('.json')) {
          fs.writeFileSync(path.join(configDir, filename), JSON.stringify(data, null, 2));
        }
      });
    }
    fs.unlinkSync(uploadedPath);
    res.json({ success: true, message: 'Configuration imported successfully. Please reboot for changes to take effect.' });
  } catch(error) {
    console.error(error);
    try { fs.unlinkSync(uploadedPath); } catch(e) {}
    res.status(500).json({ error: 'Import failed', details: error.message });
  }
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
