import React from 'react';

const LinkageControl = () => {
  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Linkage Control</h2>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sub-sidebar for Events */}
        <div style={{ width: '180px', backgroundColor: 'white', borderRight: '8px solid var(--bg-dark)' }}>
          <div style={{ padding: '15px 10px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
            <button className="btn btn-primary" style={{ padding: '3px 8px', fontSize: '12px' }}>New</button>
            <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '12px' }}>Import</button>
            <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '12px' }}>Export</button>
          </div>
          <div style={{ padding: '15px 20px', cursor: 'pointer', backgroundColor: 'var(--primary-light, #f0f4f8)', color: 'var(--primary-color)', fontWeight: 600, fontSize: '14px', textAlign: 'center' }}>High Temperature</div>
          <div style={{ padding: '15px 20px', cursor: 'pointer', backgroundColor: 'white', color: '#555', fontSize: '14px', textAlign: 'center' }}>Normal Temperature</div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <div className="card-panel" style={{ padding: '20px' }}>
            
            <div className="card-header" style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="card-header-line"></span>
                <span className="card-title" style={{ marginRight: '15px' }}>Event Name:</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-color)' }}>High Temperature</span>
              </div>
              <button className="btn btn-outline" style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}>Delete</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span className="form-label-bold" style={{ width: '180px' }}>Enable:</span>
              <div style={{ width: '40px', height: '20px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span className="form-label-bold" style={{ width: '180px' }}>Minus Trigger Interval:</span>
              <span style={{ fontSize: '13px', color: 'var(--text-dark)' }}>10000 ms</span>
            </div>

            <div style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: '4px', maxWidth: '400px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span className="form-label-bold" style={{ width: '140px' }}>Trigger Event:</span>
                <span style={{ fontSize: '13px', color: 'var(--text-dark)' }}>Temperature</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span className="form-label-bold" style={{ width: '140px' }}>Trigger condition:</span>
                <span style={{ fontSize: '13px', color: 'var(--text-dark)' }}>{'>'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span className="form-label-bold" style={{ width: '140px' }}>Trigger mode:</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>All point match the conditions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span className="form-label-bold" style={{ width: '140px' }}>Upper Threshold:</span>
                <span style={{ fontSize: '13px', color: 'var(--text-dark)' }}>0</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--danger-color)', padding: '8px', borderRadius: '4px' }}>
                <span className="form-label-bold" style={{ width: '130px', margin: 0 }}>Lower Threshold:</span>
                <span style={{ fontSize: '13px', color: 'var(--text-dark)' }}>45</span>
              </div>
            </div>

            <div className="card-subtitle" style={{ marginBottom: '15px' }}>Execution Action</div>
            <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
               <div style={{ fontSize: '13px', marginBottom: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>DO Action</div>
               <div style={{ border: '1px solid var(--danger-color)', padding: '15px', borderRadius: '4px', maxWidth: '300px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                   <span className="form-label-bold" style={{ width: '100px' }}>DO:</span>
                   <span style={{ fontSize: '13px', color: 'var(--text-dark)' }}>DO01</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                   <span className="form-label-bold" style={{ width: '100px' }}>Action:</span>
                   <span style={{ fontSize: '13px', color: 'var(--text-dark)' }}>ON</span>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkageControl;
