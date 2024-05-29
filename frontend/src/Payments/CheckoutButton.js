import React from 'react';
import { useCheckout } from './CheckoutContext';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51OlWKuEfxT2rIn1yjXfG5QpuSBYmXKB1ORUnQWuoSDk2bKOhk5WpezGx1xKKsCfu1kdkmBruvVW5UGzQ1ejQGvQm00d3c0qhxQ'); // Define this at the top

const CheckoutButton = () => {
  const { printDetails } = useCheckout();

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/payment/create-checkout-session', {
        price: printDetails.price,
        quantity: 1, // Adjust the quantity as needed
      });

      const sessionId = response.data.id;

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <button onClick={handleCheckout} className="btn btn-primary mt-3">
      Checkout
    </button>
  );
};

export default CheckoutButton;
