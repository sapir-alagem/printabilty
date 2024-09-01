const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const paymentRoutes = require("./routes/payment_routes.js");
const PrintJobsRoutes = require("./routes/print_jobs_routes.js");
const companyRoutes = require("./routes/company_routes");
const UploadRoutes = require("./routes/uploads_routes.js");
const errorHandler = require("./controllers/errorHandler_controller.js");
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

app.use(credentials);
app.use(cors(corsOptions));
app.use("/webhook", webhookRouter);
app.use(express.json());
app.use(cookieParser());

app.use("/print_jobs", PrintJobsRoutes);
app.use("/companies", companyRoutes);
app.use("/uploads", UploadRoutes);
app.use("/payment", paymentRoutes);
app.use("/companies/:companyId/printers/:printerId/qrcodes", qrCodesRouter);
app.use("/companies/:companyId", printerRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/logout", logoutRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

// Setup WebSocket server
setupWebSocketServer(server);
