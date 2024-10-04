exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.string('resetToken');
    table.timestamp('resetTokenExpiry');
    table.string('emailVerificationToken');
    table.boolean('isEmailVerified').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('resetToken');
    table.dropColumn('resetTokenExpiry');
    table.dropColumn('emailVerificationToken');
    table.dropColumn('isEmailVerified');
  });
};