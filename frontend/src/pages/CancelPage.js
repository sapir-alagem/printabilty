import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Payment Canceled</h1>
        <p className="lead">Your payment was canceled. Please try again.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
