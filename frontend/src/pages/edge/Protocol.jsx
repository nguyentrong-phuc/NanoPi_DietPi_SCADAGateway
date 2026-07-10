import React, { useState } from 'react';

const Protocol = () => {
  const [activeProtocol, setActiveProtocol] = useState('Modbus TCP');
  const [enabled, setEnabled] = useState(true);

  // Mock data from previous implementation
  const [nodes, setNodes] = useState([
    { id: 1, name: 'Temperature Sensor 1', type: 'Holding Register', address: '40001', value: '25.5' },
    { id: 2, name: 'Pressure Valve A', type: 'Coil', address: '00001', value: 'ON' }
  ]);

  const renderContent = () => {
    if (!enabled) {
      return (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}>📦</div>
          <h3 style={{ color: '#333' }}>Function Close</h3>
          <button className="btn" style={{ color: 'var(--primary-color)', background: 'none', textDecoration: 'underline' }} onClick={() => setEnabled(true)}>Open</button>
        </div>
      );
    }

    if (activeProtocol === 'Modbus TCP' || activeProtocol === 'IEC104') {
      return (
        <div style={{ marginTop: '20px' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '15px' }}>
             <h4>{activeProtocol} Node Mapping</h4>
             <button className="btn btn-primary" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>+ Add Node</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', border: '1px solid var(--border-color)' }}>
            <thead style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Node Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Register Type</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Current Value</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map(node => (
                <tr key={node.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px' }}>{node.id}</td>
                  <td style={{ padding: '12px' }}>{node.name}</td>
                  <td style={{ padding: '12px' }}>{node.type}</td>
                  <td style={{ padding: '12px' }}>{node.address}</td>
                  <td style={{ padding: '12px' }}>{node.value}</td>
                  <td style={{ padding: '12px' }}>
                    <button className="btn" style={{ padding: '4px 8px', fontSize: '12px', color: 'var(--danger-color)' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-primary" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>Apply Configuration</button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
        Configuration for {activeProtocol} is not implemented yet.
      </div>
    );
  };

  return (
    <div className="fade-in flex">
      {/* Protocol Inner Sidebar */}
      <div style={{ width: '200px', borderRight: '1px solid var(--border-color)', paddingRight: '15px', marginRight: '20px' }}>
        {['Modbus RTU', 'Modbus TCP', 'OPC UA', 'Json', 'BACnet', 'IEC104', 'IEC61850', 'HJ212', 'DNP3', 'SNMP'].map(proto => (
          <div 
            key={proto}
            onClick={() => setActiveProtocol(proto)}
            style={{
              padding: '10px 15px',
              cursor: 'pointer',
              color: activeProtocol === proto ? 'var(--primary-color)' : 'var(--text-dark)',
              backgroundColor: activeProtocol === proto ? '#fff3ed' : 'transparent',
              borderLeft: activeProtocol === proto ? '3px solid var(--primary-color)' : '3px solid transparent',
              marginBottom: '5px'
            }}
          >
            {proto}
          </div>
        ))}
      </div>
      
      {/* Protocol Content */}
      <div style={{ flex: 1 }}>
        <h2 style={{ padding: '0 0 15px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>Protocol</h2>
        
        <div className="w-card">
          <div className="w-card-header">
            <span className="w-card-title flex items-center">
              {activeProtocol} 
              <label className="toggle-switch" style={{ marginLeft: '15px' }}>
                <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
                <span className="toggle-slider"></span>
              </label>
            </span>
          </div>
          <div className="w-card-body">
             {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protocol;
