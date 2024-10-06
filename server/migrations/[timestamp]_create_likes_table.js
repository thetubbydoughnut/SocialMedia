exports.up = function(knex) {
  return knex.schema.createTable('likes', function(table) {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable();
    table.integer('postId').unsigned().notNullable();
    table.foreign('userId').references('users.id').onDelete('CASCADE');
    table.foreign('postId').references('posts.id').onDelete('CASCADE');
    table.unique(['userId', 'postId']);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('likes');
};