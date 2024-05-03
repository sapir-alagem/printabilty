const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sapiral:OrWFkiYsuFrbOb35@cluster0.bkawxmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(url);

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

function getClient() {
    return client;
}

function close() {
    client.close();
}

module.exports = { connect, getClient, close };

