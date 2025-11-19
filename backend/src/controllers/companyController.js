const companyModel = require('../models/companyModel');
const studentModel = require('../models/studentModel');
const csvExporter = require('../utils/csvExporter');

const listCompanies = async (_req, res) => {
  try {
    const companies = await companyModel.getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error('List companies error:', error);
    res.status(500).json({ message: 'Unable to fetch companies' });
  }
};

const createCompany = async (req, res) => {
  try {
    const id = await companyModel.createCompany(req.body);
    res.status(201).json({ id, message: 'Company created' });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ message: 'Unable to create company' });
  }
};

const updateCompany = async (req, res) => {
  try {
    await companyModel.updateCompany(req.params.id, req.body);
    res.json({ message: 'Company updated' });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ message: 'Unable to update company' });
  }
};

const deleteCompany = async (req, res) => {
  try {
    await companyModel.deleteCompany(req.params.id);
    res.json({ message: 'Company deleted' });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({ message: 'Unable to delete company' });
  }
};

const exportStudents = async (_req, res) => {
  try {
    const students = await studentModel.getAllStudents();
    const csvStream = csvExporter.toCsv(students);
    res.setHeader('Content-disposition', 'attachment; filename=students.csv');
    res.setHeader('Content-Type', 'text/csv');
    csvStream.pipe(res);
  } catch (error) {
    console.error('Export students error:', error);
    res.status(500).json({ message: 'Unable to export data' });
  }
};

module.exports = {
  listCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  exportStudents,
};


