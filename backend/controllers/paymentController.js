const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const config = require("../config/config.js");

const createCheckoutSession = async (req, res) => {
  const { price, quantity, jobId } = req.body;

  try {
    console.log("config:" + config.appUrl);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ils",
            product_data: {
              name: "Print Service",
            },
            unit_amount: price * 100,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      metadata: {
        jobId: jobId,
      },
      success_url: `${config.appUrl}/success`,
      cancel_url: `${config.appUrl}/cancel`,
    });

    res.send({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};
