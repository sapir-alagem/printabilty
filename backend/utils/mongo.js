const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;

const client = new MongoClient(url);
connect();

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function checkConnection() {
  const isConnected = client.topology && client.topology.isConnected();
  console.log(
    isConnected ? "Connected to MongoDB" : "Not connected to MongoDB"
  );
}

async function getClient() {
  if (!checkConnection) {
    connect();
  }
  return client;
}

function close() {
  client.close();
}

module.exports = { connect, getClient, close };
