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
            const addr = parseInt(pt.address, 10);
            if (!isNaN(addr)) {
               let offset = addr;
               if (addr >= 40001) offset = addr - 40001;
               
               let count = 1;
               if (pt.type && pt.type.includes('64 Bit')) count = 4;
               else if (pt.type && pt.type.includes('32 Bit')) count = 2;

               const res = await client.readHoldingRegisters(offset, count);
               
               // Parse data based on type
               let finalValue = 0;
               if (res.data && res.data.length > 0) {
                 const buffer = Buffer.alloc(res.data.length * 2);
                 for (let i = 0; i < res.data.length; i++) {
                   buffer.writeUInt16BE(res.data[i], i * 2);
                 }
                 
                 const type = pt.type || '16 Bit Unsigned';
                 if (type.includes('CDAB')) {
                   for (let i = 0; i < buffer.length; i += 4) {
                     if (i + 4 <= buffer.length) {
                       const temp = Buffer.from(buffer.subarray(i, i + 2));
                       buffer.subarray(i + 2, i + 4).copy(buffer, i);
                       temp.copy(buffer, i + 2);
                     }
                   }
                 } else if (type.includes('BADC')) {
                   for (let i = 0; i < buffer.length; i += 2) {
                     const b0 = buffer[i];
                     buffer[i] = buffer[i + 1];
                     buffer[i + 1] = b0;
                   }
                 } else if (type.includes('DCBA')) {
                   buffer.reverse();
                 }

                 try {
                   if (type.includes('16 Bit Signed')) finalValue = buffer.readInt16BE(0);
                   else if (type.includes('16 Bit Unsigned') || type === 'Bit') finalValue = buffer.readUInt16BE(0);
                   else if (type.includes('32 Bit Signed')) finalValue = buffer.readInt32BE(0);
                   else if (type.includes('32 Bit Unsigned')) finalValue = buffer.readUInt32BE(0);
                   else if (type.includes('32 Bit Float')) finalValue = buffer.readFloatBE(0);
                   else if (type.includes('64 Bit Float')) finalValue = buffer.readDoubleBE(0);
                   else if (type.includes('64 Bit Signed')) finalValue = Number(buffer.readBigInt64BE(0));
                   else if (type.includes('64 Bit Unsigned')) finalValue = Number(buffer.readBigUInt64BE(0));
                   else finalValue = buffer.readUInt16BE(0);
                 } catch(e) { finalValue = 0; }
               }
               
               // Format float precision if needed
               if (pt.type && pt.type.includes('Float')) {
                  finalValue = parseFloat(finalValue.toFixed(4));
               }

               LiveDatabase.setPointValue(`${slave.id}_${pt.id}`, finalValue);
            }
          } catch (err) {
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
