const path = require('path');
const studentModel = require('../models/studentModel');
const applicationModel = require('../models/applicationModel');

const getProfile = async (req, res) => {
  try {
    const student = await studentModel.getStudentById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    delete student.password;
    res.json(student);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Unable to fetch profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = (({ name, branch, cgpa }) => ({ name, branch, cgpa }))(req.body);
    await studentModel.updateStudent(req.user.id, updates);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Unable to update profile' });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }
    const relativePath = path.join('uploads', 'resumes', req.file.filename).replace(/\\/g, '/');
    await studentModel.updateStudent(req.user.id, { resume_url: `/${relativePath}` });
    res.status(201).json({ message: 'Resume uploaded successfully', resumeUrl: `/${relativePath}` });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ message: 'Unable to upload resume' });
  }
};

const myApplications = async (req, res) => {
  try {
    const applications = await applicationModel.getApplicationsByStudent(req.user.id);
    res.json(applications);
  } catch (error) {
    console.error('My applications error:', error);
    res.status(500).json({ message: 'Unable to fetch applications' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
  myApplications,
};


