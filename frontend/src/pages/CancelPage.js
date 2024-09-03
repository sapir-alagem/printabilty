import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const CancelPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">
          Payment Canceled{" "}
          <span role="img" aria-label="sad face">
            😔
          </span>
        </h1>
        <p className="lead">Your payment was canceled. Please try again.</p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate(-4);
          }}
        >
          try again
        </Button>
      </div>
    </div>
  );
};

export default CancelPage;
