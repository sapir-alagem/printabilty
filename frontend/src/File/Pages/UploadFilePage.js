import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FileUploadComponent from "../components/FileUploader";
import Header from "../components/Header";
function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const company_id = queryParams.get("company_id");
  const printer_name = queryParams.get("printer_name");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const companyId = queryParams.get("company_id");
    const printerName = queryParams.get("printer_name");

    if (!companyId || !printerName) {
      alert(
        "Required query parameters are missing. Please ensure you provide company_id and printer_name."
      );
      // Redirect to an error page or another route if the parameters are missing
      navigate("/"); // Replace '/error' with your actual error route
    }
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
