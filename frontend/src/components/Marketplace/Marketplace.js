import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, addItem, setSelectedCategory } from '../../slices/marketplaceSlice';
import './Marketplace.css';

const Marketplace = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.marketplace.items);
    const selectedCategory = useSelector((state) => state.marketplace.selectedCategory);
    const status = useSelector((state) => state.marketplace.status);
    const error = useSelector((state) => state.marketplace.error);
    const [newItem, setNewItem] = useState({
        name: '',
        image: '',
        price: '',
        description: '',
        category: 'All'
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchItems(selectedCategory));
        }
    }, [selectedCategory, status, dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addItem(newItem));
        setNewItem({
            name: '',
            image: '',
            price: '',
            description: '',
            category: 'All'
        });
    };

    return (
        <div className="marketplace">
            <h2>Marketplace</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Item Name"
                />
                <input
                    type="text"
                    name="image"
                    value={newItem.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
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
                <button type="submit">Add Item</button>
            </form>
            <div className="marketplace__items">
                {items.map((item) => (
                    <div key={item.id} className="marketplace__item">
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;