import api from './api';

export const jobService = {
  getAllJobs: () => {
    return api.get('/jobs');
  },
  
  getJob: (jobId) => {
    return api.get(`/jobs/${jobId}`);
  },
  
  createJob: (jobData) => {
    return api.post('/jobs', jobData);
  },
  
  updateJob: (jobId, jobData) => {
    return api.put(`/jobs/${jobId}`, jobData);
  },
  
  deleteJob: (jobId) => {
    return api.delete(`/jobs/${jobId}`);
  },
  
  // Resume services
  getAllResumes: () => {
    return api.get('/resumes');
  },
  
  uploadResume: (formData) => {
    return api.post('/resumes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  deleteResume: (resumeId) => {
    return api.delete(`/resumes/${resumeId}`);
  },
  
  downloadResume: (resumeId) => {
    return api.get(`/resumes/${resumeId}/download`, {
      responseType: 'blob'
    });
  },
  
  // Interview services
  getAllInterviews: () => {
    return api.get('/interviews');
  },
  
  getUpcomingInterviews: () => {
    return api.get('/interviews/upcoming');
  },
  
  createInterview: (interviewData) => {
    return api.post('/interviews', interviewData);
  },
  
  updateInterview: (interviewId, interviewData) => {
    return api.put(`/interviews/${interviewId}`, interviewData);
  },
  
  deleteInterview: (interviewId) => {
    return api.delete(`/interviews/${interviewId}`);
  },
  
  // Profile services
  getProfile: () => {
    return api.get('/profile');
  },
  
  updateProfile: (profileData) => {
    return api.put('/profile', profileData);
  },
  
  getAnalytics: () => {
    return api.get('/profile/analytics');
  }
};