import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import NetworkWAN from './pages/network/WAN';
import NetworkLAN from './pages/network/LAN';
import EthernetPort from './pages/network/EthernetPort';
import Routing from './pages/network/Routing';
import Diagnostics from './pages/network/Diagnostics';

// Edge Computing
import EdgeMode from './pages/edge/EdgeMode';
import NodeRedEditor from './pages/edge/NodeRedEditor';
import IOModule from './pages/edge/IOModule';
import DataPoint from './pages/edge/DataPoint';
import Protocol from './pages/edge/Protocol';
import SerialPort from './pages/edge/SerialPort';
import Communication from './pages/edge/Communication';
import DataQueryControl from './pages/edge/DataQueryControl';
import DataReporting from './pages/edge/DataReporting';
import LinkageControl from './pages/edge/LinkageControl';

// System Management
import SystemTime from './pages/system/SystemTime';
import Log from './pages/system/Log';
import SystemConfig from './pages/system/SystemConfig';
import Reboot from './pages/system/Reboot';

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
        <Route path="/nodered" element={<NodeRedEditor />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          
          {/* Network Routes */}
          <Route path="network">
            <Route index element={<Navigate to="/network/ethernet-port" replace />} />
            <Route path="ethernet-port" element={<EthernetPort />} />
            <Route path="wan" element={<NetworkWAN />} />
            <Route path="lan" element={<NetworkLAN />} />
            <Route path="routing" element={<Routing />} />
            <Route path="diagnostics" element={<Diagnostics />} />
            <Route path="*" element={<Placeholder name="Network Module" />} />
          </Route>

          {/* Edge Computing Routes */}
          <Route path="edge-computing">
            <Route index element={<Navigate to="/edge-computing/edge-mode" replace />} />
            <Route path="edge-mode" element={<EdgeMode />} />
            <Route path="io-module" element={<IOModule />} />
            <Route path="data-point" element={<DataPoint />} />
            <Route path="protocol" element={<Protocol />} />
            <Route path="serial-port" element={<SerialPort />} />
            <Route path="communication" element={<Communication />} />
            <Route path="data-query-control" element={<DataQueryControl />} />
            <Route path="data-reporting" element={<DataReporting />} />
            <Route path="linkage-control" element={<LinkageControl />} />
            <Route path="*" element={<Placeholder name="Edge Computing Module" />} />
          </Route>

          {/* System Management Routes */}
          <Route path="system-management">
            <Route index element={<Navigate to="/system-management/time" replace />} />
            <Route path="time" element={<SystemTime />} />
            <Route path="log" element={<Log />} />
            <Route path="configuration" element={<SystemConfig />} />
            <Route path="reboot" element={<Reboot />} />
            <Route path="*" element={<Placeholder name="System Management Module" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
