import React, { useState } from 'react';

const Diagnostics = () => {
  const [activeTab, setActiveTab] = useState('Ping');

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Diagnostics
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>

        <div>
          <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: '20px' }}>
            <div 
              onClick={() => setActiveTab('Ping')}
              style={{ padding: '10px 20px', cursor: 'pointer', color: activeTab === 'Ping' ? '#f39c12' : '#666', borderBottom: activeTab === 'Ping' ? '2px solid #f39c12' : 'none', marginBottom: '-2px', fontWeight: activeTab === 'Ping' ? 600 : 'normal' }}
            >
              Ping
            </div>
            <div 
              onClick={() => setActiveTab('Traceroute')}
              style={{ padding: '10px 20px', cursor: 'pointer', color: activeTab === 'Traceroute' ? '#f39c12' : '#666', borderBottom: activeTab === 'Traceroute' ? '2px solid #f39c12' : 'none', marginBottom: '-2px', fontWeight: activeTab === 'Traceroute' ? 600 : 'normal' }}
            >
              Traceroute
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <input type="text" placeholder="Please enter IP or Domain" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', maxWidth: '400px' }} />
            <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px 30px', borderRadius: '2px', cursor: 'pointer', fontWeight: 600 }}>Send</button>
          </div>
        </div>

        {/* Thick Gray Divider */}
        <div style={{ height: '15px', backgroundColor: '#eaedf2', margin: '0 -20px 20px -20px' }}></div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#f39c12', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Medicng Result</span>
          </div>
          <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e0e0e0', minHeight: '300px', borderRadius: '4px', padding: '15px' }}>
            {/* Results will appear here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
