const getNewPrintJob = (req, res, next) => {
    console.log('GET Request in PrintRequests');
    res.json({message: 'It works!'});
};

const postNewPrintJob = (req, res, next) => {
    console.log('POST Request in PrintRequests');
    // res.json({message: 'It works!'});
};
 

exports.getNewPrintJob = getNewPrintJob;
exports.postNewPrintJob = postNewPrintJob;