import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">
          <h2>✈️ JobPilot</h2>
        </Link>
      </div>

      <div className="navbar-user">
        <span>👋 {user?.name || 'User'}</span>
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-secondary btn-small"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⚙️ Menu
          </button>
          {showMenu && (
            <>
              <div
                onClick={() => setShowMenu(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 99 }}
              />
              <div style={{
                position: 'absolute', right: 0, top: '110%',
                background: 'white', borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                border: '1px solid #e2e8f0',
                minWidth: '180px', zIndex: 100, overflow: 'hidden'
              }}>
                <Link
                  to="/profile"
                  onClick={() => setShowMenu(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '1rem 1.25rem', color: '#0f172a',
                    textDecoration: 'none', fontWeight: 600,
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.target.style.background = '#f1f5f9'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}
                >
                  👤 Profile
                </Link>
                <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #e2e8f0' }} />
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '1rem 1.25rem', color: '#ef4444',
                    background: 'none', border: 'none', width: '100%',
                    textAlign: 'left', fontWeight: 600, cursor: 'pointer',
                    fontSize: '1rem', transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  🚪 Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;