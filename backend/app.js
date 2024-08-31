const express = require("express");
const bodyParser = require("body-parser");
// require("dotenv").config({ path: "../.env" });
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const corsOptions = require("./config/corsOptions");
const paymentRoutes = require("./routes/payment_routes.js");
const PrintJobsRoutes = require("./routes/print_jobs_routes.js");
const companyRoutes = require("./routes/company_routes");
const UploadRoutes = require("./routes/uploads_routes.js");
const errorHandler = require("./controllers/errorHandler_controller.js");
//verifyJWT is a middleware function that verifies the JWT token
const verifyJWT = require("./middleWare/verifyJWT.js");
const webhookRouter = require("./routes/webhookRouter.js");
const qrCodesRouter = require("./routes/qrCodesRouter.js");
const printerRouter = require("./routes/printerRouter.js");
const registerRouter = require("./routes/register_routes.js");
const authRouter = require("./routes/auth_routes.js");
const refreshTokenRouter = require("./routes/refreshToken_routes.js");
const logoutRouter = require("./routes/logout_routes.js");
const cookieParser = require("cookie-parser");
const { setupWebSocketServer } = require("./services/web_socket_service.js");
const credentials = require("./middleWare/credentials.js");

const app = express();
const server = http.createServer(app);

//handle options credentials check before CORS and fetch cookies credentials requirements
app.use(credentials);

// CORS middleware
app.use(cors(corsOptions));

// Routes (ensure /webhook route comes before express.json())
app.use("/webhook", webhookRouter);

// Use body-parser middleware for other routes
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// Define other routes
//if want to use JWT token verification, add app.use(verifyJWT) above the routes that need to be protected and uncomment the verifyJWT import
app.use("/print_jobs", PrintJobsRoutes);
app.use("/companies", companyRoutes);
app.use("/uploads", UploadRoutes);
app.use('/payment', paymentRoutes);
app.use('/companies/:companyId/printers/:printerId/qrcodes', qrCodesRouter);
app.use('/companies/:companyId', printerRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshTokenRouter);
app.use('/logout', logoutRouter);


// Error handler middleware
app.use(errorHandler);

// Setup WebSocket server
setupWebSocketServer(server);

// Start the server only if mongoDB is connected

server.listen(5000, () => console.log("Listening on port 5000"));
