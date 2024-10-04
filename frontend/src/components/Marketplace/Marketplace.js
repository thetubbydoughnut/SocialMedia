import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings, createListing } from '../../redux/marketplaceSlice';
import './Marketplace.css';

const Marketplace = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const listings = useSelector(state => state.marketplace.listings);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createListing({ title, description, price: parseFloat(price) }));
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className="marketplace-container">
      <h2>Marketplace</h2>
      <form onSubmit={handleSubmit} className="create-listing-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          step="0.01"
          required
        />
        <button type="submit">Create Listing</button>
      </form>
      <div className="listings-grid">
        {listings.map(listing => (
          <div key={listing.id} className="listing-card">
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p className="price">${listing.price.toFixed(2)}</p>
            <button>Contact Seller</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;