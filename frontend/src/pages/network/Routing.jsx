import React from 'react';

const Routing = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        Routing
      </h2>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Routing table</span>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#e2e6eb', color: '#333' }}>
              <th style={{ padding: '10px' }}>Target</th>
              <th style={{ padding: '10px' }}>Gateway</th>
              <th style={{ padding: '10px' }}>Netmask</th>
              <th style={{ padding: '10px' }}>Flag</th>
              <th style={{ padding: '10px' }}>Metric</th>
              <th style={{ padding: '10px' }}>Ref</th>
              <th style={{ padding: '10px' }}>Use</th>
              <th style={{ padding: '10px' }}>Interface</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>0.0.0.0</td>
              <td>172.31.5.25</td>
              <td>0.0.0.0</td>
              <td>UG</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>wan</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
              <td style={{ padding: '10px' }}>0.0.0.0</td>
              <td>172.31.5.25</td>
              <td>0.0.0.0</td>
              <td>UG</td>
              <td>5</td>
              <td>0</td>
              <td>0</td>
              <td>wan</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>172.31.5.0</td>
              <td>0.0.0.0</td>
              <td>255.255.255.0</td>
              <td>U</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>wan</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
              <td style={{ padding: '10px' }}>192.168.1.0</td>
              <td>0.0.0.0</td>
              <td>255.255.255.0</td>
              <td>U</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>br-lan</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Static IPv4 Routes</span>
          </div>
          <div>
            <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '5px 15px', marginRight: '10px', borderRadius: '3px', cursor: 'pointer' }}>Add</button>
            <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#e2e6eb', color: '#333' }}>
              <th style={{ padding: '10px', width: '40px' }}><input type="checkbox" /></th>
              <th style={{ padding: '10px' }}>Interface</th>
              <th style={{ padding: '10px' }}>Object</th>
              <th style={{ padding: '10px' }}>IPv4-Netmask</th>
              <th style={{ padding: '10px' }}>IPv4-Gateway</th>
              <th style={{ padding: '10px' }}>Metric</th>
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

      <button className="btn btn-primary" style={{ backgroundColor: '#e0e0e0', color: '#999', cursor: 'not-allowed', border: 'none' }}>apply</button>
    </div>
  );
};

export default Routing;
