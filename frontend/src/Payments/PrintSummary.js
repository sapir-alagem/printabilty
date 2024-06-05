import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PrintSummary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [printDetails, setPrintDetails] = useState({
    fileUrl: queryParams.get("file_url"),
    numPages: queryParams.get("numPages"),
    colorMode: queryParams.get("color_mode"),
    printBothSides: queryParams.get("print_both_sides") === 'true',
    layoutMode: queryParams.get("layout_mode"),
    printAllPages: queryParams.get("print_all_pages") === 'true',
    pageRange: {
      start: parseInt(queryParams.get("start_page")),
      end: parseInt(queryParams.get("end_page")),
    },
    copies: parseInt(queryParams.get("copies")),
  });

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const basePrice = 10; // Example base price
    let finalPrice = basePrice;

    if (printDetails.printBothSides) finalPrice += 2; // Add cost for duplex printing
    if (printDetails.colorMode === 'color') finalPrice += 5; // Add cost for color printing

    finalPrice *= printDetails.copies; // Multiply by number of copies

    setPrice(finalPrice);
  }, [printDetails.printBothSides, printDetails.colorMode, printDetails.copies]);

  return (
    <div className="mt-4">
      <h2 className="mb-3">Print Summary</h2>
      <ul className="list-group">
        <li className="list-group-item">File URL: {printDetails.fileUrl}</li>
        <li className="list-group-item">Number of pages: {printDetails.numPages}</li>
        <li className="list-group-item">Color Mode: {printDetails.colorMode}</li>
        <li className="list-group-item">Print on Both Sides: {printDetails.printBothSides ? 'Yes' : 'No'}</li>
        <li className="list-group-item">Layout Mode: {printDetails.layoutMode}</li>
        <li className="list-group-item">Print All Pages: {printDetails.printAllPages ? 'Yes' : 'No'}</li>
        {!printDetails.printAllPages && (
          <li className="list-group-item">Page Range: {printDetails.pageRange.start} - {printDetails.pageRange.end}</li>
        )}
        <li className="list-group-item">Total Copies: {printDetails.copies}</li>
        <li className="list-group-item">Total Price: ${price}</li>
      </ul>
    </div>
  );
};

export default PrintSummary;
