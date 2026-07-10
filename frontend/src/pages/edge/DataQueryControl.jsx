import React from 'react';

const DataQueryControl = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Data Query/Control
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
        <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
        <span style={{ fontWeight: 600, fontSize: '14px', flex: 1 }}>Data Query/Control</span>
        <div style={{ width: '36px', height: '18px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
          <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '5px 25px', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#e2e6eb', color: '#333' }}>
              <th style={{ padding: '10px' }}>Select Channel</th>
              <th style={{ padding: '10px' }}>Public Topic</th>
              <th style={{ padding: '10px' }}>Subscribe Topic</th>
              <th style={{ padding: '10px' }}>Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>Link one</td>
              <td>--</td>
              <td>--</td>
              <td>
                <span style={{ color: '#e74c3c', cursor: 'pointer' }}>Delete</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px', borderLeft: '2px solid red' }}>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <span style={{ width: '50px', color: '#666', fontSize: '13px' }}>Json:</span>
          <textarea 
            readOnly
            style={{ flex: 1, height: '300px', padding: '10px', backgroundColor: '#fafafa', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}
            defaultValue={`{
  "rw_prot": {
    "Ver": "1.0.1",
    "dir": "down",
    "id": "12345",
    "r_data": [{
      "name": "Temperature"
    }],
    "w_data": [{
      "name": "Level",
      "value": "48"
    }]
  }
}`}
          />
        </div>
        
        <div style={{ marginLeft: '50px' }}>
          <button style={{ backgroundColor: '#e0e0e0', color: '#999', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'not-allowed' }}>apply</button>
        </div>
      </div>
    </div>
  );
};

export default DataQueryControl;
