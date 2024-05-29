import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const navigate = useNavigate();

  async function uploadFile() {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:5000/uploads", requestOptions);
      const data = await response.json();
      navigate(`/summary?file_url=${encodeURIComponent(data.file_url)}`);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]); // Update selected file when the input changes
  }

  return (
    <div className="container text-center mt-5">
      <h1>Upload a file to print</h1>
      <form id="uploadForm" encType="multipart/form-data">
        <div className="custom-file mb-3">
          <input type="file" className="custom-file-input" id="file" name="file" onChange={handleFileChange} style={{ width: '100px' }} />
          <label className="custom-file-label" htmlFor="file">{selectedFile ? selectedFile.name : "Choose file"} </label>
          
        </div>
        <button type="button" className="btn btn-primary" onClick={uploadFile}>Upload</button>
      </form>
    </div>
  );
}

export default FileUploader;
