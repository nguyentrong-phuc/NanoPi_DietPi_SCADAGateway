import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Globe, Settings, Cpu, HardDrive } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine top-level active tab
  const getTopLevel = () => {
    if (path.startsWith('/network')) return 'network';
    if (path.startsWith('/edge-computing')) return 'edge-computing';
    if (path.startsWith('/system-management')) return 'system-management';
    return 'overview';
  };

  const topLevel = getTopLevel();

  // Render Sub-Sidebar based on top-level
  const renderSubSidebar = () => {
    if (topLevel === 'overview') {
      return null; // No sidebar for overview in reference screenshot
    }

    if (topLevel === 'network') {
      return (
        <div className="sub-sidebar">
          <NavLink to="/network/switching" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Network Switching</NavLink>
          <NavLink to="/network/cellular" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Cellular</NavLink>
          <NavLink to="/network/wireless" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Wireless Client</NavLink>
          <NavLink to="/network/ethernet-port" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Ethernet Port</NavLink>
          <NavLink to="/network/wan" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>WAN</NavLink>
          <NavLink to="/network/lan" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>LAN</NavLink>
          <NavLink to="/network/routing" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Routing</NavLink>
          <NavLink to="/network/vpn" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>VPN</NavLink>
          <NavLink to="/network/diagnostics" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Diagnostics</NavLink>
          <NavLink to="/network/firewall" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Firewall</NavLink>
        </div>
      );
    }

    if (topLevel === 'edge-computing') {
      return (
        <div className="sub-sidebar">
          <NavLink to="/edge-computing/wizard" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Wizard</NavLink>
          <NavLink to="/edge-computing/edge-mode" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Edge Mode</NavLink>
          <NavLink to="/edge-computing/extension-io" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Extension IO</NavLink>
          <NavLink to="/edge-computing/io-module" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>IO Module</NavLink>
          <NavLink to="/edge-computing/data-point" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Data Point</NavLink>
          <NavLink to="/edge-computing/protocol" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Protocol</NavLink>
          <NavLink to="/edge-computing/edge-gateway" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Edge Gateway</NavLink>
        </div>
      );
    }

    if (topLevel === 'system-management') {
      return (
        <div className="sub-sidebar">
          <NavLink to="/system-management/time" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>System Time</NavLink>
          <NavLink to="/system-management/log" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>LOG</NavLink>
          <div className="sidebar-item" style={{color: '#999'}}>System</div>
          <NavLink to="/system-management/configuration" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`} style={{paddingLeft: '30px'}}>Configuration Man...</NavLink>
          <NavLink to="/system-management/firmware" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`} style={{paddingLeft: '30px'}}>Firmware Upgrade</NavLink>
          <NavLink to="/system-management/user" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`} style={{paddingLeft: '30px'}}>User Management</NavLink>
          <NavLink to="/system-management/reboot" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`} style={{paddingLeft: '30px'}}>Reboot</NavLink>
          <NavLink to="/system-management/remote" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Remote Management</NavLink>
          <NavLink to="/system-management/access" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Access Tools</NavLink>
          <NavLink to="/system-management/location" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Location</NavLink>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="app-container">
      {/* Top Horizontal Bar */}
      <div className="top-bar">
        <div className="top-bar-logo">
          WukongEdge
        </div>
        <div className="top-bar-nav">
          <NavLink to="/overview" className={({isActive}) => `top-bar-item ${isActive || topLevel === 'overview' ? 'active' : ''}`}>
            <Globe size={18} /> Overview
          </NavLink>
          <NavLink to="/network/wan" className={({isActive}) => `top-bar-item ${topLevel === 'network' ? 'active' : ''}`}>
            <Globe size={18} /> Network
          </NavLink>
          <NavLink to="/edge-computing/protocol" className={({isActive}) => `top-bar-item ${topLevel === 'edge-computing' ? 'active' : ''}`}>
            <Cpu size={18} /> Edge Computing
          </NavLink>
          <NavLink to="/system-management/configuration" className={({isActive}) => `top-bar-item ${topLevel === 'system-management' ? 'active' : ''}`}>
            <Settings size={18} /> System Management
          </NavLink>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
           <span style={{fontSize: '12px'}}>admin</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-wrapper">
        {renderSubSidebar()}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
