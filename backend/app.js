const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const paymentRoutes = require('./routes/payment_routes.js');
const PrintJobsRoutes = require('./routes/print_jobs_routes.js');
const companyRoutes = require('./routes/company_routes');
const UploadRoutes = require("./routes/uploads_routes.js");
const errorHandler = require("./controllers/errorHandler_controller.js");
const webhookRouter = require('./routes/webhookRouter.js');
const { setupWebSocketServer, sendMessageToClient } = require('./services/web_socket_service.js'); // Ensure the correct path

const app = express();
const server = http.createServer(app);

// Use body-parser middleware
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// Custom CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// Routes
app.use('/print_jobs', PrintJobsRoutes);
app.use('/companies', companyRoutes);
app.use("/uploads", UploadRoutes);
app.use('/payment', paymentRoutes);
app.use('/webhook', webhookRouter);

// Error handler middleware
app.use(errorHandler);

// Setup WebSocket server
setupWebSocketServer(server);

// Start the server
server.listen(5000, () => console.log("Listening on port 5000"));

// Example usage: send a message to a specific client
// Replace 'example_site' and '12345' with actual site and printerId values
sendMessageToClient('example_site', '12345', 'Hello, specific client!');
