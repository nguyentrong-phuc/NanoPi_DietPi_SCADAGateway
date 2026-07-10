import React, { useState } from 'react';

const EthernetPort = () => {
  const [port1Mode, setPort1Mode] = useState('WAN');
  const [port2Mode, setPort2Mode] = useState('LAN');

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: 'white', padding: '12px 20px', fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px', color: '#ccc' }}>&gt;</span> Ethernet Port
      </div>

      {/* Gray Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '12px 20px', borderTop: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#333', margin: 0 }}>
          Ethernet Port
        </h2>
      </div>

      <div style={{ padding: '20px', flex: 1 }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
          {/* Port 1 */}
          <div style={{ flex: '1 1 300px', maxWidth: '400px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'relative', height: '140px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Ethernet Port 1</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>Work Mode</span>
              <span style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '4px 12px', fontSize: '12px', borderRadius: '2px', fontWeight: 600 }}>{port1Mode}</span>
            </div>
            <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
              <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                 ⇌ Changed to LAN
              </span>
            </div>
          </div>

          {/* Port 2 */}
          <div style={{ flex: '1 1 300px', maxWidth: '400px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', height: '140px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Ethernet Port 2</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>Work Mode</span>
              <span style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '4px 12px', fontSize: '12px', borderRadius: '2px', fontWeight: 600 }}>{port2Mode}</span>
            </div>
          </div>
        </div>

        <button style={{ backgroundColor: '#e0e0e0', color: '#999', cursor: 'not-allowed', border: 'none', padding: '8px 24px', borderRadius: '2px', fontWeight: 600, fontSize: '14px' }}>apply</button>
      </div>
    </div>
  );
};

export default EthernetPort;
