import React, { useState } from 'react';

const Overview = () => {
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
      dns1: '172.31.5.25',
      dns2: '--'
    },
    lan: {
      ip: '192.168.1.199',
      netmask: '255.255.255.0',
      dhcpService: 'OFF'
    },
    eth1: { mode: 'WAN', status: 'Connected' },
    eth2: { mode: 'LAN', status: 'Connected' },
    location: {
      longitude: '--',
      latitude: '--',
      status: '--',
      satellite: '--'
    }
  });

  // Reusable components
  const CardHeader = ({ title }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
        <span style={{ fontWeight: 700, fontSize: '18px', color: '#111' }}>{title}</span>
      </div>
      <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>Settings</span>
    </div>
  );

  const SubCardHeader = ({ title }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '8px', borderRadius: '1.5px' }}></span>
        <span style={{ fontWeight: 700, fontSize: '16px', color: '#222' }}>{title}</span>
      </div>
      <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>Settings</span>
    </div>
  );

  const FieldRow = ({ label, value, valueColor = '#444' }) => (
    <div style={{ display: 'flex', marginBottom: '12px', fontSize: '14px' }}>
      <span style={{ width: '135px', color: '#333', fontWeight: 600 }}>{label}</span>
      <span style={{ color: valueColor, flex: 1, wordBreak: 'break-all' }}>{value}</span>
    </div>
  );

  const ProgressBar = ({ label, percentage }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '14px' }}>
      <span style={{ width: '70px', color: '#333', fontWeight: 600 }}>{label}:</span>
      <div style={{ flex: 1, backgroundColor: '#e9ecef', height: '16px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: `${percentage}%`, backgroundColor: percentage > 0 ? 'var(--primary-color)' : 'transparent', height: '100%', transition: 'width 0.3s ease' }}></div>
        {percentage > 0 && <span style={{ position: 'absolute', right: '10px', top: '0', fontSize: '11px', color: 'white', lineHeight: '16px', fontWeight: 600 }}>{percentage}%</span>}
        {percentage === 0 && <span style={{ position: 'absolute', right: '10px', top: '0', fontSize: '11px', color: '#666', lineHeight: '16px', fontWeight: 600 }}>0%</span>}
      </div>
    </div>
  );

  return (
    <div className="page-content" style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh', margin: '-20px' }}>
      
      {/* Top Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 58%) minmax(0, 21%) minmax(0, 21%)', gap: '15px', marginBottom: '15px' }}>
        
        {/* System Information */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <CardHeader title="System Information" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <FieldRow label="Name:" value={sysInfo.name} />
              <FieldRow label="Model:" value={sysInfo.model} />
              <FieldRow label="Version:" value={sysInfo.version} />
              <FieldRow label="OS:" value={sysInfo.os} />
              <FieldRow label="SN:" value={sysInfo.sn} />
            </div>
            <div>
              <FieldRow label="IMEI:" value={sysInfo.imei || '--'} />
              <FieldRow label="MAC-1:" value={sysInfo.mac1} />
              <FieldRow label="MAC-2:" value={sysInfo.mac2} />
              <FieldRow label="Device Time:" value={sysInfo.deviceTime} />
              <FieldRow label="Operation Time:" value={sysInfo.operationTime} />
            </div>
            <div>
              <FieldRow label="Edge Gateway:" value={sysInfo.edgeGateway} valueColor="var(--primary-color)" />
              <FieldRow label="Graph:" value={sysInfo.graph} valueColor="var(--primary-color)" />
              <FieldRow label="Link-1:" value={sysInfo.link1} valueColor="#ff4d4f" />
              <FieldRow label="Link-2:" value={sysInfo.link2} valueColor="#ff4d4f" />
            </div>
          </div>
        </div>

        {/* Flow Usage Monitoring */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <CardHeader title="Flow Usage Monitoring" />
          <FieldRow label="Data Usage(Day):" value={flow.dataUsageDay} />
          <FieldRow label="Alarm value(Day):" value={flow.alarmDay} />
          <FieldRow label="Data Usage(Month):" value={flow.dataUsageMonth} />
          <FieldRow label="Alarm value(Month):" value={flow.alarmMonth} />
        </div>

        {/* Performance */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <CardHeader title="Performance" />
          <ProgressBar label="CPU" percentage={perf.cpu} />
          <ProgressBar label="Memory" percentage={perf.memory} />
          <ProgressBar label="Flash" percentage={perf.flash} />
          <ProgressBar label="ROM" percentage={perf.rom} />
        </div>
      </div>

      {/* Bottom Section - Device Status */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
           <span style={{ display: 'inline-block', width: '4px', height: '18px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
           <span style={{ fontWeight: 700, fontSize: '18px', color: '#111' }}>Device Status</span>
        </div>

        {/* 2-Column Grid for Device Status items */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Column 1: WAN & LAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px' }}>
              <SubCardHeader title="WAN" />
              <FieldRow label="Mode:" value={networkInfo.wan.mode} />
              <FieldRow label="WAN IP:" value={networkInfo.wan.ip} />
              <FieldRow label="Netmask:" value={networkInfo.wan.netmask} />
              <FieldRow label="Gateway:" value={networkInfo.wan.gateway} />
              <FieldRow label="DNS-1:" value={networkInfo.wan.dns1} />
              <FieldRow label="DNS-2:" value={networkInfo.wan.dns2} />
            </div>
            
            <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px', flex: 1 }}>
              <SubCardHeader title="LAN" />
              <FieldRow label="LAN IP:" value={networkInfo.lan.ip} />
              <FieldRow label="Netmask:" value={networkInfo.lan.netmask} />
              <FieldRow label="DHCP Service:" value={networkInfo.lan.dhcpService} valueColor="#ff4d4f" />
            </div>
          </div>

          {/* Column 2: Ethernet Ports & Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px' }}>
              <SubCardHeader title="Ethernet Port 1" />
              <FieldRow label="Mode:" value={networkInfo.eth1.mode} />
              <FieldRow label="Status:" value={networkInfo.eth1.status} valueColor="var(--primary-color)" />
            </div>
            
            <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px' }}>
              <SubCardHeader title="Ethernet Port 2" />
              <FieldRow label="Mode:" value={networkInfo.eth2.mode} />
              <FieldRow label="Status:" value={networkInfo.eth2.status} valueColor="var(--primary-color)" />
            </div>

            <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                 <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '8px' }}></span>
                 <span style={{ fontWeight: 600, fontSize: '14px', color: '#333' }}>Location</span>
              </div>
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
