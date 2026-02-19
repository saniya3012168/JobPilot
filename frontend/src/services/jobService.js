import api from './api';

export const jobService = {
  // ===== JOBS =====
  getAllJobs: async () => {
    const response = await api.get('/jobs');
    return response;
  },

  getJob: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response;
  },

  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response;
  },

  updateJob: async (jobId, jobData) => {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response;
  },

  deleteJob: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response;
  },

  // ===== INTERVIEWS =====
  getAllInterviews: async () => {
    const response = await api.get('/interviews');
    return response;
  },

  getInterviews: async () => {
    const response = await api.get('/interviews');
    return response;
  },

  getUpcomingInterviews: async () => {
    const response = await api.get('/interviews/upcoming');
    return response;
  },

  createInterview: async (interviewData) => {
    const response = await api.post('/interviews', interviewData);
    return response;
  },

  updateInterview: async (interviewId, interviewData) => {
    const response = await api.put(`/interviews/${interviewId}`, interviewData);
    return response;
  },

  deleteInterview: async (interviewId) => {
    const response = await api.delete(`/interviews/${interviewId}`);
    return response;
  },

  // ===== ANALYTICS =====
  getAnalytics: async () => {
    const response = await api.get('/profile/analytics');
    return response;
  },

  // ===== RESUMES =====
  getAllResumes: async () => {
    const response = await api.get('/resumes');
    return response;
  },

  getResumes: async () => {
    const response = await api.get('/resumes');
    return response;
  },

  uploadResume: async (formData) => {
    const response = await api.post('/resumes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  },

  deleteResume: async (resumeId) => {
    const response = await api.delete(`/resumes/${resumeId}`);
    return response;
  },

  downloadResume: async (resumeId) => {
    const response = await api.get(`/resumes/${resumeId}/download`, {
      responseType: 'blob'
    });
    return response;
  },

  // ===== PROFILE =====
  getProfile: async () => {
    const response = await api.get('/profile');
    return response;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response;
  }
};

export default jobService;