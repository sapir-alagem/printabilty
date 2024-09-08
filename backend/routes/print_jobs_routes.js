const express = require("express");
const router = express.Router();

const printJobsController = require("../controllers/print_jobs_controller");

router.get("/new", printJobsController.newPrintJob);
router.post("/", printJobsController.createPrintJob);
router.get("/", printJobsController.getPrintJobs);
router.post("/update", printJobsController.updatePrintJob);
router.post("/calculate", printJobsController.calcualtePrintJob);
router.post("/test", printJobsController.sanityCheck);

module.exports = router;
