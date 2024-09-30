import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { profileSelectors } from '../../slices/profileSlice';

const SearchResults = () => {
    const searchResults = useSelector(profileSelectors.selectSearchResults);
    const searchStatus = useSelector(profileSelectors.selectSearchStatus);
    const error = useSelector(profileSelectors.selectProfileError);

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