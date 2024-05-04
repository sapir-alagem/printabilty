const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company_controller');

router.post('/', companyController.createCompany);
router.get('/:id', companyController.getCompany);

module.exports = router;