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
              <div className="stat-icon">💼</div>
              <div className="stat-info">
                <h3>{stats?.total_jobs || 0}</h3>
                <p>Total Applications</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🗓️</div>
              <div className="stat-info">
                <h3>{stats?.total_interviews || 0}</h3>
                <p>Total Interviews</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⏰</div>
              <div className="stat-info">
                <h3>{stats?.upcoming_interviews || 0}</h3>
                <p>Upcoming Interviews</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <h3>{stats?.recent_applications || 0}</h3>
                <p>Last 30 Days</p>
              </div>
            </div>
          </div>
          
          <div className="dashboard-sections">
            <div className="section">
              <h2>Recent Applications</h2>
              {recentJobs.length > 0 ? (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Applied Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentJobs.map(job => (
                        <tr key={job.id}>
                          <td>{job.company}</td>
                          <td>{job.title}</td>
                          <td><span className="badge">{job.status}</span></td>
                          <td>{job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="empty-state">No applications yet. Start by adding your first job!</p>
              )}
            </div>
            
            <div className="section">
              <h2>Upcoming Interviews</h2>
              {upcomingInterviews.length > 0 ? (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingInterviews.map(interview => (
                        <tr key={interview.id}>
                          <td>{interview.company}</td>
                          <td>{interview.interview_type}</td>
                          <td>{new Date(interview.interview_date).toLocaleDateString()}</td>
                          <td>{new Date(interview.interview_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="empty-state">No upcoming interviews scheduled.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;