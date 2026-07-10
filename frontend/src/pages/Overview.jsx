import React, { useState, useEffect } from 'react';

const Overview = () => {
  const [sysInfo, setSysInfo] = useState({
    hostname: 'USR M300',
    platform: 'Linux',
    arch: 'arm64',
    uptime: 0,
    cpuModel: 'Loading...',
    cpuUsage: 0,
    totalMem: 0,
    usedMem: 0,
    memUsagePct: 0
  });

  const [networkInfo, setNetworkInfo] = useState({
    lan1: { ip: '--', netmask: '--', mac: '--', status: 'Disconnected' },
    lan2: { ip: '--', netmask: '--', mac: '--', status: 'Disconnected' }
  });

  const API_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';

  useEffect(() => {
    // Fetch System Info
    fetch(`${API_URL}/api/system/info`)
      .then(res => res.json())
      .then(data => setSysInfo(data))
      .catch(err => console.error(err));

    // Fetch Network Info
    fetch(`${API_URL}/api/network`)
      .then(res => res.json())
      .then(data => setNetworkInfo(data))
      .catch(err => console.error(err));
  }, []);

  const formatUptime = (seconds) => {
    if (!seconds) return '00:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Top Row: System Info, Flow Usage, Performance */}
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* System Information */}
        <div className="w-card" style={{ marginBottom: 0 }}>
          <div className="w-card-header">
            <span className="w-card-title">System Information</span>
            <span style={{color: 'var(--primary-color)', fontSize: '12px', cursor: 'pointer'}}>Settings</span>
          </div>
          <div className="w-card-body grid grid-cols-2 grid-gap-4">
            <div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '100px', color: '#666'}}>Name:</span> <strong>SCADA Gateway</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '100px', color: '#666'}}>Model:</span> <strong>NanoPi DietPi</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '100px', color: '#666'}}>Version:</span> <strong>V1.0.0</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '100px', color: '#666'}}>OS:</span> <strong>{sysInfo.platform} ({sysInfo.arch})</strong></div>
            </div>
            <div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '120px', color: '#666'}}>Device Time:</span> <strong>{new Date().toLocaleString()}</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '120px', color: '#666'}}>Operation Time:</span> <strong>{formatUptime(sysInfo.uptime)}</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '120px', color: '#666'}}>Edge Gateway:</span> <strong className="text-primary">ON</strong></div>
            </div>
          </div>
        </div>

        {/* Flow Usage Monitoring */}
        <div className="w-card" style={{ marginBottom: 0 }}>
          <div className="w-card-header">
            <span className="w-card-title">Flow Usage Monitoring</span>
          </div>
          <div className="w-card-body">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
              <span style={{color: '#666'}}>Data Usage(Day):</span> <strong>12.5MB</strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
              <span style={{color: '#666'}}>Data Usage(Month):</span> <strong>450.2MB</strong>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="w-card" style={{ marginBottom: 0 }}>
          <div className="w-card-header">
            <span className="w-card-title">Performance</span>
          </div>
          <div className="w-card-body">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <span style={{width: '80px', color: '#666'}}>CPU:</span>
              <div style={{flex: 1, marginRight: '10px'}}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{width: `${sysInfo.cpuUsage}%`}}></div>
                </div>
              </div>
              <span style={{width: '30px', fontSize: '12px'}}>{sysInfo.cpuUsage}%</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <span style={{width: '80px', color: '#666'}}>Memory:</span>
              <div style={{flex: 1, marginRight: '10px'}}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{width: `${sysInfo.memUsagePct}%`}}></div>
                </div>
              </div>
              <span style={{width: '30px', fontSize: '12px'}}>{sysInfo.memUsagePct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Device Status */}
      <div className="w-card">
        <div className="w-card-header">
          <span className="w-card-title">Device Status</span>
        </div>
        <div className="w-card-body grid grid-cols-4 grid-gap-4">
          
          <div style={{border: '1px solid #eee', padding: '15px', borderRadius: '4px'}}>
            <div style={{fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
               <span style={{display: 'inline-block', width: '3px', height: '12px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> WAN
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>Mode:</span> <span>DHCP</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>WAN IP:</span> <span>--</span>
            </div>
          </div>

          <div style={{border: '1px solid #eee', padding: '15px', borderRadius: '4px'}}>
            <div style={{fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
               <span style={{display: 'inline-block', width: '3px', height: '12px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> LAN
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>LAN IP:</span> <span>{networkInfo.lan1.ip}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>Netmask:</span> <span>{networkInfo.lan1.netmask}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>DHCP Server:</span> <span className="text-primary">{networkInfo.lan1.dhcpEnabled ? 'ON' : 'OFF'}</span>
            </div>
          </div>

          <div style={{border: '1px solid #eee', padding: '15px', borderRadius: '4px'}}>
             <div style={{fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
               <span style={{display: 'inline-block', width: '3px', height: '12px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> Ethernet Port 1 (eth0)
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>Status:</span> <span className={networkInfo.lan1.status === 'Connected' ? 'text-success' : 'text-danger'}>{networkInfo.lan1.status}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>MAC:</span> <span>{networkInfo.lan1.mac}</span>
            </div>
          </div>

          <div style={{border: '1px solid #eee', padding: '15px', borderRadius: '4px'}}>
             <div style={{fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
               <span style={{display: 'inline-block', width: '3px', height: '12px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> Ethernet Port 2 (eth1)
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>Status:</span> <span className={networkInfo.lan2.status === 'Connected' ? 'text-success' : 'text-danger'}>{networkInfo.lan2.status}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: '#666'}}>MAC:</span> <span>{networkInfo.lan2.mac}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Overview;
