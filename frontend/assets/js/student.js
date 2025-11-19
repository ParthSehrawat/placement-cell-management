const renderProfile = (profile) => {
  const profileEl = document.getElementById('student-profile');
  if (!profileEl) return;
  profileEl.innerHTML = `
    <p><strong>Name:</strong> ${profile.name || '-'}</p>
    <p><strong>Email:</strong> ${profile.email}</p>
    <p><strong>Branch:</strong> ${profile.branch || '-'}</p>
    <p><strong>CGPA:</strong> ${profile.cgpa || '-'}</p>
    <p><strong>Resume:</strong> ${profile.resume_url ? `<a href="http://localhost:5000${profile.resume_url}" target="_blank">View</a>` : 'Not uploaded'}</p>
  `;
};

const renderCompanies = (companies) => {
  const listEl = document.getElementById('companies-list');
  if (!listEl) return;
  listEl.innerHTML = companies
    .map(
      (c) => `
      <div class="card">
        <h3>${c.name}</h3>
        <p>${c.description || 'No description provided.'}</p>
        <p><strong>Role:</strong> ${c.role || '-'}</p>
        <p><strong>Package:</strong> ${c.package || '-'}</p>
      </div>`
    )
    .join('');
};

const renderJobs = (jobs) => {
  const listEl = document.getElementById('jobs-list');
  if (!listEl) return;
  listEl.innerHTML = jobs
    .map(
      (job) => `
      <div class="card">
        <h3>${job.company_name}</h3>
        <p><strong>Skills:</strong> ${job.skills || '-'}</p>
        <p><strong>Salary:</strong> ${job.salary || '-'}</p>
        <p><strong>Last Date:</strong> ${job.last_date || '-'}</p>
        <button onclick="applyJob(${job.id})">Apply</button>
      </div>`
    )
    .join('');
};

const renderApplications = (applications) => {
  const listEl = document.getElementById('application-status');
  if (!listEl) return;
  listEl.innerHTML = applications
    .map(
      (app) => `
        <tr>
          <td>${app.company_name}</td>
          <td>${app.skills || '-'}</td>
          <td><span class="status-pill status-${app.status}">${app.status}</span></td>
        </tr>
      `
    )
    .join('');
};

const applyJob = async (jobId) => {
  try {
    await api.applyJob(jobId);
    alert('Applied successfully');
    initStudent();
  } catch (error) {
    alert(error.message);
  }
};

window.applyJob = applyJob;

const initStudent = async () => {
  try {
    const [profile, companies, jobs, applications] = await Promise.all([
      api.getProfile(),
      api.getCompanies(),
      api.getJobs(),
      api.getMyApplications(),
    ]);
    renderProfile(profile);
    renderCompanies(companies);
    renderJobs(jobs);
    renderApplications(applications);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', initStudent);


