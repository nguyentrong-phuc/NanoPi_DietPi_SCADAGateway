import React, { useState } from 'react';

const Diagnostics = () => {
  const [activeTab, setActiveTab] = useState('Ping');

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Diagnostics
      </h2>

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

      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Medicng Result</span>
        </div>
        <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', minHeight: '300px', borderRadius: '4px', padding: '15px' }}>
          {/* Results will appear here */}
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
