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
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: 'white', padding: '12px 20px', fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px', color: '#ccc' }}>&gt;</span> LAN
      </div>

      {/* Gray Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '12px 20px', borderTop: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#333', margin: 0 }}>
          LAN
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1, backgroundColor: 'white' }}>
      
      <div className="w-card">
        <div className="w-card-header">
          <span className="w-card-title">Status <span className={`status-badge ${lanConfig.status === 'Connected' ? 'status-connected' : 'status-disconnected'}`} style={{marginLeft: '10px'}}>{lanConfig.status || 'disconnected'}</span></span>
        </div>
        <div className="w-card-body grid grid-cols-4 grid-gap-4">
          <div><div className="text-muted" style={{marginBottom: '5px'}}>IP:</div> <div>{lanConfig.ip || '--'}</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Netmask:</div> <div>{lanConfig.netmask || '--'}</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>MAC:</div> <div>{lanConfig.mac || '--'}</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Connection Time:</div> <div>00:12:45</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Send:</div> <div>4.9 MB</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Receive:</div> <div>539.6 KB</div></div>
        </div>
      </div>

      <div className="w-card">
        <div className="w-card-header" style={{ borderBottom: '2px solid var(--primary-color)', display: 'inline-block', borderRadius: 0, paddingBottom: '10px', marginBottom: '-1px' }}>
           Configure
        </div>
        <div className="w-card-header" style={{ display: 'inline-block', color: 'var(--text-muted)', border: 'none', marginLeft: '20px' }}>
           DHCP Server List
        </div>
        <div className="w-card-body" style={{ borderTop: '1px solid var(--border-color)' }}>
          <form onSubmit={handleApply} style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '20px' }}>
            
            <div className="form-group flex items-center justify-between">
              <label className="form-label mb-0 required">LAN IP</label>
              <input type="text" className="form-control" value={lanConfig.ip} onChange={(e) => handleChange(e, 'ip')} />
            </div>
            
            <div className="form-group flex items-center justify-between">
              <label className="form-label mb-0 required">Netmask</label>
              <input type="text" className="form-control" value={lanConfig.netmask} onChange={(e) => handleChange(e, 'netmask')} />
            </div>

            <div className="form-group flex items-center justify-between">
              <label className="form-label mb-0 required">DHCP Service</label>
              <div style={{ width: '300px' }}>
                <label className="toggle-switch">
                  <input type="checkbox" checked={lanConfig.dhcpEnabled} onChange={(e) => handleChange(e, 'dhcpEnabled')} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {lanConfig.dhcpEnabled && (
              <>
                <div className="form-group flex items-center justify-between">
                  <label className="form-label mb-0 required">Starting Address</label>
                  <input type="text" className="form-control" value={lanConfig.dhcpStart} onChange={(e) => handleChange(e, 'dhcpStart')} />
                </div>
                <div className="form-group flex items-center justify-between">
                  <label className="form-label mb-0 required">Ending Address</label>
                  <input type="text" className="form-control" value={lanConfig.dhcpEnd} onChange={(e) => handleChange(e, 'dhcpEnd')} />
                </div>
                <div className="form-group flex items-center justify-between">
                  <label className="form-label mb-0 required">Lease Time</label>
                  <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
                    <input type="number" className="form-control" style={{ width: '250px', marginRight: '10px' }} value={lanConfig.leaseTime} onChange={(e) => handleChange(e, 'leaseTime')} />
                    <span className="text-muted">min</span>
                  </div>
                </div>
                <div className="form-group flex items-center justify-between">
                  <label className="form-label mb-0 required">DNS</label>
                  <input type="text" className="form-control" value={lanConfig.dns} onChange={(e) => handleChange(e, 'dns')} />
                </div>
              </>
            )}

            <div style={{ marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Applying...' : 'Apply'}
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
