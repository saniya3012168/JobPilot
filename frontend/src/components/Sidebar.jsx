import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/jobs', icon: '💼', label: 'Jobs' },
    { path: '/interviews', icon: '🗓️', label: 'Interviews' },
    { path: '/resume', icon: '📄', label: 'Resume' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;