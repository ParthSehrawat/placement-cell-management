const router = require('express').Router();
const applicationController = require('../controllers/applicationController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/', authenticate, authorize('admin'), applicationController.listApplications);
router.put('/:id', authenticate, authorize('admin'), applicationController.updateStatus);

module.exports = router;


