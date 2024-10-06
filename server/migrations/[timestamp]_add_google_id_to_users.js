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
    if (!await columnExists(knex, 'users', 'googleId')) table.string('googleId').unique();
  });
};

exports.down = async function(knex) {
  return knex.schema.table('users', async function(table) {
    if (await columnExists(knex, 'users', 'googleId')) table.dropColumn('googleId');
  });
};