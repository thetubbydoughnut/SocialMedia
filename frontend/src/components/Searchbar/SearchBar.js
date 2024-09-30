import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProfiles } from '../../slices/searchSlice';
import { searchSelectors } from '../../slices/searchSlice';
import { Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector(searchSelectors.selectSearchResults);
  const searchStatus = useSelector(searchSelectors.selectSearchStatus);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchProfiles(query));
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input 
          type="text"
          placeholder="Search profiles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={searchStatus === 'loading'}>
          Search
        </button>
      </form>
      {searchStatus === 'succeeded' && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((profile) => (
            <Link to={`/profile/${profile.username}`} key={profile.id} className="search-result-item">
              <img src={profile.profilePhoto || '/default-profile.png'} alt={profile.username} />
              <span>{profile.username}</span>
            </Link>
          ))}
        </div>
      )}
      {searchStatus === 'succeeded' && searchResults.length === 0 && (
        <div className="search-no-results">No profiles found.</div>
      )}
      {searchStatus === 'failed' && (
        <div className="search-error">Search failed. Please try again.</div>
      )}
    </div>
  );
};

export default SearchBar;