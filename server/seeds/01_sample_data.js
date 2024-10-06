exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('posts').del();
  await knex('comments').del();
  
  // Inserts seed entries
  await knex('users').insert([
    { username: 'user1', email: 'user1@example.com', password: 'password1' },
    { username: 'user2', email: 'user2@example.com', password: 'password2' },
  ]);

  await knex('posts').insert([
    { title: 'First post', content: 'This is the first post', userId: 1 },
    { title: 'Second post', content: 'This is the second post', userId: 2 },
  ]);

  await knex('comments').insert([
    { content: 'Great post!', userId: 2, postId: 1 },
    { content: 'Thanks!', userId: 1, postId: 1 },
  ]);
};