const applicationModel = require('../models/applicationModel');

const listApplications = async (_req, res) => {
  try {
    const applications = await applicationModel.getAllApplications();
    res.json(applications);
  } catch (error) {
    console.error('List applications error:', error);
    res.status(500).json({ message: 'Unable to fetch applications' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    await applicationModel.updateApplicationStatus(req.params.id, status);
    res.json({ message: 'Status updated' });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Unable to update status' });
  }
};

module.exports = {
  listApplications,
  updateStatus,
};


