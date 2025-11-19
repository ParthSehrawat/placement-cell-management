const pool = require('../config/db');

const getAllCompanies = async () => {
  const [rows] = await pool.execute(`SELECT * FROM companies ORDER BY name ASC`);
  return rows;
};

const createCompany = async ({ name, role, package: pkg, description }) => {
  const [result] = await pool.execute(
    `INSERT INTO companies (name, role, package, description) VALUES (?, ?, ?, ?)`,
    [name, role, pkg, description]
  );
  return result.insertId;
};

const updateCompany = async (id, payload) => {
  const fields = [];
  const values = [];

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });

  if (!fields.length) return false;
  values.push(id);
  await pool.execute(`UPDATE companies SET ${fields.join(', ')} WHERE id = ?`, values);
  return true;
};

const deleteCompany = async (id) => {
  await pool.execute(`DELETE FROM companies WHERE id = ?`, [id]);
};

module.exports = {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
};


