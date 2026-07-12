import React, { useState } from 'react';
import { DatePicker, TimePicker, ConfigProvider } from 'antd';
import dayjs from 'dayjs';

const SystemTime = () => {
  const [initialConfig, setInitialConfig] = useState({
    timeZone: 'UTC +7',
    ntpEnabled: true,
    ntpServer1: 'ntp.aliyun.com',
    ntpServer2: 'ntp.gwadar.cn'
  });
  const [config, setConfig] = useState(initialConfig);
  const hasChanges = JSON.stringify(config) !== JSON.stringify(initialConfig);

  const handleApply = () => {
    setInitialConfig(config);
    alert('Applied System Time configuration!');
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
              <option value="UTC +7">UTC +7</option>
              <option value="UTC +8">UTC +8</option>
              <option value="UTC +9">UTC +9</option>
            </select>
            <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '15px', textDecoration: 'underline' }}>Modify</span>
          </div>

          <div className="form-group-unified-row">
            <div className="form-label-bold">Device Time:</div>
            <span style={{ fontSize: '13px', color: 'var(--text-dark)', width: '280px', padding: '0 12px' }}>{new Date().toLocaleString('sv').replace('T', ' ')}</span>
            <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '15px', textDecoration: 'underline' }}>Sync With Browser</span>
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
            <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '15px', textDecoration: 'underline' }}>Set</span>
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
