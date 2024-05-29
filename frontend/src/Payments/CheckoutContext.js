import React, { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [printDetails, setPrintDetails] = useState({
    file: null,
    duplex: false,
    color: false,
    copies: 1,
    price: 0,
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  return (
    <CheckoutContext.Provider value={{ printDetails, setPrintDetails, paymentDetails, setPaymentDetails }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
