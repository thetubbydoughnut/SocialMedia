const columnCache = {};

async function columnExists(knex, tableName, columnName) {
  if (!columnCache[tableName]) {
    const columns = await knex.table(tableName).columnInfo();
    columnCache[tableName] = Object.keys(columns);
  }
  return columnCache[tableName].includes(columnName);
}

exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('users');

  if (!tableExists) {
    return knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password', 60).notNullable();
      table.string('firstName');
      table.string('lastName');
      table.text('bio');
      table.string('profilePicture');
      table.boolean('isActive').defaultTo(true);
      table.timestamp('lastLogin');
      table.timestamps(true, true);
    });
  } else {
    return knex.schema.table('users', async function(table) {
      if (!await columnExists(knex, 'users', 'username')) table.string('username').notNullable().unique();
      if (!await columnExists(knex, 'users', 'email')) table.string('email').notNullable().unique();
      if (!await columnExists(knex, 'users', 'password')) table.string('password', 60).notNullable();
      if (!await columnExists(knex, 'users', 'firstName')) table.string('firstName');
      if (!await columnExists(knex, 'users', 'lastName')) table.string('lastName');
      if (!await columnExists(knex, 'users', 'bio')) table.text('bio');
      if (!await columnExists(knex, 'users', 'profilePicture')) table.string('profilePicture');
      if (!await columnExists(knex, 'users', 'isActive')) table.boolean('isActive').defaultTo(true);
      if (!await columnExists(knex, 'users', 'lastLogin')) table.timestamp('lastLogin');
      if (!await columnExists(knex, 'users', 'created_at')) table.timestamp('created_at').defaultTo(knex.fn.now());
      if (!await columnExists(knex, 'users', 'updated_at')) table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};