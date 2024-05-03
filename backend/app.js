const express = require("express");
const bodyParser = require("body-parser");
const mongoPractice = require("./mongo");

const PrintJobsRoutes = require("./routes/print_jobs_routes.js");
const UploadRoutes = require("./routes/uploads_routes.js");
const errorHandler = require("./controllers/errorHandler_controller.js"); // Importing error handler

const app = express();

app.use(bodyParser.json());

app.use("/print_jobs", PrintJobsRoutes);
app.use("/uploads", UploadRoutes);

app.use(errorHandler); // Using the error handler middleware

app.listen(5000, () => console.log("Listening on port 5000"));
