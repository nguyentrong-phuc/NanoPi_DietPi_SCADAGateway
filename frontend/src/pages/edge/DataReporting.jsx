import React from 'react';

const DataReporting = () => {
  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Data Reporting</h2>
      </div>

      <div className="card-panel" style={{ padding: '20px', margin: '20px' }}>
        <div className="card-header" style={{ marginBottom: '20px' }}>
          <span className="card-header-line"></span>
          <span className="card-title">Create data reporting groups</span>
        </div>

        <div style={{ maxWidth: '600px', borderLeft: '2px solid var(--danger-color)', paddingLeft: '15px' }}>
          <div className="card-subtitle" style={{ marginBottom: '15px' }}>Basic information</div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span className="form-label-bold form-label-required" style={{ width: '180px' }}>Group name:</span>
            <input type="text" className="form-input-standard" style={{ flex: 1 }} defaultValue="Reporting test" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span className="form-label-bold form-label-required" style={{ width: '180px' }}>Up channel:</span>
            <select className="form-input-standard" style={{ flex: 1 }} defaultValue="link1">
              <option value="link1">link1</option>
              <option value="link2">link2</option>
            </select>
          </div>

          <div className="card-subtitle" style={{ marginBottom: '15px' }}>Data Reporting rules</div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span className="form-label-bold" style={{ width: '180px' }}>interval reporting:</span>
            <div style={{ width: '40px', height: '20px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span className="form-label-bold" style={{ width: '180px' }}>periodic reporting:</span>
            <div style={{ width: '40px', height: '20px', backgroundColor: 'var(--border-color)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', border: '1px solid var(--danger-color)', padding: '10px', borderRadius: '4px' }}>
            <span className="form-label-bold form-label-required" style={{ width: '170px', margin: 0 }}>Reporting cycle time:</span>
            <input type="text" className="form-input-standard" style={{ width: '60px', textAlign: 'center' }} defaultValue="3" />
            <span style={{ marginLeft: '10px', color: 'var(--text-muted)', fontSize: '13px' }}>s</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span className="form-label-bold" style={{ width: '180px' }}>Reporting data format:</span>
            <select className="form-input-standard" style={{ flex: 1 }} defaultValue="Primitive data type">
              <option value="Primitive data type">Primitive data type</option>
              <option value="Json">Json Template</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <span className="form-label-bold" style={{ width: '180px', paddingTop: '10px' }}>Reporting Template:</span>
            <textarea 
              className="form-input-standard"
              style={{ flex: 1, height: '80px', fontFamily: 'monospace' }} 
              defaultValue={`{"time":"sys_local_time", "Temperature":"Temperature", "Humidity":"Humidity"}`}
            />
          </div>
          
          <div style={{ marginLeft: '180px' }}>
            <button className="btn" style={{ backgroundColor: '#e0e0e0', color: '#999', padding: '0 30px', cursor: 'not-allowed' }} disabled>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataReporting;
