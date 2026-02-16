import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jobService } from '../services/jobService';

const Resume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  useEffect(() => {
    fetchResumes();
  }, []);
  
  const fetchResumes = async () => {
    try {
      const response = await jobService.getAllResumes();
      setResumes(response.data.resumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    setUploading(true);
    
    try {
      await jobService.uploadResume(formData);
      setSelectedFile(null);
      document.getElementById('file-input').value = '';
      fetchResumes();
      alert('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };
  
  const handleDelete = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await jobService.deleteResume(resumeId);
        fetchResumes();
      } catch (error) {
        console.error('Error deleting resume:', error);
        alert('Failed to delete resume');
      }
    }
  };
  
  const handleDownload = async (resumeId, filename) => {
    try {
      const response = await jobService.downloadResume(resumeId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume');
    }
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <div className="page-header">
            <h1>Resume Management</h1>
          </div>
          
          <div className="upload-section">
            <h2>Upload New Resume</h2>
            <form onSubmit={handleUpload} className="upload-form">
              <div className="form-group">
                <label>Select File (PDF, DOC, DOCX, TXT)</label>
                <input
                  type="file"
                  id="file-input"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  required
                />
                {selectedFile && <p className="file-name">Selected: {selectedFile.name}</p>}
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Resume'}
              </button>
            </form>
          </div>
          
          <div className="resumes-section">
            <h2>My Resumes</h2>
            
            {loading ? (
              <div className="loading">Loading resumes...</div>
            ) : resumes.length > 0 ? (
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Filename</th>
                      <th>Size</th>
                      <th>Uploaded</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumes.map(resume => (
                      <tr key={resume.id}>
                        <td>{resume.original_filename}</td>
                        <td>{formatFileSize(resume.file_size)}</td>
                        <td>{new Date(resume.uploaded_at).toLocaleDateString()}</td>
                        <td>
                          <button 
                            onClick={() => handleDownload(resume.id, resume.original_filename)}
                            className="btn-small btn-primary"
                          >
                            Download
                          </button>
                          <button 
                            onClick={() => handleDelete(resume.id)}
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
                <p>No resumes uploaded yet. Upload your first resume above!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resume;