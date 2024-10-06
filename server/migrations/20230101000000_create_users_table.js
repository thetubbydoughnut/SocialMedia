const { addColumnIfNotExists } = require('../src/utils/migrationHelpers');

exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('users');

  if (!exists) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('firstName');
      table.string('lastName');
      table.boolean('isEmailVerified').defaultTo(false);
      table.string('emailVerificationToken');
      table.string('resetPasswordToken');
      table.datetime('resetPasswordExpires');
      table.timestamps(true, true);
    });
    console.log('Created users table');
  } else {
    console.log('Users table already exists');
    await addColumnIfNotExists(knex, 'users', 'username', (t) => t.string('username').notNullable().unique());
    await addColumnIfNotExists(knex, 'users', 'email', (t) => t.string('email').notNullable().unique());
    await addColumnIfNotExists(knex, 'users', 'password', (t) => t.string('password').notNullable());
    await addColumnIfNotExists(knex, 'users', 'firstName', (t) => t.string('firstName'));
    await addColumnIfNotExists(knex, 'users', 'lastName', (t) => t.string('lastName'));
    await addColumnIfNotExists(knex, 'users', 'isEmailVerified', (t) => t.boolean('isEmailVerified').defaultTo(false));
    await addColumnIfNotExists(knex, 'users', 'emailVerificationToken', (t) => t.string('emailVerificationToken'));
    await addColumnIfNotExists(knex, 'users', 'resetPasswordToken', (t) => t.string('resetPasswordToken'));
    await addColumnIfNotExists(knex, 'users', 'resetPasswordExpires', (t) => t.datetime('resetPasswordExpires'));
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};