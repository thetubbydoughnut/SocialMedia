exports.up = function(knex) {
  return knex('knex_migrations').insert([
    { name: '20230101000000_create_users_table.js', batch: 1, migration_time: new Date() },
    { name: '20230101000001_create_posts_table.js', batch: 1, migration_time: new Date() },
    { name: '20231001123456_add_timestamps_to_posts.js', batch: 1, migration_time: new Date() },
    { name: '20231002000000_add_image_url_to_posts.js', batch: 1, migration_time: new Date() },
    { name: '[timestamp]_add_email_verification_and_reset_password.js', batch: 1, migration_time: new Date() },
    { name: '[timestamp]_add_google_id_to_users.js', batch: 1, migration_time: new Date() },
    { name: '[timestamp]_create_comments_table.js', batch: 1, migration_time: new Date() },
  ]);
};

exports.down = function(knex) {
  return knex('knex_migrations')
    .whereIn('name', [
      '20230101000000_create_users_table.js',
      '20230101000001_create_posts_table.js',
      '20231001123456_add_timestamps_to_posts.js',
      '20231002000000_add_image_url_to_posts.js',
      '[timestamp]_add_email_verification_and_reset_password.js',
      '[timestamp]_add_google_id_to_users.js',
      '[timestamp]_create_comments_table.js',
    ])
    .del();
};