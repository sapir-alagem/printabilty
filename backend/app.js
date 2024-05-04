const express = require('express');
const bodyParser = require('body-parser');
const mongoPractice = require('./utils/mongo');
require('dotenv').config();

const PrintJobsRoutes = require('./routes/print_jobs_routes.js');
const companyRoutes = require('./routes/company_routes');
const UploadRoutes = require("./routes/uploads_routes.js");
const errorHandler = require("./controllers/errorHandler_controller.js"); // Importing error handler


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allo-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/print_jobs', PrintJobsRoutes);
app.use('/companies', companyRoutes);

app.listen(5000);