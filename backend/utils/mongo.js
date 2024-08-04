const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URI;

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

