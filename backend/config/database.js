const { Sequelize } = require('sequelize');
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage,
    logging: false, // Disable logging; enable if needed
});

module.exports = sequelize;