import React, { useState, useEffect } from 'react';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://192.168.0.100' // Dev fallback
  : '';

const NetworkWireless = () => {
  const [config, setConfig] = useState({
    mode: 'DHCP',
    ssid: '',
    password: '',
    staticIp: '192.168.0.7',
    netmask: '255.255.255.0',
    gateway: '192.168.0.1'
  });
  
  const [initialConfig, setInitialConfig] = useState(null);
  const [networkStats, setNetworkStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isFirstLoad = true;
    const fetchStats = () => {
      fetch(`${API_URL}/api/network`)
        .then(res => res.json())
        .then(data => {
          if (data.wlan) {
            setNetworkStats(data.wlan);
            if (isFirstLoad) {
              const loadedConfig = { ...data.wlan };
              setConfig(loadedConfig);
              setInitialConfig(loadedConfig);
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
    const value = e.target.value;
    if (field === 'mode') {
      const newConfig = { ...config, mode: value };
      if (value === 'Static IP' && config.mode === 'DHCP') {
        newConfig.staticIp = networkStats.liveIp && networkStats.liveIp !== '--' ? networkStats.liveIp : config.staticIp;
        newConfig.gateway = networkStats.liveGateway && networkStats.liveGateway !== '--' ? networkStats.liveGateway : config.gateway;
        newConfig.netmask = networkStats.netmask && networkStats.netmask !== '--' ? networkStats.netmask : config.netmask;
      }
      setConfig(newConfig);
    } else {
      setConfig({ ...config, [field]: value });
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { wlan: config };
    fetch(`${API_URL}/api/network`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setInitialConfig(config);
        alert(data.message || 'WLAN Configuration Applied!');
      })
      .catch(err => {
        console.error("Error applying config", err);
        alert("Failed to apply configuration. Connection might have been reset.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Wireless (WLAN)
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
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '120px', flexShrink: 0 }}>Network Type:</span> <span style={{ color: '#555' }}>{networkStats.mode || '--'}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '80px', flexShrink: 0 }}>WLAN IP:</span> <span style={{ color: '#555' }}>{networkStats.liveIp || '--'}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '90px', flexShrink: 0 }}>Gateway IP:</span> <span style={{ color: '#555' }}>{networkStats.liveGateway || '--'}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '60px', flexShrink: 0 }}>MAC:</span> <span style={{ color: '#555' }}>{networkStats.mac ? networkStats.mac.toUpperCase() : '--'}</span></div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '120px', flexShrink: 0 }}>Netmask:</span> <span style={{ color: '#555' }}>{networkStats.netmask || '--'}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '80px', flexShrink: 0 }}>Receive:</span> <span style={{ color: '#555' }}>{networkStats.receive || '--'}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '90px', flexShrink: 0 }}>Send:</span> <span style={{ color: '#555' }}>{networkStats.send || '--'}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}></div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '120px', flexShrink: 0, whiteSpace: 'nowrap' }}>Connection Time:</span> <span style={{ color: '#555' }}>{networkStats.connTime || '--'}</span></div>
            </div>
          </div>
          
          {/* Thick Gray Divider */}
          <div style={{ height: '15px', backgroundColor: '#eaedf2', margin: '0 -20px 20px -20px' }}></div>

          {/* Configure Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Configure</span>
            </div>

            <form onSubmit={handleApply} style={{ maxWidth: '500px', marginLeft: '50px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>SSID (Wi-Fi Name):</label>
                <input type="text" value={config.ssid || ''} onChange={(e) => handleChange(e, 'ssid')} placeholder="e.g. MyHomeNetwork" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Password:</label>
                <input type="password" value={config.password || ''} onChange={(e) => handleChange(e, 'password')} placeholder="Wi-Fi Password" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Network Mode:</label>
                <select value={config.mode} onChange={(e) => handleChange(e, 'mode')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }}>
                  <option value="DHCP">DHCP</option>
                  <option value="Static IP">Static IP</option>
                </select>
              </div>

              {config.mode === 'Static IP' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Static IP:</label>
                    <input type="text" value={config.staticIp || '192.168.0.7'} onChange={(e) => handleChange(e, 'staticIp')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Netmask:</label>
                    <input type="text" value={config.netmask || '255.255.255.0'} onChange={(e) => handleChange(e, 'netmask')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Gateway:</label>
                    <input type="text" value={config.gateway || '192.168.0.1'} onChange={(e) => handleChange(e, 'gateway')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                </>
              )}
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button 
                  type="button" 
                  onClick={() => setConfig(initialConfig)} 
                  disabled={loading}
                  style={{ flex: 1, padding: '8px 0', border: '1px solid #ddd', backgroundColor: 'white', color: '#555', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ flex: 1, padding: '8px 0', border: 'none', backgroundColor: '#003fb4', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Applying...' : 'Apply'}
                </button>
              </div>

            </form>
          </div>
      </div>
    </div>
  );
};

export default NetworkWireless;
