import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jobService } from '../services/jobService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, jobsRes, interviewsRes] = await Promise.all([
        jobService.getAnalytics(),
        jobService.getAllJobs(),
        jobService.getUpcomingInterviews()
      ]);

      setStats(analyticsRes.data.analytics);
      setRecentJobs(jobsRes.data.jobs.slice(0, 5));
      setUpcomingInterviews(interviewsRes.data.interviews.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-layout">
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <main className="content">
            <div className="loading">Loading...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <div className="page-header">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your job search overview.</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats?.total_jobs || 0}</h3>
              <p>Total Applications</p>
            </div>

            <div className="stat-card">
              <h3>{stats?.total_interviews || 0}</h3>
              <p>Total Interviews</p>
            </div>

            <div className="stat-card">
              <h3>{stats?.upcoming_interviews || 0}</h3>
              <p>Upcoming Interviews</p>
            </div>

            <div className="stat-card">
              <h3>{stats?.recent_applications || 0}</h3>
              <p>Last 30 Days</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
