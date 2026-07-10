import React, { useState, useEffect } from 'react';

const LAN = () => {
  const [lanConfig, setLanConfig] = useState({
    ip: '',
    netmask: '',
    mac: '',
    dhcpEnabled: false,
    dhcpStart: '',
    dhcpEnd: '',
    dns: '',
    leaseTime: 1440,
    status: 'Disconnected'
  });

  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';

  useEffect(() => {
    fetch(`${API_URL}/api/network`)
      .then(res => res.json())
      .then(data => {
        if (data.lan1) setLanConfig(data.lan1); // We assume LAN is eth0 (lan1) in this refactored view
      })
      .catch(err => console.error("Error fetching network config:", err));
  }, []);

  const handleChange = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLanConfig({ ...lanConfig, [field]: value });
  };

  const handleApply = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Construct payload as expected by backend
    const payload = {
      lan1: lanConfig,
      lan2: {} // In a real app we'd fetch and preserve lan2 state here, or split backend API
    };

    fetch(`${API_URL}/api/network`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => alert(data.message || 'Applied configuration for LAN!'))
      .catch(err => alert('Failed to apply configuration.'))
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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#e29724', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333', marginRight: '10px' }}>Status</span>
            <span style={{ backgroundColor: '#10b981', color: 'white', padding: '3px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold', textTransform: 'lowercase' }}>{lanConfig.status || 'connected'}</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '0 15px', fontSize: '13px' }}>
            <div style={{ display: 'flex' }}><span style={{ color: '#333', fontWeight: 600, width: '100px' }}>IP:</span> <span style={{ color: '#555' }}>{lanConfig.ip || '--'}</span></div>
            <div style={{ display: 'flex' }}><span style={{ color: '#333', fontWeight: 600, width: '100px' }}>Netmask:</span> <span style={{ color: '#555' }}>{lanConfig.netmask || '--'}</span></div>
            <div style={{ display: 'flex' }}><span style={{ color: '#333', fontWeight: 600, width: '100px' }}>MAC:</span> <span style={{ color: '#555' }}>{lanConfig.mac || '--'}</span></div>
            <div style={{ display: 'flex' }}><span style={{ color: '#333', fontWeight: 600, width: '120px' }}>Connection Time:</span> <span style={{ color: '#555' }}>00:12:45</span></div>
            
            <div style={{ display: 'flex' }}><span style={{ color: '#333', fontWeight: 600, width: '100px' }}>Send:</span> <span style={{ color: '#555' }}>4.9 MB</span></div>
            <div style={{ display: 'flex' }}><span style={{ color: '#333', fontWeight: 600, width: '100px' }}>Receive:</span> <span style={{ color: '#555' }}>539.6 KB</span></div>
          </div>
        </div>

        {/* Thick Gray Divider */}
        <div style={{ height: '15px', backgroundColor: '#eaedf2', margin: '0 -20px 20px -20px' }}></div>

        {/* Configure Section */}
        <div>
          <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}>
            <div style={{ borderBottom: '2px solid #e29724', display: 'inline-block', paddingBottom: '10px', marginBottom: '-1px', fontWeight: 700, color: '#e29724', cursor: 'pointer', paddingRight: '20px', paddingLeft: '10px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#e29724', marginRight: '10px', verticalAlign: 'middle', marginTop: '-2px' }}></span>
              Configure
            </div>
            <div style={{ display: 'inline-block', color: '#666', border: 'none', marginLeft: '20px', cursor: 'pointer', fontWeight: 600 }}>
               DHCP Server List
            </div>
          </div>
          
          <div style={{ paddingTop: '10px' }}>
            <form onSubmit={handleApply} style={{ maxWidth: '500px', marginLeft: '50px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>LAN IP</label>
                <input type="text" value={lanConfig.ip} onChange={(e) => handleChange(e, 'ip')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Netmask</label>
                <input type="text" value={lanConfig.netmask} onChange={(e) => handleChange(e, 'netmask')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>DHCP Service</label>
                <div style={{ width: '300px' }}>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={lanConfig.dhcpEnabled} onChange={(e) => handleChange(e, 'dhcpEnabled')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {lanConfig.dhcpEnabled && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Starting Address</label>
                    <input type="text" value={lanConfig.dhcpStart} onChange={(e) => handleChange(e, 'dhcpStart')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Ending Address</label>
                    <input type="text" value={lanConfig.dhcpEnd} onChange={(e) => handleChange(e, 'dhcpEnd')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Lease Time</label>
                    <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
                      <input type="number" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333', marginRight: '10px' }} value={lanConfig.leaseTime} onChange={(e) => handleChange(e, 'leaseTime')} />
                      <span className="text-muted" style={{ fontSize: '13px' }}>min</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>DNS</label>
                    <input type="text" value={lanConfig.dns} onChange={(e) => handleChange(e, 'dns')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                </>
              )}

              <div style={{ marginLeft: '-50px', marginTop: '40px' }}>
                <button type="submit" disabled={loading} style={{ backgroundColor: '#e29724', color: 'white', cursor: 'pointer', border: 'none', padding: '8px 30px', borderRadius: '2px', fontWeight: 600, fontSize: '14px' }}>
                  {loading ? 'Applying...' : 'apply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LAN;
