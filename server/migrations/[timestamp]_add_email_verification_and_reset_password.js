const { addColumnIfNotExists } = require('../src/utils/migrationHelpers');

exports.up = async function(knex) {
  await addColumnIfNotExists(knex, 'users', 'resetToken', (t) => t.string('resetToken'));
  await addColumnIfNotExists(knex, 'users', 'resetTokenExpiry', (t) => t.timestamp('resetTokenExpiry'));
  await addColumnIfNotExists(knex, 'users', 'emailVerificationToken', (t) => t.string('emailVerificationToken'));
  await addColumnIfNotExists(knex, 'users', 'isEmailVerified', (t) => t.boolean('isEmailVerified').defaultTo(false));
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('resetToken');
    table.dropColumn('resetTokenExpiry');
    table.dropColumn('emailVerificationToken');
    table.dropColumn('isEmailVerified');
  });
};