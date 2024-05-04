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
        "printer_name": "idan"
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://1f2c-212-199-228-102.ngrok-free.app/print',
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
 


module.exports = {
    newPrintJob,
    createPrintJob,
    getPrintJobs,
    getNewPrintJob,
    sendPrintJob
};


// exports.getNewPrintJob = getNewPrintJob;
// exports.sendPrintJob = sendPrintJob;