const db = require('../config/database');
const User = require('../models/User');
const Post = require('../models/Post');

const seedPosts = async () => {
  try {
    // First, let's create a test user if it doesn't exist
    let testUser = await User.findByEmail('testuser@example.com');
    if (!testUser) {
      testUser = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      });
    }

    // Now, let's create some test posts
    const posts = [
      {
        title: 'First Test Post',
        content: 'This is the content of our first test post. It\'s a beautiful day!',
        userId: testUser.id
      },
      {
        title: 'Another Test Post',
        content: 'Here\'s another post to fill up our feed. What\'s everyone up to today?',
        userId: testUser.id
      },
      {
        title: 'Web Development Thoughts',
        content: 'React and Node.js make a powerful combination for full-stack development!',
        userId: testUser.id
      },
      {
        title: 'Seeding Data',
        content: 'Seeding data is a great way to test your application with realistic content.',
        userId: testUser.id
      },
      {
        title: 'Final Test Post',
        content: 'This is our last test post. Hope everything is working well!',
        userId: testUser.id
      }
    ];

    for (let post of posts) {
      await Post.create(post);
    }

    console.log('Seed posts created successfully!');
  } catch (error) {
    console.error('Error seeding posts:', error);
  } finally {
    // Close the database connection
    await db.destroy();
  }
};

seedPosts();