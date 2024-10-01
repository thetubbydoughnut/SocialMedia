const knex = require('knex');
const config = require('./knexfile')[process.env.NODE_ENV || 'development'];

const db = knex(config);

async function syncDatabase() {
  try {
    await db.migrate.latest();
    console.log('Database migrated successfully.');
  } catch (error) {
    console.error('Database migration error:', error);
  } finally {
    await db.destroy();
  }
}

syncDatabase();