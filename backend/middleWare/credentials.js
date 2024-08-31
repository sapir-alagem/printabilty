const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin); // Set the correct origin
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    ); // Add allowed methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Add allowed headers
    res.header("Access-Control-Allow-Credentials", "true"); // If you need credentials
  }

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
};

module.exports = credentials;
