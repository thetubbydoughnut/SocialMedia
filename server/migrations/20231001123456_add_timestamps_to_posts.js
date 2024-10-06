exports.up = function(knex) {
  return knex.schema.table('posts', function(table) {
    // Add created_at and updated_at columns if they don't exist
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    // Add imageUrl column if it doesn't exist
    table.string('imageUrl');
  });
};

exports.down = function(knex) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropColumn('imageUrl');
  });
};