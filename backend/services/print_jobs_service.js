const { getClient } = require("../utils/mongo");
const { ObjectId } = require("mongodb");
const axios = require("axios");
const { sendMessageToClient } = require("./web_socket_service"); // Ensure the correct path
const { getCompany } = require("./company_service.js");

// this is exemple for storing data into the db
async function createPrintJob(printJobData) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("print_jobs");
    //add timsstamp to the printJobData that human can read
    printJobData.created_at = new Date();
    const result = await col.insertOne(printJobData);
    return result.insertedId;
  } catch (error) {
    console.error("Error creating print job:", error);
    throw error;
  }
}

// this is exemple for importing data from the db
async function getPrintJobs(jobId) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("print_jobs");
    //const print_jobs = await col.find(jobId).toArray();
    const print_job = await col.findOne({ _id: new ObjectId(jobId) }); // this returns null
    return print_job;
  } catch (error) {
    console.error("Error retrieving print jobs:", error);
    throw error;
  }
}

async function sendPrintJobToPrinter(printJob) {
  let data = {
    file_url: printJob.fileUrl,
    color_mode: printJob.colorMode,
    print_both_sides: printJob.printBothSides,
    print_all_pages: printJob.printAllPages,
    page_range_start: printJob.pageRange.start,
    page_range_end: printJob.pageRange.end,
    copies: printJob.copies,
    printer_name: printJob.printer_name,
    type: "print_request",
  };

  sendMessageToClient(printJob.company_id, data);
}

async function processPrintJob(jobId) {
  try {
    // Retrieve print job details from the database using the provided jobId
    const printJob = await getPrintJobs(jobId);

    // Check if print job exists
    if (!printJob) {
      console.error("Print job not found.");
      return;
    }

    // Send the print job to the printer
    await sendPrintJobToPrinter(printJob);

    console.log("Print job sent successfully.");
  } catch (error) {
    console.error("Failed to process print job:", error);
  }
}

async function printJobCalculator(printJob) {
  try {
    const company = await getCompany(printJob.body.companyId);

    if (!company || !printJob) {
      throw new Error("Company or Print Job not found");
    }

    let singlePagePrice = 0;
    const numOfPages = printJob.body.numPages;
    const numOfCopies = printJob.body.copies;

    if (printJob.body.colorMode === "Color") {
      singlePagePrice = company.coloredPageCost;
    } else {
      singlePagePrice = company.blackAndWhitePageCost;
    }

    let price = singlePagePrice * numOfPages * numOfCopies;

    currency = company.paymentsCurrency.toLowerCase();
    //if price is less 50 cent return 50 cent
    convetrate = await axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    );
    if (convetrate.data[currency].usd * price < 0.5) {
      //return 50 cent in the currency
      price = 0.5 / convetrate.data[currency].usd;
    }

    return parseFloat(price.toFixed(2));
  } catch (error) {
    console.error(error);
    throw new Error("Error calculating print job cost");
  }
}

function doSanityCheck(companyId, printerName) {
  sendPrintJobToPrinter({
    fileUrl: "https://printabillty-file-uploads.s3.eu-north-1.amazonaws.com/uploads/test.pdf",
    colorMode: "Color",
    printBothSides: true,
    printAllPages: true,
    pageRange: { start: 1, end: 10 },
    copies: 1,
    printer_name: printerName,
    company_id: companyId,
  });
  console.log("Sanity sent");
}

module.exports = {
  createPrintJob,
  getPrintJobs,
  processPrintJob,
  printJobCalculator,
  doSanityCheck,
};
