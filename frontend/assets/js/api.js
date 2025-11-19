const API_BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('pcms_token');
const setToken = (token) => localStorage.setItem('pcms_token', token);
const clearToken = () => localStorage.removeItem('pcms_token');

const request = async (path, options = {}) => {
  const headers = options.headers || {};
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearToken();
    window.location.href = 'login.html';
    return;
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

window.api = {
  request,
  signup: (payload) =>
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((data) => {
      setToken(data.token);
      localStorage.setItem('pcms_user', JSON.stringify(data.user));
      return data.user;
    }),
  getProfile: () => request('/student/profile'),
  updateProfile: (payload) =>
    request('/student/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  getCompanies: () => request('/companies'),
  createCompany: (payload) =>
    request('/companies', { method: 'POST', body: JSON.stringify(payload) }),
  updateCompany: (id, payload) =>
    request(`/companies/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCompany: (id) => request(`/companies/${id}`, { method: 'DELETE' }),
  getJobs: () => request('/jobs'),
  getJob: (id) => request(`/jobs/${id}`),
  createJob: (payload) =>
    request('/jobs', { method: 'POST', body: JSON.stringify(payload) }),
  applyJob: (id) =>
    request(`/jobs/${id}/apply`, { method: 'POST' }),
  getApplications: () => request('/applications'),
  updateApplication: (id, status) =>
    request(`/applications/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getMyApplications: () => request('/student/applications'),
  logout: () => {
    clearToken();
    localStorage.removeItem('pcms_user');
    window.location.href = 'login.html';
  },
};


