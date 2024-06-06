import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children, initialPrintDetails }) => {
  const [printDetails, setPrintDetails] = useState(initialPrintDetails || {});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (printDetails) {
      const basePrice = 10; // Example base price
      let finalPrice = basePrice;

      if (printDetails.printBothSides) finalPrice += 2; // Add cost for duplex printing
      if (printDetails.colorMode === 'color') finalPrice += 5; // Add cost for color printing

      finalPrice *= printDetails.copies; // Multiply by number of copies

      setPrice(finalPrice);
    }
  }, [printDetails]);

  const savePrintDetails = async (details) => {
    try {
      const response = await axios.post('http://localhost:5000/print_jobs', details);
      return response.data; // Ensure this returns the full response
    } catch (error) {
      console.error('Error saving print details:', error);
      throw error;
    }
  };

  return (
    <CheckoutContext.Provider value={{ printDetails, setPrintDetails, price, savePrintDetails }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
