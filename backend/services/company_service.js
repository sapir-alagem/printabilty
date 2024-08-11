const { getClient } = require('../utils/mongo');
const {ObjectId} = require('mongodb');

async function createCompany(companyData) {
    const client = await getClient();

    try {
        const db = client.db('printability');
        const col = db.collection('companies');
        // Add timestamp to the companyData that humans can read
        companyData.created_at = new Date();
        const result = await col.insertOne(companyData);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
}

async function getCompany(companyId) {
    const client = await getClient();
    
    try {
        const db = client.db('printability');
        const col = db.collection('companies');
        const company = await col.findOne({_id: new ObjectId(companyId)});
        return company;
    } catch (error) {
        console.error('Error retrieving company:', error);
        throw error;
    }
}

async function getAllCompanies() {
    const client = await getClient();

    try {
        const db = client.db('printability');
        const col = db.collection('companies');
        const companies = await col.find().toArray();
        return companies;
    } catch (error) {
        console.error('Error retrieving companies:', error);
        throw error;
    }
}

module.exports = { createCompany, getCompany , getAllCompanies};
