import React from 'react';

const LinkageControl = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Linkage Control
      </h2>

      <div style={{ display: 'flex' }}>
        {/* Sub-sidebar for Events */}
        <div style={{ width: '180px', borderRight: '1px solid #e5e7eb', marginRight: '20px' }}>
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
            <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '3px 10px', borderRadius: '3px', fontSize: '12px', cursor: 'pointer' }}>New</button>
            <button style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '3px 10px', borderRadius: '3px', fontSize: '12px', cursor: 'pointer' }}>Import</button>
            <button style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '3px 10px', borderRadius: '3px', fontSize: '12px', cursor: 'pointer' }}>Export</button>
          </div>
          <div style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#fff3e0', color: 'var(--primary-color)', borderRight: '3px solid var(--primary-color)', fontWeight: 600 }}>High Temperature</div>
          <div style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'white', color: 'var(--text-dark)', borderRight: '3px solid transparent' }}>Normal Temperature</div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>Event Name:</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>High Temperature</span>
              </div>
              <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 20px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>Enable:</span>
              <div style={{ width: '36px', height: '18px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative' }}>
                <div style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>Minus Trigger Interval:</span>
              <span style={{ fontSize: '13px' }}>10000 ms</span>
            </div>

            <div style={{ border: '1px solid red', padding: '15px', borderRadius: '4px', maxWidth: '400px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>Trigger Event:</span>
                <span style={{ fontSize: '13px' }}>Temperature</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>Trigger condition:</span>
                <span style={{ fontSize: '13px' }}>{'>'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>Trigger mode:</span>
                <span style={{ fontSize: '13px', color: '#999' }}>All point match the conditions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>Upper Threshold:</span>
                <span style={{ fontSize: '13px' }}>0</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid red', padding: '5px' }}>
                <span style={{ width: '110px', color: '#666', fontSize: '13px' }}>Lower Threshold:</span>
                <span style={{ fontSize: '13px' }}>45</span>
              </div>
            </div>

            <div style={{ marginBottom: '15px', color: '#666', fontSize: '14px', fontWeight: 600 }}>Execution Action</div>
            <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
               <div style={{ fontSize: '13px', marginBottom: '10px', color: '#666' }}>DO Action</div>
               <div style={{ border: '1px solid red', padding: '15px', borderRadius: '4px', maxWidth: '300px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                   <span style={{ width: '100px', color: '#666', fontSize: '13px' }}>DO:</span>
                   <span style={{ fontSize: '13px' }}>DO01</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                   <span style={{ width: '100px', color: '#666', fontSize: '13px' }}>Action:</span>
                   <span style={{ fontSize: '13px' }}>ON</span>
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
