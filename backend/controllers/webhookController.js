const { processPrintJob } = require('../services/print_jobs_service');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');

const router = express.Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;



// POST /webhook route handler
const checkHook = async (req, res, next) => {
    console.log('GET Request in webhook');
    res.status(200).json({ message: 'OK' });
}

function handleWebhook(request, response) {
  if (request.body['type'] === 'checkout.session.completed') {
    const session = request.body.data.object;
    const jobId = session.metadata.jobId;

    processPrintJob(jobId)
      .then(() => {
        console.log('Print job sent successfully.');
      })
      .catch((error) => {
        console.error('Failed to send print job:', error);
      });
  }

  response.status(200).json({ received: true });
}

module.exports = { handleWebhook , checkHook};
