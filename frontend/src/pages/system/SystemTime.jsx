import React, { useState } from 'react';

const SystemTime = () => {
  const [initialConfig, setInitialConfig] = useState({
    timeZone: 'UTC +8',
    ntpEnabled: true,
    ntpServer1: 'ntp.aliyun.com',
    ntpServer2: ''
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

      <div style={{ padding: '20px 20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Configure</span>
        </div>

        <div style={{ maxWidth: '600px', marginLeft: '50px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Time Zone:</div>
            <select value={config.timeZone} onChange={(e) => handleChange(e, 'timeZone')} style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }}>
              <option value="UTC +7">UTC +7 (Bangkok, Hanoi, Jakarta)</option>
              <option value="UTC +8">UTC +8 (Beijing, Singapore)</option>
              <option value="UTC +9">UTC +9 (Tokyo, Seoul)</option>
            </select>
            <span style={{ color: '#003fb4', fontSize: '13px', cursor: 'pointer', marginLeft: '10px', fontWeight: 600 }}>Modify</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Device Time:</div>
            <span style={{ fontSize: '13px', color: '#333', width: '300px' }}>{new Date().toLocaleString()}</span>
            <span style={{ color: '#003fb4', fontSize: '13px', cursor: 'pointer', marginLeft: '10px', fontWeight: 600 }}>Sync With Browser</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Set Time:</div>
            <input type="date" style={{ width: '145px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333', marginRight: '10px' }} />
            <input type="time" style={{ width: '145px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
            <span style={{ color: '#003fb4', fontSize: '13px', cursor: 'pointer', marginLeft: '10px', fontWeight: 600 }}>Set</span>
          </div>

          <div style={{ borderTop: '1px solid #eaedf2', paddingTop: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333', fontWeight: 600 }}>NTP:</div>
              <div style={{ width: '300px', display: 'flex', alignItems: 'center' }}>
                <label className="toggle-switch">
                  <input type="checkbox" checked={config.ntpEnabled} onChange={(e) => handleChange(e, 'ntpEnabled')} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>NTP Server_1:</div>
              <input type="text" value={config.ntpServer1} onChange={(e) => handleChange(e, 'ntpServer1')} style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '160px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>NTP Server_2:</div>
              <input type="text" value={config.ntpServer2} onChange={(e) => handleChange(e, 'ntpServer2')} style={{ width: '300px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', color: '#333' }} placeholder="Please enter" />
            </div>
          </div>

          <div style={{ marginTop: '40px', paddingLeft: '15px' }}>
            <button 
              disabled={!hasChanges}
              onClick={handleApply}
              style={{ backgroundColor: hasChanges ? '#003fb4' : '#e0e0e0', color: hasChanges ? 'white' : '#999', cursor: hasChanges ? 'pointer' : 'not-allowed', border: 'none', padding: '8px 30px', borderRadius: '2px', fontWeight: 600, fontSize: '14px' }}>
              apply
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemTime;
