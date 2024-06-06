const Stripe = require('stripe');
const stripe = Stripe('sk_test_51OlWKuEfxT2rIn1yF8mAlqUB3hAP0CEgpALNKRokudYWVGTMJD7h9Ll6NvAFaPnBXVzTAsDRZDsG5cVKkLNj6KGr00iBvedkPk'); // Replace with your Stripe secret key

const createCheckoutSession = async (req, res) => {
    const { price, quantity, jobId } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'ils',
                product_data: {
                  name: 'Print Service',
                },
                unit_amount: price * 100, // Convert to cents
              },
              quantity: quantity,
            },
          ],
          mode: 'payment',
          metadata: {
            jobId: jobId, // Include jobId in the session metadata
          },
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
        });
    
        res.send({ id: session.id });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    };
    
    module.exports = {
      createCheckoutSession,
    };
