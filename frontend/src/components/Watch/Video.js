import React, { useRef, useEffect } from 'react';
import './Video.css';

const Video = ({ src, description }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const handlePlay = () => {
            videoRef.current.play();
        };

        const handlePause = () => {
            videoRef.current.pause();
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    handlePlay();
                } else {
                    handlePause();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(videoRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="video">
            <video ref={videoRef} className="video__player" loop muted>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="video__description">{description}</div>
        </div>
    );
};

export default Video;