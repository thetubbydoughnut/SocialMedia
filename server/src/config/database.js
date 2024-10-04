const knex = require('knex');
const config = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';

console.log('Current environment:', environment);
console.log('Database configuration:', JSON.stringify(config[environment], null, 2));

const db = knex(config[environment]);

// Test the connection
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = db;