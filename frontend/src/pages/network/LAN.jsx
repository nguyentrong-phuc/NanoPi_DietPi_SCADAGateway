import React, { useState, useEffect } from 'react';
import { message } from 'antd';

const LAN = () => {
  const [initialLanConfig, setInitialLanConfig] = useState({
    ip: '--',
    netmask: '--',
    mac: '--',
    dhcpEnabled: true,
    dhcpStart: '170.0.0.2',
    dhcpEnd: '170.0.0.100',
    dns: '8.8.8.8',
    leaseTime: 1440,
    status: 'Disconnected',
    send: '--',
    receive: '--',
    connTime: '--'
  });
  const [lanConfig, setLanConfig] = useState(initialLanConfig);
  const [networkStats, setNetworkStats] = useState({});
  const hasChanges = JSON.stringify(lanConfig) !== JSON.stringify(initialLanConfig);

  const [activeTab, setActiveTab] = useState('Configure');
  const [loading, setLoading] = useState(false);
  
  // DHCP Host states
  const [selectedHosts, setSelectedHosts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHost, setNewHost] = useState({ hostname: '', mac: '', ip: '' });

  const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

  useEffect(() => {
    let isFirstLoad = true;

    const fetchStats = () => {
      fetch(`${API_URL}/api/network`)
        .then(res => res.json())
        .then(data => {
          if (data.lan) {
            setNetworkStats(data.lan);
            if (isFirstLoad) {
              setLanConfig(prev => ({ ...prev, ...data.lan }));
              setInitialLanConfig(prev => ({ ...prev, ...data.lan }));
              isFirstLoad = false;
            }
          }
        })
        .catch(err => console.error("Error fetching network config:", err));
    };

    fetchStats();
    const timer = setInterval(fetchStats, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const newConfig = { ...lanConfig, [field]: value };
    
    // Auto-update DHCP range when IP changes
    if (field === 'ip' && value.split('.').length === 4) {
      const parts = value.split('.');
      if (parts[3] !== '') {
        const base = `${parts[0]}.${parts[1]}.${parts[2]}`;
        newConfig.dhcpStart = `${base}.2`;
        newConfig.dhcpEnd = `${base}.100`;
      }
    }

    // Auto-fill DHCP range if turning on DHCP and fields are empty
    if (field === 'dhcpEnabled' && value === true) {
      if (!newConfig.dhcpStart || !newConfig.dhcpEnd) {
        const parts = (newConfig.ip || '').split('.');
        if (parts.length === 4 && parts[3] !== '') {
          const base = `${parts[0]}.${parts[1]}.${parts[2]}`;
          newConfig.dhcpStart = newConfig.dhcpStart || `${base}.2`;
          newConfig.dhcpEnd = newConfig.dhcpEnd || `${base}.100`;
        }
      }
    }
    
    setLanConfig(newConfig);
  };

  const handleToggleHost = (mac) => {
    setSelectedHosts(prev => prev.includes(mac) ? prev.filter(m => m !== mac) : [...prev, mac]);
  };

  const handleDeleteSelected = () => {
    if (selectedHosts.length === 0) return;
    setLanConfig(prev => ({
      ...prev,
      staticHosts: (prev.staticHosts || []).filter(h => !selectedHosts.includes(h.mac))
    }));
    setSelectedHosts([]);
  };

  const handleAddSubmit = () => {
    if (!newHost.mac || !newHost.ip) {
      message.error('MAC and IPv4 are required');
      return;
    }
    
    // Validate MAC Address format (XX:XX:XX:XX:XX:XX)
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (!macRegex.test(newHost.mac)) {
      message.error('Invalid MAC Address format. E.g. 1A:2B:3C:4D:5E:6F');
      return;
    }

    // Validate IP Address format
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(newHost.ip)) {
      message.error('Invalid IPv4 Address format');
      return;
    }
    setLanConfig(prev => ({
      ...prev,
      staticHosts: [...(prev.staticHosts || []), { ...newHost }]
    }));
    setShowAddModal(false);
    setNewHost({ hostname: '', mac: '', ip: '' });
  };

  const handleApply = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { lan: lanConfig };
    fetch(`${API_URL}/api/network`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setInitialLanConfig(lanConfig);
        message.success(data.message || 'Apply Successfully', 2);
      })
      .catch(err => message.error('Failed to apply configuration.', 2))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          LAN
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>
      
        {/* Status Section */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0', marginBottom: '15px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333', marginRight: '10px' }}>Status</span>
            <span style={{ backgroundColor: (networkStats.status || 'disconnected').toLowerCase() === 'connected' ? '#10b981' : '#ef4444', color: 'white', padding: '3px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold', textTransform: 'lowercase' }}>{networkStats.status || 'disconnected'}</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '0 15px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '60px', flexShrink: 0 }}>IP:</span> <span style={{ color: '#555' }}>{networkStats.liveIp || networkStats.ip || '--'}</span></div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '80px', flexShrink: 0 }}>Netmask:</span> <span style={{ color: '#555' }}>{networkStats.netmask || '--'}</span></div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '60px', flexShrink: 0 }}>MAC:</span> <span style={{ color: '#555' }}>{networkStats.mac && networkStats.mac !== '--' ? networkStats.mac.toUpperCase() : '--'}</span></div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '120px', flexShrink: 0, whiteSpace: 'nowrap' }}>Connection Time:</span> <span style={{ color: '#555' }}>{networkStats.connTime || '--'}</span></div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '60px', flexShrink: 0 }}>Send:</span> <span style={{ color: '#555' }}>{networkStats.send || '--'}</span></div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '80px', flexShrink: 0 }}>Receive:</span> <span style={{ color: '#555' }}>{networkStats.receive || '--'}</span></div>
          </div>
        </div>

        {/* Thick Gray Divider */}
        <div style={{ height: '15px', backgroundColor: '#eaedf2', margin: '0 -20px 20px -20px' }}></div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px', display: 'flex' }}>
          <div 
            onClick={() => setActiveTab('Configure')}
            style={{ 
              borderBottom: activeTab === 'Configure' ? '2px solid #003fb4' : '2px solid transparent', 
              paddingBottom: '10px', 
              marginBottom: '-1px', 
              fontWeight: 700, 
              color: activeTab === 'Configure' ? '#003fb4' : '#666', 
              cursor: 'pointer', 
              paddingRight: '20px', 
              paddingLeft: '10px' 
            }}
          >
            Configure
          </div>
          <div 
            onClick={() => setActiveTab('DHCP Server List')}
            style={{ 
              borderBottom: activeTab === 'DHCP Server List' ? '2px solid #003fb4' : '2px solid transparent', 
              paddingBottom: '10px', 
              marginBottom: '-1px', 
              fontWeight: 700, 
              color: activeTab === 'DHCP Server List' ? '#003fb4' : '#666', 
              cursor: 'pointer', 
              paddingRight: '20px', 
              paddingLeft: '20px' 
            }}
          >
            DHCP Server List
          </div>
        </div>
        
        {activeTab === 'Configure' && (
          <div style={{ paddingTop: '10px' }}>
            <form onSubmit={handleApply} style={{ maxWidth: '600px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                  <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>LAN IP:
                </div>
                <input type="text" value={lanConfig.ip} onChange={(e) => handleChange(e, 'ip')} style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                  <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Netmask:
                </div>
                <input type="text" value={lanConfig.netmask} onChange={(e) => handleChange(e, 'netmask')} style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                  <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>DHCP Service:
                </div>
                <div style={{ width: '300px', display: 'flex', alignItems: 'center' }}>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={lanConfig.dhcpEnabled} onChange={(e) => handleChange(e, 'dhcpEnabled')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {lanConfig.dhcpEnabled && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                      <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Starting Address:
                    </div>
                    <input type="text" value={lanConfig.dhcpStart} onChange={(e) => handleChange(e, 'dhcpStart')} style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                      <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Ending Address:
                    </div>
                    <input type="text" value={lanConfig.dhcpEnd} onChange={(e) => handleChange(e, 'dhcpEnd')} style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                      <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Lease Time:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
                      <input type="number" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333', marginRight: '10px' }} value={lanConfig.leaseTime} onChange={(e) => handleChange(e, 'leaseTime')} />
                      <span className="text-muted" style={{ fontSize: '13px' }}>min</span>
                    </div>
                  </div>
                </>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                  <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>DNS:
                </div>
                <input type="text" value={lanConfig.dns} onChange={(e) => handleChange(e, 'dns')} style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>

              <div style={{ marginLeft: '160px', marginTop: '30px' }}>
                <button 
                  type="submit" 
                  disabled={loading || !hasChanges} 
                  style={{ 
                    backgroundColor: hasChanges ? '#003fb4' : '#e0e0e0', 
                    color: hasChanges ? 'white' : '#999', 
                    cursor: hasChanges ? 'pointer' : 'not-allowed', 
                    border: 'none', 
                    padding: '8px 40px', 
                    borderRadius: '4px', 
                    fontWeight: 600, 
                    fontSize: '14px',
                    opacity: loading ? 0.7 : 1
                  }}>
                  {loading ? 'Applying...' : 'Apply'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'DHCP Server List' && (
          <div style={{ paddingTop: '10px' }}>
            
            {/* DHCP Host List */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>DHCP Host List</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#eaedf2', color: '#333', fontWeight: 700 }}>
                      <th style={{ padding: '12px 15px', border: 'none' }}>Hostname</th>
                      <th style={{ padding: '12px 15px', border: 'none' }}>IPv4</th>
                      <th style={{ padding: '12px 15px', border: 'none' }}>MAC</th>
                      <th style={{ padding: '12px 15px', border: 'none' }}>Lease Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lanConfig.dhcpHosts && lanConfig.dhcpHosts.length > 0 ? (
                      lanConfig.dhcpHosts.map((host, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '12px 15px' }}>{host.hostname}</td>
                          <td style={{ padding: '12px 15px' }}>{host.ip}</td>
                          <td style={{ padding: '12px 15px' }}>{host.mac ? host.mac.toUpperCase() : ''}</td>
                          <td style={{ padding: '12px 15px' }}>{host.leaseTime}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ padding: '30px', color: '#999' }}>No data yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Static IP List */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
                  <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Static IP List</span>
                </div>
                <div>
                  <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }} onClick={() => setShowAddModal(true)}>Add</button>
                  <button type="button" className="btn btn-danger solid" onClick={handleDeleteSelected}>Delete</button>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#eaedf2', color: '#333', fontWeight: 700 }}>
                      <th style={{ padding: '12px 15px', border: 'none', width: '50px' }}>
                        <input type="checkbox" style={{ margin: 0, verticalAlign: 'middle' }} />
                      </th>
                      <th style={{ padding: '12px 15px', border: 'none' }}>Hostname</th>
                      <th style={{ padding: '12px 15px', border: 'none' }}>IPv4</th>
                      <th style={{ padding: '12px 15px', border: 'none' }}>MAC</th>
                      <th style={{ padding: '12px 15px', border: 'none' }}>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lanConfig.staticHosts && lanConfig.staticHosts.length > 0 ? (
                      lanConfig.staticHosts.map((host, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '12px 15px' }}>
                            <input 
                              type="checkbox" 
                              checked={selectedHosts.includes(host.mac)}
                              onChange={() => handleToggleHost(host.mac)}
                              style={{ margin: 0, verticalAlign: 'middle' }} 
                            />
                          </td>
                          <td style={{ padding: '12px 15px' }}>{host.hostname}</td>
                          <td style={{ padding: '12px 15px' }}>{host.ip}</td>
                          <td style={{ padding: '12px 15px' }}>{host.mac ? host.mac.toUpperCase() : ''}</td>
                          <td style={{ padding: '12px 15px' }}>
                            <button type="button" className="btn btn-danger" style={{ padding: '2px 10px', height: '24px', fontSize: '12px' }} onClick={() => handleToggleHost(host.mac)}>Select</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ padding: '30px', color: '#999' }}>No data yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={handleApply}
                disabled={!hasChanges} 
                className={`btn ${hasChanges ? 'btn-primary active-btn' : ''}`}
                style={{
                  backgroundColor: hasChanges ? 'var(--primary-color)' : '#e0e0e0',
                  color: hasChanges ? 'white' : '#999',
                  cursor: hasChanges ? 'pointer' : 'not-allowed',
                  border: 'none',
                  minWidth: '100px'
                }}
              >
                Apply
              </button>
            </div>
            
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '0', borderRadius: '4px', width: '500px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>Add</span>
              <span style={{ cursor: 'pointer', color: '#999' }} onClick={() => setShowAddModal(false)}>✕</span>
            </div>
            <div style={{ padding: '30px 40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '100px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                  <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Hostname:
                </div>
                <input type="text" placeholder="e.g. My-Laptop" value={newHost.hostname} onChange={(e) => setNewHost({...newHost, hostname: e.target.value})} style={{ width: '280px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '100px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                  <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>MAC:
                </div>
                <input type="text" placeholder="e.g. 1A:2B:3C:4D:5E:6F" value={newHost.mac} onChange={(e) => setNewHost({...newHost, mac: e.target.value.toUpperCase()})} style={{ width: '280px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ width: '100px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                  <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>IPv4:
                </div>
                <input type="text" placeholder="e.g. 192.168.1.100" value={newHost.ip} onChange={(e) => setNewHost({...newHost, ip: e.target.value})} style={{ width: '280px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>
            </div>
            <div style={{ padding: '15px 20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="btn" style={{ border: '1px solid #d9d9d9', backgroundColor: 'white', color: '#333' }} onClick={() => setShowAddModal(false)}>cancel</button>
              <button type="button" className="btn btn-primary active-btn" onClick={handleAddSubmit}>sure</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LAN;
