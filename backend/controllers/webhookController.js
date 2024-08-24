const { processPrintJob } = require("../services/print_jobs_service");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");

const router = express.Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// POST /webhook route handler
const checkHook = async (req, res, next) => {
  console.log("GET Request in webhook");
  res.status(200).json({ message: "OK" });
};

function handleWebhook(request, response) {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const jobId = session.metadata.jobId;

    processPrintJob(jobId)
      .then(() => {
        console.log("Print job sent successfully.");
      })
      .catch((error) => {
        console.error("Failed to send print job:", error);
      });
  }

  // Return a response to acknowledge receipt of the event
  response.status(200).json({ received: true });
}

module.exports = { handleWebhook, checkHook };
