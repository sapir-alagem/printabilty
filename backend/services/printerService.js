const { ObjectId } = require('mongodb');
const { getClient } = require('../utils/mongo');


async function createPrinter(printerData) {
    const client = await getClient();

    try {
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
    const client = await getClient();

    try {
        const db = client.db('printability');
        const col = db.collection('printers');
        const printers = await col.find({ company_id: companyId }).toArray();
        return printers;
    } catch (error) {
        console.error('Error retrieving printers:', error);
        throw error;
    }
}

async function getPrinter(companyId, printerId) {
    const client = await getClient();
    if (!ObjectId.isValid(printerId)) {
        throw new Error('Invalid printer ID format');
    }    
    if (!ObjectId.isValid(companyId)) {
        throw new Error('Invalid printer ID format');
    }
    try {
        const db = client.db('printability');
        const col = db.collection('printers');

        const printer = await col.findOne({ 
            company_id: companyId,
            _id: new ObjectId(printerId)
         });
         console.log(printer);
        return printer;
    } catch (error) {
        console.error('Error retrieving printer:', error);
        throw error;
    }
}

async function findPrinterByName(companyId, name) {
    const client = await getClient();
    try {
        const db = client.db('printability');
        const col = db.collection('printers');
        const printer = await col.findOne({ 
            name: name,
            company_id: companyId, 
        });
        return printer;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

async function deletePrinter(printerId, companyId) {
    const client = await getClient();
    try {
        const db = client.db('printability');
        const col = db.collection('printers');
        const result = await col.deleteOne({ _id: new ObjectId(printerId), company_id: companyId });
        return result.deletedCount;
    } catch (error) {
        console.error('Error deleting printer:', error);
        throw error;
    }
}

async function updatePrinterStatus(id, status) {
    // can remove????
    await Printer.findByIdAndUpdate(id, { status });
};

async function updatePrinter(id, updates) {
    const client = await getClient();
    const db = client.db();
    const result = await db.collection('printers').updateOne(
        { _id: id },
        { $set: updates }
    );
    return result.modifiedCount > 0;
}


module.exports = {
    createPrinter,
    getAllPrinters,
    getPrinter,
    findPrinterByName,
    deletePrinter,
    updatePrinterStatus,
    updatePrinter,
};
