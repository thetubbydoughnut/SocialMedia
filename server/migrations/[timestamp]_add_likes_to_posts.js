exports.up = function(knex) {
  return knex.schema.table('posts', function(table) {
    table.integer('likes').unsigned().notNullable().defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('likes');
  });
};