import React, { useState } from 'react';

const SystemConfig = () => {
  const API_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';
  const [modalConfig, setModalConfig] = useState({ isOpen: false, mode: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleExport = (type) => {
    window.location.href = `${API_URL}/api/system/export/${type}`;
  };

  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, mode: '' });
    setSelectedFile(null);
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Configuration Management
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>System Config</span>
        </div>
        
        <div style={{ paddingLeft: '20px', maxWidth: '600px' }}>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Export:</span>
            <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }} onClick={() => handleExport('system')}>Export Config</button>
          </div>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Import:</span>
            <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }}>Import Config</button>
          </div>
          <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Restore Factory:</span>
            <button style={{ backgroundColor: '#e71562', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }}>Restore Factory</button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eaedf2', paddingTop: '30px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Edge Computing Config</span>
          </div>

          <div style={{ paddingLeft: '20px', maxWidth: '600px' }}>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Export:</span>
              <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }} onClick={() => setModalConfig({ isOpen: true, mode: 'export' })}>Export Config</button>
            </div>
            <div style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px' }}>Import:</span>
              <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: '200px' }} onClick={() => setModalConfig({ isOpen: true, mode: 'import' })}>Import Config</button>
            </div>
            <div style={{ paddingLeft: '150px', color: '#999', fontSize: '12px', lineHeight: 1.5, marginTop: '10px' }}>
              Note: The export point table will synchronously export the data point table, protocol conversion data point table, linkage control event table, and data reporting group table, and will be updated synchronously after importing
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalConfig.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '600px', boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)' }}>
            
            {/* Header */}
            <div style={{ padding: '15px 25px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#333' }}>
                {modalConfig.mode === 'import' ? 'Import mapping table' : 'Export'}
              </h3>
              <span onClick={closeModal} style={{ cursor: 'pointer', fontSize: '18px', color: '#999' }}>&times;</span>
            </div>
            
            {/* Body */}
            {modalConfig.mode === 'import' ? (
              <div style={{ padding: '40px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                    <span style={{ color: '#ef4444' }}>*</span> Select File:
                  </span>
                  <div style={{ flex: 1, position: 'relative', height: '34px', border: '1px solid #dcdfe6', borderRadius: '4px', backgroundColor: '#fcfcfc', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="file" 
                      id="fileInput"
                      style={{ width: '100%', height: '100%', opacity: 0, position: 'absolute', cursor: 'pointer' }}
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                    />
                    <label htmlFor="fileInput" style={{ width: '100%', padding: '0 10px', color: 'var(--primary-color)', fontSize: '13px', cursor: 'pointer', textAlign: 'center' }}>
                      {selectedFile ? selectedFile.name : 'Select File'}
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '30px 40px', color: '#606266', fontSize: '13px', lineHeight: 1.5 }}>
                Note: The export point table will synchronously export the data point table, protocol conversion data point table, linkage control event table, and data reporting group table, and will be updated synchronously after importing
              </div>
            )}
            
            {/* Footer */}
            <div style={{ padding: '15px 25px', display: 'flex', justifyContent: 'flex-end', gap: '15px', borderTop: '1px solid #f0f0f0' }}>
              <button className="btn" onClick={closeModal} style={{ padding: '8px 25px', fontSize: '13px', backgroundColor: 'white', border: '1px solid #dcdfe6', color: '#606266', borderRadius: '4px', cursor: 'pointer' }}>cancel</button>
              <button className="btn btn-primary" onClick={() => { if(modalConfig.mode === 'export') handleExport('edge'); closeModal(); }} style={{ padding: '8px 25px', fontSize: '13px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none' }}>
                {modalConfig.mode === 'import' ? 'Import' : 'sure'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemConfig;
