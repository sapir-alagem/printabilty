const express = require('express');
const bodyParser = require('body-parser');
const mongoPractice = require('./utils/mongo');

const PrintJobsRoutes = require('./routes/print_jobs_routes.js');

const app = express();

app.use(bodyParser.json());
app.use('/print_jobs', PrintJobsRoutes);

app.listen(5000);