const router = require('express').Router();
const companyController = require('../controllers/companyController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/', companyController.listCompanies);
router.post('/', authenticate, authorize('admin'), companyController.createCompany);
router.put('/:id', authenticate, authorize('admin'), companyController.updateCompany);
router.delete('/:id', authenticate, authorize('admin'), companyController.deleteCompany);
router.get('/export/csv', authenticate, authorize('admin'), companyController.exportStudents);

module.exports = router;


