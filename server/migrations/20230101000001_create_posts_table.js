const columnCache = {};

async function columnExists(knex, tableName, columnName) {
  if (!columnCache[tableName]) {
    const columns = await knex.table(tableName).columnInfo();
    columnCache[tableName] = Object.keys(columns);
  }
  return columnCache[tableName].includes(columnName);
}

exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('posts');

  if (!tableExists) {
    return knex.schema.createTable('posts', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('users.id');
      table.string('imageUrl');
      table.timestamps(true, true);
    });
  } else {
    return knex.schema.table('posts', async function(table) {
      if (!await columnExists(knex, 'posts', 'title')) table.string('title').notNullable();
      if (!await columnExists(knex, 'posts', 'content')) table.text('content').notNullable();
      if (!await columnExists(knex, 'posts', 'userId')) {
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('users.id');
      }
      if (!await columnExists(knex, 'posts', 'imageUrl')) table.string('imageUrl');
      if (!await columnExists(knex, 'posts', 'created_at')) table.timestamp('created_at').defaultTo(knex.fn.now());
      if (!await columnExists(knex, 'posts', 'updated_at')) table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};