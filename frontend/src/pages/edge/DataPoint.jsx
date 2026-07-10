import React from 'react';

const DataPoint = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <div style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f', padding: '10px 15px', marginBottom: '20px', fontSize: '13px', color: '#666' }}>
        The parameters you modify take effect only after you reboot the gateway. To avoid repeated reboot, reboot the gateway after all Settings are complete.
        <button style={{ marginLeft: '10px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', padding: '3px 10px', borderRadius: '3px', cursor: 'pointer' }}>reboot</button>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Data Point
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Slave</span>
        </div>
        <div>
          <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '3px', cursor: 'pointer', marginRight: '10px' }}>Add</button>
          <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        
        {/* Local IO Slave */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '15px' }}>
          <div style={{ fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px', color: 'var(--primary-color)' }}>
            | local_io
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            <p>NanoPi Local IO</p>
            <p>Acquisition protocol: <strong>local_io protocol</strong></p>
          </div>
        </div>

        {/* Modbus TCP Slave */}
        <div style={{ backgroundColor: 'white', border: '1px solid var(--primary-color)', borderRadius: '4px', padding: '15px' }}>
          <div style={{ fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px', color: 'var(--primary-color)' }}>
            | Modbus TCP
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            <p>For test</p>
            <p>Acquisition protocol: <strong>mb-tcp protocol</strong></p>
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
              <span style={{ color: '#f39c12', cursor: 'pointer', marginRight: '10px' }}>✎ Edit</span>
              <span style={{ color: '#e74c3c', cursor: 'pointer' }}>🗑 Delete</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>List of slave points</span>
        </div>
        <div>
          <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '3px', cursor: 'pointer', marginRight: '10px' }}>Add</button>
          <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ backgroundColor: '#e2e6eb', color: '#333' }}>
            <th style={{ padding: '10px', width: '40px' }}><input type="checkbox" /></th>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Node name</th>
            <th style={{ padding: '10px' }}>Data Type</th>
            <th style={{ padding: '10px' }}>Address</th>
            <th style={{ padding: '10px' }}>Read/Write</th>
            <th style={{ padding: '10px' }}>Priority</th>
            <th style={{ padding: '10px' }}>Timeout(ms)</th>
            <th style={{ padding: '10px' }}>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td><input type="checkbox" /></td>
            <td>1</td>
            <td>Humi</td>
            <td>short</td>
            <td>4 0001</td>
            <td>Read/Write</td>
            <td>Level 1</td>
            <td>2000</td>
            <td>
              <span style={{ color: '#f39c12', cursor: 'pointer', marginRight: '10px' }}>Edit</span>
              <span style={{ color: '#e74c3c', cursor: 'pointer' }}>Delete</span>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
            <td><input type="checkbox" /></td>
            <td>2</td>
            <td>Temp</td>
            <td>short</td>
            <td>4 0002</td>
            <td>Read/Write</td>
            <td>Level 1</td>
            <td>2000</td>
            <td>
              <span style={{ color: '#f39c12', cursor: 'pointer', marginRight: '10px' }}>Edit</span>
              <span style={{ color: '#e74c3c', cursor: 'pointer' }}>Delete</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataPoint;
