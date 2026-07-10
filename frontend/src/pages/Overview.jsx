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

  return (
    <div style={{ padding: '0 20px', width: '100%', margin: '0 auto' }}>
      
      {/* Top Row: System Info, Flow Usage, Performance */}
      {/* Used auto-fit for responsive scaling */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        
        {/* System Information */}
        <div className="w-card" style={{ marginBottom: 0 }}>
          <div className="w-card-header">
            <span className="w-card-title">System Information</span>
            <span style={{color: 'var(--primary-color)', fontSize: '12px', cursor: 'pointer'}}>Settings</span>
          </div>
          <div className="w-card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
            <div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '90px', color: '#666'}}>Name:</span> <strong>SCADA Gateway</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '90px', color: '#666'}}>Model:</span> <strong>NanoPi DietPi</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '90px', color: '#666'}}>Version:</span> <strong>V1.0.0</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '90px', color: '#666'}}>OS:</span> <strong>{sysInfo.platform} ({sysInfo.arch})</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '90px', color: '#666'}}>SN:</span> <strong>02800726042...</strong></div>
            </div>
            <div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '110px', color: '#666'}}>IMEI:</span> <strong>--</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '110px', color: '#666'}}>MAC-1:</span> <strong>{networkInfo.lan1.mac}</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '110px', color: '#666'}}>MAC-2:</span> <strong>{networkInfo.lan2.mac}</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '110px', color: '#666'}}>Device Time:</span> <strong>{new Date().toLocaleString()}</strong></div>
              <div style={{display: 'flex', marginBottom: '10px'}}><span style={{width: '110px', color: '#666'}}>Operation Time:</span> <strong>{formatUptime(sysInfo.uptime)}</strong></div>
            </div>
          </div>
        </div>

        {/* Flow Usage Monitoring */}
        <div className="w-card" style={{ marginBottom: 0 }}>
          <div className="w-card-header">
            <span className="w-card-title">Flow Usage Monitoring</span>
            <span style={{color: 'var(--primary-color)', fontSize: '12px', cursor: 'pointer'}}>Settings</span>
          </div>
          <div className="w-card-body" style={{ fontSize: '13px' }}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
              <span style={{color: '#666'}}>Data Usage(Day):</span> <strong>12.5MB</strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
              <span style={{color: '#666'}}>Alarm value(Day):</span> <strong>0MB</strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
              <span style={{color: '#666'}}>Data Usage(Month):</span> <strong>450.2MB</strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
              <span style={{color: '#666'}}>Alarm value(Month):</span> <strong>0MB</strong>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="w-card" style={{ marginBottom: 0 }}>
          <div className="w-card-header">
            <span className="w-card-title">Performance</span>
          </div>
          <div className="w-card-body" style={{ fontSize: '13px' }}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <span style={{width: '80px', color: '#666'}}>CPU:</span>
              <div style={{flex: 1, marginRight: '10px'}}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{width: `${sysInfo.cpuUsage}%`}}></div>
                </div>
              </div>
              <span style={{width: '35px', textAlign: 'right'}}>{sysInfo.cpuUsage}%</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <span style={{width: '80px', color: '#666'}}>Memory:</span>
              <div style={{flex: 1, marginRight: '10px'}}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{width: `${sysInfo.memUsagePct}%`}}></div>
                </div>
              </div>
              <span style={{width: '35px', textAlign: 'right'}}>{sysInfo.memUsagePct}%</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <span style={{width: '80px', color: '#666'}}>Flash:</span>
              <div style={{flex: 1, marginRight: '10px'}}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{width: `12%`}}></div>
                </div>
              </div>
              <span style={{width: '35px', textAlign: 'right'}}>12%</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <span style={{width: '80px', color: '#666'}}>ROM:</span>
              <div style={{flex: 1, marginRight: '10px'}}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{width: `5%`}}></div>
                </div>
              </div>
              <span style={{width: '35px', textAlign: 'right'}}>5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Device Status */}
      <div className="w-card">
        <div className="w-card-header">
          <span className="w-card-title">Device Status</span>
        </div>
        
        {/* Adjusted to 2-column layout (minmax 300px for responsiveness) */}
        <div className="w-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', backgroundColor: '#fafafa' }}>
          
          {/* Column 1: WAN & LAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* WAN */}
            <div style={{border: '1px solid var(--border-color)', backgroundColor: 'white', padding: '15px', borderRadius: '4px'}}>
              <div style={{fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> WAN
                 </div>
                 <span style={{color: 'var(--primary-color)', fontSize: '12px', cursor: 'pointer', fontWeight: 'normal'}}>Settings</span>
              </div>
              <div style={{fontSize: '13px'}}>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Mode:</span> <span>DHCP</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>WAN IP:</span> <span>--</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Netmask:</span> <span>--</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Gateway:</span> <span>--</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>DNS-1:</span> <span>--</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>DNS-2:</span> <span>--</span></div>
              </div>
            </div>

            {/* LAN */}
            <div style={{border: '1px solid var(--border-color)', backgroundColor: 'white', padding: '15px', borderRadius: '4px'}}>
              <div style={{fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> LAN
                 </div>
                 <span style={{color: 'var(--primary-color)', fontSize: '12px', cursor: 'pointer', fontWeight: 'normal'}}>Settings</span>
              </div>
              <div style={{fontSize: '13px'}}>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>LAN IP:</span> <span>{networkInfo.lan1.ip}</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Netmask:</span> <span>{networkInfo.lan1.netmask}</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>DHCP Service:</span> <span className="text-primary">{networkInfo.lan1.dhcpEnabled ? 'ON' : 'OFF'}</span></div>
              </div>
            </div>

          </div>

          {/* Column 2: Ethernet Ports & Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Ethernet Port 1 & 2 Box */}
            <div style={{border: '1px solid var(--border-color)', backgroundColor: 'white', padding: '15px', borderRadius: '4px'}}>
              {/* Ethernet Port 1 */}
              <div style={{fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> Ethernet Port 1
                 </div>
                 <span style={{color: 'var(--primary-color)', fontSize: '12px', cursor: 'pointer', fontWeight: 'normal'}}>Settings</span>
              </div>
              <div style={{fontSize: '13px', paddingBottom: '10px'}}>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Mode:</span> <span>WAN</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Status:</span> <span className={networkInfo.lan1.status === 'Connected' ? 'text-primary' : 'text-danger'}>{networkInfo.lan1.status}</span></div>
              </div>

              {/* Ethernet Port 2 */}
              <div style={{fontWeight: 600, borderBottom: '1px solid var(--border-color)', borderTop: '1px dashed #eee', paddingTop: '15px', paddingBottom: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center'}}>
                 <span style={{display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> Ethernet Port 2
              </div>
              <div style={{fontSize: '13px'}}>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Mode:</span> <span>LAN</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Status:</span> <span className={networkInfo.lan2.status === 'Connected' ? 'text-primary' : 'text-danger'}>{networkInfo.lan2.status}</span></div>
              </div>
            </div>

            {/* Location */}
            <div style={{border: '1px solid var(--border-color)', backgroundColor: 'white', padding: '15px', borderRadius: '4px'}}>
              <div style={{fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center'}}>
                 <span style={{display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '8px'}}></span> Location
              </div>
              <div style={{fontSize: '13px'}}>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Longitude:</span> <span>--</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Latitude:</span> <span>--</span></div>
                <div style={{display: 'flex', marginBottom: '15px'}}><span style={{width: '100px', color: '#666'}}>Status:</span> <span>--</span></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Overview;
