const { Sequelize } = require('sequelize');
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage,
});

module.exports = sequelize;