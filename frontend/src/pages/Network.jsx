import React, { useState, useEffect } from 'react';

const Network = () => {
  const [lanConfig, setLanConfig] = useState({
    lan1: {
      ip: '192.168.30.1',
      netmask: '255.255.255.0',
      dhcpEnabled: true,
      dhcpStart: '192.168.30.2',
      dhcpEnd: '192.168.30.100',
      dns: '8.8.8.8',
      leaseTime: 1440
    },
    lan2: {
      ip: '192.168.40.1',
      netmask: '255.255.255.0',
      dhcpEnabled: false,
      dhcpStart: '192.168.40.2',
      dhcpEnd: '192.168.40.100',
      dns: '8.8.8.8',
      leaseTime: 1440
    }
  });

  const [activeTab, setActiveTab] = useState('lan1');
  const [loading, setLoading] = useState(false);

  // In a real app, you would fetch from the backend API here
  useEffect(() => {
    // fetch('/api/network/lan').then(...)
  }, []);

  const handleChange = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLanConfig({
      ...lanConfig,
      [activeTab]: {
        ...lanConfig[activeTab],
        [field]: value
      }
    });
  };

  const handleApply = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Applied configuration for ${activeTab.toUpperCase()}!`);
      setLoading(false);
    }, 1000);
  };

  const currentConfig = lanConfig[activeTab];

  return (
    <div className="fade-in">
      <h2>Network Configuration</h2>
      
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
          <div 
            style={{ padding: '1rem', cursor: 'pointer', borderBottom: activeTab === 'lan1' ? '2px solid var(--primary-color)' : 'none', color: activeTab === 'lan1' ? 'var(--primary-color)' : 'var(--text-dark)', fontWeight: activeTab === 'lan1' ? '600' : 'normal' }}
            onClick={() => setActiveTab('lan1')}
          >
            Ethernet Port 1 (LAN)
          </div>
          <div 
            style={{ padding: '1rem', cursor: 'pointer', borderBottom: activeTab === 'lan2' ? '2px solid var(--primary-color)' : 'none', color: activeTab === 'lan2' ? 'var(--primary-color)' : 'var(--text-dark)', fontWeight: activeTab === 'lan2' ? '600' : 'normal' }}
            onClick={() => setActiveTab('lan2')}
          >
            Ethernet Port 2 (LAN)
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Status: <span className="text-success">Connected</span></h4>
            <div className="grid grid-cols-3 grid-gap">
              <div>
                <span className="text-muted">IP:</span> <strong>{currentConfig.ip}</strong>
              </div>
              <div>
                <span className="text-muted">Netmask:</span> <strong>{currentConfig.netmask}</strong>
              </div>
              <div>
                <span className="text-muted">MAC:</span> <strong>D4:AD:20:F9:3F:{activeTab === 'lan1' ? 'C9' : 'CA'}</strong>
              </div>
            </div>
          </div>

          <form onSubmit={handleApply}>
            <div className="card-header">Configure {activeTab.toUpperCase()}</div>
            
            <div style={{ maxWidth: '400px' }}>
              <div className="form-group flex items-center justify-between">
                <label className="form-label mb-0" style={{ marginBottom: 0 }}>LAN IP</label>
                <input type="text" className="form-control" style={{ width: '250px' }} value={currentConfig.ip} onChange={(e) => handleChange(e, 'ip')} />
              </div>
              <div className="form-group flex items-center justify-between">
                <label className="form-label mb-0" style={{ marginBottom: 0 }}>Netmask</label>
                <input type="text" className="form-control" style={{ width: '250px' }} value={currentConfig.netmask} onChange={(e) => handleChange(e, 'netmask')} />
              </div>
              <div className="form-group flex items-center justify-between">
                <label className="form-label mb-0" style={{ marginBottom: 0 }}>DHCP Service</label>
                <div style={{ width: '250px' }}>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={currentConfig.dhcpEnabled} onChange={(e) => handleChange(e, 'dhcpEnabled')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {currentConfig.dhcpEnabled && (
                <>
                  <div className="form-group flex items-center justify-between">
                    <label className="form-label mb-0" style={{ marginBottom: 0 }}>Starting Address</label>
                    <input type="text" className="form-control" style={{ width: '250px' }} value={currentConfig.dhcpStart} onChange={(e) => handleChange(e, 'dhcpStart')} />
                  </div>
                  <div className="form-group flex items-center justify-between">
                    <label className="form-label mb-0" style={{ marginBottom: 0 }}>Ending Address</label>
                    <input type="text" className="form-control" style={{ width: '250px' }} value={currentConfig.dhcpEnd} onChange={(e) => handleChange(e, 'dhcpEnd')} />
                  </div>
                  <div className="form-group flex items-center justify-between">
                    <label className="form-label mb-0" style={{ marginBottom: 0 }}>Lease Time (min)</label>
                    <input type="number" className="form-control" style={{ width: '250px' }} value={currentConfig.leaseTime} onChange={(e) => handleChange(e, 'leaseTime')} />
                  </div>
                  <div className="form-group flex items-center justify-between">
                    <label className="form-label mb-0" style={{ marginBottom: 0 }}>DNS</label>
                    <input type="text" className="form-control" style={{ width: '250px' }} value={currentConfig.dns} onChange={(e) => handleChange(e, 'dns')} />
                  </div>
                </>
              )}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Applying...' : 'Apply Configuration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Network;
