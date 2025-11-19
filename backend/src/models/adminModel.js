const pool = require('../config/db');

const createAdmin = async ({ name, email, password }) => {
  const [result] = await pool.execute(
    `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`,
    [name, email, password]
  );
  return result.insertId;
};

const getAdminByEmail = async (email) => {
  const [rows] = await pool.execute(`SELECT * FROM admins WHERE email = ?`, [email]);
  return rows[0];
};

module.exports = { createAdmin, getAdminByEmail };


