import React from 'react';

function SummaryPage({ fileUrl }) {
  return (
    <div>
      <h1>File Preview</h1>
      <img src={fileUrl} alt="File Preview" />
      <p>File URL: {fileUrl}</p>
      {/* Add button and functionality for sending post request here */}
    </div>
  );
}

export default SummaryPage;
