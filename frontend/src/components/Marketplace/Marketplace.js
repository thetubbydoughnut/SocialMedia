import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Marketplace.css';

const Marketplace = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        image: '',
        price: '',
        description: '',
        category: 'All'
    });
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/posts', {
                    params: { category: selectedCategory !== 'All' ? selectedCategory : undefined }
                });
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchItems();
    }, [selectedCategory]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/posts', newItem);
            setItems((prevItems) => [...prevItems, response.data]);
            setNewItem({
                name: '',
                image: '',
                price: '',
                description: '',
                category: 'All'
            });
        } catch (error) {
            console.error('Error creating post:', error);
        }
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