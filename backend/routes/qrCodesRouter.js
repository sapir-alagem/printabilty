const express = require("express");
const router = express.Router({ mergeParams: true });
const qrController = require("../controllers/qrController");

router.post("/generate", qrController.generateQrCode);
router.get("/all", qrController.getAllActiveQrCodes);
router.get("/", qrController.getPrinterQrCode);
router.post("/obsolete/:id", qrController.obsoleteQrCode);
router.post("/scan/:id", qrController.scanQrCode);

module.exports = router;
