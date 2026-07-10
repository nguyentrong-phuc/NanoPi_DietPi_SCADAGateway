import React, { useState } from 'react';

const Diagnostics = () => {
  const [activeTab, setActiveTab] = useState('Ping');

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: 'white', padding: '12px 20px', fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px', color: '#ccc' }}>&gt;</span> Diagnostics
      </div>

      {/* Gray Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '12px 20px', borderTop: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#333', margin: 0 }}>
          Diagnostics
        </h2>
      </div>

      <div style={{ padding: '20px', flex: 1 }}>

      <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: '20px' }}>
        <div 
          onClick={() => setActiveTab('Ping')}
          style={{ padding: '10px 20px', cursor: 'pointer', color: activeTab === 'Ping' ? 'var(--primary-color)' : '#666', borderBottom: activeTab === 'Ping' ? '2px solid var(--primary-color)' : 'none', marginBottom: '-2px', fontWeight: activeTab === 'Ping' ? 600 : 'normal' }}
        >
          Ping
        </div>
        <div 
          onClick={() => setActiveTab('Traceroute')}
          style={{ padding: '10px 20px', cursor: 'pointer', color: activeTab === 'Traceroute' ? 'var(--primary-color)' : '#666', borderBottom: activeTab === 'Traceroute' ? '2px solid var(--primary-color)' : 'none', marginBottom: '-2px', fontWeight: activeTab === 'Traceroute' ? 600 : 'normal' }}
        >
          Traceroute
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input type="text" placeholder="Please enter IP or Domain" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
      </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Medicng Result</span>
        </div>
        <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', minHeight: '300px', borderRadius: '4px', padding: '15px' }}>
          {/* Results will appear here */}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Diagnostics;
