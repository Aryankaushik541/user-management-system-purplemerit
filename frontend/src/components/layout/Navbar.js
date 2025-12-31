import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            User Management
          </Link>

          <div className="navbar-menu">
            <Link
              to="/profile"
              className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
            >
              Profile
            </Link>
            {isAdmin && (
              <Link
                to="/dashboard"
                className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="navbar-user">
            <div className="user-info">
              <span className="user-name">{user?.fullName}</span>
              <span className={`badge badge-${user?.role === 'admin' ? 'primary' : 'secondary'}`}>
                {user?.role}
              </span>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;