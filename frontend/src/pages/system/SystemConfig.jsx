import React from 'react';

const SystemConfig = () => {
  const API_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';

  const handleExport = (type) => {
    window.location.href = `${API_URL}/api/system/export/${type}`;
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Configuration Management
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>System Config</span>
        </div>
        
        <div style={{ paddingLeft: '20px', maxWidth: '600px' }}>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Export:</span>
            <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }} onClick={() => handleExport('system')}>Export Config</button>
          </div>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Import:</span>
            <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }}>Import Config</button>
          </div>
          <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Restore Factory:</span>
            <button style={{ backgroundColor: '#e71562', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }}>Restore Factory</button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eaedf2', paddingTop: '30px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Edge Computing Config</span>
          </div>

          <div style={{ paddingLeft: '20px', maxWidth: '600px' }}>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Export:</span>
              <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }} onClick={() => handleExport('edge')}>Export Config</button>
            </div>
            <div style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Import:</span>
              <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }}>Import Config</button>
            </div>
            <div style={{ paddingLeft: '150px', color: '#999', fontSize: '12px', lineHeight: 1.5, marginTop: '10px' }}>
              Note: The export point table will synchronously export the data point table, protocol conversion data point table, linkage control event table, and data reporting group table, and will be updated synchronously after importing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;
