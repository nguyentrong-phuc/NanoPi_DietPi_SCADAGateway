import React, { useState, useEffect } from 'react';

const WAN = () => {
  const [initialConfig, setInitialConfig] = useState({
    mode: 'DHCP',
    dnsMode: 'Manual',
    dns1: '8.8.8.8',
    dns2: '8.8.4.4',
    mtu: '1500'
  });
  const [config, setConfig] = useState(initialConfig);
  const hasChanges = JSON.stringify(config) !== JSON.stringify(initialConfig);

  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (field === 'mode') {
      setConfig({ ...config, mode: value, dnsMode: value === 'Static IP' ? 'Manual' : config.dnsMode });
    } else {
      setConfig({ ...config, [field]: value });
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setInitialConfig(config);
      alert('WAN Configuration Applied!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          WAN
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>

          {/* Status Section */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0', marginBottom: '15px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333', marginRight: '10px' }}>Status</span>
              <span style={{ backgroundColor: (config.status || 'connected').toLowerCase() === 'connected' ? '#10b981' : '#ef4444', color: 'white', padding: '3px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold', textTransform: 'lowercase' }}>{config.status || 'connected'}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '0 15px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '120px', flexShrink: 0 }}>Network Type:</span> <span style={{ color: '#555' }}>DHCP</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '80px', flexShrink: 0 }}>WAN IP:</span> <span style={{ color: '#555' }}>172.31.5.26</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '90px', flexShrink: 0 }}>Gateway IP:</span> <span style={{ color: '#555' }}>172.31.5.25</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '60px', flexShrink: 0 }}>MAC:</span> <span style={{ color: '#555' }}>D4:AD:20:F9:3F:CD</span></div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '120px', flexShrink: 0 }}>Netmask:</span> <span style={{ color: '#555' }}>255.255.255.0</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '80px', flexShrink: 0 }}>DNS:</span> <span style={{ color: '#555' }}>172.31.5.25</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '90px', flexShrink: 0 }}>Receive:</span> <span style={{ color: '#555' }}>4.6 MB(67828)</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '60px', flexShrink: 0 }}>Send:</span> <span style={{ color: '#555' }}>7.0 MB(76584)</span></div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#333', fontWeight: 600, width: '120px', flexShrink: 0, whiteSpace: 'nowrap' }}>Connection Time:</span> <span style={{ color: '#555' }}>20:39:43</span></div>
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
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>DNS Mode:</label>
                <select value={config.dnsMode} onChange={(e) => handleChange(e, 'dnsMode')} disabled={config.mode === 'Static IP'} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: config.mode === 'Static IP' ? '#999' : '#333', backgroundColor: config.mode === 'Static IP' ? '#f5f5f5' : 'white', borderColor: config.dnsMode === 'Manual' ? '#5cadff' : '#ddd' }}>
                  <option value="Manual">Manual</option>
                  <option value="Auto">Auto</option>
                </select>
              </div>

              {config.dnsMode === 'Manual' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>DNS 1</label>
                    <input type="text" value={config.dns1} onChange={(e) => handleChange(e, 'dns1')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>DNS 2</label>
                    <input type="text" value={config.dns2} onChange={(e) => handleChange(e, 'dns2')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>MTU:</label>
                <input type="text" value={config.mtu} onChange={(e) => handleChange(e, 'mtu')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>

              <div style={{ marginLeft: '-50px' }}>
                <button type="submit" disabled={loading || !hasChanges} style={{ backgroundColor: hasChanges ? '#003fb4' : '#e0e0e0', color: hasChanges ? 'white' : '#999', cursor: hasChanges ? 'pointer' : 'not-allowed', border: 'none', padding: '8px 30px', borderRadius: '2px', fontWeight: 600, fontSize: '14px' }}>
                  apply
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default WAN;
