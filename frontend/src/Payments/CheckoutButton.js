import React, { useState } from "react";
import { useCheckout } from "./CheckoutContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import config from "../config.js";

const stripePromise = loadStripe(
  "pk_test_51OlWKuEfxT2rIn1yjXfG5QpuSBYmXKB1ORUnQWuoSDk2bKOhk5WpezGx1xKKsCfu1kdkmBruvVW5UGzQ1ejQGvQm00d3c0qhxQ"
);

const CheckoutButton = () => {
  const { printDetails, price, savePrintDetails } = useCheckout();
  const [isDisabled, setIsDisabled] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleCheckout = async () => {
    try {
      setIsDisabled(true); // Disable the button to prevent multiple clicks

      // Save print details to the database
      const response = await savePrintDetails(printDetails);
      const jobId = response.jobId; // Assuming the response contains the inserted jobId

      console.log("Print details saved successfully with jobId:", jobId);

      // Ensure the price is rounded to 2 decimal places
      const roundedPrice = parseFloat(price).toFixed(2);
      const result = await axiosPrivate.get(
        `/companies/${printDetails.companyId}`
      );
      const currency = result.data.company.paymentsCurrency;

      // Proceed to create checkout session
      const checkoutResponse = await axios.post(
        `${config.backUrl}/payment/create-checkout-session`,
        {
          price: roundedPrice, // Use the rounded price
          quantity: 1, // Adjust the quantity as needed
          jobId: jobId, // Include jobId in the request
          currency: currency, // Include currency in the request
        }
      );

      const sessionId = checkoutResponse.data.id;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during checkout process:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        className="btn btn-success"
        type="button"
        disabled={isDisabled}
      >
        {isDisabled ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </>
        ) : (
          "Checkout"
        )}
      </button>
    </div>
  );
};

export default CheckoutButton;
