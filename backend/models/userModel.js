const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Hash password before saving
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

// Method to compare password
User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;