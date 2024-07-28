const WebSocket = require('ws');
const { getClient } = require('../utils/mongo');

const client = getClient();
const clients = new Map();

async function setupWebSocketServer(server) {
    try {
        await client.connect();
        const database = client.db('printablity');
        const collection = database.collection('websockets');

        const wss = new WebSocket.Server({ server });

        wss.on('connection', (ws) => {
            ws.on('message', async (message) => {
                console.log('received: %s', message);
                const data = JSON.parse(message);
                const { site, printerId } = data;
                // Track the client with site and printerId as key
                const clientKey = `${site}_${printerId}`;
                clients.set(clientKey, ws);

                //console.log(`A document was inserted with the _id: ${result.insertedId}`);

                // // Check if a document with the same printerId already exists
                // const existingClient = await collection.findOne({ printerId: printerId });

                // if (existingClient) {
                //     console.log(`Client with printerId ${printerId} already exists. Skipping insertion.`);
                // } else {
                //     // Save the data to MongoDB
                //     const result = await collection.insertOne({
                //         site: site,
                //         printerId: printerId,
                //         socket: ws._socket.remoteAddress,
                //     });

                //     // Track the client with site and printerId as key
                //     const clientKey = `${site}_${printerId}`;
                //     clients.set(clientKey, ws);

                //     console.log(`A document was inserted with the _id: ${result.insertedId}`);
                // }
            });

            ws.on('close', () => {
                // Remove the client from the tracking map when it disconnects
                for (const [key, value] of clients.entries()) {
                    if (value === ws) {
                        clients.delete(key);
                        break;
                    }
                }
            });

            ws.send('Connection established');
        });

        console.log('WebSocket server is running');
    } catch (error) {
        console.error(error);
    }
}

function sendMessageToClient(site, printerId, message) {
    const clientKey = `${site}_${printerId}`;
    const clientSocket = clients.get(clientKey);
    //add type:'print_request' to the message
    message.type = 'print_request';
    
    if (clientSocket && clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(JSON.stringify(message));
    } else {
        console.log(`Client ${clientKey} not connected`);
    }
}

module.exports = { setupWebSocketServer, sendMessageToClient };
