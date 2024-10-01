const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

class Notification extends Model {}

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Notification',
    timestamps: true
});

// Associations
Notification.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Notification.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

module.exports = Notification;