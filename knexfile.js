const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'server', 'database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'server', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'server', 'seeds')
    }
  }
};
