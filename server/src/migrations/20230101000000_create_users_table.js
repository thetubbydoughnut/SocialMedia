exports.up = function(knex) {
    
  return knex.schema
    .dropTableIfExists('users')
    .then(() => {
      return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password', 60).notNullable(); // bcrypt always generates 60 character hashes
        table.string('firstName');
        table.string('lastName');
        table.text('bio');
        table.string('profilePicture');
        table.boolean('isActive').defaultTo(true);
        table.timestamp('lastLogin');
        table.timestamps(true, true);
      });
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};