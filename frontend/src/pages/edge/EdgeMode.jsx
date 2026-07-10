import React, { useState } from 'react';

const EdgeMode = () => {
  const [initialMode, setInitialMode] = useState('Graphical Programming');
  const [mode, setMode] = useState(initialMode);
  const hasChanges = mode !== initialMode;

  const handleApply = () => {
    setInitialMode(mode);
    alert('Applied Edge Mode configuration!');
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Edge Mode
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Configure</span>
        </div>

        <div style={{ maxWidth: '600px', marginLeft: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
              <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Edge Computing:
            </div>
            <select 
              value={mode} 
              onChange={(e) => setMode(e.target.value)}
              style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }}
            >
              <option value="Edge Gateway">Edge Gateway</option>
              <option value="Graphical Programming">Graphical Programming</option>
            </select>
          </div>

          {mode === 'Graphical Programming' && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                  Design Flow:
                </div>
                <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '2px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Graphical Design</button>
              </div>
              <div style={{ paddingLeft: '160px' }}>
                <p style={{ color: '#ef4444', fontSize: '12px', margin: 0 }}>* The parameters you modify take effect only after reboot (approx 2 mins).</p>
              </div>
            </div>
          )}

          <div style={{ marginTop: '40px', paddingLeft: '15px' }}>
            <button 
              disabled={!hasChanges}
              onClick={handleApply}
              style={{ backgroundColor: hasChanges ? '#003fb4' : '#e0e0e0', color: hasChanges ? 'white' : '#999', cursor: hasChanges ? 'pointer' : 'not-allowed', border: 'none', padding: '8px 30px', borderRadius: '2px', fontWeight: 600, fontSize: '14px' }}>
              apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeMode;
