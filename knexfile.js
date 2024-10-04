// Update with your config settings.

const path = require('path');
async function onBeforeCreate(knex) {
    // Get a list of all tables
    const tables = await knex.raw("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    
    // Disable foreign key constraints
    await knex.raw('PRAGMA foreign_keys = OFF;');
  
    // Truncate all tables
    for (const table of tables) {
      await knex(table.name).truncate();
    }
  
    // Re-enable foreign key constraints
    await knex.raw('PRAGMA foreign_keys = ON;');
};

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'server', 'database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'server', 'src', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'server', 'src', 'seeds')
    }
  }

};
