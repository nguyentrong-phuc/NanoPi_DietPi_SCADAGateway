import React from 'react';

const Log = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        LOG
      </h2>

      <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
          <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '4px', cursor: 'pointer' }}>Start</button>
          <button style={{ backgroundColor: '#e67e22', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '4px', cursor: 'pointer' }}>Download Log</button>
          <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '4px', cursor: 'pointer' }}>Clear History Log</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#e2e6eb', color: '#333' }}>
              <th style={{ padding: '10px', width: '60px' }}>ID</th>
              <th style={{ padding: '10px', width: '150px' }}>Time</th>
              <th style={{ padding: '10px', width: '100px' }}>Level</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Log</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>1</td>
              <td>01046.598</td>
              <td>Warning</td>
              <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
              <td style={{ padding: '10px' }}>2</td>
              <td>00381.591</td>
              <td>Warning</td>
              <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>3</td>
              <td>00382.577</td>
              <td>Warning</td>
              <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
              <td style={{ padding: '10px' }}>4</td>
              <td>00383.579</td>
              <td>Warning</td>
              <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>5</td>
              <td>00384.591</td>
              <td>Warning</td>
              <td style={{ textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Log;
