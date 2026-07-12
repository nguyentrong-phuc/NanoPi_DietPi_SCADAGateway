import React from 'react';

const Log = () => {
  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">LOG</h2>
      </div>

      <div className="content-area" style={{ padding: '20px' }}>
        <div className="card-panel">
          <div className="card-header" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="card-header-line"></span>
              <span className="card-title">Log Viewer</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary">Start</button>
              <button className="btn" style={{ backgroundColor: '#28a745', color: 'white' }}>Download Log</button>
              <button className="btn btn-danger solid">Clear History Log</button>
            </div>
          </div>

          <div className="table-container">
            <table className="table-unified">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>ID</th>
                  <th style={{ width: '150px' }}>Time</th>
                  <th style={{ width: '100px' }}>Level</th>
                  <th style={{ textAlign: 'left' }}>Log</th>
                </tr>
              </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>01046.598</td>
                <td style={{ color: '#f5a623', fontWeight: 600 }}>Warning</td>
                <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
              </tr>
              <tr>
                <td>2</td>
                <td>00381.591</td>
                <td style={{ color: '#f5a623', fontWeight: 600 }}>Warning</td>
                <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
              </tr>
              <tr>
                <td>3</td>
                <td>00382.577</td>
                <td style={{ color: '#f5a623', fontWeight: 600 }}>Warning</td>
                <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
              </tr>
              <tr>
                <td>4</td>
                <td>00383.579</td>
                <td style={{ color: '#f5a623', fontWeight: 600 }}>Warning</td>
                <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
              </tr>
              <tr>
                <td>5</td>
                <td>00384.591</td>
                <td style={{ color: '#f5a623', fontWeight: 600 }}>Warning</td>
                <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
