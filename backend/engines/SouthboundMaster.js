// backend/engines/SouthboundMaster.js
const fs = require('fs');
const path = require('path');
const ModbusRTU = require('modbus-serial');
const LiveDatabase = require('./LiveDatabase');

const DATA_POINTS_FILE = path.join(__dirname, '..', 'data-points.json');

const getRegisterCount = (type) => {
  if (!type) return 1;
  if (type.includes('64 Bit')) return 4;
  if (type.includes('32 Bit')) return 2;
  return 1;
};

const parseModbusBuffer = (buffer, type) => {
  let finalValue = 0;
  type = type || '16 Bit Unsigned';
  
  // Clone buffer to avoid mutating the original block buffer
  const buf = Buffer.from(buffer);
  
  if (type.includes('CDAB')) {
    for (let i = 0; i < buf.length; i += 4) {
      if (i + 4 <= buf.length) {
        const temp = Buffer.from(buf.subarray(i, i + 2));
        buf.subarray(i + 2, i + 4).copy(buf, i);
        temp.copy(buf, i + 2);
      }
    }
  } else if (type.includes('BADC')) {
    for (let i = 0; i < buf.length; i += 2) {
      const b0 = buf[i];
      buf[i] = buf[i + 1];
      buf[i + 1] = b0;
    }
  } else if (type.includes('DCBA')) {
    buf.reverse();
  }

  try {
    if (type.includes('16 Bit Signed')) finalValue = buf.readInt16BE(0);
    else if (type.includes('16 Bit Unsigned') || type === 'Bit') finalValue = buf.readUInt16BE(0);
    else if (type.includes('32 Bit Signed')) finalValue = buf.readInt32BE(0);
    else if (type.includes('32 Bit Unsigned')) finalValue = buf.readUInt32BE(0);
    else if (type.includes('32 Bit Float')) finalValue = buf.readFloatBE(0);
    else if (type.includes('64 Bit Float')) finalValue = buf.readDoubleBE(0);
    else if (type.includes('64 Bit Signed')) finalValue = Number(buf.readBigInt64BE(0));
    else if (type.includes('64 Bit Unsigned')) finalValue = Number(buf.readBigUInt64BE(0));
    else finalValue = buf.readUInt16BE(0);
  } catch(e) { finalValue = 0; }
  
  if (type.includes('Float')) {
    finalValue = parseFloat(finalValue.toFixed(4));
  }
  return finalValue;
};

const buildPollingGroups = (points, maxGap = 5, maxLength = 120) => {
  const validPoints = points.map(pt => {
    const addr = parseInt(pt.address, 10);
    if (isNaN(addr)) return null;
    let offset = addr;
    if (addr >= 40001) offset = addr - 40001;
    else if (addr >= 30001) offset = addr - 30001;
    const count = getRegisterCount(pt.type);
    return { ...pt, offset, count };
  }).filter(p => p !== null).sort((a, b) => a.offset - b.offset);

  if (validPoints.length === 0) return [];

  const groups = [];
  let currentGroup = {
    startOffset: validPoints[0].offset,
    endOffset: validPoints[0].offset + validPoints[0].count,
    points: [validPoints[0]]
  };

  for (let i = 1; i < validPoints.length; i++) {
    const pt = validPoints[i];
    const gap = pt.offset - currentGroup.endOffset;
    const newEndOffset = Math.max(currentGroup.endOffset, pt.offset + pt.count);
    const newLength = newEndOffset - currentGroup.startOffset;

    if (gap <= maxGap && newLength <= maxLength) {
      currentGroup.endOffset = newEndOffset;
      currentGroup.points.push(pt);
    } else {
      currentGroup.totalRegisters = currentGroup.endOffset - currentGroup.startOffset;
      groups.push(currentGroup);
      currentGroup = {
        startOffset: pt.offset,
        endOffset: pt.offset + pt.count,
        points: [pt]
      };
    }
  }
  currentGroup.totalRegisters = currentGroup.endOffset - currentGroup.startOffset;
  groups.push(currentGroup);

  return groups;
};

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
      const isMerge = slave.merge === 'Open' || slave.merge === true;
      const pollingGroups = isMerge ? buildPollingGroups(slavePoints) : [];
      
      this.intervals[slave.id] = setInterval(async () => {
        if (!client.isOpen) return;

        if (isMerge && pollingGroups.length > 0) {
          // Block Polling (Merge Acquisition)
          for (const group of pollingGroups) {
            try {
              const res = await client.readHoldingRegisters(group.startOffset, group.totalRegisters);
              if (res.data && res.data.length === group.totalRegisters) {
                const groupBuffer = Buffer.alloc(res.data.length * 2);
                for (let i = 0; i < res.data.length; i++) {
                  groupBuffer.writeUInt16BE(res.data[i], i * 2);
                }
                
                for (const pt of group.points) {
                  const relativeOffset = pt.offset - group.startOffset;
                  const ptBuffer = groupBuffer.subarray(relativeOffset * 2, (relativeOffset + pt.count) * 2);
                  const finalValue = parseModbusBuffer(ptBuffer, pt.type);
                  LiveDatabase.setPointValue(`${slave.id}_${pt.id}`, finalValue);
                }
              }
            } catch (err) {
              // Ignore or log error
            }
          }
        } else {
          // Individual Polling
          for (const pt of slavePoints) {
            try {
              const addr = parseInt(pt.address, 10);
              if (!isNaN(addr)) {
                 let offset = addr;
                 if (addr >= 40001) offset = addr - 40001;
                 const count = getRegisterCount(pt.type);
                 const res = await client.readHoldingRegisters(offset, count);
                 if (res.data && res.data.length === count) {
                   const ptBuffer = Buffer.alloc(res.data.length * 2);
                   for (let i = 0; i < res.data.length; i++) {
                     ptBuffer.writeUInt16BE(res.data[i], i * 2);
                   }
                   const finalValue = parseModbusBuffer(ptBuffer, pt.type);
                   LiveDatabase.setPointValue(`${slave.id}_${pt.id}`, finalValue);
                 }
              }
            } catch (err) {}
          }
        }
      }, parseInt(slave.interval, 10) || 5000);
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
