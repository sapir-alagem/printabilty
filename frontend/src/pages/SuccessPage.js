import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">
          Payment Successful{" "}
          <span role="img" aria-label="smily face">
            😊
          </span>
        </h1>
        <p className="lead">
          Thank you for your payment! Your transaction was successful. you can
          collect your print job from the printer.
        </p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate(-4);
          }}
        >
          print another document
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
