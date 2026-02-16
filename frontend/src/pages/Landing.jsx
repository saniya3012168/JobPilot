import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to JobPilot</h1>
        <p className="tagline">Track your job applications with ease</p>
        <p className="description">
          Organize your job search, track applications, manage interviews, 
          and analyze your progress all in one place.
        </p>
        <div className="landing-actions">
          <Link to="/register" className="btn btn-primary btn-large">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary btn-large">
            Sign In
          </Link>
        </div>
        <div className="features">
          <div className="feature">
            <span className="feature-icon">💼</span>
            <h3>Job Tracking</h3>
            <p>Keep track of all your applications</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🗓️</span>
            <h3>Interview Scheduling</h3>
            <p>Never miss an interview</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <h3>Analytics</h3>
            <p>Visualize your job search progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;