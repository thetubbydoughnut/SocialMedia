const { addColumnIfNotExists } = require('../src/utils/migrationHelpers');

exports.up = async function(knex) {
  await addColumnIfNotExists(knex, 'posts', 'imageUrl', (table) => {
    table.string('imageUrl');
  });
};

exports.down = function(knex) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('imageUrl');
  });
};