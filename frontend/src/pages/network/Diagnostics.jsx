import React, { useState } from 'react';

const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

const Diagnostics = () => {
  const [activeTab, setActiveTab] = useState('Ping');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!target) return;
    setLoading(true);
    setResult(`Executing ${activeTab} on ${target}...`);
    
    fetch(`${API_URL}/api/network/diagnostics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, type: activeTab })
    })
    .then(res => res.json())
    .then(data => {
      setResult(data.output || data.error || 'No output received');
      setLoading(false);
    })
    .catch(err => {
      setResult('Error executing command');
      setLoading(false);
    });
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Diagnostics
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>

        <div>
          <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: '20px' }}>
            <div 
              onClick={() => { setActiveTab('Ping'); setResult(''); }}
              style={{ padding: '10px 20px', cursor: 'pointer', color: activeTab === 'Ping' ? '#003fb4' : '#666', borderBottom: activeTab === 'Ping' ? '2px solid #003fb4' : 'none', marginBottom: '-2px', fontWeight: activeTab === 'Ping' ? 600 : 'normal' }}
            >
              Ping
            </div>
            <div 
              onClick={() => { setActiveTab('Traceroute'); setResult(''); }}
              style={{ padding: '10px 20px', cursor: 'pointer', color: activeTab === 'Traceroute' ? '#003fb4' : '#666', borderBottom: activeTab === 'Traceroute' ? '2px solid #003fb4' : 'none', marginBottom: '-2px', fontWeight: activeTab === 'Traceroute' ? 600 : 'normal' }}
            >
              Traceroute
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <input 
              type="text" 
              placeholder="Please enter IP or Domain" 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', maxWidth: '400px' }} 
            />
            <button 
              onClick={handleSend} 
              disabled={loading || !target} 
              className="btn btn-primary"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Thick Gray Divider */}
        <div style={{ height: '15px', backgroundColor: '#eaedf2', margin: '0 -20px 20px -20px' }}></div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Diagnostics Result</span>
          </div>
          <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e0e0e0', minHeight: '300px', borderRadius: '4px', padding: '15px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '13px', color: '#333', overflowY: 'auto' }}>
            {result}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
