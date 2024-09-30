import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrendingHashtags.css';

const TrendingHashtags = () => {
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingHashtags = async () => {
            try {
                const response = await axios.get('/api/hashtags/trending');
                setHashtags(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch trending hashtags');
                setLoading(false);
            }
        };

        fetchTrendingHashtags();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="trending-hashtags">
            <h2>Trending Hashtags</h2>
            <ul>
                {hashtags.map((hashtag) => (
                    <li key={hashtag.name}>#{hashtag.name} ({hashtag.count})</li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingHashtags;