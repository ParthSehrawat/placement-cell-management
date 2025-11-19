const loadAdminDashboard = async () => {
  try {
    const [companies, jobs, applications] = await Promise.all([
      api.getCompanies(),
      api.getJobs(),
      api.getApplications(),
    ]);
    renderAdminCompanies(companies);
    renderAdminJobs(jobs, companies);
    renderAdminApplications(applications);
    populateCompanyOptions(companies);
  } catch (error) {
    console.error(error);
  }
};

const renderAdminCompanies = (companies) => {
  const table = document.querySelector('#admin-companies tbody');
  if (!table) return;
  table.innerHTML = companies
    .map(
      (c) => `
      <tr>
        <td>${c.name}</td>
        <td>${c.role || '-'}</td>
        <td>${c.package || '-'}</td>
        <td>
          <button onclick="deleteCompany(${c.id})">Delete</button>
        </td>
      </tr>`
    )
    .join('');
};

const renderAdminJobs = (jobs) => {
  const table = document.querySelector('#admin-jobs tbody');
  if (!table) return;
  table.innerHTML = jobs
    .map(
      (job) => `
      <tr>
        <td>${job.company_name}</td>
        <td>${job.skills || '-'}</td>
        <td>${job.salary || '-'}</td>
        <td>${job.last_date || '-'}</td>
      </tr>`
    )
    .join('');
};

const renderAdminApplications = (applications) => {
  const table = document.querySelector('#admin-applications tbody');
  if (!table) return;
  table.innerHTML = applications
    .map(
      (app) => `
      <tr>
        <td>${app.student_name}</td>
        <td>${app.branch}</td>
        <td>${app.cgpa || '-'}</td>
        <td>${app.company_name}</td>
        <td>
          <select onchange="changeApplicationStatus(${app.id}, this.value)">
            <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Approved" ${app.status === 'Approved' ? 'selected' : ''}>Approved</option>
            <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
          </select>
        </td>
      </tr>`
    )
    .join('');
};

const populateCompanyOptions = (companies) => {
  const select = document.getElementById('job-company');
  if (!select) return;
  select.innerHTML = companies.map((c) => `<option value="${c.id}">${c.name}</option>`).join('');
};

const companyFormHandler = async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());
  const button = e.target.querySelector('button');
  button.disabled = true;
  try {
    await api.createCompany(formData);
    e.target.reset();
    await loadAdminDashboard();
  } catch (error) {
    alert(error.message);
  } finally {
    button.disabled = false;
  }
};

const jobFormHandler = async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());
  const button = e.target.querySelector('button');
  button.disabled = true;
  try {
    await api.createJob({
      company_id: formData.company_id,
      skills: formData.skills,
      salary: formData.salary,
      last_date: formData.last_date,
    });
    e.target.reset();
    await loadAdminDashboard();
  } catch (error) {
    alert(error.message);
  } finally {
    button.disabled = false;
  }
};

const deleteCompany = async (id) => {
  if (!confirm('Delete this company?')) return;
  await api.deleteCompany(id);
  await loadAdminDashboard();
};

const changeApplicationStatus = async (id, status) => {
  await api.updateApplication(id, status);
};

window.deleteCompany = deleteCompany;
window.changeApplicationStatus = changeApplicationStatus;

document.addEventListener('DOMContentLoaded', () => {
  const companyForm = document.getElementById('company-form');
  const jobForm = document.getElementById('job-form');
  if (companyForm) companyForm.addEventListener('submit', companyFormHandler);
  if (jobForm) jobForm.addEventListener('submit', jobFormHandler);
  loadAdminDashboard();
});


