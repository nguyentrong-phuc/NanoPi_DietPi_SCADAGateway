import React, { useState } from 'react';

const Protocol = () => {
  const [activeTab, setActiveTab] = useState('Modbus RTU');
  const [initialConfig, setInitialConfig] = useState({
    protocol: 'TCP Server',
    localPort: '502',
    slaveAddress: '5',
    floatOrder: 'AB CD',
    intOrder: 'AB CD'
  });
  const [config, setConfig] = useState(initialConfig);
  const hasChanges = JSON.stringify(config) !== JSON.stringify(initialConfig);

  const handleApply = () => {
    setInitialConfig(config);
    alert('Applied Protocol configuration!');
  };

  const handleChange = (e, field) => {
    setConfig({ ...config, [field]: e.target.value });
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Protocol
        </h2>
      </div>

      <div style={{ padding: '20px', display: 'flex', flex: 1 }}>
        {/* Sub-sidebar for protocols */}
        <div style={{ width: '150px', borderRight: '1px solid #eaedf2', marginRight: '20px' }}>
          <div 
            onClick={() => setActiveTab('Modbus RTU')}
            style={{ padding: '10px', cursor: 'pointer', backgroundColor: activeTab === 'Modbus RTU' ? '#eaedf2' : 'white', color: activeTab === 'Modbus RTU' ? '#003fb4' : '#333', borderRight: activeTab === 'Modbus RTU' ? '3px solid #003fb4' : '3px solid transparent', fontWeight: activeTab === 'Modbus RTU' ? 600 : 'normal', fontSize: '13px' }}
          >
            Modbus RTU
          </div>
          <div 
            onClick={() => setActiveTab('Modbus TCP')}
            style={{ padding: '10px', cursor: 'pointer', backgroundColor: activeTab === 'Modbus TCP' ? '#eaedf2' : 'white', color: activeTab === 'Modbus TCP' ? '#003fb4' : '#333', borderRight: activeTab === 'Modbus TCP' ? '3px solid #003fb4' : '3px solid transparent', fontWeight: activeTab === 'Modbus TCP' ? 600 : 'normal', fontSize: '13px' }}
          >
            Modbus TCP
          </div>
          <div 
            onClick={() => setActiveTab('OPC UA')}
            style={{ padding: '10px', cursor: 'pointer', backgroundColor: activeTab === 'OPC UA' ? '#eaedf2' : 'white', color: activeTab === 'OPC UA' ? '#003fb4' : '#333', borderRight: activeTab === 'OPC UA' ? '3px solid #003fb4' : '3px solid transparent', fontWeight: activeTab === 'OPC UA' ? 600 : 'normal', fontSize: '13px' }}
          >
            OPC UA
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, backgroundColor: 'white' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eaedf2', paddingBottom: '15px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', flex: 1, color: '#333' }}>{activeTab}</span>
            <div style={{ width: '36px', height: '18px', backgroundColor: '#003fb4', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
            </div>
          </div>

          <div style={{ color: '#333', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>Basic settings</div>
          
          <div style={{ maxWidth: '600px', border: '1px solid #eaedf2', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '150px', color: '#333', fontSize: '13px' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Protocol:</span>
              <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} value={config.protocol} onChange={(e) => handleChange(e, 'protocol')}>
                <option value="TCP Server">TCP Server</option>
                <option value="TCP Client">TCP Client</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '150px', color: '#333', fontSize: '13px' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Local Port:</span>
              <input type="text" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} value={config.localPort} onChange={(e) => handleChange(e, 'localPort')} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '150px', color: '#333', fontSize: '13px' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Slave Address:</span>
              <input type="text" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} value={config.slaveAddress} onChange={(e) => handleChange(e, 'slaveAddress')} />
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', color: '#333', fontSize: '13px' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>32 bit float order:</span>
                <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} value={config.floatOrder} onChange={(e) => handleChange(e, 'floatOrder')}>
                  <option value="AB CD">AB CD</option>
                  <option value="CD AB">CD AB</option>
                </select>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', color: '#333', fontSize: '13px' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>32 bit int order:</span>
                <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} value={config.intOrder} onChange={(e) => handleChange(e, 'intOrder')}>
                  <option value="AB CD">AB CD</option>
                  <option value="CD AB">CD AB</option>
                </select>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '40px' }}>
            <button 
              disabled={!hasChanges}
              onClick={handleApply}
              style={{ backgroundColor: hasChanges ? '#003fb4' : '#e0e0e0', color: hasChanges ? 'white' : '#999', cursor: hasChanges ? 'pointer' : 'not-allowed', border: 'none', padding: '8px 30px', borderRadius: '2px', fontWeight: 600, fontSize: '14px' }}>
              apply
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eaedf2', paddingBottom: '15px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Node mapping table</span>
            </div>
            <div>
              <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', marginRight: '10px', fontWeight: 600, fontSize: '13px' }}>Add</button>
              <button style={{ backgroundColor: '#e71562', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Delete</button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eaedf2', color: '#333', fontWeight: 700 }}>
                  <th style={{ padding: '12px 15px', border: 'none', width: '50px' }}><input type="checkbox" style={{ margin: 0, verticalAlign: 'middle' }} /></th>
                  <th style={{ padding: '12px 15px', border: 'none' }}>ID</th>
                  <th style={{ padding: '12px 15px', border: 'none' }}>Position Name</th>
                  <th style={{ padding: '12px 15px', border: 'none' }}>Source(slave)</th>
                  <th style={{ padding: '12px 15px', border: 'none' }}>Data Type</th>
                  <th style={{ padding: '12px 15px', border: 'none' }}>Mapping Address</th>
                  <th style={{ padding: '12px 15px', border: 'none' }}>Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" style={{ padding: '30px', color: '#999' }}>No data yet</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Protocol;
