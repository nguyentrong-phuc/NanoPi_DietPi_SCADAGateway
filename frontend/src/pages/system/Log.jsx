import React from 'react';

const Log = () => {
  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          LOG
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Log Viewer</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Start</button>
            <button style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Download Log</button>
            <button style={{ backgroundColor: '#e71562', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Clear History Log</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#eaedf2', color: '#333', fontWeight: 700 }}>
                <th style={{ padding: '12px 15px', border: 'none', width: '60px' }}>ID</th>
                <th style={{ padding: '12px 15px', border: 'none', width: '150px' }}>Time</th>
                <th style={{ padding: '12px 15px', border: 'none', width: '100px' }}>Level</th>
                <th style={{ padding: '12px 15px', border: 'none', textAlign: 'left' }}>Log</th>
              </tr>
            </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px 15px' }}>1</td>
              <td style={{ padding: '12px 15px' }}>01046.598</td>
              <td style={{ padding: '12px 15px', color: '#f59e0b', fontWeight: 600 }}>Warning</td>
              <td style={{ padding: '12px 15px', textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px 15px' }}>2</td>
              <td style={{ padding: '12px 15px' }}>00381.591</td>
              <td style={{ padding: '12px 15px', color: '#f59e0b', fontWeight: 600 }}>Warning</td>
              <td style={{ padding: '12px 15px', textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px 15px' }}>3</td>
              <td style={{ padding: '12px 15px' }}>00382.577</td>
              <td style={{ padding: '12px 15px', color: '#f59e0b', fontWeight: 600 }}>Warning</td>
              <td style={{ padding: '12px 15px', textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px 15px' }}>4</td>
              <td style={{ padding: '12px 15px' }}>00383.579</td>
              <td style={{ padding: '12px 15px', color: '#f59e0b', fontWeight: 600 }}>Warning</td>
              <td style={{ padding: '12px 15px', textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px 15px' }}>5</td>
              <td style={{ padding: '12px 15px' }}>00384.591</td>
              <td style={{ padding: '12px 15px', color: '#f59e0b', fontWeight: 600 }}>Warning</td>
              <td style={{ padding: '12px 15px', textAlign: 'left' }}>[nodered_module][nodered_service.c][163]:edge_read_write error.</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Log;
