import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCheckout } from './CheckoutContext';
import axios from 'axios';

const CheckoutForm = () => {
  const { paymentDetails, printDetails } = useCheckout();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { data: { clientSecret } } = await axios.post('http://localhost:5000/payment/create-payment-intent', {
        amount: printDetails.price * 100, // Convert to cents
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            // Include additional billing details if needed
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        // Handle post-payment success actions here
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2 className="mb-3">Payment Information</h2>
      <div className="form-group">
        <label>Card Details</label>
        <CardElement className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary mt-3" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
