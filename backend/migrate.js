const knex = require('knex');
const config = require('./knexfile');

const db = knex(config.development);

async function migrateData() {
  try {
    // Fetch data from the source database
    const users = await db.select('*').from('users');
    const posts = await db.select('*').from('posts');
    const messages = await db.select('*').from('messages');
    const friends = await db.select('*').from('friends');

    // Insert data into the target database (in this case, it's the same database)
    for (const user of users) {
      await db('users').insert(user);
    }

    for (const post of posts) {
      await db('posts').insert(post);
    }

    for (const message of messages) {
      await db('messages').insert(message);
    }

    for (const friend of friends) {
      await db('friends').insert(friend);
    }

    console.log('Data migration completed successfully.');
  } catch (error) {
    console.error('Error during data migration:', error);
  } finally {
    // Close database connection
    await db.destroy();
  }
}

migrateData();
