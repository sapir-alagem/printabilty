const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const http = require('http');
const paymentRoutes = require('./routes/payment_routes.js');
const PrintJobsRoutes = require('./routes/print_jobs_routes.js');
const companyRoutes = require('./routes/company_routes');
const UploadRoutes = require("./routes/uploads_routes.js");
const errorHandler = require("./controllers/errorHandler_controller.js");
const webhookRouter = require('./routes/webhookRouter.js');
const { setupWebSocketServer } = require('./services/web_socket_service.js');

const app = express();
const server = http.createServer(app);

// CORS middleware
app.use(cors());

// Custom CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Routes (ensure /webhook route comes before express.json())
app.use('/webhook', webhookRouter);

// Use body-parser middleware for other routes
app.use(express.json());

// Define other routes
app.use('/print_jobs', PrintJobsRoutes);
app.use('/companies', companyRoutes);
app.use("/uploads", UploadRoutes);
app.use('/payment', paymentRoutes);

// Error handler middleware
app.use(errorHandler);

// Setup WebSocket server
setupWebSocketServer(server);

// Start the server
server.listen(5000, () => console.log("Listening on port 5000"));
