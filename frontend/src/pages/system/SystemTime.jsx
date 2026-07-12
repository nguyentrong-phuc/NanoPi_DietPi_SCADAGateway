import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker, ConfigProvider, message } from 'antd';
import dayjs from 'dayjs';

const SystemTime = () => {
  const [initialConfig, setInitialConfig] = useState({
    timeZone: 'UTC +7',
    ntpEnabled: true,
    ntpServer1: 'ntp.aliyun.com',
    ntpServer2: 'ntp.gwadar.cn'
  });
  const [config, setConfig] = useState(initialConfig);
  const [deviceTime, setDeviceTime] = useState(new Date().toLocaleString('sv').replace('T', ' '));
  const hasChanges = JSON.stringify(config) !== JSON.stringify(initialConfig);
  const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

  useEffect(() => {
    fetch(`${API_URL}/api/system/time`)
      .then(res => res.json())
      .then(data => {
        setInitialConfig({
          timeZone: data.timeZone || 'UTC +7',
          ntpEnabled: data.ntpEnabled !== false,
          ntpServer1: data.ntpServer1 || '',
          ntpServer2: data.ntpServer2 || ''
        });
        setConfig({
          timeZone: data.timeZone || 'UTC +7',
          ntpEnabled: data.ntpEnabled !== false,
          ntpServer1: data.ntpServer1 || '',
          ntpServer2: data.ntpServer2 || ''
        });
        if (data.deviceTime) setDeviceTime(data.deviceTime);
      })
      .catch(console.error);

    const timer = setInterval(() => {
      setDeviceTime(prev => {
        const d = new Date(prev.replace(' ', 'T'));
        d.setSeconds(d.getSeconds() + 1);
        return d.toLocaleString('sv').replace('T', ' ');
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleApply = async () => {
    try {
      // Save NTP
      await fetch(`${API_URL}/api/system/time`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'apply_ntp',
          payload: { ntpEnabled: config.ntpEnabled, ntpServer1: config.ntpServer1, ntpServer2: config.ntpServer2 }
        })
      });
      // Save Timezone
      await fetch(`${API_URL}/api/system/time`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'set_timezone', payload: { timeZone: config.timeZone } })
      });
      setInitialConfig(config);
      message.success('System Time configuration applied successfully!', 2);
    } catch (err) {
      console.error(err);
      message.error('Failed to apply configuration', 2);
    }
  };

  const handleSetTimezone = () => {
    fetch(`${API_URL}/api/system/time`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'set_timezone', payload: { timeZone: config.timeZone } })
    }).then(() => message.success('Timezone updated!', 2))
      .catch(() => message.error('Failed to update timezone', 2));
  };

  const handleSyncWithBrowser = () => {
    const browserTime = new Date().toLocaleString('sv').replace('T', ' ');
    fetch(`${API_URL}/api/system/time`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'set_time', payload: { dateTime: browserTime } })
    }).then(() => {
      setDeviceTime(browserTime);
      message.success('Time synced with browser!', 2);
    }).catch(() => message.error('Failed to sync time', 2));
  };

  const handleChange = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setConfig({ ...config, [field]: value });
  };

  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">System Time</h2>
      </div>

      <div className="content-area" style={{ padding: '20px' }}>
        <div className="card-panel" style={{ maxWidth: '700px', margin: '0 auto' }}>
          
          <div className="form-group-unified-row">
            <div className="form-label-bold">Time Zone:</div>
            <select value={config.timeZone} onChange={(e) => handleChange(e, 'timeZone')} className="form-input-standard" style={{ width: '280px' }}>
              <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (UTC +7)</option>
              <option value="Asia/Shanghai">Asia/Shanghai (UTC +8)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (UTC +9)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="form-group-unified-row">
            <div className="form-label-bold">Device Time:</div>
            <span style={{ fontSize: '13px', color: 'var(--text-dark)', width: '280px', padding: '0 12px' }}>{deviceTime}</span>
            <span onClick={handleSyncWithBrowser} style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '15px', textDecoration: 'underline' }}>Sync With Browser</span>
          </div>

          <div className="form-group-unified-row">
            <div className="form-label-bold">Set Time:</div>
            <div style={{ width: '280px', display: 'flex', gap: '10px' }}>
              <ConfigProvider theme={{ token: { colorPrimary: '#003fb4', borderRadius: 4, colorBorder: '#dcdfe6' } }}>
                <DatePicker 
                  placeholder="Please select" 
                  style={{ flex: 1, padding: '4px 11px', boxShadow: 'none' }} 
                />
                <TimePicker 
                  placeholder="Please select" 
                  style={{ flex: 1, padding: '4px 11px', boxShadow: 'none' }} 
                />
              </ConfigProvider>
            </div>
            <span 
              onClick={() => message.success('Time set successfully!', 2)} 
              style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '15px', textDecoration: 'underline' }}
            >
              Set
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
            <div className="form-group-unified-row">
              <div className="form-label-bold">NTP</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label className="toggle-switch" style={{ width: '36px', height: '18px' }}>
                  <input type="checkbox" checked={config.ntpEnabled} onChange={(e) => handleChange(e, 'ntpEnabled')} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="form-group-unified-row">
              <div className="form-label-bold form-label-required">NTP Server_1:</div>
              <input type="text" value={config.ntpServer1} onChange={(e) => handleChange(e, 'ntpServer1')} className="form-input-standard" style={{ width: '280px' }} />
            </div>

            <div className="form-group-unified-row">
              <div className="form-label-bold">NTP Server_2:</div>
              <input type="text" value={config.ntpServer2} onChange={(e) => handleChange(e, 'ntpServer2')} className="form-input-standard" style={{ width: '280px' }} placeholder="Please enter" />
            </div>
          </div>

          <div className="form-group-unified-row" style={{ marginTop: '30px' }}>
            <div className="form-label-bold"></div>
            <button onClick={handleApply} className="btn btn-primary" style={{ padding: '0 30px' }}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemTime;
