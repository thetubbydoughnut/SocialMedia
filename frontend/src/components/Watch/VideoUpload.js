import React, { useState } from 'react';
import axios from 'axios';
import './VideoUpload.css';

const VideoUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('video', file);
        formData.append('description', description);

        setUploading(true);
        try {
            const response = await axios.post('/api/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpload(response.data.videoUrl, description);
            setFile(null);
            setDescription('');
        } catch (error) {
            console.error('Error uploading video:', error);
        }
        setUploading(false);
    };

    return (
        <div className="video-upload">
            <form onSubmit={handleUpload}>
                <label className="video-upload__label">
                    <input type="file" accept="video/*" onChange={handleFileChange} />
                    <span>Choose Video</span>
                </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description"
                    className="video-upload__description"
                />
                <button type="submit" disabled={uploading} className="video-upload__button">
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default VideoUpload;