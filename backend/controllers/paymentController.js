const Stripe = require('stripe');
const stripe = Stripe('sk_test_51OlWKuEfxT2rIn1yF8mAlqUB3hAP0CEgpALNKRokudYWVGTMJD7h9Ll6NvAFaPnBXVzTAsDRZDsG5cVKkLNj6KGr00iBvedkPk'); // Replace with your Stripe secret key

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
