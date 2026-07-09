import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded for now based on user request (admi/admi)
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'fake-jwt-token');
      navigate('/overview');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ height: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="card" style={{ width: '400px', backgroundColor: 'var(--bg-panel)', color: 'white', border: '1px solid var(--border-color-dark)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'white' }}>WukongEdge SCADA Gateway</h2>
        {error && <div className="text-danger" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" style={{ color: 'var(--text-muted)' }}>Username</label>
            <input 
              type="text" 
              className="form-control" 
              style={{ backgroundColor: 'var(--bg-dark)', color: 'white', borderColor: 'var(--border-color-dark)' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" style={{ color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              className="form-control" 
              style={{ backgroundColor: 'var(--bg-dark)', color: 'white', borderColor: 'var(--border-color-dark)' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
