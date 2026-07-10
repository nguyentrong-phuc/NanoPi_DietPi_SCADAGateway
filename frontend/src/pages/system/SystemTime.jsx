import React from 'react';

const SystemTime = () => {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        System Time
      </h2>

      <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px', maxWidth: '600px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>Time Zone:</span>
          <select style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="UTC +8">
            <option value="UTC +7">UTC +7 (Bangkok, Hanoi, Jakarta)</option>
            <option value="UTC +8">UTC +8 (Beijing, Singapore)</option>
            <option value="UTC +9">UTC +9 (Tokyo, Seoul)</option>
          </select>
          <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '10px' }}>Modify</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>Device Time:</span>
          <span style={{ fontSize: '13px', flex: 1 }}>{new Date().toLocaleString()}</span>
          <span style={{ color: '#f39c12', fontSize: '13px', cursor: 'pointer', marginLeft: '10px' }}>Sync With Browser</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>Set Time:</span>
          <input type="date" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }} />
          <input type="time" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <span style={{ color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', marginLeft: '10px' }}>Set</span>
        </div>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px', fontWeight: 600 }}>NTP:</span>
            <div style={{ width: '36px', height: '18px', backgroundColor: 'var(--primary-color)', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>* NTP Server_1:</span>
            <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} defaultValue="ntp.aliyun.com" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ width: '150px', color: '#666', fontSize: '13px' }}>NTP Server_2:</span>
            <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Please enter" />
          </div>
        </div>

        <div style={{ marginLeft: '150px' }}>
          <button style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer' }}>apply</button>
        </div>

      </div>
    </div>
  );
};

export default SystemTime;
