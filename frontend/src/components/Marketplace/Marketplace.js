import React from 'react';
import './Marketplace.css';

const sampleItems = [
    {
        id: 1,
        name: 'Mountain Bike',
        image: 'https://via.placeholder.com/150',
        price: '$200',
        description: 'A great mountain bike for all terrains.'
    },
    {
        id: 2,
        name: 'Laptop',
        image: 'https://via.placeholder.com/150',
        price: '$800',
        description: 'A powerful laptop for all your needs.'
    },
    {
        id: 3,
        name: 'Smartphone',
        image: 'https://via.placeholder.com/150',
        price: '$500',
        description: 'A latest model smartphone with all features.'
    }
];

const Marketplace = () => {
    return (
        <div className="marketplace">
            <h1>Marketplace</h1>
            <div className="marketplace__items">
                {sampleItems.map(item => (
                    <div key={item.id} className="marketplace__item">
                        <img src={item.image} alt={item.name} className="marketplace__item-image" />
                        <h2 className="marketplace__item-name">{item.name}</h2>
                        <p className="marketplace__item-price">{item.price}</p>
                        <p className="marketplace__item-description">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;