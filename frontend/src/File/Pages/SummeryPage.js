import React from 'react';

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
      <h1>File Preview</h1>
      <img src={fileUrl} alt="File Preview" />
      <p>File URL: {fileUrl}</p>
      <button onClick={handleSubmit}>Send Print Job Request</button>
    </div>
  );
}

export default SummaryPage;
