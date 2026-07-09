import React from 'react';

const Overview = () => {
  return (
    <div className="fade-in">
      <h2>Overview</h2>
      <div className="grid grid-cols-2 grid-gap">
        <div className="card">
          <div className="card-header">System Information</div>
          <div className="grid grid-cols-2 grid-gap" style={{ fontSize: '0.9rem' }}>
            <div>
              <p><span className="text-muted">Name:</span> <strong>WukongEdge SCADA</strong></p>
              <p><span className="text-muted">Model:</span> <strong>NanoPi</strong></p>
              <p><span className="text-muted">Version:</span> <strong>V1.0.0</strong></p>
              <p><span className="text-muted">OS:</span> <strong>DietPi Linux</strong></p>
            </div>
            <div>
              <p><span className="text-muted">MAC-1:</span> <strong>D4:AD:20:F9:3F:C9</strong></p>
              <p><span className="text-muted">MAC-2:</span> <strong>D4:AD:20:F9:3F:CA</strong></p>
              <p><span className="text-muted">Device Time:</span> <strong>2026-07-09</strong></p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Performance</div>
          <div style={{ fontSize: '0.9rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div className="flex justify-between mb-1">
                <span>CPU Usage</span>
                <span>45%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#eee', height: '8px', borderRadius: '4px' }}>
                <div style={{ width: '45%', backgroundColor: 'var(--primary-color)', height: '100%', borderRadius: '4px' }}></div>
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div className="flex justify-between mb-1">
                <span>Memory</span>
                <span>38%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#eee', height: '8px', borderRadius: '4px' }}>
                <div style={{ width: '38%', backgroundColor: 'var(--primary-color)', height: '100%', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
