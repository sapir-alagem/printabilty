import React from 'react';

function FileUploader() {
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
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => alert(error.message));
  }

  return (
      <div>
        <h1>Upload a file to print</h1>
        <form id="uploadForm" encType="multipart/form-data">
          <input id="file" type="file" name="file" />
          <br /><br />
          <button type="button" onClick={uploadFile}>Upload</button>
        </form>
        <script src="script.js"></script>
      </div>
  );
}

export default FileUploader;
