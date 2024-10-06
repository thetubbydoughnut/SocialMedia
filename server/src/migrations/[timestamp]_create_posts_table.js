exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('users.id');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};