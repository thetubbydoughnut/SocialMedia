import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProfiles, profileSelectors } from '../../slices/profileSlice';
import Friends from '../FriendsList/Friends';
import './ProfileSearch.css';

const ProfileSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const searchResults = useSelector(profileSelectors.selectSearchResults);
    const searchStatus = useSelector(profileSelectors.selectSearchStatus);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            dispatch(searchProfiles(searchQuery));
        }
    };

    return (
        <div className="profile-search">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for friends..."
                />
                <button type="submit">Search</button>
            </form>
            <div className="search-results">
                {searchStatus === 'loading' && <p>Searching...</p>}
                {searchStatus === 'failed' && <p>Error searching profiles</p>}
                {searchStatus === 'succeeded' && searchResults.map(profile => (
                    <Friends key={profile.id} friend={profile} />
                ))}
            </div>
        </div>
    );
};

export default ProfileSearch;