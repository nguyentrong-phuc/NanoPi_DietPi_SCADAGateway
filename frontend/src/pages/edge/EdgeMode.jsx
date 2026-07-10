import React, { useState } from 'react';

const EdgeMode = () => {
  const [mode, setMode] = useState('Graphical Programming');

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Edge Mode
      </h2>

      <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '20px', borderRadius: '4px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ width: '150px', color: '#666', fontSize: '14px' }}>Edge Computing:</span>
          <select 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
            style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="Edge Gateway">Edge Gateway</option>
            <option value="Graphical Programming">Graphical Programming</option>
          </select>
        </div>

        {mode === 'Graphical Programming' && (
          <div style={{ marginBottom: '20px', marginLeft: '150px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '10px', color: '#666', fontSize: '14px' }}>Design Flow:</span>
              <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer' }}>Graphical Design</button>
            </div>
            <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>* The parameters you modify take effect only after reboot (approx 2 mins).</p>
          </div>
        )}

        <div style={{ marginLeft: '150px' }}>
          <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer' }}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default EdgeMode;
