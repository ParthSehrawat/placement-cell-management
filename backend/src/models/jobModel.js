const pool = require('../config/db');

const getJobs = async () => {
  const [rows] = await pool.execute(
    `SELECT jobs.*, companies.name as company_name 
     FROM jobs 
     INNER JOIN companies ON jobs.company_id = companies.id
     ORDER BY jobs.last_date DESC`
  );
  return rows;
};

const getJobById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT jobs.*, companies.name as company_name 
     FROM jobs 
     INNER JOIN companies ON jobs.company_id = companies.id
     WHERE jobs.id = ?`,
    [id]
  );
  return rows[0];
};

const createJob = async ({ company_id, skills, salary, last_date }) => {
  const [result] = await pool.execute(
    `INSERT INTO jobs (company_id, skills, salary, last_date) VALUES (?, ?, ?, ?)`,
    [company_id, skills, salary, last_date]
  );
  return result.insertId;
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
};


