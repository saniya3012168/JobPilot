import api from "./api";

export const jobService = {
  // ================= JOBS =================
  getAllJobs: () => api.get("/jobs"),

  getJob: (jobId) => api.get(`/jobs/${jobId}`),

  createJob: (jobData) => api.post("/jobs", jobData),

  updateJob: (jobId, jobData) =>
    api.put(`/jobs/${jobId}`, jobData),

  deleteJob: (jobId) =>
    api.delete(`/jobs/${jobId}`),

  // ================= RESUMES =================
  getAllResumes: () => api.get("/resumes"),

  uploadResume: (formData) =>
    api.post("/resumes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  deleteResume: (resumeId) =>
    api.delete(`/resumes/${resumeId}`),

  downloadResume: (resumeId) =>
    api.get(`/resumes/${resumeId}/download`, {
      responseType: "blob",
    }),

  // ================= INTERVIEWS =================
  getAllInterviews: () => api.get("/interviews"),

  getUpcomingInterviews: () =>
    api.get("/interviews/upcoming"),

  createInterview: (interviewData) =>
    api.post("/interviews", interviewData),

  updateInterview: (interviewId, interviewData) =>
    api.put(`/interviews/${interviewId}`, interviewData),

  deleteInterview: (interviewId) =>
    api.delete(`/interviews/${interviewId}`),

  // ================= PROFILE =================
  getProfile: () => api.get("/profile"),

  updateProfile: (profileData) =>
    api.put("/profile", profileData),

  getAnalytics: () =>
    api.get("/profile/analytics"),
};
