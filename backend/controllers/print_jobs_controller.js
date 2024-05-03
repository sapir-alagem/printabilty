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

module.exports = {
    newPrintJob,
    createPrintJob,
    getPrintJobs
};
