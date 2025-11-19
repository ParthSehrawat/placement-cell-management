const router = require('express').Router();
const studentController = require('../controllers/studentController');
const upload = require('../middleware/uploadMiddleware');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/profile', authenticate, authorize('student'), studentController.getProfile);
router.put('/profile', authenticate, authorize('student'), studentController.updateProfile);
router.post(
  '/upload-resume',
  authenticate,
  authorize('student'),
  upload.single('resume'),
  studentController.uploadResume
);
router.get('/applications', authenticate, authorize('student'), studentController.myApplications);

module.exports = router;


