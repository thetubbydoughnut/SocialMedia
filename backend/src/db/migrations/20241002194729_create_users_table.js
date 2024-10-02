exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('posts', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true);
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
    .createTable('comments', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('post_id').unsigned().notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true);
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.foreign('post_id').references('posts.id').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};