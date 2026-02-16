<<<<<<< HEAD
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">
          <h2>JobPilot</h2>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-user">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
=======
import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/jobs">Jobs</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
>>>>>>> main
