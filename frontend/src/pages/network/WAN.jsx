import React, { useState, useEffect } from 'react';

const WAN = () => {
  const [config, setConfig] = useState({
    mode: 'DHCP',
    dnsMode: 'Manual',
    dns1: '8.8.8.8',
    dns2: '8.8.4.4',
    mtu: '1500'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    setConfig({ ...config, [field]: e.target.value });
  };

  const handleApply = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('WAN Configuration Applied!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: 'white', padding: '12px 20px', fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px', color: '#ccc' }}>&gt;</span> WAN
      </div>

      {/* Gray Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '12px 20px', borderTop: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#333', margin: 0 }}>
          WAN
        </h2>
      </div>

      <div style={{ padding: '20px', flex: 1 }}>

        <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {/* Status Section */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#333', marginRight: '10px' }}>Status</span>
              <span style={{ backgroundColor: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold' }}>connected</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '0 15px', fontSize: '13px' }}>
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '100px' }}>Network Type:</span> <span style={{ fontWeight: 500, color: '#333' }}>DHCP</span></div>
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '80px' }}>WAN IP:</span> <span style={{ fontWeight: 500, color: '#333' }}>172.31.5.26</span></div>
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '90px' }}>Gateway IP:</span> <span style={{ fontWeight: 500, color: '#333' }}>172.31.5.25</span></div>
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '60px' }}>MAC:</span> <span style={{ fontWeight: 500, color: '#333' }}>D4:AD:20:F9:3F:CD</span></div>
              
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '100px' }}>Netmask:</span> <span style={{ fontWeight: 500, color: '#333' }}>255.255.255.0</span></div>
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '80px' }}>DNS:</span> <span style={{ fontWeight: 500, color: '#333' }}>172.31.5.25</span></div>
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '90px' }}>Receive:</span> <span style={{ fontWeight: 500, color: '#333' }}>4.6 MB(67828)</span></div>
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '60px' }}>Send:</span> <span style={{ fontWeight: 500, color: '#333' }}>7.0 MB(76584)</span></div>
              
              <div style={{ display: 'flex' }}><span style={{ color: '#666', width: '100px' }}>Connection Time:</span> <span style={{ fontWeight: 500, color: '#333' }}>20:39:43</span></div>
            </div>
          </div>
        </div>
          
        <div style={{ backgroundColor: 'white', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {/* Configure Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Configure</span>
            </div>

            <form onSubmit={handleApply} style={{ maxWidth: '500px', marginLeft: '50px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#555' }}><span style={{ color: '#ef4444' }}>*</span> Network Mode:</label>
                <select value={config.mode} onChange={(e) => handleChange(e, 'mode')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }}>
                  <option value="DHCP">DHCP</option>
                  <option value="Static">Static IP</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#555' }}><span style={{ color: '#ef4444' }}>*</span> DNS Mode:</label>
                <select value={config.dnsMode} onChange={(e) => handleChange(e, 'dnsMode')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }}>
                  <option value="Manual">Manual</option>
                  <option value="Auto">Auto</option>
                </select>
              </div>

              {config.dnsMode === 'Manual' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#555' }}><span style={{ color: '#ef4444' }}>*</span> DNS 1</label>
                    <input type="text" value={config.dns1} onChange={(e) => handleChange(e, 'dns1')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ width: '140px', fontSize: '13px', color: '#555' }}><span style={{ color: '#ef4444' }}>*</span> DNS 2</label>
                    <input type="text" value={config.dns2} onChange={(e) => handleChange(e, 'dns2')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                <label style={{ width: '140px', fontSize: '13px', color: '#555' }}><span style={{ color: '#ef4444' }}>*</span> MTU</label>
                <input type="text" value={config.mtu} onChange={(e) => handleChange(e, 'mtu')} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
              </div>

              <div>
                <button type="submit" disabled={loading} style={{ backgroundColor: '#e0e0e0', color: '#999', cursor: 'not-allowed', border: 'none', padding: '8px 24px', borderRadius: '2px', fontWeight: 600, fontSize: '14px' }}>
                  apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WAN;
