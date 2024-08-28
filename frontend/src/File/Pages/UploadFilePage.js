import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FileUploadComponent from "../components/FileUploader";
import Header from "../components/Header";
import axios from "../../api/axios";

function FileUploader() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkPrinterStatus = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const companyId = queryParams.get("company_id");
        const printerName = queryParams.get("printer_name");

        if (!companyId || !printerName) {
          alert(
            "Required query parameters are missing. Please ensure you provide company_id and printer_name."
          );
          navigate("/"); // Redirect to a different route if parameters are missing
          return; // Exit the function early if parameters are missing
        }

        // Check if the printer is disabled
        const response = await axios.post(`/companies/${companyId}/printer/check`, {
          companyId: companyId,
          name: printerName,
        });

        const printer = response.data; // Assuming the printer data is in the response's data field

        if (printer.status === "suspended") {
          navigate("/PrinterSuspended", { replace: true });
        }
      } catch (error) {
        console.error("Failed to check printer status:", error);
        // Optionally, handle the error (e.g., navigate to an error page)
      }
    };

    checkPrinterStatus();
  }, [location.search, navigate]);

  return (
    <div>
      <Header
        title="Upload a file to print"
        description="Easily browse and upload your file and get it printed in no time."
      />

      <div>
        <FileUploadComponent />
      </div>
    </div>
  );
}

export default FileUploader;
