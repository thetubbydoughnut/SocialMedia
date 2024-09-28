const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

class Friend extends Model {}

Friend.init({
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // ... other fields
}, {
    sequelize,
    modelName: 'Friend',
});

// Define associations
Friend.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Friend.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

module.exports = Friend;