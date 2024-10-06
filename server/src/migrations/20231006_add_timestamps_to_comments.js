exports.up = function(knex) {
  return knex.schema.table('comments', function(table) {
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.table('comments', function(table) {
    table.dropTimestamps();
  });
};