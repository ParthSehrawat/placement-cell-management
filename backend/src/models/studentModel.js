const pool = require('../config/db');

const createStudent = async ({ name, email, password, branch, cgpa }) => {
  const [result] = await pool.execute(
    `INSERT INTO students (name, email, password, branch, cgpa) VALUES (?, ?, ?, ?, ?)`,
    [name, email, password, branch, cgpa]
  );
  return result.insertId;
};

const getStudentByEmail = async (email) => {
  const [rows] = await pool.execute(`SELECT * FROM students WHERE email = ?`, [email]);
  return rows[0];
};

const getStudentById = async (id) => {
  const [rows] = await pool.execute(`SELECT * FROM students WHERE id = ?`, [id]);
  return rows[0];
};

const updateStudent = async (id, payload) => {
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

  await pool.execute(`UPDATE students SET ${fields.join(', ')} WHERE id = ?`, values);
  return true;
};

const getAllStudents = async () => {
  const [rows] = await pool.execute(`SELECT id, name, email, branch, cgpa, resume_url FROM students ORDER BY name ASC`);
  return rows;
};

module.exports = {
  createStudent,
  getStudentByEmail,
  getStudentById,
  updateStudent,
  getAllStudents,
};


