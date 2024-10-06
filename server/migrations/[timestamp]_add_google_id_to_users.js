const { addColumnIfNotExists } = require('../src/utils/migrationHelpers');

exports.up = async function(knex) {
  await addColumnIfNotExists(knex, 'users', 'googleId', (t) => t.string('googleId').unique());
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('googleId');
  });
};