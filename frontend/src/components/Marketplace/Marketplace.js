import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, addItem, setSelectedCategory } from '../../slices/marketplaceSlice';
import './Marketplace.css';

const Marketplace = () => {
    const dispatch = useDispatch();
    const { items, selectedCategory, status } = useSelector((state) => state.marketplace);
    const location = useSelector((state) => state.location);
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        description: '',
        category: 'All',
        user: {
            name: 'Current User', // Replace with actual user data
            profilePicture: 'https://via.placeholder.com/50' // Replace with actual user data
        }
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchItems(selectedCategory));
        }
    }, [selectedCategory, status, dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('price', newItem.price);
        formData.append('description', newItem.description);
        formData.append('category', newItem.category);
        formData.append('image', image);

        await dispatch(addItem(formData));
        dispatch(fetchItems(selectedCategory)); // Fetch updated items after adding new item
        setNewItem({
            name: '',
            price: '',
            description: '',
            category: 'All',
            user: {
                name: 'Current User', // Replace with actual user data
                profilePicture: 'https://via.placeholder.com/50' // Replace with actual user data
            }
        });
        setImage(null);
        setImagePreview(null);
        setIsFormVisible(false);
    };

    const formatPrice = (price) => {
        const formatter = new Intl.NumberFormat(location, {
            style: 'currency',
            currency: location === 'US' ? 'USD' : location === 'EU' ? 'EUR' : 'JPY',
        });
        return formatter.format(price);
    };

    return (
        <div className="marketplace">
            <div className="marketplace__sidebar">
                <h2>Filters</h2>
                <form>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                    >
                        <option value="All">All</option>
                        <option value="Sports">Sports</option>
                        <option value="Electronics">Electronics</option>
                        {/* Add more categories as needed */}
                    </select>
                </form>
            </div>
            <div className="marketplace__content">
                <h2>Marketplace</h2>
                <button onClick={() => setIsFormVisible(!isFormVisible)} className="marketplace__new-listing-button">
                    {isFormVisible ? 'Cancel' : 'New Listing'}
                </button>
                {isFormVisible && (
                    <div className="marketplace__form-preview-container">
                        <form onSubmit={handleSubmit} className="marketplace__form">
                            <input
                                type="text"
                                name="name"
                                value={newItem.name}
                                onChange={handleInputChange}
                                placeholder="Item Name"
                            />
                            <input
                                type="text"
                                name="price"
                                value={newItem.price}
                                onChange={handleInputChange}
                                placeholder="Price"
                            />
                            <textarea
                                name="description"
                                value={newItem.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                            />
                            <select
                                name="category"
                                value={newItem.category}
                                onChange={handleInputChange}
                            >
                                <option value="All">All</option>
                                <option value="Sports">Sports</option>
                                <option value="Electronics">Electronics</option>
                                {/* Add more categories as needed */}
                            </select>
                            <label htmlFor="image-upload" className="custom-file-upload">
                                Upload Image
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                            />
                            <button type="submit">Add Item</button>
                        </form>
                        <div className="marketplace__preview">
                            <h3>Post Preview</h3>
                            <div className="marketplace__item">
                                <div className="marketplace__item-header">
                                    <img src={newItem.user.profilePicture} alt={newItem.user.name} className="marketplace__item-profile-picture" />
                                    <h3 className="marketplace__item-user">{newItem.user.name}</h3>
                                </div>
                                {imagePreview && <img src={imagePreview} alt={newItem.name} className="marketplace__item-image" />}
                                <h3 className="marketplace__item-name">{newItem.name}</h3>
                                <p className="marketplace__item-price">{formatPrice(newItem.price)}</p>
                                <p className="marketplace__item-description">{newItem.description}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="marketplace__items">
                    {items.map((item) => (
                        <div key={item.id} className="marketplace__item">
                            <div className="marketplace__item-header">
                                <img 
                                    src={item.user?.profilePicture || 'https://via.placeholder.com/50'} 
                                    alt={item.user?.name || 'Unknown User'} 
                                    className="marketplace__item-profile-picture" 
                                />
                                <h3 className="marketplace__item-user">{item.user?.name || 'Unknown User'}</h3>
                            </div>
                            <img src={item.image} alt={item.name} className="marketplace__item-image" />
                            <h3 className="marketplace__item-name">{item.name}</h3>
                            <p className="marketplace__item-price">{formatPrice(item.price)}</p>
                            <p className="marketplace__item-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;