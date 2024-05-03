const axios = require('axios');


const getNewPrintJob = (req, res, next) => {
    console.log('GET Request in PrintRequests');
    res.json({message: 'It works!'});
};

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
 



exports.getNewPrintJob = getNewPrintJob;
exports.postNewPrintJob = postNewPrintJob;
exports.sendPrintJob = sendPrintJob;