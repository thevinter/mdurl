import React, { useState } from "react";
import styles from './upload.module.css'
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.name.endsWith('.md')) {
        alert('Please upload a valid Markdown (.md) file.');
        return;
      }
  
      if (file.size > 5242880) { // 5MB in bytes
        alert('File size should be less than 5MB.');
        return;
      }

      setSelectedFile(event.target.files[0]);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const uploadUrl = "http://localhost:5000/upload";

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      navigate(`/markdown/${result.url}`.replace(".md", ""));
    } catch (error) {
      alert(`Failed to upload file: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Upload Markdown File</h1>
      <form onSubmit={handleSubmit} className={styles.formStyle}>
        <div className={styles.inputWrapperStyle}>
          <input type="file" accept=".md" onChange={handleFileChange} className={styles.inputStyle} />
        </div>
        <div className={styles.buttonWrapperStyle}>
          <button type="submit" className={styles.buttonStyle}>Upload</button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
