import React, { useState } from 'react';

const Routing = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#e0e2e5', color: '#333' }}>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Target</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Gateway</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Netmask</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Flag</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Metric</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Ref</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Use</th>
                <th style={{ padding: '12px 10px', fontWeight: 600 }}>Interface</th>
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
              <tr style={{ borderBottom: '1px solid #eee' }}>
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
              <tr style={{ borderBottom: '1px solid #eee' }}>
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
              <button onClick={() => setIsAddModalOpen(true)} style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', marginRight: '10px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600 }}>Add</button>
              <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#e0e2e5', color: '#333' }}>
                <th style={{ padding: '12px 10px', width: '40px', borderRight: '2px solid white' }}><input type="checkbox" style={{ margin: 0, verticalAlign: 'middle' }} /></th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Interface</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Object</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>IPv4-Netmask</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>IPv4-Gateway</th>
                <th style={{ padding: '12px 10px', borderRight: '2px solid white', fontWeight: 600 }}>Metric</th>
                <th style={{ padding: '12px 10px', fontWeight: 600 }}>Operation</th>
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

      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', width: '500px', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Add</span>
              <span onClick={() => setIsAddModalOpen(false)} style={{ cursor: 'pointer', color: '#999', fontSize: '20px' }}>&times;</span>
            </div>
            
            {/* Modal Body */}
            <div style={{ padding: '30px 40px 20px 20px' }}>
              <form>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '130px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                    <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Interface:
                  </div>
                  <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#999', appearance: 'none', background: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23999\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E") no-repeat right 10px center', backgroundColor: 'white' }}>
                    <option value="">Please select</option>
                    <option value="WAN">WAN</option>
                    <option value="LAN">LAN</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '130px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                    <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Target:
                  </div>
                  <input type="text" placeholder="Please enter" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '130px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                    <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>IPv4-Netmask:
                  </div>
                  <input type="text" placeholder="Please enter" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '130px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                    <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>IPv4-Gateway:
                  </div>
                  <input type="text" placeholder="Please enter" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                  <div style={{ width: '130px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                    Metric:
                  </div>
                  <input type="number" defaultValue="0" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ backgroundColor: 'white', color: '#666', border: '1px solid #ddd', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontSize: '13px' }}>cancel</button>
                  <button type="button" style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontSize: '13px' }}>sure</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routing;
