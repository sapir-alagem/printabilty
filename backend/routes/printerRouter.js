const express = require('express');
const router = express.Router();
const printerController = require('../controllers/printerController');

router.post('/companies/:companyId/printers', printerController.createPrinter);
router.get('/companies/:companyId/printers', printerController.getAllPrinters);
router.get('/printers/:id', printerController.getPrinter);
router.delete('/printers/:id', printerController.deletePrinter);

module.exports = router;
