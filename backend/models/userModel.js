const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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

sequelize.sync({ alter: true }) // This will update the table schema
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = User;