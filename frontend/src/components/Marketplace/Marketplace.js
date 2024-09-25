import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Marketplace.css';

const Marketplace = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        image: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        axios.get('http://localhost:9000/api/posts')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/posts', newItem)
            .then(response => setItems([...items, response.data]))
            .catch(error => console.error('Error creating post:', error));
        setNewItem({
            name: '',
            image: '',
            price: '',
            description: ''
        });
    };

    const handleMessage = (user) => {
        alert(`Message ${user.name}`);
    };

    return (
        <div className="marketplace">
            <h1>Marketplace</h1>
            <form className="marketplace__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Item Name"
                    required
                />
                <input
                    type="text"
                    name="image"
                    value={newItem.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    required
                />
                <input
                    type="text"
                    name="price"
                    value={newItem.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                />
                <textarea
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                />
                <button type="submit">Create Post</button>
            </form>
            <div className="marketplace__items">
                {items.map(item => (
                    <div key={item.id} className="marketplace__item">
                        <div className="marketplace__item-header">
                            <img src={item.user.profilePicture} alt={item.user.name} className="marketplace__item-profile-picture" />
                            <h3 className="marketplace__item-user">{item.user.name}</h3>
                        </div>
                        <img src={item.image} alt={item.name} className="marketplace__item-image" />
                        <h2 className="marketplace__item-name">{item.name}</h2>
                        <p className="marketplace__item-price">{item.price}</p>
                        <p className="marketplace__item-description">{item.description}</p>
                        <button onClick={() => handleMessage(item.user)} className="marketplace__item-message-button">Message</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;