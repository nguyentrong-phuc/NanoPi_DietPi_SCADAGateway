import React from 'react';
import { Download, Upload, RotateCcw } from 'lucide-react';

const SystemManagement = () => {
  const handleExport = (type) => {
    alert(`Exporting ${type} configuration...`);
    // Will trigger download from backend API
  };

  const handleImport = (type) => {
    // In a real app, this would open a file dialog
    alert(`Trigger import for ${type} configuration...`);
  };

  return (
    <div className="fade-in">
      <h2>System Management</h2>

      <div className="card">
        <div className="card-header">Configuration Management</div>
        
        <div style={{ padding: '1rem' }}>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>System Config</h4>
          
          <div className="grid grid-cols-2 grid-gap" style={{ maxWidth: '600px' }}>
            <div className="flex items-center justify-between form-group">
              <span className="text-muted">Export:</span>
              <button className="btn btn-outline" onClick={() => handleExport('system')}>
                <Download size={16} /> Export Config
              </button>
            </div>
            
            <div className="flex items-center justify-between form-group">
              <span className="text-muted">Import:</span>
              <button className="btn btn-outline" onClick={() => handleImport('system')}>
                <Upload size={16} /> Import Config
              </button>
            </div>

            <div className="flex items-center justify-between form-group">
              <span className="text-muted">Restore Factory:</span>
              <button className="btn btn-danger">
                <RotateCcw size={16} /> Restore Factory
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', marginTop: '1rem' }}>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Edge Computing Config</h4>
          
          <div className="grid grid-cols-2 grid-gap" style={{ maxWidth: '600px' }}>
            <div className="flex items-center justify-between form-group">
              <span className="text-muted">Export:</span>
              <button className="btn btn-outline" onClick={() => handleExport('edge')}>
                <Download size={16} /> Export Config
              </button>
            </div>
            
            <div className="flex items-center justify-between form-group">
              <span className="text-muted">Import:</span>
              <button className="btn btn-outline" onClick={() => handleImport('edge')}>
                <Upload size={16} /> Import Config
              </button>
            </div>
          </div>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
            Note: The export point table will synchronously export the data point table, protocol conversion data point table, linkage control event table, and will be updated synchronously after importing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemManagement;
