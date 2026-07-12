import React, { useState, useEffect } from 'react';

const Routing = () => {
  const [routes, setRoutes] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

  useEffect(() => {
    const fetchRouting = () => {
      fetch(`${API_URL}/api/network/routing`)
        .then(res => res.json())
        .then(data => {
          if (data.routes) setRoutes(data.routes);
        })
        .catch(err => console.error("Error fetching routing table:", err));
    };

    fetchRouting();
    const timer = setInterval(fetchRouting, 5000);
    return () => clearInterval(timer);
  }, []);

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
              {routes.length === 0 ? (
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td colSpan="8" style={{ padding: '12px 10px', color: '#888' }}>No routing data found</td>
                </tr>
              ) : (
                routes.map((route, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 10px', color: '#555' }}>{route.target}</td>
                    <td style={{ color: '#555' }}>{route.gateway}</td>
                    <td style={{ color: '#555' }}>{route.netmask}</td>
                    <td style={{ color: '#555' }}>{route.flag}</td>
                    <td style={{ color: '#555' }}>{route.metric}</td>
                    <td style={{ color: '#555' }}>{route.ref}</td>
                    <td style={{ color: '#555' }}>{route.use}</td>
                    <td style={{ color: '#555' }}>{route.interface}</td>
                  </tr>
                ))
              )}
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
              <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ marginRight: '10px' }}>Add</button>
              <button className="btn btn-danger solid">Delete</button>
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

        <button className="btn btn-primary">apply</button>
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
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-default">cancel</button>
                  <button type="button" className="btn btn-primary">sure</button>
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
