const express = require('express');

const printJobsController = require('../controllers/print_jobs_controller')
const router = express.Router();

const DUMMY_PRINT_REQUEST = [
    {id: 1, printer_name: 'HP_ColorLaserJet_M253-M254', file_path: '/home/sapir/Downloads/app_logo.png' }
]

router.get('/new', printJobsController.getNewPrintJob); // => http://localhost:5000/print_jobs/new
router.post('/', printJobsController.postNewPrintJob);

module.exports = router;


// exemple for router:
    // router.get('/new', printJobsController.getNewPrintJob); // => http://localhost:5000/print_jobs/new

// exemple for matching controller fucntion :
    // const getNewPrintJob = (req, res, next) => {
    //     console.log('GET Request in PrintRequests');
    //     res.json({message: 'It works!'});
    // };
