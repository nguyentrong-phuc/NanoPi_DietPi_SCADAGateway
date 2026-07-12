import React, { useState, useEffect } from 'react';
import { TimePicker, ConfigProvider, message } from 'antd';
import dayjs from 'dayjs';
const Reboot = () => {
  const [scheduledReboot, setScheduledReboot] = useState(false);
  const [rebootTime, setRebootTime] = useState('04:00');
  const [initialConfig, setInitialConfig] = useState({ enabled: false, time: '04:00' });
  const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

  useEffect(() => {
    fetch(`${API_URL}/api/system/schedule-reboot`)
      .then(res => res.json())
      .then(data => {
        setScheduledReboot(data.enabled);
        setRebootTime(data.time || '04:00');
        setInitialConfig({ enabled: data.enabled, time: data.time || '04:00' });
      })
      .catch(console.error);
  }, []);

  const hasChanges = scheduledReboot !== initialConfig.enabled || rebootTime !== initialConfig.time;

  const handleReboot = () => {
    if (window.confirm("Are you sure you want to reboot the device?")) {
      const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';
      fetch(`${API_URL}/api/system/reboot`, { method: 'POST' })
        .then(() => message.success('Device is rebooting...'))
        .catch(console.error);
    }
  };

  const handleApply = () => {
    fetch(`${API_URL}/api/system/schedule-reboot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: scheduledReboot, time: rebootTime })
    }).then(res => res.json()).then(data => {
      setInitialConfig({ enabled: scheduledReboot, time: rebootTime });
      message.success(data.message || 'Scheduled reboot applied!');
    }).catch(err => {
      console.error(err);
      message.error('Failed to apply scheduled reboot');
    });
  };

  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Reboot</h2>
      </div>

      <div className="content-area">
        <div className="card-panel" style={{ maxWidth: '600px' }}>
          <div style={{ marginBottom: '40px' }}>
            <div className="card-subtitle">
              Reboot
            </div>
            <div className="form-group-unified-row">
              <span className="form-label-bold" style={{ color: 'var(--text-muted)' }}>Reboot:</span>
              <button onClick={handleReboot} className="btn btn-default" style={{ width: '160px' }}>
                Reboot
              </button>
            </div>
          </div>

          <div>
            <div className="form-group-unified-row" style={{ marginBottom: '20px' }}>
              <div className="card-subtitle" style={{ marginBottom: 0, marginRight: '15px' }}>
                Scheduled Reboot
              </div>
              <label className="toggle-switch" style={{ width: '36px', height: '18px' }}>
                <input type="checkbox" checked={scheduledReboot} onChange={(e) => setScheduledReboot(e.target.checked)} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="form-group-unified-row" style={{ marginBottom: '30px' }}>
              <span className="form-label-bold" style={{ color: 'var(--text-muted)' }}>Reboot Time:</span>
              <ConfigProvider theme={{ token: { colorPrimary: '#003fb4', borderRadius: 4, colorBorder: '#dcdfe6' } }}>
                <TimePicker 
                  value={rebootTime ? dayjs(rebootTime, 'HH:mm') : null}
                  format="HH:mm"
                  onChange={(time, timeString) => setRebootTime(timeString)}
                  disabled={!scheduledReboot}
                  style={{ width: '160px', padding: '4px 11px', boxShadow: 'none' }} 
                  placeholder="Select time"
                  allowClear={false}
                />
              </ConfigProvider>
            </div>

            <button 
              onClick={handleApply}
              disabled={!hasChanges}
              className={`btn ${hasChanges ? 'btn-primary' : ''}`}
              style={{ padding: '0 30px', backgroundColor: !hasChanges ? '#e0e0e0' : undefined, color: !hasChanges ? '#fff' : undefined }}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reboot;
