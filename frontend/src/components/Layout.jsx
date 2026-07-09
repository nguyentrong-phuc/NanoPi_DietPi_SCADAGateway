import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Network, Server, Settings, Activity, LogOut } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-container fade-in">
      {/* Header */}
      <header className="app-header justify-between">
        <div className="flex items-center">
          <div className="app-header-logo">WukongEdge</div>
          <nav className="app-header-nav">
            <NavLink to="/overview">Overview</NavLink>
            <NavLink to="/network">Network</NavLink>
            <NavLink to="/edge">Edge Computing</NavLink>
            <NavLink to="/system">System Management</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">admin</span>
          <button onClick={handleLogout} className="btn" style={{ color: 'white', padding: '4px' }}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className="app-main">
        {/* Sidebar */}
        <aside className="app-sidebar">
          <ul className="app-sidebar-menu">
            <li className="app-sidebar-item">
              <NavLink to="/overview">
                <Activity size={18} className="mr-2" style={{ marginRight: '8px' }} />
                Overview
              </NavLink>
            </li>
            <li className="app-sidebar-item">
              <NavLink to="/network">
                <Network size={18} className="mr-2" style={{ marginRight: '8px' }} />
                Network
              </NavLink>
            </li>
            <li className="app-sidebar-item">
              <NavLink to="/edge">
                <Server size={18} className="mr-2" style={{ marginRight: '8px' }} />
                Edge Computing
              </NavLink>
            </li>
            <li className="app-sidebar-item">
              <NavLink to="/system">
                <Settings size={18} className="mr-2" style={{ marginRight: '8px' }} />
                System Management
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Page Content */}
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
