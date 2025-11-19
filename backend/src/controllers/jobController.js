const jobModel = require('../models/jobModel');
const applicationModel = require('../models/applicationModel');

const listJobs = async (_req, res) => {
  try {
    const jobs = await jobModel.getJobs();
    res.json(jobs);
  } catch (error) {
    console.error('List jobs error:', error);
    res.status(500).json({ message: 'Unable to fetch jobs' });
  }
};

const getJob = async (req, res) => {
  try {
    const job = await jobModel.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Unable to fetch job' });
  }
};

const createJob = async (req, res) => {
  try {
    const id = await jobModel.createJob(req.body);
    res.status(201).json({ id, message: 'Job created' });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Unable to create job' });
  }
};

const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const studentId = req.user.id;

    const existing = await applicationModel.getApplicationByStudentJob(studentId, jobId);
    if (existing) {
      return res.status(409).json({ message: 'Already applied to this job' });
    }

    const applicationId = await applicationModel.createApplication({
      student_id: studentId,
      job_id: jobId,
    });

    res.status(201).json({ message: 'Application submitted', applicationId });
  } catch (error) {
    console.error('Apply job error:', error);
    res.status(500).json({ message: 'Unable to apply for job' });
  }
};

module.exports = {
  listJobs,
  getJob,
  createJob,
  applyJob,
};


