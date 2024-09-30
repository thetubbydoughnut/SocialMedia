import React, { useRef, useState } from 'react';
import './Video.css';

const Video = ({ src, description }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="video">
            <video
                ref={videoRef}
                src={src}
                className="video__player"
                loop
                onClick={togglePlay}
            />
            <div className="video__overlay" onClick={togglePlay}>
                {!isPlaying && <div className="video__play-button">▶</div>}
            </div>
            <div className="video__description">{description}</div>
        </div>
    );
};

export default Video;