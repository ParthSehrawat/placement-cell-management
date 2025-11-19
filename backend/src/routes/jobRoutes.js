const router = require('express').Router();
const jobController = require('../controllers/jobController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/', jobController.listJobs);
router.post('/', authenticate, authorize('admin'), jobController.createJob);
router.get('/:id', jobController.getJob);
router.post('/:id/apply', authenticate, authorize('student'), jobController.applyJob);

module.exports = router;


