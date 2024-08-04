const express = require('express');
const router = express.Router();

const printJobsController = require('../controllers/print_jobs_controller')

router.get('/new', printJobsController.newPrintJob); // => http://localhost:5000/print_jobs/new
router.post('/', printJobsController.createPrintJob);
router.get('/', printJobsController.getPrintJobs); 
router.get('/caculate', printJobsController.cacualtePrintJob); 
router.post('/send_print_job', printJobsController.sendPrintJob); // => http://localhost:5000/print_jobs/send_print_job


module.exports = router;

// ***********************************************************************
// exemple for router:
    // router.get('/new', printJobsController.getNewPrintJob); // => http://localhost:5000/print_jobs/new
    
// exemple for matching controller fucntion :
    // const getNewPrintJob = (req, res, next) => {
    //     console.log('GET Request in PrintRequests');
    //     res.json({message: 'It works!'});
    // };
// ***********************************************************************
