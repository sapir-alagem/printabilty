const express = require('express');
const bodyParser = require('body-parser');
const mongoPractice = require('./mongo');

const PrintJobsRoutes = require('./routes/print_jobs_routes.js');
const paymetRoutes = require('./routes/payment_routes.js');
const app = express();

app.use(bodyParser.json());

app.use('/print_jobs', PrintJobsRoutes);
app.use('/payments', paymetRoutes);

app.listen(5000);