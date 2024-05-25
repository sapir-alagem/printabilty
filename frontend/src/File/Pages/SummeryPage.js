import React, { useState } from 'react';
import PdfPreview from '../components/pdfPreviewer';
import 'bootstrap/dist/css/bootstrap.min.css';

function SummaryPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const fileUrl = queryParams.get("file_url");
  const [colorMode, setColorMode] = useState('color');
  const [printBothSides, setPrintBothSides] = useState(false);
  const [layoutMode, setLayoutMode] = useState('portrait');
  const [printAllPages, setPrintAllPages] = useState(true); // Default to print all pages
  const [pageRange, setPageRange] = useState({ start: 1, end: 1 });

  const handleColorModeChange = (e) => {
    setColorMode(e.target.value);
  };

  const handlePrintBothSidesChange = (e) => {
    setPrintBothSides(e.target.checked);
  };

  const handleLayoutModeChange = (e) => {
    setLayoutMode(e.target.value);
  };

  const handlePrintAllPagesChange = (e) => {
    setPrintAllPages(e.target.checked);
  };

  const handlePageRangeChange = (e) => {
    const { name, value } = e.target;
    setPageRange((prevRange) => ({
      ...prevRange,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/print_jobs/send_print_job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          file_url: fileUrl, 
          color_mode: colorMode,
          layout_Mode: layoutMode,
          print_both_sides: printBothSides,
          page_range: printAllPages ? { start: -1, end: -1 } : pageRange // Use default range if print all pages is true
        }),
      });
    } catch (error) {
      console.error('Error sending post request:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1>PDF Preview</h1>
          <PdfPreview pdfUrl={fileUrl} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <label className="d-block">
            Color Mode:
            <select className="form-select mt-1" value={colorMode} onChange={handleColorModeChange}>
              <option value="color">Color</option>
              <option value="black_white">Black & White</option>
            </select>
          </label>
        </div>
        <div className="col">
          <label className="d-block">
            Layout:
            <select className="form-select mt-1" value={layoutMode} onChange={handleLayoutModeChange}>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </label>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={printBothSides}
              onChange={handlePrintBothSidesChange}
              id="printBothSides"
            />
            <label className="form-check-label" htmlFor="printBothSides">
              Print on Both Sides
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={printAllPages}
              onChange={handlePrintAllPagesChange}
              id="printAllPages"
            />
            <label className="form-check-label" htmlFor="printAllPages">
              Print All Pages
            </label>
          </div>
        </div>
      </div>
      {!printAllPages && (
        <div className="row mt-3">
          <div className="col">
            <label className="d-block">
              Page Range:
              <input
                type="number"
                className="form-control mt-1"
                name="start"
                value={pageRange.start}
                onChange={handlePageRangeChange}
              />
              to
              <input
                type="number"
                className="form-control mt-1"
                name="end"
                value={pageRange.end}
                onChange={handlePageRangeChange}
              />
            </label>
          </div>
        </div>
      )}
      <div className="row mt-3">
        <div className="col">
          <button className="btn btn-success" onClick={handleSubmit}>Send Print Job Request</button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
