import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

const Overview = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHostnameModal, setShowHostnameModal] = useState(false);
  const [newHostname, setNewHostname] = useState('');

  useEffect(() => {
    const fetchInfo = () => {
      fetch(`${API_URL}/api/system/info`)
        .then(res => res.json())
        .then(data => { setInfo(data); setLoading(false); })
        .catch(() => setLoading(false));
    };
    fetchInfo();
    // Refresh every 5 seconds for live stats
    const timer = setInterval(fetchInfo, 5000);
    return () => clearInterval(timer);
  }, []);

  const CardHeader = ({ title, onSettingsClick }) => (
    <div className="card-header" style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
      <span className="card-header-line"></span>
      <span className="card-title" style={{ flex: 1, fontSize: '16px' }}>{title}</span>
      {onSettingsClick && <span onClick={onSettingsClick} style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Settings</span>}
    </div>
  );

  const SubCardHeader = ({ title, onSettingsClick }) => (
    <div className="card-header" style={{ marginBottom: '15px' }}>
      <span className="card-header-line" style={{ height: '14px', width: '3px' }}></span>
      <span className="card-title" style={{ flex: 1 }}>{title}</span>
      {onSettingsClick && <span onClick={onSettingsClick} style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Settings</span>}
    </div>
  );

  const FieldRow = ({ label, value, valueColor = '#333', labelWidth = '110px' }) => {
    const displayValue = (value === undefined || value === null || value === '') ? '--' : value;
    return (
      <div style={{ display: 'flex', marginBottom: '12px', fontSize: '14px' }}>
        <span style={{ width: labelWidth, color: '#333', fontWeight: 600 }}>{label}</span>
        <span style={{ color: valueColor, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {displayValue}
        </span>
      </div>
    );
  };

  const ProgressBar = ({ label, percentage }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '14px' }}>
      <span style={{ width: '70px', color: '#333', fontWeight: 600 }}>{label}:</span>
      <div style={{ flex: 1, backgroundColor: '#e9ecef', height: '16px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: `${percentage}%`, backgroundColor: percentage > 70 ? '#ef4444' : 'var(--primary-color)', height: '100%', transition: 'width 0.5s ease' }}></div>
        <span style={{ position: 'absolute', right: '10px', top: '0', fontSize: '12px', color: '#333', lineHeight: '16px', fontWeight: 700 }}>{percentage}%</span>
      </div>
    </div>
  );

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', color: '#666', fontSize: '16px' }}>
      Loading system information...
    </div>
  );

  return (
    <div className="app-container" style={{ padding: '20px', backgroundColor: 'var(--bg-dark)', minHeight: 'calc(100vh - 60px)', margin: '-20px' }}>
      
      {/* Top Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 58%) minmax(0, 21%) minmax(0, 21%)', gap: '20px' }}>
        
        {/* System Information */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <CardHeader title="System Information" onSettingsClick={() => {
            setNewHostname(info?.name || '');
            setShowHostnameModal(true);
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '0 0 28%' }}>
              <FieldRow labelWidth="80px" label="Name:" value={info?.name} />
              <FieldRow labelWidth="80px" label="Model:" value={info?.model} />
              <FieldRow labelWidth="80px" label="Version:" value={info?.version} />
              <FieldRow labelWidth="80px" label="OS:" value={info?.os} />
              <FieldRow labelWidth="80px" label="SN:" value={info?.sn} />
            </div>
            <div style={{ flex: '0 0 40%' }}>
              <FieldRow labelWidth="120px" label="IMEI:" value="--" />
              <FieldRow labelWidth="120px" label="MAC-WAN:" value={info?.mac1} />
              <FieldRow labelWidth="120px" label="MAC-LAN:" value={info?.mac2} />
              <FieldRow labelWidth="120px" label="Device Time:" value={info?.deviceTime} />
              <FieldRow labelWidth="120px" label="Uptime:" value={info?.operationTime} />
            </div>
            <div style={{ flex: '0 0 25%' }}>
              <FieldRow labelWidth="110px" label="Edge Gateway:" value="ON" valueColor="var(--primary-color)" />
              <FieldRow labelWidth="110px" label="WAN (eth0):" value={info?.eth0Status} valueColor={info?.eth0Status === 'Connected' ? '#10b981' : '#ff4d4f'} />
              <FieldRow labelWidth="110px" label="LAN (eth1):" value={info?.eth1Status} valueColor={info?.eth1Status === 'Connected' ? '#10b981' : '#ff4d4f'} />
            </div>
          </div>
        </div>

        {/* Flow Usage Monitoring */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <CardHeader title="Flow Usage Monitoring" />
          <div style={{ paddingTop: '5px' }}>
            <FieldRow labelWidth="150px" label="Data Usage(Day):" value="0.00 MB" />
            <FieldRow labelWidth="150px" label="Alarm value(Day):" value="0 MB" />
            <FieldRow labelWidth="150px" label="Data Usage(Month):" value="0.00 MB" />
            <FieldRow labelWidth="150px" label="Alarm value(Month):" value="0 MB" />
          </div>
        </div>

        {/* Performance */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <CardHeader title="Performance" />
          <ProgressBar label="CPU" percentage={info?.cpu ?? 0} />
          <ProgressBar label="Memory" percentage={info?.memory ?? 0} />
          <ProgressBar label="Flash" percentage={info?.flash ?? 0} />
          <ProgressBar label="ROM" percentage={0} />
        </div>
      </div>

      {/* Bottom Section - Device Status */}
      <div className="card-panel" style={{ padding: '20px' }}>
        <div className="card-header" style={{ marginBottom: '20px' }}>
           <span className="card-header-line"></span>
           <span className="card-title" style={{ fontSize: '16px' }}>Device Status</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Column 1: WAN & LAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '4px' }}>
              <SubCardHeader title="WAN (eth0)" onSettingsClick={() => navigate('/network/wan')} />
              <FieldRow label="Mode:" value={info?.wan?.mode} />
              <FieldRow label="WAN IP:" value={info?.wan?.liveIp && info?.wan?.liveIp !== '--' ? info?.wan?.liveIp : info?.wan?.staticIp} />
              <FieldRow label="Netmask:" value={info?.wan?.mode === 'DHCP' ? (info?.wan?.status === 'Connected' ? (info?.wan?.liveNetmask || '--') : '--') : (info?.wan?.netmask || '--')} />
              <FieldRow label="Gateway:" value={info?.wan?.liveGateway || info?.wan?.gateway} />
              <FieldRow label="DNS-1:" value={info?.wan?.dns1} />
              <FieldRow label="DNS-2:" value={info?.wan?.dns2} />
            </div>
            
            <div style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '4px', flex: 1 }}>
              <SubCardHeader title="LAN (eth1)" onSettingsClick={() => navigate('/network/lan')} />
              <FieldRow label="LAN IP:" value={info?.lan?.ip} />
              <FieldRow label="Netmask:" value={info?.lan?.netmask} />
              <FieldRow label="DHCP Service:" value={info?.lan?.dhcpEnabled ? 'ON' : 'OFF'} valueColor={info?.lan?.dhcpEnabled ? '#10b981' : '#ff4d4f'} />
            </div>
          </div>

          {/* Column 2: WLAN & Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '4px' }}>
              <SubCardHeader title="WLAN (wlan0)" onSettingsClick={() => navigate('/network/wireless')} />
              <FieldRow label="Mode:" value={info?.wlan?.enabled ? info?.wlan?.mode : '--'} />
              <FieldRow label="WLAN IP:" value={info?.wlan?.enabled ? (info?.wlan?.liveIp !== '--' ? info?.wlan?.liveIp : info?.wlan?.staticIp) : '--'} />
              <FieldRow label="Netmask:" value={info?.wlan?.enabled ? (info?.wlan?.mode === 'DHCP' ? (info?.wlan?.status === 'Connected' ? (info?.wlan?.liveNetmask || '--') : '--') : (info?.wlan?.netmask || '--')) : '--'} />
              <FieldRow label="Gateway:" value={info?.wlan?.enabled ? (info?.wlan?.liveGateway || info?.wlan?.gateway || '--') : '--'} />
              <FieldRow label="SSID:" value={info?.wlan?.enabled ? (info?.wlan?.ssid || '--') : '--'} />
            </div>

            <div style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '4px', flex: 1 }}>
              <SubCardHeader title="LOCATION" />
              <FieldRow label="Longitude:" value="--" />
              <FieldRow label="Latitude:" value="--" />
              <FieldRow label="Status:" value="--" />
              <FieldRow label="Satellite:" value="--" />
            </div>
          </div>

        </div>
      </div>
      
      {/* Hostname Modal */}
      {showHostnameModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '4px', width: '400px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Change Device Name</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#555' }}>Hostname</label>
              <input 
                type="text" 
                value={newHostname} 
                onChange={e => setNewHostname(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setShowHostnameModal(false)}
                className="btn btn-default"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  fetch(`${API_URL}/api/system/hostname`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ hostname: newHostname })
                  })
                  .then(res => res.json())
                  .then(res => {
                    if (res.success) {
                      setShowHostnameModal(false);
                      setInfo(prev => ({ ...prev, name: newHostname }));
                      message.success('Hostname updated successfully', 2);
                    } else {
                      message.error('Failed to update hostname', 2);
                    }
                  });
                }}
                className="btn btn-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
