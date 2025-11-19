const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const studentModel = require('../models/studentModel');
const adminModel = require('../models/adminModel');

const signup = async (req, res) => {
  try {
    const { name, email, password, branch, cgpa } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingStudent = await studentModel.getStudentByEmail(email);
    if (existingStudent) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const studentId = await studentModel.createStudent({
      name,
      email,
      password: hashedPassword,
      branch: branch || null,
      cgpa: cgpa || null,
    });

    res.status(201).json({ message: 'Student registered successfully', studentId });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Unable to sign up student' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userRole = role === 'admin' ? 'admin' : 'student';
    const model = userRole === 'admin' ? adminModel : studentModel;
    const user = await model[userRole === 'admin' ? 'getAdminByEmail' : 'getStudentByEmail'](email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: userRole },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: userRole,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Unable to login' });
  }
};

module.exports = { signup, login };


