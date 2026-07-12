import React, { useState } from 'react';
import { message } from 'antd';

const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

const UserManagement = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      return message.error('Please fill in all fields', 2);
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      return message.error('New passwords do not match', 2);
    }
    if (passwords.newPassword.length < 5) {
      return message.error('New password must be at least 5 characters', 2);
    }

    setLoading(true);
    fetch(`${API_URL}/api/system/password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword: passwords.oldPassword, newPassword: passwords.newPassword })
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          message.success('Password changed successfully. Please log in again.', 3);
          setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
          setTimeout(() => window.location.href = '/login', 3000);
        } else {
          message.error(data.error || 'Failed to change password', 2);
        }
      })
      .catch(() => message.error('Network error', 2))
      .finally(() => setLoading(false));
  };

  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Change Password</h2>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="card-panel" style={{ padding: '20px 25px' }}>
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <span className="card-header-line"></span>
            <span className="card-title">Update Admin Password</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', maxWidth: '400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label-bold"><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Old Password:</label>
              <input
                type="password"
                className="form-input-standard"
                value={passwords.oldPassword}
                onChange={e => handleChange('oldPassword', e.target.value)}
                style={{ height: '36px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label-bold"><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>New Password:</label>
              <input
                type="password"
                className="form-input-standard"
                value={passwords.newPassword}
                onChange={e => handleChange('newPassword', e.target.value)}
                style={{ height: '36px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label-bold"><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Confirm New Password:</label>
              <input
                type="password"
                className="form-input-standard"
                value={passwords.confirmPassword}
                onChange={e => handleChange('confirmPassword', e.target.value)}
                style={{ height: '36px' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '25px', display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-primary"
              onClick={handleApply}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Apply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
