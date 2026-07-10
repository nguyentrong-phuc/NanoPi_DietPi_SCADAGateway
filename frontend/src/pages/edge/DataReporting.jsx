import React from 'react';

const DataReporting = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Data Reporting
      </h2>

      <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Create data reporting groups</span>
        </div>

        <div style={{ maxWidth: '600px', borderLeft: '2px solid red', paddingLeft: '15px' }}>
          <div style={{ marginBottom: '15px', color: '#666', fontSize: '14px', fontWeight: 600 }}>Basic information</div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Group name:</span>
            <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="Reporting test" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Up channel:</span>
            <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="link1">
              <option value="link1">link1</option>
              <option value="link2">link2</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px', color: '#666', fontSize: '14px', fontWeight: 600 }}>Data Reporting rules</div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>interval reporting:</span>
            <div style={{ width: '36px', height: '18px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>periodic reporting:</span>
            <div style={{ width: '36px', height: '18px', backgroundColor: '#e0e0e0', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', border: '1px solid red', padding: '10px', borderRadius: '4px' }}>
            <span style={{ width: '140px', color: '#666', fontSize: '13px' }}>* Reporting cycle time:</span>
            <input type="text" style={{ width: '60px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center' }} defaultValue="3" />
            <span style={{ marginLeft: '10px', color: '#666', fontSize: '13px' }}>s</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>Reporting data format:</span>
            <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="Primitive data type">
              <option value="Primitive data type">Primitive data type</option>
              <option value="Json">Json Template</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px', paddingTop: '10px' }}>Reporting Template:</span>
            <textarea 
              style={{ flex: 1, height: '80px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }} 
              defaultValue={`{"time":"sys_local_time", "Temperature":"Temperature", "Humidity":"Humidity"}`}
            />
          </div>
          
          <div style={{ marginLeft: '150px' }}>
            <button style={{ backgroundColor: '#e0e0e0', color: '#999', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'not-allowed' }}>apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataReporting;
