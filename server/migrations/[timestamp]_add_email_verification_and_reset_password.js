const columnCache = {};

async function columnExists(knex, tableName, columnName) {
  if (!columnCache[tableName]) {
    const columns = await knex.table(tableName).columnInfo();
    columnCache[tableName] = Object.keys(columns);
  }
  return columnCache[tableName].includes(columnName);
}

exports.up = async function(knex) {
  return knex.schema.table('users', async function(table) {
    if (!await columnExists(knex, 'users', 'resetToken')) table.string('resetToken');
    if (!await columnExists(knex, 'users', 'resetTokenExpiry')) table.timestamp('resetTokenExpiry');
    if (!await columnExists(knex, 'users', 'emailVerificationToken')) table.string('emailVerificationToken');
    if (!await columnExists(knex, 'users', 'isEmailVerified')) table.boolean('isEmailVerified').defaultTo(false);
  });
};

exports.down = async function(knex) {
  return knex.schema.table('users', async function(table) {
    if (await columnExists(knex, 'users', 'resetToken')) table.dropColumn('resetToken');
    if (await columnExists(knex, 'users', 'resetTokenExpiry')) table.dropColumn('resetTokenExpiry');
    if (await columnExists(knex, 'users', 'emailVerificationToken')) table.dropColumn('emailVerificationToken');
    if (await columnExists(knex, 'users', 'isEmailVerified')) table.dropColumn('isEmailVerified');
  });
};