import React, { useState } from "react";
import { useCheckout } from "./CheckoutContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../api/axios";
import config from "../config.js";

const stripePromise = loadStripe(
  "pk_test_51OlWKuEfxT2rIn1yjXfG5QpuSBYmXKB1ORUnQWuoSDk2bKOhk5WpezGx1xKKsCfu1kdkmBruvVW5UGzQ1ejQGvQm00d3c0qhxQ"
);

const CheckoutButton = () => {
  const { printDetails, price, savePrintDetails } = useCheckout();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsDisabled(true);
      const currency = await axios
        .post(`/companies/currencyAbbreviation`, {
          companyId: printDetails.companyId,
        })
        .then((res) => res.data.currency)
        .catch((error) => console.error("Error fetching currency:", error));

      const response = await savePrintDetails(printDetails);
      const jobId = response.jobId;

      console.log("Print details saved successfully with jobId:", jobId);

      const roundedPrice = parseFloat(price).toFixed(2);

      const checkoutResponse = await axios.post(
        `${config.backUrl}/payment/create-checkout-session`,
        {
          price: roundedPrice,
          quantity: 1,
          jobId: jobId,
          currency: currency,
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
