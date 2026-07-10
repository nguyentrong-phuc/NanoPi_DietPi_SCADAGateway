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
    <div className="fade-in">
      <h2 style={{ padding: '0 0 15px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>WAN</h2>
      
      <div className="w-card">
        <div className="w-card-header">
          <span className="w-card-title">Status <span className="status-badge status-disconnected" style={{marginLeft: '10px'}}>disconnected</span></span>
        </div>
        <div className="w-card-body grid grid-cols-4 grid-gap-4">
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Network Type:</div> <div>--</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>WAN IP:</div> <div>--</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Gateway IP:</div> <div>--</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>MAC:</div> <div>--</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Netmask:</div> <div>--</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>DNS:</div> <div>--</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Receive:</div> <div>--</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Send:</div> <div>--</div></div>
          <div><div className="text-muted" style={{marginBottom: '5px'}}>Connection Time:</div> <div>00:00:00</div></div>
        </div>
      </div>

      <div className="w-card">
        <div className="w-card-header">
          <span className="w-card-title">Configure</span>
        </div>
        <div className="w-card-body">
          <form onSubmit={handleApply} style={{ maxWidth: '500px', margin: '0 auto' }}>
            
            <div className="form-group flex items-center justify-between">
              <label className="form-label mb-0 required">Network Mode:</label>
              <select className="form-control" value={config.mode} onChange={(e) => handleChange(e, 'mode')}>
                <option value="DHCP">DHCP</option>
                <option value="Static">Static IP</option>
              </select>
            </div>
            
            <div className="form-group flex items-center justify-between">
              <label className="form-label mb-0 required">DNS Mode:</label>
              <select className="form-control" value={config.dnsMode} onChange={(e) => handleChange(e, 'dnsMode')}>
                <option value="Manual">Manual</option>
                <option value="Auto">Auto</option>
              </select>
            </div>

            {config.dnsMode === 'Manual' && (
              <>
                <div className="form-group flex items-center justify-between">
                  <label className="form-label mb-0 required">DNS 1</label>
                  <input type="text" className="form-control" value={config.dns1} onChange={(e) => handleChange(e, 'dns1')} />
                </div>
                <div className="form-group flex items-center justify-between">
                  <label className="form-label mb-0 required">DNS 2</label>
                  <input type="text" className="form-control" value={config.dns2} onChange={(e) => handleChange(e, 'dns2')} />
                </div>
              </>
            )}

            <div className="form-group flex items-center justify-between">
              <label className="form-label mb-0 required">MTU</label>
              <input type="text" className="form-control" value={config.mtu} onChange={(e) => handleChange(e, 'mtu')} />
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Applying...' : 'Apply'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WAN;
