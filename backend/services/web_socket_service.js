const { WebSocketServer, WebSocket } = require("ws");

const clients = new Map();

async function setupWebSocketServer(server) {
  try {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        console.log("received: %s", message);
        const data = JSON.parse(message);
        const { company_id } = data;

        // Track the client with companyId as key
        const clientKey = `${company_id}`;
        clients.set(clientKey, ws);

        // Optionally, send an initial message to the connected client
        sendMessageToClient(company_id, { message: "Hello, client!" });
      });

      ws.on("close", () => {
        for (const [key, value] of clients.entries()) {
          if (value === ws) {
            clients.delete(key);
            break;
          }
        }
      });

      ws.send(JSON.stringify({ message: "Connection established" }));
    });

    console.log("WebSocket server is running");
  } catch (error) {
    console.error("Error setting up WebSocket server:", error);
  }
}

function sendMessageToClient(companyId, message) {
  const clientKey = `${companyId}`;
  const clientSocket = clients.get(clientKey);

  if (clientSocket && clientSocket.readyState === WebSocket.OPEN) {
    clientSocket.send(JSON.stringify(message));
  } else {
    console.log(`Client ${clientKey} not connected`);
  }
}

module.exports = { setupWebSocketServer, sendMessageToClient };
