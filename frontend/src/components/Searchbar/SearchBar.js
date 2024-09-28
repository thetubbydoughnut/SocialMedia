import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/search/profiles?query=${query}`);
            setResults(response.data);
        } catch (err) {
            setError('Failed to fetch profiles');
        } finally {
            setLoading(false);
        }
    };

    const handleAddFriend = async (userId) => {
        try {
            await axiosInstance.post(`/friends/add`, { userId });
            alert('Friend request sent!');
        } catch (err) {
            alert('Failed to send friend request');
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search profiles..."
                />
                <button type="submit">Search</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <ul>
                {results.map((profile) => (
                    <li key={profile.id}>
                        <img src={profile.profilePhoto} alt={profile.username} />
                        <span>{profile.username}</span>
                        <button onClick={() => handleAddFriend(profile.id)}>Add Friend</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;