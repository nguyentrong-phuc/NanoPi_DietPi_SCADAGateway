import React, { useState } from 'react';

const EthernetPort = () => {
  const [port1Mode, setPort1Mode] = useState('WAN');
  const [port2Mode, setPort2Mode] = useState('LAN');

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Ethernet Port
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {/* Port 1 */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Ethernet Port 1</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Work Mode</span>
            <span style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '4px 12px', fontSize: '12px', borderRadius: '2px' }}>{port1Mode}</span>
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
            <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
               ⇌ Changed to LAN
            </span>
          </div>
        </div>

        {/* Port 2 */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Ethernet Port 2</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Work Mode</span>
            <span style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '4px 12px', fontSize: '12px', borderRadius: '2px' }}>{port2Mode}</span>
          </div>
        </div>
      </div>

      <button className="btn btn-primary" style={{ backgroundColor: '#e0e0e0', color: '#999', cursor: 'not-allowed', border: 'none' }}>apply</button>
    </div>
  );
};

export default EthernetPort;
