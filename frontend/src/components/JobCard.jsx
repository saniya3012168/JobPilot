import React from 'react';

const JobCard = ({ job, onEdit, onDelete, onView }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Applied': '#3b82f6',
      'Interview': '#f59e0b',
      'Offer': '#10b981',
      'Rejected': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };
  
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span 
          className="status-badge" 
          style={{ backgroundColor: getStatusColor(job.status) }}
        >
          {job.status}
        </span>
      </div>
      <div className="job-card-body">
        <p className="company">🏢 {job.company}</p>
        {job.location && <p className="location">📍 {job.location}</p>}
        {job.salary && <p className="salary">💰 {job.salary}</p>}
        {job.created_at && (
          <p className="date">📅 Applied: {new Date(job.created_at).toLocaleDateString()}</p>
        )}
      </div>
      <div className="job-card-actions">
        <button onClick={() => onView(job)} className="btn-small btn-primary">View</button>
        <button onClick={() => onEdit(job)} className="btn-small btn-secondary">Edit</button>
        <button onClick={() => onDelete(job.id)} className="btn-small btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default JobCard;