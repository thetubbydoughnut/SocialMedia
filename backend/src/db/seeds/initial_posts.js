const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('users').del()

  const salt = await bcrypt.genSalt(10);
  const hashedPassword1 = await bcrypt.hash('password1', salt);
  const hashedPassword2 = await bcrypt.hash('password2', salt);
  const hashedPassword3 = await bcrypt.hash('password3', salt);

  // Inserts seed entries for users
  const [user1Id, user2Id, user3Id] = await knex('users').insert([
    { username: 'traveler_jane', email: 'jane@example.com', password: hashedPassword1 },
    { username: 'foodie_john', email: 'john@example.com', password: hashedPassword2 },
    { username: 'fitness_mike', email: 'mike@example.com', password: hashedPassword3 },
  ]);

  // Inserts seed entries for posts
  return knex('posts').insert([
    {
      user_id: user1Id,
      content: 'Enjoying a beautiful sunset in Bali 🌅 #travelgram #bali',
      image_url: 'https://example.com/images/bali_sunset.jpg',
      created_at: new Date()
    },
    {
      user_id: user2Id,
      content: 'Homemade avocado toast for breakfast 🥑🍞 #foodie #healthyeating',
      image_url: 'https://example.com/images/avocado_toast.jpg',
      created_at: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      user_id: user3Id,
      content: 'Just finished a 10k run! Personal best time 💪 #fitness #running',
      image_url: 'https://example.com/images/running.jpg',
      created_at: new Date(Date.now() - 172800000) // 2 days ago
    },
    {
      user_id: user1Id,
      content: 'Exploring the streets of Tokyo 🗼 #japan #cityscape',
      image_url: 'https://example.com/images/tokyo_street.jpg',
      created_at: new Date(Date.now() - 259200000) // 3 days ago
    },
    {
      user_id: user2Id,
      content: 'Trying out a new sushi place in town 🍣 #foodlover #sushi',
      image_url: 'https://example.com/images/sushi_plate.jpg',
      created_at: new Date(Date.now() - 345600000) // 4 days ago
    },
    {
      user_id: user3Id,
      content: 'Morning yoga session to start the day right 🧘‍♂️ #yoga #wellness',
      image_url: 'https://example.com/images/yoga_pose.jpg',
      created_at: new Date(Date.now() - 432000000) // 5 days ago
    },
    {
      user_id: user1Id,
      content: 'Beach day with friends! 🏖️ #summervibes #beachday',
      image_url: 'https://example.com/images/beach_friends.jpg',
      created_at: new Date(Date.now() - 518400000) // 6 days ago
    },
    {
      user_id: user2Id,
      content: 'Cooked a fancy dinner for date night ❤️ #datenight #homecooking',
      image_url: 'https://example.com/images/fancy_dinner.jpg',
      created_at: new Date(Date.now() - 604800000) // 7 days ago
    },
  ]);
};