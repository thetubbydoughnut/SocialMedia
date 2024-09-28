module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite'
    },
    useNullAsDefault: true
  }
};

exports.up = function(knex) {
  return knex.schema.hasTable('posts').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('posts', function(table) {
        table.increments('id').primary();
        table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.text('content').notNullable();
        table.string('mediaUrl', 255);
        table.enu('privacy', ['public', 'friends', 'private']).defaultTo('public');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};