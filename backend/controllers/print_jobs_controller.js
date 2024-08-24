const axios = require('axios');

const printJobsService = require('../services/print_jobs_service');

const newPrintJob = (req, res, next) => {
    console.log('GET Request in PrintRequests');
    res.json({message: 'It works!'});
};

const createPrintJob = async (req, res, next) => {
    console.log('POST Request in PrintRequests');

    try {
        const result = await printJobsService.createPrintJob(req.body);
        res.json({ message: 'Print job created successfully', jobId: result });
        console.log("In createPrintJob %s", result)
    } catch (error) {
        console.error('Error creating print job:', error);
        res.status(500).json({ message: 'Could not create print job', error: error.message });
    }
};
 
const getPrintJobs = async (req, res, next) => {
    console.log('GET Request in PrintRequests');

    try {
        const result = await printJobsService.getPrintJobs();
        res.json({result});
    } catch (error) {
        console.error('Error reading print jobs:', error);
        res.status(500).json({ message: 'Could not read print jobs', error: error.message });
    }
}

const sendPrintJob = (req, res, next) => {
    // Assuming the file URL is in the request body
    let data = JSON.stringify({
        "file_url": req.body.file_url,
        "printer_name": "HP_ColorLaserJet_M253-M254	"
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:12345/print', //the agent url
        headers: { 
            'Content-Type': 'application/json'
        }, 
        data: data
    };
    
    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        res.json({message: 'It works!'});
    })
    .catch((error) => {
        console.log(error);
        res.json({error: error});
    });
};

const calcualtePrintJob = async (req, res) => {
    
    console.log('POST Request in PrintRequests');

    try {
        const result = await printJobsService.printJobCalculator(req);
        res.json({ message: 'print Job cost caculation done successfully', finalPrice: result});
        console.log("In cacualtePrintJob %s", result)
    } catch (error) {
        console.error('Error caculating print job cost:', error);
        res.status(500).json({ message: 'Could not caculate costs for print job', error: error.message });
    }
};
 
module.exports = {
    newPrintJob,
    createPrintJob,
    getPrintJobs,
    sendPrintJob,
    calcualtePrintJob
};