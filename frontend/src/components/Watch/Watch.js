import React from 'react';
import Video from './Video';
import './Watch.css';

const videos = [
    {
        src: 'https://path/to/video1.mp4',
        description: 'Video 1 description',
    },
    {
        src: 'https://path/to/video2.mp4',
        description: 'Video 2 description',
    },
    // Add more video objects here
];

const Watch = () => {
    return (
        <div className="watch">
            {videos.map((video, index) => (
                <Video key={index} src={video.src} description={video.description} />
            ))}
        </div>
    );
};

export default Watch;