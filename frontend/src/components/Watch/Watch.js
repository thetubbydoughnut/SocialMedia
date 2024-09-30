import React, { useState, useEffect } from 'react';
import Video from './Video';
import VideoUpload from './VideoUpload';
import Navbar from '../Navbar/Navbar';
import './Watch.css';

const initialVideos = [
    {
        src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Video 1 description',
    },
    {
        src: 'https://www.w3schools.com/html/movie.mp4',
        description: 'Video 2 description',
    },
];

const Watch = () => {
    const [videos, setVideos] = useState(initialVideos);
    const [showUpload, setShowUpload] = useState(false);

    const handleUpload = (videoUrl, description) => {
        setVideos([{ src: videoUrl, description }, ...videos]);
        setShowUpload(false);
    };

    const toggleUpload = () => {
        setShowUpload(!showUpload);
    };

    return (
        <div className="watch">
            <Navbar onUploadClick={toggleUpload} />
            {showUpload && <VideoUpload onUpload={handleUpload} />}
            <div className="watch__videos">
                {videos.map((video, index) => (
                    <Video key={index} src={video.src} description={video.description} />
                ))}
            </div>
        </div>
    );
};

export default Watch;