import React from 'react';

const SystemConfig = () => {
  const API_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';

  const handleExport = (type) => {
    window.location.href = `${API_URL}/api/system/export/${type}`;
  };

  return (
    <div className="fade-in">
      <div style={{ color: '#999', fontSize: '13px', marginBottom: '20px' }}>
        System Management &gt; System &gt; Configuration Management
      </div>
      <h2 style={{ padding: '0 0 15px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '30px' }}>Configuration Management</h2>
      
      <div style={{ paddingLeft: '20px' }}>
        <h4 style={{ marginBottom: '20px' }}>System Config</h4>
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#666' }}>Export:</span>
          <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => handleExport('system')}>Export Config</button>
        </div>
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#666' }}>Import:</span>
          <button className="btn btn-primary" style={{ width: '200px' }}>Import Config</button>
        </div>
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#666' }}>Restore Factory:</span>
          <button className="btn btn-primary" style={{ width: '200px' }}>Restore Factory</button>
        </div>

        <h4 style={{ marginBottom: '20px' }}>Edge Computing Config</h4>
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#666' }}>Export:</span>
          <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => handleExport('edge')}>Export Config</button>
        </div>
        <div style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#666' }}>Import:</span>
          <button className="btn btn-primary" style={{ width: '200px' }}>Import Config</button>
        </div>
        <div style={{ paddingLeft: '150px', color: '#999', fontSize: '12px', maxWidth: '700px', lineHeight: 1.5 }}>
          Note: The export point table will synchronously export the data point table, protocol conversion data point table, linkage control event table, and data reporting group table, and will be updated synchronously after importing
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;
