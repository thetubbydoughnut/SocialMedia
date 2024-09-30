import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProfiles, searchSelectors } from '../../slices/searchSlice';
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

    const delayDebounceFn = setTimeout(() => {
      dispatch(searchProfiles(query));
      setShowDropdown(true);
    }, 300); // Debounce time in ms

    return () => clearTimeout(delayDebounceFn);
  }, [query, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search profiles..."
        className="search-bar-input"
      />
      {showDropdown && (
        <div className="search-dropdown">
          {searchStatus === 'loading' && <div className="search-loading">Loading...</div>}
          {searchStatus === 'failed' && <div className="search-error">{searchError}</div>}
          {searchStatus === 'succeeded' && searchResults.length === 0 && <div className="search-no-results">No profiles found.</div>}
          {searchStatus === 'succeeded' && searchResults.length > 0 && (
            <ul className="search-results-list">
              {searchResults.map((profile) => (
                <li key={profile.id} className="search-result-item">
                  <Link to={`/profile/${profile.username}`} className="search-result-link" onClick={() => setShowDropdown(false)}>
                    <img src={profile.profilePicture || '/default-profile.png'} alt={profile.name} className="search-result-avatar" />
                    <span>{profile.name}</span>
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