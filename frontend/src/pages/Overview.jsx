import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();
  // Mock data states
  const [sysInfo] = useState({
    name: 'USR-M300',
    model: 'USR-M300-VN',
    version: 'V1.3.03.115731.1001',
    os: 'Linux',
    sn: '02800726042200000400',
    imei: '',
    mac1: 'D4:AD:20:F9:3F:CD',
    mac2: 'D4:AD:20:F9:3F:CE',
    deviceTime: '2026-07-11 00:55:43',
    operationTime: '20:11:37',
    edgeGateway: 'ON',
    graph: 'ON',
    link1: 'Disconnected',
    link2: 'Disconnected'
  });

  const [flow] = useState({
    dataUsageDay: '0.00MB',
    alarmDay: '0MB',
    dataUsageMonth: '0.00MB',
    alarmMonth: '0MB'
  });

  const [perf] = useState({
    cpu: 84,
    memory: 38,
    flash: 0,
    rom: 0
  });

  const [networkInfo] = useState({
    wan: {
      mode: 'DHCP',
      ip: '172.31.5.26',
      netmask: '255.255.255.0',
      gateway: '172.31.5.25',
      dns1: '8.8.8.8',
      dns2: '8.8.4.4'
    },
    lan: {
      ip: '192.168.1.199',
      netmask: '255.255.255.0',
      dhcpService: 'OFF'
    },
    eth1: { mode: 'WAN', status: 'Connected' },
    eth2: { mode: 'WAN', status: 'Connected' },
    location: {
      longitude: '--',
      latitude: '--',
      status: '--',
      satellite: '--'
    }
  });

  // Reusable components
  const CardHeader = ({ title }) => (
    <div className="card-header" style={{ marginBottom: '15px' }}>
      <span className="card-header-line"></span>
      <span className="card-title" style={{ flex: 1, fontSize: '16px' }}>{title}</span>
      <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Settings</span>
    </div>
  );

  const SubCardHeader = ({ title, onSettingsClick }) => (
    <div className="card-header" style={{ marginBottom: '15px' }}>
      <span className="card-header-line" style={{ height: '14px', width: '3px' }}></span>
      <span className="card-title" style={{ flex: 1 }}>{title}</span>
      {onSettingsClick && <span onClick={onSettingsClick} style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Settings</span>}
    </div>
  );

  const FieldRow = ({ label, value, valueColor = '#444', labelWidth = '110px' }) => (
    <div style={{ display: 'flex', marginBottom: '12px', fontSize: '14px' }}>
      <span style={{ width: labelWidth, color: '#333', fontWeight: 600 }}>{label}</span>
      <span style={{ color: valueColor, flex: 1, wordBreak: 'break-all' }}>{value}</span>
    </div>
  );

  const ProgressBar = ({ label, percentage }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '14px' }}>
      <span style={{ width: '70px', color: '#333', fontWeight: 600 }}>{label}:</span>
      <div style={{ flex: 1, backgroundColor: '#e9ecef', height: '16px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: `${percentage}%`, backgroundColor: percentage > 0 ? 'var(--primary-color)' : 'transparent', height: '100%', transition: 'width 0.3s ease' }}></div>
        <span style={{ position: 'absolute', right: '10px', top: '0', fontSize: '12px', color: '#333', lineHeight: '16px', fontWeight: 700 }}>{percentage}%</span>
      </div>
    </div>
  );

  return (
    <div className="app-container" style={{ padding: '20px', backgroundColor: 'var(--bg-dark)', minHeight: 'calc(100vh - 60px)', margin: '-20px' }}>
      
      {/* Top Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 58%) minmax(0, 21%) minmax(0, 21%)', gap: '20px', marginBottom: '20px' }}>
        
        {/* System Information */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <CardHeader title="System Information" />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '0 0 28%' }}>
              <FieldRow labelWidth="80px" label="Name:" value={sysInfo.name} />
              <FieldRow labelWidth="80px" label="Model:" value={sysInfo.model} />
              <FieldRow labelWidth="80px" label="Version:" value={sysInfo.version} />
              <FieldRow labelWidth="80px" label="OS:" value={sysInfo.os} />
              <FieldRow labelWidth="80px" label="SN:" value={sysInfo.sn} />
            </div>
            <div style={{ flex: '0 0 40%' }}>
              <FieldRow labelWidth="120px" label="IMEI:" value={sysInfo.imei || '--'} />
              <FieldRow labelWidth="120px" label="MAC-1:" value={sysInfo.mac1} />
              <FieldRow labelWidth="120px" label="MAC-2:" value={sysInfo.mac2} />
              <FieldRow labelWidth="120px" label="Device Time:" value={sysInfo.deviceTime} />
              <FieldRow labelWidth="120px" label="Operation Time:" value={sysInfo.operationTime} />
            </div>
            <div style={{ flex: '0 0 25%' }}>
              <FieldRow labelWidth="110px" label="Edge Gateway:" value={sysInfo.edgeGateway} valueColor="var(--primary-color)" />
              <FieldRow labelWidth="110px" label="Graph:" value={sysInfo.graph} valueColor="var(--primary-color)" />
              <FieldRow labelWidth="110px" label="Link-1:" value={sysInfo.link1} valueColor="#ff4d4f" />
              <FieldRow labelWidth="110px" label="Link-2:" value={sysInfo.link2} valueColor="#ff4d4f" />
            </div>
          </div>
        </div>

        {/* Flow Usage Monitoring */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <CardHeader title="Flow Usage Monitoring" />
          <div style={{ paddingTop: '5px' }}>
            <FieldRow labelWidth="150px" label="Data Usage(Day):" value={flow.dataUsageDay} />
            <FieldRow labelWidth="150px" label="Alarm value(Day):" value={flow.alarmDay} />
            <FieldRow labelWidth="150px" label="Data Usage(Month):" value={flow.dataUsageMonth} />
            <FieldRow labelWidth="150px" label="Alarm value(Month):" value={flow.alarmMonth} />
          </div>
        </div>

        {/* Performance */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <CardHeader title="Performance" />
          <ProgressBar label="CPU" percentage={perf.cpu} />
          <ProgressBar label="Memory" percentage={perf.memory} />
          <ProgressBar label="Flash" percentage={perf.flash} />
          <ProgressBar label="ROM" percentage={perf.rom} />
        </div>
      </div>

      {/* Bottom Section - Device Status */}
      <div className="card-panel" style={{ padding: '20px' }}>
        <div className="card-header" style={{ marginBottom: '20px' }}>
           <span className="card-header-line"></span>
           <span className="card-title" style={{ fontSize: '16px' }}>Device Status</span>
        </div>

        {/* 2-Column Grid for Device Status items */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Column 1: WAN & LAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '4px' }}>
              <SubCardHeader title="WAN" onSettingsClick={() => navigate('/network/wan')} />
              <FieldRow label="Mode:" value={networkInfo.wan.mode} />
              <FieldRow label="WAN IP:" value={networkInfo.wan.ip} />
              <FieldRow label="Netmask:" value={networkInfo.wan.netmask} />
              <FieldRow label="Gateway:" value={networkInfo.wan.gateway} />
              <FieldRow label="DNS-1:" value={networkInfo.wan.dns1} />
              <FieldRow label="DNS-2:" value={networkInfo.wan.dns2} />
            </div>
            
            <div style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '4px', flex: 1 }}>
              <SubCardHeader title="LAN" onSettingsClick={() => navigate('/network/lan')} />
              <FieldRow label="LAN IP:" value={networkInfo.lan.ip} />
              <FieldRow label="Netmask:" value={networkInfo.lan.netmask} />
              <FieldRow label="DHCP Service:" value={networkInfo.lan.dhcpService} valueColor="#ff4d4f" />
            </div>
          </div>

          {/* Column 2: Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '4px', flex: 1 }}>
              <SubCardHeader title="LOCATION" />
              <FieldRow label="Longitude:" value={networkInfo.location.longitude} />
              <FieldRow label="Latitude:" value={networkInfo.location.latitude} />
              <FieldRow label="Status:" value={networkInfo.location.status} />
              <FieldRow label="Satellite:" value={networkInfo.location.satellite} />
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Overview;
