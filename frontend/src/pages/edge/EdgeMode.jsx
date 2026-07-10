import React from 'react';

const EdgeMode = () => {
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

        <div style={{ maxWidth: '800px', marginLeft: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
            <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '14px', color: '#333', fontWeight: 600 }}>
              Edge Computing:
            </div>
            <div style={{ fontSize: '14px', color: '#333', padding: '8px 0' }}>
              NodeRED
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '14px', color: '#333', fontWeight: 600 }}>
                Design Flow:
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  onClick={() => window.open(`http://${window.location.hostname}:1880`, '_blank')}
                  style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                >
                  Graphical Design
                </button>
                <button style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Export</button>
                <button style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Delete</button>
                <button style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>change password</button>
              </div>
            </div>
            <div style={{ paddingLeft: '175px' }}>
              <p style={{ color: '#ef4444', fontSize: '13px', margin: '0 0 8px 0' }}>Enable Graphical Design, it can be used normally after the device restarts 2 minutes.</p>
              <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>Default username:admin,default password:admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeMode;
