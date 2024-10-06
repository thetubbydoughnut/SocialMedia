const { addColumnIfNotExists } = require('../src/utils/migrationHelpers');

exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('comments');

  if (!exists) {
    await knex.schema.createTable('comments', (table) => {
      table.increments('id').primary();
      table.integer('postId').unsigned().notNullable();
      table.foreign('postId').references('posts.id').onDelete('CASCADE');
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('users.id').onDelete('CASCADE');
      table.text('content').notNullable();
      table.timestamps(true, true);
    });
    console.log('Created comments table');
  } else {
    console.log('Comments table already exists');
    await addColumnIfNotExists(knex, 'comments', 'postId', (t) => {
      t.integer('postId').unsigned().notNullable();
      t.foreign('postId').references('posts.id').onDelete('CASCADE');
    });
    await addColumnIfNotExists(knex, 'comments', 'userId', (t) => {
      t.integer('userId').unsigned().notNullable();
      t.foreign('userId').references('users.id').onDelete('CASCADE');
    });
    await addColumnIfNotExists(knex, 'comments', 'content', (t) => t.text('content').notNullable());
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};