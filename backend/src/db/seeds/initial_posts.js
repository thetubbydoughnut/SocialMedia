const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del();
  await knex('users').del(); // Ensure users are also cleared if necessary

  // Hash passwords
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password123', 10);
  const hashedPassword3 = await bcrypt.hash('password123', 10);

  // Inserts seed entries for users
  await knex('users').insert([
    { 
      username: 'traveler_jane', 
      email: 'jane@example.com', 
      password: hashedPassword1,
      bio: 'Passionate traveler and photographer',
      profilePhoto: 'https://example.com/images/jane_profile.jpg',
      coverPhoto: 'https://example.com/images/jane_cover.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      username: 'foodie_john', 
      email: 'john@example.com', 
      password: hashedPassword2,
      bio: 'Food lover and amateur chef',
      profilePhoto: 'https://example.com/images/john_profile.jpg',
      coverPhoto: 'https://example.com/images/john_cover.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      username: 'fitness_mike', 
      email: 'mike@example.com', 
      password: hashedPassword3,
      bio: 'Fitness enthusiast and personal trainer',
      profilePhoto: 'https://example.com/images/mike_profile.jpg',
      coverPhoto: 'https://example.com/images/mike_cover.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);

  // Retrieve user IDs based on unique emails
  const user1 = await knex('users').where({ email: 'jane@example.com' }).first();
  const user2 = await knex('users').where({ email: 'john@example.com' }).first();
  const user3 = await knex('users').where({ email: 'mike@example.com' }).first();

  // Inserts seed entries for posts
  await knex('posts').insert([
    {
      user_id: user1.id,
      title: 'First Post',
      content: 'This is the content of the first post.',
      image_url: 'https://example.com/image1.jpg',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: user2.id,
      title: 'Second Post',
      content: 'This is the content of the second post.',
      image_url: 'https://example.com/image2.jpg',
      created_at: new Date(),
      updated_at: new Date()
    },
    // Add more initial posts as needed
  ]);
};