import React, { useState } from 'react';
import { message } from 'antd';

const SystemConfig = () => {
  const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';
  const [modalConfig, setModalConfig] = useState({ isOpen: false, mode: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleExport = () => {
    window.location.href = `${API_URL}/api/system/config/export`;
  };

  const handleFileSelect = (file) => {
    if (file) setSelectedFile(file);
  };

  const handleImport = () => {
    if (!selectedFile) return message.warning('Please select a file first', 2);
    const formData = new FormData();
    formData.append('config_file', selectedFile);
    fetch(`${API_URL}/api/system/config/import`, { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        message.success(data.message || 'Import successful!', 2);
        closeModal();
      })
      .catch(err => {
        console.error(err);
        message.error('Import failed!', 2);
      });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, mode: '' });
    setSelectedFile(null);
  };

  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Configuration Management</h2>
      </div>

      <div className="content-area">
        <div className="card-panel" style={{ maxWidth: '800px' }}>
          <div className="card-header">
            <span className="card-header-line"></span>
            <span className="card-title">System Config</span>
          </div>
        
          <div style={{ paddingLeft: '20px' }}>
            <div className="form-group-unified-row">
              <span className="form-label-bold">Export:</span>
              <button className="btn btn-primary" style={{ width: '200px' }} onClick={handleExport}>Export Config</button>
            </div>
            <div className="form-group-unified-row">
              <span className="form-label-bold">Import:</span>
              <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => setModalConfig({ isOpen: true, mode: 'import_system' })}>Import Config</button>
            </div>
            <div className="form-group-unified-row" style={{ marginBottom: '40px' }}>
              <span className="form-label-bold">Restore Factory:</span>
              <button className="btn btn-danger solid" style={{ width: '200px' }}>Restore Factory</button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '30px', marginTop: '20px' }}>
            <div className="card-header">
              <span className="card-header-line"></span>
              <span className="card-title">Edge Computing Config</span>
            </div>

            <div style={{ paddingLeft: '20px' }}>
              <div className="form-group-unified-row">
                <span className="form-label-bold">Export:</span>
                <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => setModalConfig({ isOpen: true, mode: 'export' })}>Export Config</button>
              </div>
              <div className="form-group-unified-row" style={{ marginBottom: '5px' }}>
                <span className="form-label-bold">Import:</span>
                <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => setModalConfig({ isOpen: true, mode: 'import' })}>Import Config</button>
              </div>
              <div style={{ paddingLeft: '155px', color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5, marginTop: '10px' }}>
                Note: The export point table will synchronously export the data point table, protocol conversion data point table, linkage control event table, and data reporting group table, and will be updated synchronously after importing
              </div>
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
                {modalConfig.mode === 'import' ? 'Import mapping table' : 
                 modalConfig.mode === 'import_system' ? 'Import configuration file' : 'Export'}
              </h3>
              <span onClick={closeModal} style={{ cursor: 'pointer', fontSize: '18px', color: '#999' }}>&times;</span>
            </div>
            
            {/* Body */}
            {(modalConfig.mode === 'import' || modalConfig.mode === 'import_system') ? (
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
            <div style={{ padding: '15px 25px', display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #f0f0f0' }}>
              <button className="btn btn-default" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                if (modalConfig.mode === 'export') { handleExport(); closeModal(); }
                else if (modalConfig.mode === 'import' || modalConfig.mode === 'import_system') { handleImport(); }
              }}>
                {(modalConfig.mode === 'import' || modalConfig.mode === 'import_system') ? 'Import' : 'Sure'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemConfig;
