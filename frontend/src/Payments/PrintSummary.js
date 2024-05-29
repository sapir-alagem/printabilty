import React, { useEffect } from 'react';
import { useCheckout } from './CheckoutContext';

const PrintSummary = () => {
  const { printDetails, setPrintDetails } = useCheckout();

  useEffect(() => {
    const basePrice = 10; // Example base price
    let finalPrice = basePrice;

    if (printDetails.duplex) finalPrice += 2; // Add cost for duplex printing
    if (printDetails.color) finalPrice += 5; // Add cost for color printing

    finalPrice *= printDetails.copies; // Multiply by number of copies

    setPrintDetails((prevDetails) => ({
      ...prevDetails,
      price: finalPrice,
    }));
  }, [printDetails.duplex, printDetails.color, printDetails.copies, setPrintDetails]);

  return (
    <div className="mt-4">
      <h2 className="mb-3">Print Summary</h2>
      <ul className="list-group">
        <li className="list-group-item">File: {printDetails.file?.name}</li>
        <li className="list-group-item">Duplex: {printDetails.duplex ? 'Yes' : 'No'}</li>
        <li className="list-group-item">Color: {printDetails.color ? 'Yes' : 'No'}</li>
        <li className="list-group-item">Copies: {printDetails.copies}</li>
        <li className="list-group-item">
          <strong>Total Price: ${printDetails.price}</strong>
        </li>
      </ul>
    </div>
  );
};

export default PrintSummary;
