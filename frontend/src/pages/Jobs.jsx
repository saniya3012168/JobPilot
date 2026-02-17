import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jobService } from '../services/jobService';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [filter, setFilter] = useState('All');
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', salary: '', description: '', status: 'Applied'
  });

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const res = await jobService.getAllJobs();
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editJob) {
        await jobService.updateJob(editJob.id, formData);
      } else {
        await jobService.createJob(formData);
      }
      fetchJobs();
      closeModal();
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Delete this job application?')) {
      try {
        await jobService.deleteJob(jobId);
        fetchJobs();
      } catch (err) {
        console.error('Error deleting:', err);
      }
    }
  };

  const openEdit = (job) => {
    setEditJob(job);
    setFormData({
      title: job.title, company: job.company,
      location: job.location || '', salary: job.salary || '',
      description: job.description || '', status: job.status
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditJob(null);
    setFormData({ title: '', company: '', location: '', salary: '', description: '', status: 'Applied' });
  };

  const getStatusColor = (status) => ({
    'Applied': '#3b82f6', 'Interview': '#f59e0b',
    'Offer': '#10b981', 'Rejected': '#ef4444'
  }[status] || '#6b7280');

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <div className="page-header">
            <div>
              <h1>Job Applications</h1>
              <p>Track and manage all your applications ({jobs.length} total)</p>
            </div>
            <button onClick={() => setShowModal(true)} className="btn btn-primary">
              + Add New Job
            </button>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <label>Filter by Status:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All ({jobs.length})</option>
              {['Applied', 'Interview', 'Offer', 'Rejected'].map(s => (
                <option key={s} value={s}>
                  {s} ({jobs.filter(j => j.status === s).length})
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : filteredJobs.length === 0 ? (
            <div className="empty-state">
              <p>
                {filter === 'All'
                  ? 'No job applications yet. Add your first one!'
                  : `No ${filter} applications found.`}
              </p>
              <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                + Add Job
              </button>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job, i) => (
                <div key={job.id} className="job-card" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="job-card-header">
                    <h3>{job.title}</h3>
                    <span className="status-badge" style={{ background: getStatusColor(job.status) }}>
                      {job.status}
                    </span>
                  </div>
                  <div className="job-card-body">
                    <p>🏢 {job.company}</p>
                    {job.location && <p>📍 {job.location}</p>}
                    {job.salary && <p>💰 {job.salary}</p>}
                    {job.description && (
                      <p>📝 {job.description.substring(0, 100)}{job.description.length > 100 ? '...' : ''}</p>
                    )}
                    <p>📅 {new Date(job.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="job-card-actions">
                    <button onClick={() => openEdit(job)} className="btn btn-secondary btn-small">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(job.id)} className="btn btn-danger btn-small">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{editJob ? '✏️ Edit Job' : '➕ Add New Job'}</h2>
                  <button onClick={closeModal} className="close-btn">✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Job Title *</label>
                      <input
                        type="text" value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Software Engineer" required
                      />
                    </div>
                    <div className="form-group">
                      <label>Company *</label>
                      <input
                        type="text" value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Google" required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text" value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Bangalore, India"
                      />
                    </div>
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        type="text" value={formData.salary}
                        onChange={e => setFormData({ ...formData, salary: e.target.value })}
                        placeholder="e.g. 12 LPA"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Notes / Description</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Add any notes about this job..."
                      rows="3"
                    />
                  </div>
                  <div className="modal-actions">
                    <button type="button" onClick={closeModal} className="btn btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editJob ? '💾 Update Job' : '➕ Add Job'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;