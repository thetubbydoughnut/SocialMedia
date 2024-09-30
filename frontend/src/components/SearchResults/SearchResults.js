import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const { searchResults, searchStatus, error } = useSelector(state => state.user);

    if (searchStatus === 'loading') return <div>Searching...</div>;
    if (searchStatus === 'failed') return <div>Error: {error}</div>;

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            {searchResults.length === 0 ? (
                <p>No results found</p>
            ) : (
                <ul>
                    {searchResults.map(profile => (
                        <li key={profile.id}>
                            <Link to={`/profile/${profile.username}`}>
                                <img src={profile.profilePhoto || '/default-profile.png'} alt={profile.username} />
                                <span>{profile.username}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;