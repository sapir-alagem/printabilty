const { processPrintJob } = require('../services/print_jobs_service');
const stripe = require('stripe')('sk_test_51OlWKuEfxT2rIn1yF8mAlqUB3hAP0CEgpALNKRokudYWVGTMJD7h9Ll6NvAFaPnBXVzTAsDRZDsG5cVKkLNj6KGr00iBvedkPk');
const express = require('express');

const router = express.Router();
const endpointSecret = 'whsec_73d33e8b1ade01fa4b28839d1cf3068efeec38b37738dcbf21bba206d0afa505';


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
