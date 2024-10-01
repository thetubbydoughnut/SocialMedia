import React, { useState } from 'react';
import axios from 'axios';
import './UploadStory.css';

function UploadStory() {
  const [file, setFile] = useState(null);
  const [expiresInHours, setExpiresInHours] = useState(24);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('media', file);
    formData.append('expiresInHours', expiresInHours);

    try {
      await axios.post('/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFile(null);
      // The new story will appear via Socket.io
    } catch (error) {
      console.error('Error uploading story:', error);
    }
  };

  return (
    <div className="upload-story">
      <h3>Upload Story</h3>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} required />
        <label>
          Expires In Hours:
          <input
            type="number"
            value={expiresInHours}
            onChange={(e) => setExpiresInHours(e.target.value)}
            min="1"
          />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadStory;