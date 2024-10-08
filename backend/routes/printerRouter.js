const express = require("express");
const router = express.Router({ mergeParams: true });
const printerController = require("../controllers/printerController");

router.post("/printers", printerController.createPrinter);
router.get("/printers", printerController.getAllPrinters);
router.get("/printers/:printerId", printerController.getPrinter);
router.delete("/printers/:id", printerController.deletePrinter);
router.put("/printers/:id", printerController.updatePrinter);
router.post("/printer/check", printerController.findPrinterByName);

module.exports = router;
