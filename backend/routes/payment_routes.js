const express = require('express');
const router = express.Router();

module.exports = router;

const stripe = require('stripe')('sk_test_51PBXVfKMsoXLCRBCyjq6gIDAXINqay14KVEp5hlwnYalI6JeN7J35ocBcRnJz7cuqLBahDAPME9wixPl4PMMw3rN00DP3lLnhk');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

router.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create(
    {name: 'Israel Israeli',
    email: 'ILoveIL@example.com',}
  );
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-04-10'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'ils',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51PBXVfKMsoXLCRBCsEZA0QTh2xc0zthUpR59mWMgYNIXN3parrZBHwGhewxURwTWroaC3TUxcfbOJShMdFHh8Kd700fkasyMWV'
  });
});