import React, { useState } from 'react';

const IOModule = () => {
  const [activeTab, setActiveTab] = useState('Status');

  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">IO Module</h2>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', borderBottom: '2px solid var(--border-color)', marginBottom: '20px', backgroundColor: 'white' }}>
        <div 
          onClick={() => setActiveTab('Status')}
          style={{ padding: '15px 20px', cursor: 'pointer', color: activeTab === 'Status' ? 'var(--primary-color)' : 'var(--text-dark)', borderBottom: activeTab === 'Status' ? '2px solid var(--primary-color)' : '2px solid transparent', marginBottom: '-2px', fontWeight: activeTab === 'Status' ? 600 : 'normal' }}
        >
          Status
        </div>
        <div 
          onClick={() => setActiveTab('DI')}
          style={{ padding: '15px 20px', cursor: 'pointer', color: activeTab === 'DI' ? 'var(--primary-color)' : 'var(--text-dark)', borderBottom: activeTab === 'DI' ? '2px solid var(--primary-color)' : '2px solid transparent', marginBottom: '-2px', fontWeight: activeTab === 'DI' ? 600 : 'normal' }}
        >
          DI Settings
        </div>
      </div>

      {activeTab === 'Status' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{ marginBottom: '30px' }}>
            <div className="card-header" style={{ marginBottom: '15px' }}>
              <span className="card-header-line"></span>
              <span className="card-title">DO Status read and control</span>
            </div>
            <div className="card-panel" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
              {['DO01', 'DO02'].map(doPin => (
                <div key={doPin} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, marginBottom: '10px' }}>| {doPin}</div>
                  <div style={{ width: '40px', height: '20px', backgroundColor: 'var(--border-color)', borderRadius: '10px', margin: '0 auto', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div className="card-header" style={{ marginBottom: '15px' }}>
              <span className="card-header-line"></span>
              <span className="card-title">DI Status</span>
            </div>
            <div className="card-panel" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
              {['DI01', 'DI02'].map(diPin => (
                <div key={diPin} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, marginBottom: '10px' }}>| {diPin}</div>
                  <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--border-color)', borderRadius: '50%', margin: '0 auto' }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'DI' && (
        <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {['DI01', 'DI02'].map(diPin => (
            <div key={diPin} className="card-panel" style={{ padding: '15px' }}>
              <div className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px', color: 'var(--primary-color)' }}>
                | {diPin}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-dark)' }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}><span style={{ width: '120px', color: 'var(--text-muted)' }}>DI Mode:</span> <span>Digital Input</span></div>
                <div style={{ display: 'flex', marginBottom: '10px' }}><span style={{ width: '120px', color: 'var(--text-muted)' }}>Filter time:</span> <span>50 ms</span></div>
                <div style={{ display: 'flex', marginBottom: '10px' }}><span style={{ width: '120px', color: 'var(--text-muted)' }}>Counter Mode:</span> <span>Rising edge</span></div>
                <div style={{ display: 'flex', marginBottom: '10px' }}><span style={{ width: '120px', color: 'var(--text-muted)' }}>Count Freq:</span> <span>5ms</span></div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>✎ Edit</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IOModule;
