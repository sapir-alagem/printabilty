import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PdfPreview from '../components/pdfPreviewer';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Initialize pdfjsLib worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function SummaryPage() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const fileUrl = queryParams.get("file_url");
  const [colorMode, setColorMode] = useState('color');
  const [printBothSides, setPrintBothSides] = useState(false);
  const [layoutMode, setLayoutMode] = useState('portrait');
  const [printAllPages, setPrintAllPages] = useState(true);
  const [pageRange, setPageRange] = useState({ start: 1, end: 1 });
  const [copies, setCopies] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
        setPageRange({ start: 1, end: pdf.numPages });
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    if (fileUrl) {
      fetchPdfData();
    }
  }, [fileUrl]);

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

  const handleCopiesChange = (e) => {
    setCopies(e.target.value);
  };

  const handlePageRangeChange = (e) => {
    const { name, value } = e.target;
    setPageRange((prevRange) => ({
      ...prevRange,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = async () => {
    const params = new URLSearchParams();
    params.append('file_url', fileUrl);
    params.append('color_mode', colorMode);
    params.append('layout_mode', layoutMode);
    params.append('print_both_sides', printBothSides);
    params.append('print_all_pages', printAllPages);
    params.append('start_page', pageRange.start);
    params.append('end_page', pageRange.end);
    params.append('copies', copies);
    params.append('numPages', numPages);

    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h1>Print Options</h1>
          <div className="mt-3">
            <label className="d-block">
              Color Mode:
              <select className="form-select mt-1" value={colorMode} onChange={handleColorModeChange}>
                <option value="color">Color</option>
                <option value="black_white">Black & White</option>
              </select>
            </label>
          </div>
          <div className="mt-3">
            <label className="d-block">
              Layout:
              <select className="form-select mt-1" value={layoutMode} onChange={handleLayoutModeChange}>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </label>
          </div>
          <div className="mt-3">
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
          <div className="mt-3">
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
          {!printAllPages && (
            <div className="mt-3">
              <label className="d-block">
                Page Range:
                <input
                  type="number"
                  className="form-control mt-1 d-inline-block"
                  name="start"
                  value={pageRange.start}
                  onChange={handlePageRangeChange}
                  min={1}
                  max={numPages}
                  style={{ width: '100px' }}
                />
                to
                <input
                  type="number"
                  className="form-control mt-1 d-inline-block"
                  name="end"
                  value={pageRange.end}
                  onChange={handlePageRangeChange}
                  min={1}
                  max={numPages}
                  style={{ width: '100px' }}
                />
              </label>
            </div>
          )}
          <div className="mt-3">
            <label className="d-block">
              Number of Copies:
              <input
                type="number"
                className="form-control mt-1"
                value={copies}
                onChange={handleCopiesChange}
                style={{ width: '100px' }}
              />
            </label>
          </div>
        </div>
        <div className="col-md-8">
          <h1>PDF Preview</h1>
          <PdfPreview pdfUrl={fileUrl} />            
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-left ">
          <button className="btn btn-success" onClick={handleSubmit}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
