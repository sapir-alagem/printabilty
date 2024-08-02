const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.post('/qrcodes/generate', qrController.generateQrCode);
router.get('/qrcodes', qrController.getAllActiveQrCodes);
router.post('/qrcodes/obsolete/:id', qrController.obsoleteQrCode);
router.post('/qrcodes/scan/:id', qrController.scanQrCode);

module.exports = router;


