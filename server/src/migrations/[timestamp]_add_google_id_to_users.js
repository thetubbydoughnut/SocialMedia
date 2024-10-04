exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.string('googleId').unique();
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('googleId');
  });
};