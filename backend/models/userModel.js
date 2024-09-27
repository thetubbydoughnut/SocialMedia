const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true, // Ensure the id is unique
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the username is unique
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the email is unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coverPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = User;