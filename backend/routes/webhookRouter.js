const express = require("express");
const bodyParser = require("body-parser");
const webhookController = require("../controllers/webhookController");

const router = express.Router();

// Middleware to set raw body if not automatically set
const setRawBody = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

router.post(
  "/",
  bodyParser.raw({ type: "application/json", verify: setRawBody }),
  webhookController.handleWebhook
);
router.get("/", webhookController.checkHook);

module.exports = router;
