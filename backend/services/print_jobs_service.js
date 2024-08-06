const { getClient } = require('../utils/mongo');
const {ObjectId, Timestamp} = require('mongodb');
const axios = require('axios');
const { sendMessageToClient } = require('./web_socket_service'); // Ensure the correct path
const CompanyService = require('../services/company_service');

// this is exemple for storing data into the db
async function createPrintJob(printJobData) {
    const client = getClient();

    try {
        const db = client.db('printability');
        const col = db.collection('print_jobs');
        //add timsstamp to the printJobData that human can read
        printJobData.created_at = new Date();
        const result = await col.insertOne(printJobData);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating print job:', error);
        throw error;
    } 
}

// this is exemple for importing data from the db
async function getPrintJobs(jobId) {
    const client = getClient();

    try {
        await client.connect();
        const db = client.db('printability');
        const col = db.collection('print_jobs');
        //const print_jobs = await col.find(jobId).toArray();
        const print_job = await col.findOne({ _id: jobId });
        return print_job;
    } catch (error) {
        console.error('Error retrieving print jobs:', error);
        throw error;
    } 
}

async function sendPrintJobToPrinter(printJob) {
    let data = ({
        "file_url": printJob.fileUrl,
        "color_mode": printJob.colorMode,
        "print_both_sides": printJob.printBothSides,
        "layout_mode": printJob.layoutMode,
        "print_all_pages": printJob.printAllPages,
        "page_range_start": printJob.pageRange.start,
        "page_range_end": printJob.pageRange.end,
        "copies": printJob.copies,
        "type": "print_request"
    });


    sendMessageToClient(printJob.company_id, printJob.printer_name, data)
}

async function processPrintJob(jobId) {
    try {
      // Retrieve print job details from the database using the provided jobId
      const printJob = await getPrintJobs(jobId);
  
      // Check if print job exists
      if (!printJob) {
        console.error('Print job not found.');
        return;
      }
  
      // Send the print job to the printer
      await sendPrintJobToPrinter(printJob);
  
      console.log('Print job sent successfully.');
    } catch (error) {
      console.error('Failed to process print job:', error);
    }
  }

  
  async function printJobCalculator(printJob) {
    try {
        const company = await CompanyService.getCompany(printJob.body.company_id);

        if (!company || !printJob) {
            throw new Error('Company or Print Job not found');
        }

        let singlePagePrice = 0;
        const numOfPages = printJob.body.pageRange.end - printJob.body.pageRange.start + 1;
        const numOfCopies = printJob.body.copies;

        if (printJob.colorMode === "color") {
            singlePagePrice = company.coloredPageCost;
        } else {
            singlePagePrice = company.blackAndWhitePageCost;
        }

        return singlePagePrice * numOfPages * numOfCopies;
    } catch (error) {
        console.error(error);
        throw new Error('Error calculating print job cost');
    }
}

  
module.exports = { createPrintJob, getPrintJobs, processPrintJob, printJobCalculator};
