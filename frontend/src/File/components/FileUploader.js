import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FileUploader.css";

export default function CustomFileUpload() {
  const [file, setFile] = useState(null);

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
    if (!file) {
      alert("No file selected");
      return;
    }

    setIsDisabled(true); // Disable the button to prevent multiple clicks

    const formData = new FormData();
    formData.append("file", file);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="upload-container">
      <h2>Upload file</h2>
      <div className="upload-box">
        {!file ? (
          <div className="upload-prompt">
            <i className="pi pi-file" style={{ fontSize: "2rem" }}></i>
            <p>Choose a file</p>
            <small>JPEG, PNG, PDG, and MP4 formats, up to 50MB</small>
            <input type="file" onChange={handleFileChange} hidden />
            <button
              className="browse-button"
              onClick={() =>
                document.querySelector("input[type='file']").click()
              }
            >
              Browse File
            </button>
          </div>
        ) : (
          <div className="uploaded-file">
            <i className="pi pi-file-pdf" style={{ fontSize: "1.5rem" }}></i>
            <span>{file.name}</span>
            <small>{(file.size / 1024 / 1024).toFixed(2)} Mb</small>
            <button className="remove-file" onClick={() => setFile(null)}>
              <i className="pi pi-times"></i>
            </button>
          </div>
        )}
      </div>
      <button onClick={uploadFile} className="upload-button">
        Upload
      </button>
    </div>
  );
}
