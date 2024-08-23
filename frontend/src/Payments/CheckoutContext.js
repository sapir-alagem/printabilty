// CheckoutContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children, initialPrintDetails }) => {
  const [printDetails, setPrintDetails] = useState(initialPrintDetails || {});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const updatePrice = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/print_jobs/update_price",
          printDetails
        );
        setPrice(response.data.price);
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
        "http://localhost:5000/print_jobs",
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
      value={{ printDetails, setPrintDetails, price, savePrintDetails }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
