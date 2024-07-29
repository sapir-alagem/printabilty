const { getClient } = require('../utils/mongo');
const {ObjectId} = require('mongodb');
const axios = require('axios');
const { sendMessageToClient } = require('./web_socket_service'); // Ensure the correct path

// this is exemple for storing data into the db
async function createPrintJob(printJobData) {
    const client = getClient();

    try {
        const db = client.db('printablity');
        const col = db.collection('print_jobs');
        const result = await col.insertOne(printJobData);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating print job:', error);
        throw error;
    } finally {
        client.close();
    }
}

// this is exemple for importing data from the db
async function getPrintJobs(jobId) {
    const client = getClient();

    try {
        await client.connect();
        const db = client.db('printablity');
        const col = db.collection('print_jobs');
        //const print_jobs = await col.find(jobId).toArray();
        const print_job = await col.findOne({ _id: new ObjectId(jobId) }); // this returns null
        return print_job;
    } catch (error) {
        console.error('Error retrieving print jobs:', error);
        throw error;
    } finally {
        client.close();
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
    
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'https://5163-212-199-228-102.ngrok-free.app/print', //the agent url
    //     headers: { 
    //         'Content-Type': 'application/json'
    //     }, 
    //     data: data
    // };

    sendMessageToClient("example_site", "12345", data)
    
    // axios.request(config)
    // .then((response) => {
    //     console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
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
  
module.exports = { createPrintJob, getPrintJobs, processPrintJob };
