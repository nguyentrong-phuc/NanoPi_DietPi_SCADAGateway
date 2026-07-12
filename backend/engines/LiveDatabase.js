// backend/engines/LiveDatabase.js
// In-memory store for live polling data

class LiveDatabase {
  constructor() {
    this.pointValues = {}; // { pointId: value }
    this.slaveStatus = {}; // { slaveId: statusString } e.g. 'Connected' or 'Disconnected'
  }

  setPointValue(pointId, value) {
    this.pointValues[pointId] = value;
  }

  getPointValue(pointId) {
    return this.pointValues[pointId] !== undefined ? this.pointValues[pointId] : '--';
  }

  setSlaveStatus(slaveId, status) {
    this.slaveStatus[slaveId] = status;
  }

  getSlaveStatus(slaveId) {
    return this.slaveStatus[slaveId] || '--';
  }
}

module.exports = new LiveDatabase();
