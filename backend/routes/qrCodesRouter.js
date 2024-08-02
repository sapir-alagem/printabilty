const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.post('/generate', qrController.generateQrCode);
router.get('/', qrController.getAllActiveQrCodes);
router.post('/obsolete/:id', qrController.obsoleteQrCode);
router.post('/scan/:id', qrController.scanQrCode);

module.exports = router;


