import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FileUploadComponent from "../components/FileUploader";
import Header from "../components/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

function FileUploader() {
  const axiosPrivate = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const company_id = queryParams.get("company_id");
  const printer_name = queryParams.get("printer_name");

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
        const response = await axios.post(
          `/companies/${companyId}/printer/check`,
          {
            companyId: companyId,
            name: printerName,
          }
        );

        const printer = response.data; // Assuming the printer data is in the response's data field

        if (printer.status === "suspended") {
          navigate("/suspended_printer", { replace: true });
        }
      } catch (error) {
        console.error("Failed to check printer status:", error);
        // Optionally, handle the error (e.g., navigate to an error page)
      }
    };

    checkPrinterStatus();
  }, [location.search, navigate]);

  async function uploadFile() {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    setIsDisabled(true); // Disable the button to prevent multiple clicks

    const formData = new FormData();
    formData.append("file", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/uploads",
        requestOptions
      );
      const data = await response.json();
      navigate(
        `/summary?file_url=${encodeURIComponent(
          data.file_url
        )}&company_id=${company_id}&printer_name=${encodeURIComponent(
          printer_name
        )}`
      );
    } catch (error) {
      alert(error.message);
    }
  }

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
