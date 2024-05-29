import React from 'react';
import { CheckoutProvider } from './CheckoutContext';
import CheckoutForm from './CheckoutButton';
import PrintSummary from './PrintSummary';

const CheckoutPage = () => {
  return (
    <CheckoutProvider>
      <div className="container mt-5">
        <h1 className="mb-4">Checkout</h1>
        <div className="row">
          <div className="col-md-6">
            <PrintSummary />
          </div>
          <div className="col-md-6">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default CheckoutPage;
