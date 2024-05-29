import React from 'react';
import { useCheckout } from './CheckoutContext';

const CheckoutForm = () => {
  const { paymentDetails, setPaymentDetails } = useCheckout();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment here
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2 className="mb-3">Payment Information</h2>
      <div className="form-group">
        <label>Card Number</label>
        <input
          type="text"
          className="form-control"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Expiry Date</label>
        <input
          type="text"
          className="form-control"
          name="expiryDate"
          value={paymentDetails.expiryDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>CVV</label>
        <input
          type="text"
          className="form-control"
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
