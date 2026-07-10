import React from 'react';

const Routing = () => {
  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Routing
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Routing table</span>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center', backgroundColor: 'white', border: '1px solid #dee2e6' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', color: '#333' }}>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Target</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Gateway</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Netmask</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Flag</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Metric</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Ref</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Use</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Interface</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 10px', color: '#555' }}>0.0.0.0</td>
                <td style={{ color: '#555' }}>172.31.5.25</td>
                <td style={{ color: '#555' }}>0.0.0.0</td>
                <td style={{ color: '#555' }}>UG</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>wan</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#fbfbfb' }}>
                <td style={{ padding: '12px 10px', color: '#555' }}>0.0.0.0</td>
                <td style={{ color: '#555' }}>172.31.5.25</td>
                <td style={{ color: '#555' }}>0.0.0.0</td>
                <td style={{ color: '#555' }}>UG</td>
                <td style={{ color: '#555' }}>5</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>wan</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 10px', color: '#555' }}>172.31.5.0</td>
                <td style={{ color: '#555' }}>0.0.0.0</td>
                <td style={{ color: '#555' }}>255.255.255.0</td>
                <td style={{ color: '#555' }}>U</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>wan</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#fbfbfb' }}>
                <td style={{ padding: '12px 10px', color: '#555' }}>192.168.1.0</td>
                <td style={{ color: '#555' }}>0.0.0.0</td>
                <td style={{ color: '#555' }}>255.255.255.0</td>
                <td style={{ color: '#555' }}>U</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>0</td>
                <td style={{ color: '#555' }}>br-lan</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Thick Gray Divider */}
        <div style={{ height: '15px', backgroundColor: '#eaedf2', margin: '0 -20px 20px -20px' }}></div>

        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Static IPv4 Routes</span>
            </div>
            <div>
              <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', marginRight: '10px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600 }}>Add</button>
              <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center', backgroundColor: 'white', border: '1px solid #dee2e6' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', color: '#333' }}>
                <th style={{ padding: '12px 10px', width: '40px', borderBottom: '1px solid #dee2e6' }}><input type="checkbox" /></th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Interface</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Object</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>IPv4-Netmask</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>IPv4-Gateway</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Metric</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #dee2e6', fontWeight: 600 }}>Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" style={{ padding: '30px', color: '#999' }}>No data yet</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="btn btn-primary" style={{ backgroundColor: '#003fb4', color: 'white', cursor: 'pointer', border: 'none', padding: '8px 30px', borderRadius: '2px', fontWeight: 600, fontSize: '14px' }}>apply</button>
      </div>
    </div>
  );
};

export default Routing;
