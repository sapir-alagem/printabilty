const express = require('express');
const router = express.Router({mergeParams: true});
const printerController = require('../controllers/printerController');

router.post('/printers', printerController.createPrinter);
router.get('/printers', printerController.getAllPrinters);
router.get('/printers/:id', printerController.getPrinter);
router.delete('/printers/:id', printerController.deletePrinter);

module.exports = router;
