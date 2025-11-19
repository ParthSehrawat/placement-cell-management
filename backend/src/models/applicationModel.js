const pool = require('../config/db');

const createApplication = async ({ student_id, job_id }) => {
  const [result] = await pool.execute(
    `INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, 'Pending')`,
    [student_id, job_id]
  );
  return result.insertId;
};

const getApplicationByStudentJob = async (student_id, job_id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM applications WHERE student_id = ? AND job_id = ?`,
    [student_id, job_id]
  );
  return rows[0];
};

const getApplicationsByStudent = async (student_id) => {
  const [rows] = await pool.execute(
    `SELECT applications.*, jobs.skills, companies.name AS company_name
     FROM applications
     INNER JOIN jobs ON applications.job_id = jobs.id
     INNER JOIN companies ON jobs.company_id = companies.id
     WHERE applications.student_id = ?
     ORDER BY applications.created_at DESC`,
    [student_id]
  );
  return rows;
};

const getAllApplications = async () => {
  const [rows] = await pool.execute(
    `SELECT applications.id, students.name as student_name, students.branch, students.cgpa,
            jobs.id as job_id, companies.name as company_name, applications.status
     FROM applications
     INNER JOIN students ON applications.student_id = students.id
     INNER JOIN jobs ON applications.job_id = jobs.id
     INNER JOIN companies ON jobs.company_id = companies.id
     ORDER BY applications.updated_at DESC`
  );
  return rows;
};

const updateApplicationStatus = async (id, status) => {
  await pool.execute(`UPDATE applications SET status = ? WHERE id = ?`, [status, id]);
};

module.exports = {
  createApplication,
  getApplicationByStudentJob,
  getApplicationsByStudent,
  getAllApplications,
  updateApplicationStatus,
};


