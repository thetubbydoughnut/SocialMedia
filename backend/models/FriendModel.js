const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Friend = sequelize.define('Friend', {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'declined'),
        defaultValue: 'pending',
    },
});

module.exports = Friend;