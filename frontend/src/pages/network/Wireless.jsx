import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { message } from 'antd';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://192.168.0.100' // Dev fallback
  : '';

const NetworkWireless = () => {
  const [config, setConfig] = useState({
    enabled: false,
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
  const [showPassword, setShowPassword] = useState(false);
  const hasChanges = initialConfig ? JSON.stringify(config) !== JSON.stringify(initialConfig) : false;

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
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
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
        message.success(data.message || 'Apply Successfully', 2);
      })
      .catch(err => {
        console.error("Error applying config", err);
        message.error("Failed to apply configuration. Connection might have been reset.", 2);
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

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <label style={{ width: '140px', fontSize: '14px', fontWeight: 600, color: '#333' }}>Enable Wi-Fi:</label>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={config.enabled} onChange={(e) => handleChange(e, 'enabled')} style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: config.enabled ? '#10b981' : '#ccc', transition: '.4s', borderRadius: '34px' }}></span>
                    <span style={{ position: 'absolute', content: '""', height: '14px', width: '14px', left: config.enabled ? '23px' : '3px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                  </label>
                  <span style={{ marginLeft: '10px', fontSize: '13px', color: config.enabled ? '#10b981' : '#888', fontWeight: 600 }}>{config.enabled ? 'ON' : 'OFF'}</span>
                </div>
              </div>

              {config.enabled && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>SSID (Wi-Fi Name):</label>
                    <input type="text" value={config.ssid || ''} onChange={(e) => handleChange(e, 'ssid')} placeholder="e.g. MyHomeNetwork" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Password:</label>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input type={showPassword ? "text" : "password"} value={config.password || ''} onChange={(e) => handleChange(e, 'password')} placeholder="Wi-Fi Password" style={{ flex: 1, padding: '8px 40px 8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center', padding: 0 }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
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
              
              {/* Close the config.enabled block here */}
              </>
              )}

              <div style={{ marginLeft: '140px', marginTop: '30px' }}>
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
      </div>
    </div>
  );
};

export default NetworkWireless;
