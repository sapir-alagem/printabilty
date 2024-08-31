import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config.js";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children, initialPrintDetails }) => {
  const [printDetails, setPrintDetails] = useState(initialPrintDetails || {});
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("$");
  const queryParams = new URLSearchParams(window.location.search);
  const company_id = queryParams.get("company_id");

  useEffect(() => {
    const updatePrice = async () => {
      try {
        const response = await axios.post(
          `${config.backUrl}/print_jobs/calculate`,
          printDetails
        );
        const currency = await axios.post(
          `${config.backUrl}/companies/currency`,
          { companyId: company_id }
        );

        setPrice(response.data.finalPrice);
        setCurrency(currency.data.currency);
      } catch (error) {
        console.error("Error updating price:", error);
      }
    };

    if (printDetails) {
      updatePrice();
    }
  }, [printDetails]);

  const savePrintDetails = async (details) => {
    try {
      const response = await axios.post(
        `${config.backUrl}/print_jobs`,
        details
      );
      return response.data;
    } catch (error) {
      console.error("Error saving print details:", error);
      throw error;
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        printDetails,
        setPrintDetails,
        price,
        savePrintDetails,
        currency,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
