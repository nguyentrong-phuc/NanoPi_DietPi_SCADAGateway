import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Network from './pages/Network';
import EdgeComputing from './pages/EdgeComputing';
import SystemManagement from './pages/SystemManagement';
import './index.css';

// Simple auth wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="network" element={<Network />} />
          <Route path="edge" element={<EdgeComputing />} />
          <Route path="system" element={<SystemManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
