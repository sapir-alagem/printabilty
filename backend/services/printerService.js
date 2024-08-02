const { ObjectId } = require('mongodb');
const { getClient } = require('../utils/mongo');


async function createPrinter(printerData) {
    const client = getClient();

    try {
        await client.connect();
        const db = client.db('printability');
        const col = db.collection('printers');
        const result = await col.insertOne(printerData);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating printer:', error);
        throw error;
    }
}

async function getAllPrinters(companyId) {
    const client = getClient();

    try {
        await client.connect();
        const db = client.db('printability');
        const col = db.collection('printers');
        const printers = await col.find({ company_id: companyId }).toArray();
        return printers;
    } catch (error) {
        console.error('Error retrieving printers:', error);
        throw error;
    }
}

async function getPrinter(printerId) {
    const client = getClient();

    try {
        await client.connect();
        const db = client.db('printability');
        const col = db.collection('printers');
        const printer = await col.findOne({ _id: printerId });
        return printer;
    } catch (error) {
        console.error('Error retrieving printer:', error);
        throw error;
    }
}

const findPrinterByName = async (companyId, name) => {
    const client = await getClient();
    const db = client.db();
    const printersCollection = db.collection('printers');
  
    // const companyIdObjectId =  new ObjectId(companyId);

    const printer = await printersCollection.findOne({ 
        name: name,
        company_id: companyId, 
    });
    return printer;
};

async function deletePrinter(printerId) {
    const client = getClient();

    try {
        await client.connect();
        const db = client.db('printability');
        const col = db.collection('printers');
        const result = await col.deleteOne({ _id: printerId });
        return result.deletedCount;
    } catch (error) {
        console.error('Error deleting printer:', error);
        throw error;
    }
}

module.exports = {
    createPrinter,
    getAllPrinters,
    getPrinter,
    findPrinterByName,
    deletePrinter,
};
