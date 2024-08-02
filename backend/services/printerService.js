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
    } finally {
        await client.close();
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
    } finally {
        await client.close();
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
    } finally {
        await client.close();
    }
}

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
    } finally {
        await client.close();
    }
}

module.exports = {
    createPrinter,
    getAllPrinters,
    getPrinter,
    deletePrinter
};
