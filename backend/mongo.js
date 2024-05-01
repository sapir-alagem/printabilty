const MongoClient = require('mongodb').MongtoClient;
const url = 'mongodb+srv://sapiral:OrWFkiYsuFrbOb35@cluster0.bkawxmn.mongodb.net/'

const createPrintJob = async (req, res, next) => {
    const newPrintJob = {
        printer_id: req.body.printer_id,
    };
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection('print_jobs').insertOne(newPrintJob);
    } catch (error) {
        return res.json({message: 'Could not store data.'});
    }
    
    client.close();
    res.json({newPrintJob});
};

exports.createPrintJob = createPrintJob;