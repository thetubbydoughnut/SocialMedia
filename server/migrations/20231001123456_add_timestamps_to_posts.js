const { addColumnIfNotExists } = require('../src/utils/migrationHelpers');

exports.up = async function(knex) {
  await addColumnIfNotExists(knex, 'posts', 'created_at', (table) => {
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await addColumnIfNotExists(knex, 'posts', 'updated_at', (table) => {
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });
};