// Sample job data
const jobs = [
  { title: "Software Engineer", company: "TechCorp", location: "New York", salary: "$100k", description: "Develop amazing apps." },
  { title: "Data Analyst", company: "DataInc", location: "San Francisco", salary: "$80k", description: "Analyze data trends." },
  { title: "Designer", company: "CreativeCo", location: "Remote", salary: "$70k", description: "Create stunning designs." }
];

let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];

// Load jobs on page load
document.addEventListener('DOMContentLoaded', () => {
  displayJobs(jobs);
  updateDashboard();
});

// Display jobs
function displayJobs(jobList) {
  const jobListEl = document.getElementById('jobList');
  jobListEl.innerHTML = '';
  jobList.forEach((job, index) => {
    const jobCard = `
      <div class="col-md-4">
        <div class="job-card p-3">
          <h5>${job.title}</h5>
          <p><i class="fas fa-building"></i> ${job.company}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
          <p><i class="fas fa-dollar-sign"></i> ${job.salary}</p>
          <p>${job.description}</p>
          <button class="btn btn-primary" onclick="applyJob(${index})">Apply Now</button>
        </div>
      </div>
    `;
    jobListEl.innerHTML += jobCard;
  });
}

// Search jobs
function searchJobs() {
  const query = document.getElementById('jobSearch').value.toLowerCase();
  const location = document.getElementById('locationSearch').value.toLowerCase();
  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(query) &&
    job.location.toLowerCase().includes(location)
  );
  displayJobs(filtered);
}

// Apply for job
function applyJob(index) {
  if (!appliedJobs.includes(index)) {
    appliedJobs.push(index);
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    alert('Applied successfully!');
    updateDashboard();
  } else {
    alert('Already applied!');
  }
}

// Update dashboard
function updateDashboard() {
  const appliedEl = document.getElementById('appliedJobs');
  appliedEl.innerHTML = '';
  appliedJobs.forEach(index => {
    const job = jobs[index];
    appliedEl.innerHTML += `<li class="list-group-item">${job.title} at ${job.company}</li>`;
  });
}

// Login form (simulate)
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('dashboard').classList.remove('d-none');
  bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
  alert('Logged in!');
});

// Signup form (simulate)
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Signed up!');
});

// Post job form (simulate)
document.getElementById('postJobForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Job posted!');
});