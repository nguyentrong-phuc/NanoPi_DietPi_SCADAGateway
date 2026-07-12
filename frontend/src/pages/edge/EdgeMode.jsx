import React from 'react';

const EdgeMode = () => {
  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Edge Mode</h2>
      </div>

      <div style={{ padding: '20px', flex: 1 }}>
        <div className="card-panel" style={{ padding: '20px' }}>
          <div className="card-header" style={{ marginBottom: '30px' }}>
            <span className="card-header-line"></span>
            <span className="card-title">Configure</span>
          </div>

          <div style={{ maxWidth: '800px', marginLeft: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
              <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '14px', color: 'var(--text-dark)', fontWeight: 600 }}>
                Edge Computing:
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-dark)' }}>
                NodeRED
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '14px', color: 'var(--text-dark)', fontWeight: 600 }}>
                  Design Flow:
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.open('/nodered', '_blank')}
                    style={{ padding: '0 25px' }}
                  >
                    Graphical Design
                  </button>
                  <button className="btn btn-outline" style={{ padding: '0 25px' }}>Export</button>
                  <button className="btn btn-outline" style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)', padding: '0 25px' }}>Delete</button>
                  <button className="btn btn-outline" style={{ padding: '0 25px' }}>Change Password</button>
                </div>
              </div>
              <div style={{ paddingLeft: '175px' }}>
                <p style={{ color: 'var(--danger-color)', fontSize: '13px', margin: '0 0 8px 0' }}>Enable Graphical Design, it can be used normally after the device restarts 2 minutes.</p>
                <p style={{ color: 'var(--danger-color)', fontSize: '13px', margin: 0 }}>Default username: admin, default password: admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeMode;
