import React from 'react';

const Communication = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Communication
      </h2>

      <div style={{ display: 'flex' }}>
        {/* Sub-sidebar for Channels */}
        <div style={{ width: '150px', borderRight: '1px solid #e5e7eb', marginRight: '20px' }}>
          <div style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#fff3e0', color: 'var(--primary-color)', borderRight: '3px solid var(--primary-color)', fontWeight: 600 }}>Communication1</div>
          <div style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'var(--bg-dark)', color: 'var(--text-dark)', borderRight: '3px solid transparent' }}>Communication2</div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 600, fontSize: '14px', flex: 1 }}>Communication1</span>
            {/* Toggle switch placeholder */}
            <div style={{ width: '36px', height: '18px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
            <div style={{ color: 'var(--primary-color)', fontWeight: 600, marginBottom: '20px' }}>Basic settings</div>

            <div style={{ maxWidth: '500px', border: '1px solid red', padding: '15px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Communication Protocol:</span>
                <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="TCP Client">
                  <option value="TCP Client">TCP Client</option>
                  <option value="MQTT">MQTT Client</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Remote Server Address:</span>
                <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="192.168.1.99" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Local Port:</span>
                <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="0" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Remote Port:</span>
                <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="8234" />
              </div>
            </div>
            
            <div style={{ marginTop: '20px', marginLeft: '150px' }}>
              <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer' }}>apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
