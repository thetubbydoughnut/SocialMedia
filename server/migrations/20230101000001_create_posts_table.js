const { addColumnIfNotExists } = require('../src/utils/migrationHelpers');

exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('posts');

  if (!exists) {
    await knex.schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('users.id');
      table.string('imageUrl');
      table.timestamps(true, true);
    });
    console.log('Created posts table');
  } else {
    console.log('Posts table already exists');
    await addColumnIfNotExists(knex, 'posts', 'title', (t) => t.string('title').notNullable());
    await addColumnIfNotExists(knex, 'posts', 'content', (t) => t.text('content').notNullable());
    await addColumnIfNotExists(knex, 'posts', 'userId', (t) => {
      t.integer('userId').unsigned().notNullable();
      t.foreign('userId').references('users.id');
    });
    await addColumnIfNotExists(knex, 'posts', 'imageUrl', (t) => t.string('imageUrl'));
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};