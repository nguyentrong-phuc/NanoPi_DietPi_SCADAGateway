import React, { useState } from 'react';

const IOModule = () => {
  const [activeTab, setActiveTab] = useState('Status');

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
        IO Module
      </h2>

      <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: '20px' }}>
        <div 
          onClick={() => setActiveTab('Status')}
          style={{ padding: '10px 20px', cursor: 'pointer', color: activeTab === 'Status' ? 'var(--primary-color)' : '#666', borderBottom: activeTab === 'Status' ? '2px solid var(--primary-color)' : 'none', marginBottom: '-2px', fontWeight: activeTab === 'Status' ? 600 : 'normal' }}
        >
          Status
        </div>
        <div 
          onClick={() => setActiveTab('DI')}
          style={{ padding: '10px 20px', cursor: 'pointer', color: activeTab === 'DI' ? 'var(--primary-color)' : '#666', borderBottom: activeTab === 'DI' ? '2px solid var(--primary-color)' : 'none', marginBottom: '-2px', fontWeight: activeTab === 'DI' ? 600 : 'normal' }}
        >
          DI Settings
        </div>
      </div>

      {activeTab === 'Status' && (
        <div>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>DO Status read and control</span>
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
              {['DO01', 'DO02'].map(doPin => (
                <div key={doPin} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, marginBottom: '10px' }}>| {doPin}</div>
                  <div style={{ width: '40px', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', margin: '0 auto', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>DI Status</span>
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', backgroundColor: 'white', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
              {['DI01', 'DI02'].map(diPin => (
                <div key={diPin} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, marginBottom: '10px' }}>| {diPin}</div>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '50%', margin: '0 auto' }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'DI' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {['DI01', 'DI02'].map(diPin => (
            <div key={diPin} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '15px' }}>
              <div style={{ fontWeight: 600, borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px', color: 'var(--primary-color)' }}>
                | {diPin}
              </div>
              <div style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}><span style={{ width: '120px', color: '#666' }}>DI Mode:</span> <span>Digital Input</span></div>
                <div style={{ display: 'flex', marginBottom: '10px' }}><span style={{ width: '120px', color: '#666' }}>Filter time:</span> <span>50 ms</span></div>
                <div style={{ display: 'flex', marginBottom: '10px' }}><span style={{ width: '120px', color: '#666' }}>Counter Mode:</span> <span>Rising edge</span></div>
                <div style={{ display: 'flex', marginBottom: '10px' }}><span style={{ width: '120px', color: '#666' }}>Count Freq:</span> <span>5ms</span></div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <span style={{ color: '#f39c12', cursor: 'pointer', fontSize: '13px' }}>✎ Edit</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IOModule;
