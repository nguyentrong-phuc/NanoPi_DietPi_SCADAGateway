import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, any login goes to overview
    navigate('/overview');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e9ecef',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    }}>
      <div style={{
        display: 'flex',
        width: '900px',
        height: '500px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Left Side - Branding */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, var(--primary-color), #002266)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Subtle background decoration */}
          <div style={{ position: 'absolute', top: '10%', left: '10%', width: '100px', height: '100px', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '10px', transform: 'rotate(45deg)' }}></div>
          <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '5px', transform: 'rotate(20deg)' }}></div>
          
          <img src="/Raitek_round_logo.png" alt="Raitek Logo" style={{ height: '80px', marginBottom: '30px', zIndex: 1 }} onError={(e) => e.target.style.display='none'} />
          
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '15px', letterSpacing: '1px', zIndex: 1, textTransform: 'uppercase' }}>
            Smart SCADA Gateway
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', fontWeight: 500, letterSpacing: '2px', zIndex: 1, textTransform: 'uppercase' }}>
            Empowering Industrial Edge
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          flex: 1,
          padding: '50px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#333', marginBottom: '40px', textAlign: 'center' }}>
            Welcome to RaitekEdge
          </h2>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '8px', fontWeight: 600 }}>Account</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', padding: '0 12px', transition: 'border-color 0.2s' }}>
                <User size={18} color="#999" />
                <input 
                  type="text" 
                  placeholder="Please enter account name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ flex: 1, border: 'none', padding: '12px 10px', outline: 'none', fontSize: '14px' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '8px', fontWeight: 600 }}>Password</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', padding: '0 12px', transition: 'border-color 0.2s' }}>
                <Lock size={18} color="#999" />
                <input 
                  type="password" 
                  placeholder="Please enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ flex: 1, border: 'none', padding: '12px 10px', outline: 'none', fontSize: '14px' }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                marginTop: '10px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
