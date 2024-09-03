import React from "react";
import { useLocation } from "react-router-dom";
import { CheckoutProvider, useCheckout } from "./CheckoutContext";
import CheckoutButton from "./CheckoutButton";

const PrintSummary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialPrintDetails = {
    fileUrl: queryParams.get("file_url") || "",
    numPages: parseInt(queryParams.get("numPages")) || 0,
    colorMode: queryParams.get("color_mode") || "monochrome",
    printBothSides: queryParams.get("print_both_sides") === "true",
    layoutMode: queryParams.get("layout_mode") || "portrait",
    printAllPages: queryParams.get("print_all_pages") === "true",
    pageRange: {
      start: parseInt(queryParams.get("start_page")) || 1,
      end: parseInt(queryParams.get("end_page")) || 1,
    },
    copies: parseInt(queryParams.get("copies")) || 1,
    company_id: queryParams.get("company_id") || "",
    printer_name: queryParams.get("printer_name") || "",
  };

  return (
    <CheckoutProvider initialPrintDetails={initialPrintDetails}>
      <PrintSummaryContent />
      <CheckoutButton />
    </CheckoutProvider>
  );
};

const PrintSummaryContent = () => {
  const { printDetails, price } = useCheckout();

  return (
    <div className="mt-4">
      <h2 className="mb-3">Print Summary</h2>
      <ul className="list-group">
        <li className="list-group-item">
          Number of pages: {printDetails.numPages}
        </li>
        <li className="list-group-item">
          Color Mode: {printDetails.colorMode}
        </li>
        <li className="list-group-item">
          Print on Both Sides: {printDetails.printBothSides ? "Yes" : "No"}
        </li>
        <li className="list-group-item">
          Layout Mode: {printDetails.layoutMode}
        </li>
        <li className="list-group-item">
          Print All Pages: {printDetails.printAllPages ? "Yes" : "No"}
        </li>
        {!printDetails.printAllPages && (
          <li className="list-group-item">
            Page Range: {printDetails.pageRange.start} -{" "}
            {printDetails.pageRange.end}
          </li>
        )}
        <li className="list-group-item">Total Copies: {printDetails.copies}</li>
        <li className="list-group-item">Total Price: ₪{price}</li>
      </ul>
    </div>
  );
};

export default PrintSummary;
