import React from 'react';

const DataPoint = () => {
  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Data Point
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>
        <div style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f', padding: '10px 15px', marginBottom: '30px', fontSize: '13px', color: '#666', borderRadius: '2px' }}>
          The parameters you modify take effect only after you reboot the gateway. To avoid repeated reboot, reboot the gateway after all Settings are complete.
          <button style={{ marginLeft: '10px', backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '3px 10px', borderRadius: '2px', cursor: 'pointer', fontWeight: 600 }}>reboot</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Slave</span>
          </div>
          <div>
            <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', marginRight: '10px', fontWeight: 600, fontSize: '13px' }}>Add</button>
            <button style={{ backgroundColor: '#e71562', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Delete</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          
          {/* Local IO Slave */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '15px' }}>
            <div style={{ fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px', color: '#003fb4' }}>
              | local_io
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              <p style={{ marginBottom: '8px' }}>NanoPi Local IO</p>
              <p style={{ margin: 0 }}>Acquisition protocol: <strong>local_io protocol</strong></p>
            </div>
          </div>

          {/* Modbus TCP Slave */}
          <div style={{ backgroundColor: 'white', border: '1px solid #003fb4', borderRadius: '4px', padding: '15px' }}>
            <div style={{ fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px', color: '#003fb4' }}>
              | Modbus TCP
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              <p style={{ marginBottom: '8px' }}>For test</p>
              <p style={{ margin: 0 }}>Acquisition protocol: <strong>mb-tcp protocol</strong></p>
              <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <span style={{ color: '#003fb4', cursor: 'pointer', marginRight: '10px' }}>✎ Edit</span>
                <span style={{ color: '#e71562', cursor: 'pointer' }}>🗑 Delete</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>List of slave points</span>
          </div>
          <div>
            <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', marginRight: '10px', fontWeight: 600, fontSize: '13px' }}>Add</button>
            <button style={{ backgroundColor: '#e71562', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Delete</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#eaedf2', color: '#333', fontWeight: 700 }}>
                <th style={{ padding: '12px 15px', border: 'none', width: '50px' }}><input type="checkbox" style={{ margin: 0, verticalAlign: 'middle' }} /></th>
                <th style={{ padding: '12px 15px', border: 'none' }}>ID</th>
                <th style={{ padding: '12px 15px', border: 'none' }}>Node name</th>
                <th style={{ padding: '12px 15px', border: 'none' }}>Data Type</th>
                <th style={{ padding: '12px 15px', border: 'none' }}>Address</th>
                <th style={{ padding: '12px 15px', border: 'none' }}>Read/Write</th>
                <th style={{ padding: '12px 15px', border: 'none' }}>Priority</th>
                <th style={{ padding: '12px 15px', border: 'none' }}>Timeout(ms)</th>
                <th style={{ padding: '12px 15px', border: 'none' }}>Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 15px' }}><input type="checkbox" style={{ margin: 0, verticalAlign: 'middle' }} /></td>
                <td style={{ padding: '12px 15px' }}>1</td>
                <td style={{ padding: '12px 15px' }}>Humi</td>
                <td style={{ padding: '12px 15px' }}>short</td>
                <td style={{ padding: '12px 15px' }}>4 0001</td>
                <td style={{ padding: '12px 15px' }}>Read/Write</td>
                <td style={{ padding: '12px 15px' }}>Level 1</td>
                <td style={{ padding: '12px 15px' }}>2000</td>
                <td style={{ padding: '12px 15px' }}>
                  <span style={{ color: '#003fb4', cursor: 'pointer', marginRight: '10px' }}>Edit</span>
                  <span style={{ color: '#e71562', cursor: 'pointer' }}>Delete</span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 15px' }}><input type="checkbox" style={{ margin: 0, verticalAlign: 'middle' }} /></td>
                <td style={{ padding: '12px 15px' }}>2</td>
                <td style={{ padding: '12px 15px' }}>Temp</td>
                <td style={{ padding: '12px 15px' }}>short</td>
                <td style={{ padding: '12px 15px' }}>4 0002</td>
                <td style={{ padding: '12px 15px' }}>Read/Write</td>
                <td style={{ padding: '12px 15px' }}>Level 1</td>
                <td style={{ padding: '12px 15px' }}>2000</td>
                <td style={{ padding: '12px 15px' }}>
                  <span style={{ color: '#003fb4', cursor: 'pointer', marginRight: '10px' }}>Edit</span>
                  <span style={{ color: '#e71562', cursor: 'pointer' }}>Delete</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataPoint;
