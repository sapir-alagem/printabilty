import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../Payments/CheckoutContext";
import CheckoutButton from "../../Payments/CheckoutButton";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import RangeSlider from "../components/RangeSlider";
import Header from "../components/Header";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function SummaryPage() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const fileUrl = queryParams.get("file_url");
  const { printDetails, setPrintDetails, price, currency } = useCheckout();
  const [documentName, setDocumentName] = useState("Document Name");
  const [colorMode, setColorMode] = useState("Black/White");
  const [printBothSides, setPrintBothSides] = useState("No");
  const [printAllPages, setPrintAllPages] = useState(true);
  const [pageRange, setPageRange] = useState({ start: 1, end: 1 });
  const [copies, setCopies] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    setPrintDetails({
      fileUrl: fileUrl,
      colorMode,
      printBothSides,
      printAllPages,
      pageRange,
      copies,
      numPages,
      companyId: queryParams.get("company_id"),
      printer_name: queryParams.get("printer_name"),
      price,
      documentName,
    });
  }, [
    fileUrl,
    colorMode,
    printBothSides,
    printAllPages,
    pageRange,
    copies,
    numPages,
    price,
    documentName,
  ]);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const file = new File([blob], fileUrl.split("/").pop());

        if (file.name.endsWith(".pdf")) {
          const loadingTask = pdfjsLib.getDocument(fileUrl);
          const pdf = await loadingTask.promise;
          setNumPages(pdf.numPages);
          setMaxPages(pdf.numPages);
        }
        setDocumentName(file.name);
        setPageRange({ start: 1, end: maxPages });
      } catch (error) {
        console.error("Error loading file:", error);
      }
    };

    if (fileUrl) {
      fetchFileData();
    }
  }, [fileUrl]);

  const handleCopiesChange = (value) => {
    setCopies(Math.max(1, copies + value));
  };

  const handlePreview = () => {
    window.open(fileUrl, "_blank");
  };

  return (
    <div>
      <Header
        title="Summary"
        description="Review and adjust your print settings before checkout"
      />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10%",
          zIndex: "100",
        }}
      >
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>
              <strong>Document name:</strong> {documentName}
            </span>
          </div>
          <div className="card-body">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-palette"></i>
                <span> Color</span>
              </div>
              <select
                className="form-select"
                value={colorMode}
                onChange={(e) => setColorMode(e.target.value)}
                style={{ width: "150px" }}
              >
                <option value="Black/White">Black/White</option>
                <option value="Color">Color</option>
              </select>
            </div>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-hash"></i>
                <span> Number of copies</span>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleCopiesChange(-1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={copies}
                  readOnly
                  style={{ width: "80px", margin: "0 10px" }}
                />
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleCopiesChange(1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-check2-all"></i>
                <span> Print all pages</span>
              </div>
              <select
                className="form-select"
                value={printAllPages ? "Yes" : "No"}
                onChange={(e) => setPrintAllPages(e.target.value === "Yes")}
                style={{ width: "150px" }}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {!printAllPages && (
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-file-code"></i>
                  <span> Page range</span>
                </div>
                <RangeSlider
                  min={1}
                  max={maxPages}
                  start={1}
                  end={maxPages}
                  //on range change set the page range and the number of pages
                  onRangeChange={(range) => {
                    setPageRange(range);
                    setNumPages(range.end - range.start + 1);
                  }}
                />
              </div>
            )}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-file-earmark-text"></i>
                <span> Print on both sides</span>
              </div>
              <select
                className="form-select"
                value={printBothSides}
                onChange={(e) => setPrintBothSides(e.target.value)}
                style={{ width: "150px" }}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted">NUMBER OF PAGES:</span>{" "}
              <strong>{numPages * copies}</strong>
            </div>
            <div>
              <span className="text-muted">PRICE:</span>{" "}
              <strong>
                {price} {currency}
              </strong>
            </div>
          </div>
          <div className="d-flex justify-content-between p-3">
            <button className="btn btn-danger" onClick={() => navigate(-1)}>
              REMOVE
            </button>
            <button className="btn btn-primary" onClick={handlePreview}>
              PREVIEW
            </button>
            <CheckoutButton /> {/* Use CheckoutButton here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
