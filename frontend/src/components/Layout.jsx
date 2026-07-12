import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Globe, Settings, Cpu, HardDrive, UserCog, ChevronDown } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <NavLink to="/network/wan" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>WAN</NavLink>
          <NavLink to="/network/lan" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>LAN</NavLink>
          <NavLink to="/network/wireless" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Wireless</NavLink>
          <NavLink to="/network/routing" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Routing</NavLink>
          <NavLink to="/network/diagnostics" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Diagnostics</NavLink>
        </div>
      );
    }

    if (topLevel === 'edge-computing') {
      return (
        <div className="sub-sidebar">
          <NavLink to="/edge-computing/edge-mode" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Edge Mode</NavLink>
          <NavLink to="/edge-computing/data-point" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Data Point</NavLink>
          <NavLink to="/edge-computing/protocol" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Protocol</NavLink>
        </div>
      );
    }

    if (topLevel === 'system-management') {
      return (
        <div className="sub-sidebar">
          <NavLink to="/system-management/time" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>System Time</NavLink>
          <NavLink to="/system-management/log" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>LOG</NavLink>
          <NavLink to="/system-management/configuration" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Configuration Management</NavLink>
          <NavLink to="/system-management/reboot" className={({isActive}) => `sidebar-item ${isActive ? 'active' : ''}`}>Reboot</NavLink>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="app-container">
      {/* Top Horizontal Bar */}
      <div className="top-bar">
        <div className="top-bar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/Raitek_round_logo.png" alt="Logo" style={{ height: '36px' }} onError={(e) => e.target.style.display='none'} />
          RaitekEdge
        </div>
        <div className="top-bar-nav">
          <NavLink to="/overview" className={({isActive}) => `top-bar-item ${isActive || topLevel === 'overview' ? 'active' : ''}`}>
            <Globe size={18} /> Overview
          </NavLink>
          <NavLink to="/network/wan" className={({isActive}) => `top-bar-item ${topLevel === 'network' ? 'active' : ''}`}>
            <Globe size={18} /> Network
          </NavLink>
          <NavLink to="/edge-computing/edge-mode" className={({isActive}) => `top-bar-item ${topLevel === 'edge-computing' ? 'active' : ''}`}>
            <Cpu size={18} /> Edge Computing
          </NavLink>
          <NavLink to="/system-management/time" className={({isActive}) => `top-bar-item ${topLevel === 'system-management' ? 'active' : ''}`}>
            <Settings size={18} /> System Management
          </NavLink>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
           <div 
             style={{ 
               display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', 
               padding: '4px 12px 4px 4px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.1)',
               transition: 'background-color 0.2s'
             }}
             onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
             onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
             onClick={() => setDropdownOpen(!dropdownOpen)}
           >
             <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <UserCog size={16} color="var(--primary-color)" />
             </div>
             <span style={{ fontSize: '13px', fontWeight: 600 }}>admin</span>
             <ChevronDown size={16} />
           </div>
           
           {dropdownOpen && (
             <div style={{ 
               position: 'absolute', top: '45px', right: '0', backgroundColor: 'white', 
               boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '4px', width: '150px',
               color: '#333', overflow: 'hidden', zIndex: 1000
             }}>
               <div style={{ padding: '12px 15px', borderBottom: '1px solid #eee', fontSize: '13px', cursor: 'pointer' }} onClick={() => { setDropdownOpen(false); navigate('/system-management/user'); }}>
                 Change Password
               </div>
               <div style={{ padding: '12px 15px', fontSize: '13px', cursor: 'pointer', color: '#dc3545' }} onClick={() => { setDropdownOpen(false); navigate('/login'); }}>
                 Logout
               </div>
             </div>
           )}
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
