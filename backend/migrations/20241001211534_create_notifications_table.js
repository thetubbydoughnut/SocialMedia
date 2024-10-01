/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('notifications', function(table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('type').notNullable(); // e.g., 'friend_request', 'like', 'comment', 'message'
    table.integer('from_user_id').references('id').inTable('users').onDelete('SET NULL'); // User who triggered the notification
    table.integer('post_id').references('id').inTable('posts').onDelete('SET NULL'); // Related post
    table.integer('comment_id').references('id').inTable('comments').onDelete('SET NULL'); // Related comment
    table.boolean('is_read').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('notifications');
};