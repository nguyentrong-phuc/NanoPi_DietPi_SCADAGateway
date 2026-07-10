import React, { useEffect } from 'react';

const NodeRedEditor = () => {
  useEffect(() => {
    document.title = 'Node-RED';
    return () => {
      document.title = 'Vite + React'; // Default vite title, or whatever it is
    };
  }, []);

  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe 
        src={`http://${window.location.hostname}:1880`} 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Node-RED"
      />
    </div>
  );
};

export default NodeRedEditor;
