const { getClient } = require('../utils/mongo');

// this is exemple for storing data into the db
async function createPrintJob(printJobData) {
    const client = getClient();

    try {
        const db = client.db('printablity');
        const col = db.collection('print_jobs');
        const result = await col.insertOne(printJobData);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating print job:', error);
        throw error;
    } finally {
        client.close();
    }
}

// this is exemple for importing data from the db
async function getPrintJobs() {
    const client = getClient();

    try {
        await client.connect();
        const db = client.db('printablity');
        const col = db.collection('print_jobs');
        const print_jobs = await col.find().toArray();
        return print_jobs;
    } catch (error) {
        console.error('Error retrieving print jobs:', error);
        throw error;
    } finally {
        client.close();
    }
}

module.exports = { createPrintJob, getPrintJobs };
