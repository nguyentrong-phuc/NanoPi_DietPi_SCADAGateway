import React from 'react';

const SerialPort = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Serial Port
      </h2>

      <div style={{ display: 'flex' }}>
        {/* Sub-sidebar for UART ports */}
        <div style={{ width: '150px', borderRight: '1px solid #e5e7eb', marginRight: '20px' }}>
          <div style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'var(--bg-dark)', color: 'var(--text-dark)', borderRight: '3px solid transparent' }}>UART01</div>
          <div style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#fff3e0', color: 'var(--primary-color)', borderRight: '3px solid var(--primary-color)', fontWeight: 600 }}>UART02</div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Basic settings</span>
          </div>

          <div style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>* Baud Rate:</span>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="9600">
                <option value="9600">9600</option>
                <option value="19200">19200</option>
                <option value="115200">115200</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>* Data Bit:</span>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="8">
                <option value="8">8</option>
                <option value="7">7</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>* Stop Bit:</span>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>* Parity Bit:</span>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="NONE">
                <option value="NONE">NONE</option>
                <option value="EVEN">EVEN</option>
                <option value="ODD">ODD</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', border: '1px solid red', padding: '10px', borderRadius: '4px' }}>
              <span style={{ width: '110px', color: '#666', fontSize: '13px' }}>* Serial Function:</span>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="Uplink">
                <option value="Uplink">Uplink (Master)</option>
                <option value="Downlink">Downlink (Slave)</option>
              </select>
            </div>
            
            <div style={{ marginLeft: '120px' }}>
              <button style={{ backgroundColor: '#e0e0e0', color: '#999', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'not-allowed' }}>apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerialPort;
