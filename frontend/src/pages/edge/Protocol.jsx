import React, { useState } from 'react';

const Protocol = () => {
  const [activeTab, setActiveTab] = useState('Modbus RTU');

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Protocol
      </h2>

      <div style={{ display: 'flex' }}>
        {/* Sub-sidebar for protocols */}
        <div style={{ width: '150px', borderRight: '1px solid #e5e7eb', marginRight: '20px' }}>
          <div 
            onClick={() => setActiveTab('Modbus RTU')}
            style={{ padding: '10px', cursor: 'pointer', backgroundColor: activeTab === 'Modbus RTU' ? '#fff3e0' : 'var(--bg-dark)', color: activeTab === 'Modbus RTU' ? 'var(--primary-color)' : 'var(--text-dark)', borderRight: activeTab === 'Modbus RTU' ? '3px solid var(--primary-color)' : '3px solid transparent', fontWeight: activeTab === 'Modbus RTU' ? 600 : 'normal' }}
          >
            Modbus RTU
          </div>
          <div 
            onClick={() => setActiveTab('Modbus TCP')}
            style={{ padding: '10px', cursor: 'pointer', backgroundColor: activeTab === 'Modbus TCP' ? '#fff3e0' : 'var(--bg-dark)', color: activeTab === 'Modbus TCP' ? 'var(--primary-color)' : 'var(--text-dark)', borderRight: activeTab === 'Modbus TCP' ? '3px solid var(--primary-color)' : '3px solid transparent', fontWeight: activeTab === 'Modbus TCP' ? 600 : 'normal' }}
          >
            Modbus TCP
          </div>
          <div 
            onClick={() => setActiveTab('OPC UA')}
            style={{ padding: '10px', cursor: 'pointer', backgroundColor: activeTab === 'OPC UA' ? '#fff3e0' : 'var(--bg-dark)', color: activeTab === 'OPC UA' ? 'var(--primary-color)' : 'var(--text-dark)', borderRight: activeTab === 'OPC UA' ? '3px solid var(--primary-color)' : '3px solid transparent', fontWeight: activeTab === 'OPC UA' ? 600 : 'normal' }}
          >
            OPC UA
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 600, fontSize: '14px', flex: 1 }}>{activeTab}</span>
            <div style={{ width: '36px', height: '18px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
            </div>
          </div>

          <div style={{ color: '#666', fontSize: '14px', fontWeight: 600, marginBottom: '15px' }}>Basic settings</div>
          
          <div style={{ maxWidth: '500px', border: '1px solid red', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Protocol:</span>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="TCP Server">
                <option value="TCP Server">TCP Server</option>
                <option value="TCP Client">TCP Client</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Local Port:</span>
              <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="502" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* Slave Address:</span>
              <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="5" />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>* 32 bit float order:</span>
                <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <option value="AB CD">AB CD</option>
                  <option value="CD AB">CD AB</option>
                </select>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', color: '#666', fontSize: '13px' }}>* 32 bit int order:</span>
                <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <option value="AB CD">AB CD</option>
                  <option value="CD AB">CD AB</option>
                </select>
              </div>
            </div>
          </div>
          
          <div style={{ marginLeft: '150px', marginBottom: '30px' }}>
            <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer' }}>apply</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Node mapping table</span>
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
                <th style={{ padding: '10px' }}>Position Name</th>
                <th style={{ padding: '10px' }}>Source(slave)</th>
                <th style={{ padding: '10px' }}>Data Type</th>
                <th style={{ padding: '10px' }}>Mapping Address</th>
                <th style={{ padding: '10px' }}>Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" style={{ padding: '20px', color: '#999' }}>No data yet</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Protocol;
