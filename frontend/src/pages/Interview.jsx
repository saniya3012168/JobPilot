import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jobService } from '../services/jobService';

const Interview = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    interview_type: 'Phone',
    interview_date: '',
    duration: '',
    location: '',
    interviewer: '',
    notes: '',
    status: 'Scheduled'
  });
  
  useEffect(() => {
    fetchInterviews();
  }, []);
  
  const fetchInterviews = async () => {
    try {
      const response = await jobService.getAllInterviews();
      setInterviews(response.data.interviews);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddNew = () => {
    setSelectedInterview(null);
    setFormData({
      company: '',
      position: '',
      interview_type: 'Phone',
      interview_date: '',
      duration: '',
      location: '',
      interviewer: '',
      notes: '',
      status: 'Scheduled'
    });
    setShowModal(true);
  };
  
  const handleEdit = (interview) => {
    setSelectedInterview(interview);
    setFormData({
      company: interview.company || '',
      position: interview.position || '',
      interview_type: interview.interview_type || 'Phone',
      interview_date: interview.interview_date ? interview.interview_date.slice(0, 16) : '',
      duration: interview.duration || '',
      location: interview.location || '',
      interviewer: interview.interviewer || '',
      notes: interview.notes || '',
      status: interview.status || 'Scheduled'
    });
    setShowModal(true);
  };
  
  const handleDelete = async (interviewId) => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      try {
        await jobService.deleteInterview(interviewId);
        fetchInterviews();
      } catch (error) {
        console.error('Error deleting interview:', error);
        alert('Failed to delete interview');
      }
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (selectedInterview) {
        await jobService.updateInterview(selectedInterview.id, formData);
      } else {
        await jobService.createInterview(formData);
      }
      
      setShowModal(false);
      fetchInterviews();
    } catch (error) {
      console.error('Error saving interview:', error);
      alert('Failed to save interview');
    }
  };
  
  const getStatusColor = (status) => {
    const colors = {
      'Scheduled': '#3b82f6',
      'Completed': '#10b981',
      'Cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };
  
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <div className="page-header">
            <h1>Interviews</h1>
            <button onClick={handleAddNew} className="btn btn-primary">
              + Schedule Interview
            </button>
          </div>
          
          {loading ? (
            <div className="loading">Loading interviews...</div>
          ) : interviews.length > 0 ? (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Type</th>
                    <th>Date & Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map(interview => (
                    <tr key={interview.id}>
                      <td>{interview.company}</td>
                      <td>{interview.position || '-'}</td>
                      <td>{interview.interview_type}</td>
                      <td>
                        {new Date(interview.interview_date).toLocaleString()}
                      </td>
                      <td>{interview.duration ? `${interview.duration} min` : '-'}</td>
                      <td>
                        <span 
                          className="badge" 
                          style={{ backgroundColor: getStatusColor(interview.status) }}
                        >
                          {interview.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleEdit(interview)}
                          className="btn-small btn-primary"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(interview.id)}
                          className="btn-small btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>No interviews scheduled yet. Click the button above to schedule your first interview!</p>
            </div>
          )}
          
          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{selectedInterview ? 'Edit Interview' : 'Schedule Interview'}</h2>
                  <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Company *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Position</label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Interview Type</label>
                      <select name="interview_type" value={formData.interview_type} onChange={handleChange}>
                        <option value="Phone">Phone</option>
                        <option value="Video">Video</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Technical">Technical</option>
                        <option value="Behavioral">Behavioral</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Status</label>
                      <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date & Time *</label>
                      <input
                        type="datetime-local"
                        name="interview_date"
                        value={formData.interview_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Duration (minutes)</label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 60"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Location / Platform</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Zoom, Google Meet, Office address"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Interviewer</label>
                    <input
                      type="text"
                      name="interviewer"
                      value={formData.interviewer}
                      onChange={handleChange}
                      placeholder="Interviewer name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Add preparation notes, topics to cover, etc."
                    ></textarea>
                  </div>
                  
                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {selectedInterview ? 'Update' : 'Schedule'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Interview;