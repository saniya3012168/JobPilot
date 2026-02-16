import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jobService } from '../services/jobService';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAnalytics();
  }, []);
  
  const fetchAnalytics = async () => {
    try {
      const response = await jobService.getAnalytics();
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const calculateOfferRate = () => {
    if (!analytics || analytics.total_jobs === 0) return 0;
    const offers = analytics.status_breakdown?.Offer || 0;
    return ((offers / analytics.total_jobs) * 100).toFixed(1);
  };
  
  const calculateInterviewRate = () => {
    if (!analytics || analytics.total_jobs === 0) return 0;
    const interviews = analytics.status_breakdown?.Interview || 0;
    return ((interviews / analytics.total_jobs) * 100).toFixed(1);
  };
  
  if (loading) {
    return (
      <div className="app-layout">
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <main className="content">
            <div className="loading">Loading analytics...</div>
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
            <h1>Analytics Dashboard</h1>
            <p>Track your job search progress and insights</p>
          </div>
          
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Application Success Rate</h3>
              <div className="big-number">{calculateOfferRate()}%</div>
              <p>Offer rate from total applications</p>
            </div>
            
            <div className="analytics-card">
              <h3>Interview Conversion</h3>
              <div className="big-number">{calculateInterviewRate()}%</div>
              <p>Applications leading to interviews</p>
            </div>
            
            <div className="analytics-card">
              <h3>Active Applications</h3>
              <div className="big-number">{analytics?.total_jobs || 0}</div>
              <p>Total applications tracked</p>
            </div>
            
            <div className="analytics-card">
              <h3>Recent Activity</h3>
              <div className="big-number">{analytics?.recent_applications || 0}</div>
              <p>Applications in last 30 days</p>
            </div>
          </div>
          
          <div className="charts-section">
            <div className="chart-card">
              <h3>Applications by Status</h3>
              <div className="chart-bars">
                {analytics?.status_breakdown && Object.entries(analytics.status_breakdown).map(([status, count]) => {
                  const percentage = analytics.total_jobs > 0 ? (count / analytics.total_jobs) * 100 : 0;
                  const colors = {
                    'Applied': '#3b82f6',
                    'Interview': '#f59e0b',
                    'Offer': '#10b981',
                    'Rejected': '#ef4444'
                  };
                  
                  return (
                    <div key={status} className="bar-item">
                      <div className="bar-label">
                        <span>{status}</span>
                        <span>{count}</span>
                      </div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill" 
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: colors[status] || '#6b7280'
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="insights-section">
            <h3>Insights & Tips</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <h4>📈 Application Volume</h4>
                <p>
                  You've applied to {analytics?.total_jobs || 0} positions. 
                  {analytics?.total_jobs < 10 && " Consider increasing your application rate to improve your chances."}
                  {analytics?.total_jobs >= 10 && analytics?.total_jobs < 30 && " You're on track! Keep applying consistently."}
                  {analytics?.total_jobs >= 30 && " Great job staying active in your search!"}
                </p>
              </div>
              
              <div className="insight-card">
                <h4>🎯 Offer Success</h4>
                <p>
                  {calculateOfferRate() > 5 ? 
                    "Excellent offer rate! Your applications are well-targeted." : 
                    "Focus on quality over quantity to improve your offer rate."}
                </p>
              </div>
              
              <div className="insight-card">
                <h4>🗓️ Interview Performance</h4>
                <p>
                  You have {analytics?.upcoming_interviews || 0} upcoming interviews scheduled. 
                  {analytics?.upcoming_interviews > 0 && " Good luck! Make sure to prepare thoroughly."}
                  {analytics?.upcoming_interviews === 0 && " Keep applying to secure more interview opportunities."}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;