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
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          System Time
        </h2>
      </div>

      <div style={{ padding: '30px 20px', flex: 1 }}>
        <div style={{ maxWidth: '600px', marginLeft: '60px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Time Zone:</div>
            <select value={config.timeZone} onChange={(e) => handleChange(e, 'timeZone')} style={{ width: '280px', padding: '8px 12px', border: '1px solid #dcdfe6', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#606266' }}>
              <option value="UTC +7">UTC +7</option>
              <option value="UTC +8">UTC +8</option>
              <option value="UTC +9">UTC +9</option>
            </select>
            <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '15px', fontWeight: 400, textDecoration: 'underline' }}>Modify</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Device Time:</div>
            <span style={{ fontSize: '13px', color: '#333', width: '280px' }}>{new Date().toLocaleString('sv').replace('T', ' ')}</span>
            <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '15px', fontWeight: 400, textDecoration: 'underline' }}>Sync With Browser</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Set Time:</div>
            <div style={{ width: '280px', display: 'flex', gap: '10px' }}>
              <ConfigProvider theme={{ token: { colorPrimary: '#003fb4', borderRadius: 4, colorBorder: '#dcdfe6' } }}>
                <DatePicker 
                  placeholder="Please select" 
                  style={{ flex: 1, padding: '6px 11px', boxShadow: 'none' }} 
                />
                <TimePicker 
                  placeholder="Please select" 
                  style={{ flex: 1, padding: '6px 11px', boxShadow: 'none' }} 
                />
              </ConfigProvider>
            </div>
            <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '15px', fontWeight: 400, textDecoration: 'underline' }}>Set</span>
          </div>

          <div style={{ borderTop: '1px solid #ebeef5', paddingTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft: '-60px' }}>
              <div style={{ fontSize: '14px', color: '#333', fontWeight: 600, marginRight: '10px' }}>NTP</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label className="toggle-switch" style={{ width: '36px', height: '18px' }}>
                  <input type="checkbox" checked={config.ntpEnabled} onChange={(e) => handleChange(e, 'ntpEnabled')} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>NTP Server_1:</div>
              <input type="text" value={config.ntpServer1} onChange={(e) => handleChange(e, 'ntpServer1')} style={{ width: '280px', padding: '8px 12px', border: '1px solid #dcdfe6', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#606266' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>NTP Server_2:</div>
              <input type="text" value={config.ntpServer2} onChange={(e) => handleChange(e, 'ntpServer2')} style={{ width: '280px', padding: '8px 12px', border: '1px solid #dcdfe6', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#606266' }} placeholder="Please enter" />
            </div>
          </div>

          <div style={{ marginTop: '20px', marginLeft: '-60px' }}>
            <button 
              onClick={handleApply}
              style={{ backgroundColor: 'var(--primary-color)', color: 'white', cursor: 'pointer', border: 'none', padding: '8px 30px', borderRadius: '4px', fontWeight: 600, fontSize: '13px' }}>
              Apply
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemTime;
