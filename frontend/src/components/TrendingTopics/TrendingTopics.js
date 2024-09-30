import React from 'react';

const TrendingTopics = () => {
    // This would typically fetch data from your backend
    const trendingTopics = ['#SocialMedia', '#TechNews', '#NewFeatures'];

    return (
        <div className="widget trending-topics">
            <h2>Trending Topics</h2>
            <ul>
                {trendingTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingTopics;
