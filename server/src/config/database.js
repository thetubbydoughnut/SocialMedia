const knex = require('knex');
const path = require('path');
const knexfile = require('../../../knexfile');

const db = knex({
  ...knexfile.development,
  connection: {
    filename: path.resolve(__dirname, '..', '..', 'database.sqlite')
  }
});

module.exports = db;