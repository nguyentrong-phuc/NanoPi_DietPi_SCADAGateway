import React from 'react';

const SerialPort = () => {
  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Serial Port</h2>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sub-sidebar for UART ports */}
        <div style={{ width: '180px', backgroundColor: 'white', borderRight: '8px solid var(--bg-dark)' }}>
          <div style={{ padding: '15px 20px', cursor: 'pointer', backgroundColor: 'white', color: '#555', fontSize: '14px', textAlign: 'center' }}>UART01</div>
          <div style={{ padding: '15px 20px', cursor: 'pointer', backgroundColor: 'var(--primary-light, #f0f4f8)', color: 'var(--primary-color)', fontWeight: 600, fontSize: '14px', textAlign: 'center' }}>UART02</div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <div className="card-panel" style={{ padding: '20px' }}>
            <div className="card-header" style={{ marginBottom: '20px' }}>
              <span className="card-header-line"></span>
              <span className="card-title">Basic settings</span>
            </div>

            <div style={{ maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '140px' }}>Baud Rate:</span>
                <select className="form-input-standard" style={{ flex: 1 }} defaultValue="9600">
                  <option value="9600">9600</option>
                  <option value="19200">19200</option>
                  <option value="115200">115200</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '140px' }}>Data Bit:</span>
                <select className="form-input-standard" style={{ flex: 1 }} defaultValue="8">
                  <option value="8">8</option>
                  <option value="7">7</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '140px' }}>Stop Bit:</span>
                <select className="form-input-standard" style={{ flex: 1 }} defaultValue="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '140px' }}>Parity Bit:</span>
                <select className="form-input-standard" style={{ flex: 1 }} defaultValue="NONE">
                  <option value="NONE">NONE</option>
                  <option value="EVEN">EVEN</option>
                  <option value="ODD">ODD</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', border: '1px solid var(--danger-color)', padding: '10px', borderRadius: '4px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '130px', margin: 0 }}>Serial Function:</span>
                <select className="form-input-standard" style={{ flex: 1 }} defaultValue="Uplink">
                  <option value="Uplink">Uplink (Master)</option>
                  <option value="Downlink">Downlink (Slave)</option>
                </select>
              </div>
              
              <div style={{ marginLeft: '140px' }}>
                <button className="btn btn-primary" disabled>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerialPort;
