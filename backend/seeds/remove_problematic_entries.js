/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  try {
    await knex('knex_migrations')
      .whereIn('name', [
        '20240929230101_create_comments_table.js',
        '20240929230155_create_reactions_table.js'
      ])
      .del();
    console.log('Deleted problematic migration entries');
  } catch (error) {
    console.error('Error deleting problematic migration entries:', error);
  }
};