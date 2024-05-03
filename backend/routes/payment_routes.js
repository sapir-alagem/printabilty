const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PBXVfKMsoXLCRBCyjq6gIDAXINqay14KVEp5hlwnYalI6JeN7J35ocBcRnJz7cuqLBahDAPME9wixPl4PMMw3rN00DP3lLnhk');

// routes endpoints
router.post('/intent', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'ils',
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  });

module.exports = router;
