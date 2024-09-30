import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // This would typically fetch data from a weather API
        // For now, we'll use mock data
        setWeather({
            temperature: 72,
            condition: 'Sunny',
            location: 'New York, NY'
        });
    }, []);

    if (!weather) return null;

    return (
        <div className="widget weather">
            <h2>Weather</h2>
            <p>{weather.temperature}°F - {weather.condition}</p>
            <p>{weather.location}</p>
        </div>
    );
};

export default Weather;