// backend/engines/NorthboundSlave.js
const fs = require('fs');
const path = require('path');
const ModbusRTU = require('modbus-serial');
const LiveDatabase = require('./LiveDatabase');

const TCP_FILE = path.join(__dirname, '..', 'modbus_tcp.json');

class NorthboundSlave {
  constructor() {
    this.serverTCP = null;
    this.nodes = [];
  }

  loadConfig() {
    if (fs.existsSync(TCP_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(TCP_FILE, 'utf-8'));
        this.nodes = data.nodes || [];
      } catch (e) {
        console.error('NorthboundSlave: Error reading modbus_tcp.json', e);
      }
    }
  }

  start() {
    this.loadConfig();
    
    // Create vector mapped to our database
    const vector = {
      getHoldingRegister: (addr, unitID) => {
        // Find mapped node by address
        const node = this.nodes.find(n => parseInt(n.addr, 10) === addr);
        if (node) {
          // Attempt to fetch from LiveDatabase using src as key
          // In a real scenario, 'src' would be precisely mapped to slaveId_pointId
          const val = LiveDatabase.getPointValue(node.src);
          return isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10);
        }
        return 0; // Default
      },
      getInputRegister: (addr, unitID) => {
        return addr;
      },
      getCoil: (addr, unitID) => {
        return false;
      },
      setRegister: (addr, value, unitID) => {
        console.log(`[Northbound] Set register ${addr} to ${value}`);
      },
      setCoil: (addr, value, unitID) => {
        console.log(`[Northbound] Set coil ${addr} to ${value}`);
      }
    };

    console.log('[Northbound] Starting Modbus TCP Slave Server on port 502...');
    try {
      this.serverTCP = new ModbusRTU.ServerTCP(vector, { host: '0.0.0.0', port: 502, debug: false, unitID: 1 });
    } catch (e) {
      console.log('[Northbound] Port 502 in use or requires root, trying port 5020...');
      try {
        this.serverTCP = new ModbusRTU.ServerTCP(vector, { host: '0.0.0.0', port: 5020, debug: false, unitID: 1 });
      } catch(err) {
        console.error('[Northbound] Failed to start TCP slave:', err.message);
      }
    }
  }

  stop() {
    if (this.serverTCP) {
      this.serverTCP.close();
    }
  }
}

module.exports = new NorthboundSlave();
