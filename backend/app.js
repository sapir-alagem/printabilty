const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const paymentRoutes = require('./routes/payment_routes.js');
const PrintJobsRoutes = require('./routes/print_jobs_routes.js');
const companyRoutes = require('./routes/company_routes');
const UploadRoutes = require("./routes/uploads_routes.js");
const errorHandler = require("./controllers/errorHandler_controller.js");
const webhookRouter = require('./routes/webhookRouter.js');
const qrCodesRouter = require('./routes/qrCodesRouter.js');
const printerRouter = require('./routes/printerRouter.js');

const app = express();
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
// app.use('/companies/:companyId', qrCodesRouter);
app.use('/companies/:companyId/qrcodes', qrCodesRouter);
app.use('', printerRouter);


// Error handler middleware
app.use(errorHandler);

app.listen(5000, () => console.log("Listening on port 5000"));
