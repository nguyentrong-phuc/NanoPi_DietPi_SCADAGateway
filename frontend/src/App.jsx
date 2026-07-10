import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import NetworkWAN from './pages/network/WAN';
import NetworkLAN from './pages/network/LAN';
import Protocol from './pages/edge/Protocol';
import SystemConfig from './pages/system/SystemConfig';

// Placeholder for unimplemented routes
const Placeholder = ({ name }) => (
  <div style={{ padding: '20px' }}>
    <h3 style={{ color: 'var(--primary-color)' }}>{name}</h3>
    <p>This module is under development.</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          
          {/* Network Routes */}
          <Route path="network">
            <Route index element={<Navigate to="/network/wan" replace />} />
            <Route path="wan" element={<NetworkWAN />} />
            <Route path="lan" element={<NetworkLAN />} />
            <Route path="*" element={<Placeholder name="Network Module" />} />
          </Route>

          {/* Edge Computing Routes */}
          <Route path="edge-computing">
            <Route index element={<Navigate to="/edge-computing/protocol" replace />} />
            <Route path="protocol" element={<Protocol />} />
            <Route path="*" element={<Placeholder name="Edge Computing Module" />} />
          </Route>

          {/* System Management Routes */}
          <Route path="system-management">
            <Route index element={<Navigate to="/system-management/configuration" replace />} />
            <Route path="configuration" element={<SystemConfig />} />
            <Route path="*" element={<Placeholder name="System Management Module" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
