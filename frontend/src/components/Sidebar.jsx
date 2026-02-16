import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">📊</span>
          Dashboard
        </NavLink>
        <NavLink to="/jobs" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">💼</span>
          Jobs
        </NavLink>
        <NavLink to="/resume" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">📄</span>
          Resume
        </NavLink>
        <NavLink to="/interviews" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">🗓️</span>
          Interviews
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">📈</span>
          Analytics
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">👤</span>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;