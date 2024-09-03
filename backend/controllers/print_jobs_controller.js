const axios = require("axios");

const printJobsService = require("../services/print_jobs_service");

const newPrintJob = (req, res, next) => {
  console.log("GET Request in PrintRequests");
  res.json({ message: "It works!" });
};

const createPrintJob = async (req, res, next) => {
  console.log("POST Request in PrintRequests");

  try {
    const result = await printJobsService.createPrintJob(req.body);
    res.json({ message: "Print job created successfully", jobId: result });
    console.log("In createPrintJob %s", result);
  } catch (error) {
    console.error("Error creating print job:", error);
    res.status(500).json({ message: "Could not create print job", error: error.message });
  }
};

const getPrintJobs = async (req, res, next) => {
  console.log("GET Request in PrintRequests");

  try {
    const result = await printJobsService.getPrintJobs();
    res.json({ result });
  } catch (error) {
    console.error("Error reading print jobs:", error);
    res.status(500).json({ message: "Could not read print jobs", error: error.message });
  }
};

const sanityCheck = (req, res, next) => {
  printJobsService.doSanityCheck(req.body.companyId, req.body.printerName);
  res.json({ message: "testing" });
};

const calcualtePrintJob = async (req, res) => {
  try {
    const result = await printJobsService.printJobCalculator(req);
    res.json({
      message: "print Job cost caculation done successfully",
      finalPrice: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not caculate costs for print job",
      error: error.message,
    });
  }
};

module.exports = {
  newPrintJob,
  createPrintJob,
  getPrintJobs,
  calcualtePrintJob,
  sanityCheck,
};
