import React from 'react';

const DataQueryControl = () => {
  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Data Query/Control</h2>
      </div>

      <div style={{ padding: '20px' }}>
        <div className="card-header" style={{ marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <span className="card-header-line"></span>
          <span className="card-title" style={{ flex: 1 }}>Data Query/Control</span>
          <div style={{ width: '40px', height: '20px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
          </div>
        </div>

        <div className="card-panel" style={{ padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
            <button className="btn btn-primary" style={{ padding: '0 25px' }}>Add</button>
          </div>

          <div className="table-container">
            <table className="table-unified">
              <thead>
                <tr>
                  <th>Select Channel</th>
                  <th>Public Topic</th>
                  <th>Subscribe Topic</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Link one</td>
                  <td>--</td>
                  <td>--</td>
                  <td style={{ fontWeight: 600 }}>
                    <span style={{ color: 'var(--danger-color)', cursor: 'pointer' }}>Delete</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-panel" style={{ padding: '20px', borderLeft: '2px solid var(--danger-color)' }}>
          <div style={{ display: 'flex', marginBottom: '15px' }}>
            <span className="form-label-bold" style={{ width: '80px', paddingTop: '10px' }}>Json:</span>
            <textarea 
              readOnly
              className="form-input-standard"
              style={{ flex: 1, height: '300px', backgroundColor: '#fafafa', fontFamily: 'monospace' }}
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
          
          <div style={{ marginLeft: '80px' }}>
            <button className="btn" style={{ backgroundColor: '#e0e0e0', color: '#999', padding: '0 30px', cursor: 'not-allowed' }} disabled>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataQueryControl;
