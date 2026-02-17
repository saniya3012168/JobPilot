import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>✈️ JobPilot</h1>
        <p className="tagline">Your Smart Job Search Co-Pilot</p>
        <p className="description">
          Stop losing track of applications. JobPilot organizes your entire 
          job search — applications, interviews, resumes — all in one place. 
          Track every opportunity and land your dream job faster.
        </p>

        <div className="landing-actions">
          <Link to="/register" className="btn btn-primary btn-large">
            🚀 Get Started Free
          </Link>
          <Link to="/login" className="btn btn-secondary btn-large">
            🔑 Sign In
          </Link>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">💼</span>
            <h3>Job Tracking</h3>
            <p>Track all your applications with status updates in real-time. Never lose track of an opportunity.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🗓️</span>
            <h3>Interview Scheduler</h3>
            <p>Never miss an interview with our smart scheduling system. Get reminders and stay organized.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📈</span>
            <h3>Analytics Dashboard</h3>
            <p>Get insights on your job search with detailed analytics. Understand your success patterns.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;