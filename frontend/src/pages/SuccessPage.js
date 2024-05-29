import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Payment Successful</h1>
        <p className="lead">Thank you for your payment. Your transaction was successful</p>
        <Link to="/" className="btn btn-success mt-3">
          Go to Home
        </Link>
      </div>
    </div>
  );
};
export default SuccessPage;
