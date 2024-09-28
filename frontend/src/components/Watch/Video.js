import React, { useRef, useEffect } from 'react';
import './Video.css';

const Video = ({ src, description }) => {
    const videoRef = useRef(null);
    const playTimeoutRef = useRef(null);
    const pauseTimeoutRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handlePlay = () => {
            clearTimeout(pauseTimeoutRef.current);
            playTimeoutRef.current = setTimeout(() => {
                videoElement.play();
            }, 100); // Debounce play
        };

        const handlePause = () => {
            clearTimeout(playTimeoutRef.current);
            pauseTimeoutRef.current = setTimeout(() => {
                videoElement.pause();
            }, 100); // Debounce pause
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

        observer.observe(videoElement);

        return () => {
            observer.unobserve(videoElement);
            clearTimeout(playTimeoutRef.current);
            clearTimeout(pauseTimeoutRef.current);
            videoElement.pause(); // Ensure the video is paused when the component unmounts
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