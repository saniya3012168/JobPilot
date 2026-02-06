import API from "./api";

export const getJobs = () => API.get("/jobs");
export const addJob = (job) => API.post("/jobs", job);
export const updateJob = (id, job) => API.put(`/jobs/${id}`, job);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
