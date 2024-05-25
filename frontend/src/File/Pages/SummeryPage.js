import React from 'react';
import PdfPreview from '../components/pdfPreviewer';

function SummaryPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const fileUrl = queryParams.get("file_url");

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/print_jobs/send_print_job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_url: fileUrl, printer_name: "HP_ColorLaserJet_M253-M254" }),
      });
    } catch (error) {
      console.error('Error sending post request:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>PDF Preview</h1>
        <PdfPreview pdfUrl={fileUrl} />
      </div>
      <p>File URL: {fileUrl}</p>
      <button onClick={handleSubmit}>Send Print Job Request</button>
    </div>
  );
}

export default SummaryPage;
