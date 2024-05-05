import React from 'react';
import { useNavigate } from 'react-router-dom';

function FileUploader() {
  const navigate = useNavigate();

  async function uploadFile() {
    const selectedFile = document.getElementById("file").files[0];
    
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

    fetch("http://localhost:5000/uploads", requestOptions)
      .then(response => response.json())
      .then(data => {
        navigate(`/summary?file_url=${encodeURIComponent(data.file_url)}`);
      })
      .catch(error => alert(error.message));
  }

  return (
    <div>
      <h1>Upload a file to print</h1>
      <form id="uploadForm" encType="multipart/form-data">
        <input id="file" type="file" name="file" />
        <br /><br />
        <button type="button" onClick={uploadFile}>Upload</button>
      </form>
    </div>
  );
}

export default FileUploader;
