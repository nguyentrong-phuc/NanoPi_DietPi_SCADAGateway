import React, { useState } from 'react';

const Reboot = () => {
  const [scheduledReboot, setScheduledReboot] = useState(true);
  const [rebootTime, setRebootTime] = useState('04:44');
  const [initialConfig, setInitialConfig] = useState({ enabled: true, time: '04:44' });

  const hasChanges = scheduledReboot !== initialConfig.enabled || rebootTime !== initialConfig.time;

  const handleReboot = () => {
    if (window.confirm("Are you sure you want to reboot the gateway?")) {
      alert("Rebooting...");
      // Add actual reboot API call here later
    }
  };

  const handleApply = () => {
    setInitialConfig({ enabled: scheduledReboot, time: rebootTime });
    alert("Scheduled reboot applied!");
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Reboot
        </h2>
      </div>

      <div style={{ padding: '30px 40px', flex: 1 }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#333', marginBottom: '20px' }}>
            Reboot
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '120px', textAlign: 'right', paddingRight: '20px', color: '#606266', fontSize: '13px' }}>Reboot:</span>
            <button 
              onClick={handleReboot}
              style={{ backgroundColor: 'white', color: '#606266', border: '1px solid #dcdfe6', padding: '6px 0', borderRadius: '2px', cursor: 'pointer', fontSize: '13px', width: '160px' }}>
              Reboot
            </button>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#333', marginRight: '15px' }}>
              Scheduled Reboot
            </div>
            <label className="toggle-switch" style={{ width: '36px', height: '18px' }}>
              <input type="checkbox" checked={scheduledReboot} onChange={(e) => setScheduledReboot(e.target.checked)} />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <span style={{ width: '120px', textAlign: 'right', paddingRight: '20px', color: '#606266', fontSize: '13px' }}>Reboot Time:</span>
            <input 
              type="time" 
              value={rebootTime}
              onChange={(e) => setRebootTime(e.target.value)}
              disabled={!scheduledReboot}
              style={{ width: '160px', padding: '6px 12px', border: '1px solid #dcdfe6', borderRadius: '2px', fontSize: '13px', outline: 'none', color: scheduledReboot ? '#606266' : '#c0c4cc', backgroundColor: scheduledReboot ? 'white' : '#f5f7fa' }} 
            />
          </div>

          <button 
            onClick={handleApply}
            style={{ backgroundColor: hasChanges ? 'var(--primary-color)' : '#e0e0e0', color: hasChanges ? 'white' : '#fff', border: 'none', padding: '8px 25px', borderRadius: '2px', cursor: hasChanges ? 'pointer' : 'not-allowed', fontWeight: 600, fontSize: '13px' }}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reboot;
