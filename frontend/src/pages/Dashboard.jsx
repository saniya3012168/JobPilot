import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jobService } from '../services/jobService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [analyticsRes, jobsRes, interviewsRes] = await Promise.all([
        jobService.getAnalytics(),
        jobService.getAllJobs(),
        jobService.getUpcomingInterviews()
      ]);
      setStats(analyticsRes.data.analytics);
      setRecentJobs(jobsRes.data.jobs?.slice(0, 5) || []);
      setUpcomingInterviews(interviewsRes.data.interviews?.slice(0, 5) || []);
    } catch (err) {
      setError('Failed to load data. Backend may be waking up (30-60 sec). Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => ({
    'Applied': '#3b82f6', 'Interview': '#f59e0b',
    'Offer': '#10b981', 'Rejected': '#ef4444'
  }[status] || '#6b7280');

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }) : 'N/A';

  if (loading) return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <div className="spinner"></div>
          <p className="loading">Loading dashboard... (first load may take 30-60 seconds)</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <div className="alert alert-error">{error}</div>
          <button className="btn btn-primary" onClick={fetchDashboardData}>🔄 Retry</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <div className="page-header">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back! Here's your job search overview.</p>
            </div>
            <button className="btn btn-secondary" onClick={fetchDashboardData}>🔄 Refresh</button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {[
              { icon: '💼', value: stats?.total_jobs || 0, label: 'Total Applications' },
              { icon: '🗓️', value: stats?.total_interviews || 0, label: 'Total Interviews' },
              { icon: '⏰', value: stats?.upcoming_interviews || 0, label: 'Upcoming Interviews' },
              { icon: '📈', value: stats?.recent_applications || 0, label: 'Last 30 Days' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-info">
                  <h3>{s.value}</h3>
                  <p>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Applications */}
          <div className="dashboard-sections">
            <div className="section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Recent Applications</h2>
                <Link to="/jobs" className="btn btn-secondary btn-small">View All →</Link>
              </div>
              {recentJobs.length === 0 ? (
                <div className="empty-state">
                  <p>No applications yet. <Link to="/jobs">Add your first job →</Link></p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentJobs.map((job) => (
                        <tr key={job.id}>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>{job.title}</td>
                          <td>{job.company}</td>
                          <td>
                            <span className="status-badge" style={{ background: getStatusColor(job.status) }}>
                              {job.status}
                            </span>
                          </td>
                          <td>{formatDate(job.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Upcoming Interviews */}
            <div className="section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Upcoming Interviews</h2>
                <Link to="/interviews" className="btn btn-secondary btn-small">View All →</Link>
              </div>
              {upcomingInterviews.length === 0 ? (
                <div className="empty-state">
                  <p>No upcoming interviews. <Link to="/interviews">Schedule one →</Link></p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Type</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingInterviews.map((interview) => (
                        <tr key={interview.id}>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>{interview.company}</td>
                          <td>{interview.position || 'N/A'}</td>
                          <td><span className="badge">{interview.interview_type || 'Interview'}</span></td>
                          <td>{formatDate(interview.interview_date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;