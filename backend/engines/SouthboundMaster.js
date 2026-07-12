// backend/engines/SouthboundMaster.js
const fs = require('fs');
const path = require('path');
const ModbusRTU = require('modbus-serial');
const LiveDatabase = require('./LiveDatabase');

const DATA_POINTS_FILE = path.join(__dirname, '..', 'data-points.json');

class SouthboundMaster {
  constructor() {
    this.slaves = [];
    this.points = {};
    this.clients = {}; // { slaveId: ModbusRTU instance }
    this.intervals = {};
  }

  loadConfig() {
    if (fs.existsSync(DATA_POINTS_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(DATA_POINTS_FILE, 'utf-8'));
        this.slaves = data.slaves ? data.slaves.filter(s => s.isCustom) : [];
        this.points = data.points || {};
      } catch (e) {
        console.error('SouthboundMaster: Error reading data-points.json', e);
      }
    }
  }

  async start() {
    this.loadConfig();
    console.log(`[Southbound] Starting polling for ${this.slaves.length} slaves...`);

    for (const slave of this.slaves) {
      this.startPolling(slave);
    }
  }

  async startPolling(slave) {
    const client = new ModbusRTU();
    let connected = false;

    try {
      if (slave.protocol === 'Modbus_TCP') {
        client.setTimeout(2000);
        await client.connectTCP(slave.ip, { port: parseInt(slave.port, 10) || 502 });
        connected = true;
      } else if (slave.protocol === 'Modbus_RTU') {
        client.setTimeout(2000);
        await client.connectRTUBuffered(slave.portName || '/dev/ttyS1', { baudRate: parseInt(slave.baudRate, 10) || 9600 });
        connected = true;
      }
    } catch (e) {
      console.error(`[Southbound] Failed to connect to slave ${slave.name} (${slave.protocol}):`, e.message);
    }

    if (connected) {
      console.log(`[Southbound] Connected to slave ${slave.name}`);
      client.setID(parseInt(slave.slaveAddress, 10) || 1);
      this.clients[slave.id] = client;
      LiveDatabase.setSlaveStatus(slave.id, 'Connected');

      // Poll interval
      const slavePoints = this.points[slave.id] || [];
      
      this.intervals[slave.id] = setInterval(async () => {
        if (!client.isOpen) return;

        for (const pt of slavePoints) {
          try {
            // Simplified polling logic
            const addr = parseInt(pt.address, 10);
            if (!isNaN(addr)) {
               // Assuming holding registers (4xxxx). Offset = address - 40001
               let offset = addr;
               if (addr >= 40001) offset = addr - 40001;

               const res = await client.readHoldingRegisters(offset, 1);
               // Store as slaveId_pointId
               LiveDatabase.setPointValue(`${slave.id}_${pt.id}`, res.data[0]);
            }
          } catch (err) {
            // Just log locally
            // console.error(`[Southbound] Polling error for slave ${slave.name}:`, err.message);
          }
        }
      }, 5000);
    } else {
      LiveDatabase.setSlaveStatus(slave.id, 'Disconnected');
    }
  }

  stop() {
    for (const id in this.intervals) {
      clearInterval(this.intervals[id]);
    }
    for (const id in this.clients) {
      if (this.clients[id].isOpen) this.clients[id].close();
    }
  }
}

module.exports = new SouthboundMaster();
