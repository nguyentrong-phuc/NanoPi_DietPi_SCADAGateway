import React from 'react';

const Communication = () => {
  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Communication</h2>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sub-sidebar for Channels */}
        <div style={{ width: '180px', backgroundColor: 'white', borderRight: '8px solid var(--bg-dark)' }}>
          <div style={{ padding: '15px 20px', cursor: 'pointer', backgroundColor: 'var(--primary-light, #f0f4f8)', color: 'var(--primary-color)', fontWeight: 600, fontSize: '14px', textAlign: 'center' }}>Communication1</div>
          <div style={{ padding: '15px 20px', cursor: 'pointer', backgroundColor: 'white', color: '#555', fontSize: '14px', textAlign: 'center' }}>Communication2</div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <span className="card-header-line"></span>
            <span className="card-title" style={{ flex: 1 }}>Communication1</span>
            {/* Toggle switch placeholder */}
            <div style={{ width: '40px', height: '20px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
            </div>
          </div>

          <div style={{ padding: '20px', flex: 1 }}>
            <div className="card-header" style={{ marginBottom: '20px' }}>
              <span className="card-header-line"></span>
              <span className="card-title">Basic settings</span>
            </div>

            <div className="card-panel" style={{ maxWidth: '500px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '180px' }}>Communication Protocol:</span>
                <select className="form-input-standard" style={{ flex: 1 }} defaultValue="TCP Client">
                  <option value="TCP Client">TCP Client</option>
                  <option value="MQTT">MQTT Client</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '180px' }}>Remote Server Address:</span>
                <input type="text" className="form-input-standard" style={{ flex: 1 }} defaultValue="192.168.1.99" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '180px' }}>Local Port:</span>
                <input type="text" className="form-input-standard" style={{ flex: 1 }} defaultValue="0" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span className="form-label-bold form-label-required" style={{ width: '180px' }}>Remote Port:</span>
                <input type="text" className="form-input-standard" style={{ flex: 1 }} defaultValue="8234" />
              </div>
            </div>
            
            <div style={{ marginTop: '20px', marginLeft: '180px' }}>
              <button className="btn btn-primary" style={{ padding: '0 30px' }}>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
