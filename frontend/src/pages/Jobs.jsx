import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../services/jobService";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Jobs</h2>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={() => deleteJob(job.id)} />
      ))}
    </div>
  );
}
