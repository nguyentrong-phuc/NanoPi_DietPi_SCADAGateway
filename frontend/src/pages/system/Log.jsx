import React, { useState, useEffect } from 'react';
import { message } from 'antd';

const Log = () => {
  const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';
  const [logs, setLogs] = useState([]);
  
  const fetchLogs = () => {
    fetch(`${API_URL}/api/system/logs`)
      .then(res => res.json())
      .then(data => setLogs(data.logs || []))
      .catch(err => console.error("Failed to fetch logs:", err));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDownload = () => {
    window.location.href = `${API_URL}/api/system/logs/download`;
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all logs?")) {
      fetch(`${API_URL}/api/system/logs/clear`, { method: 'POST' })
        .then(res => res.json())
        .then(() => {
          setLogs([]);
          message.success('Logs cleared successfully', 2);
        })
        .catch(err => {
          console.error(err);
          message.error('Failed to clear logs', 2);
        });
    }
  };
  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">LOG</h2>
      </div>

      <div className="content-area" style={{ padding: '20px' }}>
        <div className="card-panel">
          <div className="card-header" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="card-header-line"></span>
              <span className="card-title">Log Viewer</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary" onClick={fetchLogs}>Refresh</button>
              <button className="btn" style={{ backgroundColor: '#28a745', color: 'white' }} onClick={handleDownload}>Download Log</button>
              <button className="btn btn-danger solid" onClick={handleClear}>Clear History Log</button>
            </div>
          </div>

          <div className="table-container">
            <table className="table-unified">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>ID</th>
                  <th style={{ width: '150px' }}>Time</th>
                  <th style={{ width: '100px' }}>Level</th>
                  <th style={{ textAlign: 'left' }}>Log</th>
                </tr>
              </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No logs available</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.time}</td>
                    <td style={{ color: log.level === 'Warning' ? '#f5a623' : log.level === 'Error' ? '#e74c3c' : '#3498db', fontWeight: 600 }}>{log.level}</td>
                    <td style={{ textAlign: 'left' }}>{log.log}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
