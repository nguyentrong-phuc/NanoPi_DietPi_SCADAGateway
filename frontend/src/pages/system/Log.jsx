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
        <div style={{ display: 'flex', marginBottom: '15px', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Stop</button>
            <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Download</button>
            <button style={{ backgroundColor: '#f56c6c', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Clear</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e2e6ec', color: '#333', fontWeight: 600 }}>
                <th style={{ padding: '12px 15px', borderRight: '1px solid white', width: '60px' }}>ID</th>
                <th style={{ padding: '12px 15px', borderRight: '1px solid white', width: '150px' }}>Time</th>
                <th style={{ padding: '12px 15px', borderRight: '1px solid white', width: '100px' }}>Level</th>
                <th style={{ padding: '12px 15px', textAlign: 'center' }}>Log</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#909399', fontSize: '13px' }}>
                No data yet
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Log;
