import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProfiles, searchPosts, searchHashtags, searchSelectors } from '../../slices/searchSlice';
import { Link } from 'react-router-dom';
import './SearchBar.css'; // Ensure you have styles for the search bar and dropdown

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const searchResults = useSelector(searchSelectors.selectSearchResults);
  const searchStatus = useSelector(searchSelectors.selectSearchStatus);
  const searchError = useSelector(searchSelectors.selectSearchError);

  useEffect(() => {
    if (query.trim() === '') {
      // Optionally, clear search results if query is empty
      // dispatch(clearSearchResults()); // Define if needed
      return;
    }
  }, [query, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.startsWith('#')) {
      dispatch(searchHashtags(query.slice(1)));
    } else {
      dispatch(searchProfiles(query));
      dispatch(searchPosts(query));
    }
    setShowDropdown(true);
  };

  return (
    <div className="search-bar" ref={dropdownRef}>
      <input
        type="text"
        className="search-bar-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search profiles, posts, or #hashtags"
      />
      <button className="search-bar-button" onClick={handleSearch}>Search</button>
      {showDropdown && (
        <div className="search-dropdown">
          {searchStatus === 'loading' && <div className="search-loading">Loading...</div>}
          {searchStatus === 'failed' && <div className="search-error">{searchError}</div>}
          {searchStatus === 'succeeded' && searchResults.length === 0 && <div className="search-no-results">No results found.</div>}
          {searchStatus === 'succeeded' && searchResults.length > 0 && (
            <ul className="search-results-list">
              {searchResults.map((result) => (
                <li key={result.id} className="search-result-item">
                  <Link to={result.type === 'profile' ? `/profile/${result.username}` : result.type === 'post' ? `/post/${result.id}` : `/hashtag/${result.name}`} className="search-result-link" onClick={() => setShowDropdown(false)}>
                    <img src={result.profilePicture || '/default-profile.png'} alt={result.name} className="search-result-avatar" />
                    <span>{result.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;