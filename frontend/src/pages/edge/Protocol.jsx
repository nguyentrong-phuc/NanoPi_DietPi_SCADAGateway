import React, { useState } from 'react';

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div 
      onClick={handleToggle}
      style={{
        width: '40px', height: '20px', backgroundColor: isOn ? 'var(--primary-color)' : '#dcdfe6',
        borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
      }}
    >
      <div 
        style={{
          width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%',
          position: 'absolute', top: '2px', left: isOn ? '22px' : '2px', transition: 'all 0.3s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}
      />
    </div>
  );
};

const Protocol = () => {
  const [activeTab, setActiveTab] = useState('Modbus RTU');
  // Initially all protocols are "Closed" (false)
  const [protocolState, setProtocolState] = useState({
    'Modbus RTU': false,
    'Modbus TCP': false,
    'IEC104': false
  });

  const tabs = ['Modbus RTU', 'Modbus TCP', 'IEC104'];

  const toggleProtocol = () => {
    setProtocolState({
      ...protocolState,
      [activeTab]: !protocolState[activeTab]
    });
  };

  const isOpen = protocolState[activeTab];

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: '#eaedf2', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Protocol
        </h2>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left Sidebar for protocols */}
        <div style={{ width: '180px', backgroundColor: 'white', borderRight: '8px solid #eaedf2' }}>
          {tabs.map(tab => (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '15px 20px', 
                cursor: 'pointer', 
                backgroundColor: activeTab === tab ? 'var(--primary-light, #f0f4f8)' : 'white', 
                color: activeTab === tab ? 'var(--primary-color)' : '#555', 
                fontWeight: activeTab === tab ? 600 : 400, 
                fontSize: '14px',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333', marginRight: '20px' }}>{activeTab}</span>
            <ToggleSwitch isOn={isOpen} handleToggle={toggleProtocol} />
          </div>
          
          <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Apply button */}
            <div>
              <button style={{ backgroundColor: '#e0e0e0', color: '#fff', border: 'none', padding: '8px 30px', borderRadius: '2px', cursor: 'not-allowed', fontSize: '13px', fontWeight: 600 }} disabled>apply</button>
            </div>

            {/* Main view state */}
            {!isOpen ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-100px' }}>
                <h3 style={{ fontSize: '20px', color: '#555', marginBottom: '15px', fontWeight: 600 }}>Function Close</h3>
                <span onClick={toggleProtocol} style={{ color: 'var(--primary-color)', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Open</span>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-100px' }}>
                <h3 style={{ fontSize: '20px', color: '#555', marginBottom: '15px', fontWeight: 600 }}>Function Open</h3>
                <span style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>Configuration options will appear here.</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Protocol;
