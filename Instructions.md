# Project Overview

You are building a social media platform that allows users to create accounts, upload videos or images, and interact with other users.

You will be using the following technologies:

- Next.js

- Tailwind CSS

- Socket.io

- SQLite3

- Knex.js

- JWT

- Bcrypt

- CORS

- Multer

- Axios

- Dotenv

- Web Vitals

- Create React App

- React Testing Library

- Supertest

- Jest

- ESLint

- Prettier

- Git

- npm

# Core functionalities

- User authentication and authorization

    1. User registration

    2. User login

    3. User logout

    4. User profile management

- Post creation, editing, and deletion

    1. Create a post

    2. Edit a post

    3. Delete a post

- Commenting on posts

    1. Create a comment

    2. Edit a comment

    3. Delete a comment

- Liking and sharing posts

    1. Like a post

    2. Share a post

- Search functionality

    1. Search for a post

    2. Search for a user

- Video uploading and viewing

    1. Upload a video

    2. View a video

- Friends list management

    1. Add a friend

    2. Remove a friend

- Real-time notifications

    1. Send a notification

    2. Receive a notification

- Direct messaging between users

    1. Send a message

    2. Receive a message

# Doc

User Authentication and Authorization

JWT (JSON Web Tokens): https://jwt.io/introduction/

Bcrypt: https://www.npmjs.com/package/bcrypt

CORS: https://www.npmjs.com/package/cors

SQLite3: https://www.sqlite.org/docs.html

Knex.js: https://knexjs.org/

Next.js (API Routes): https://nextjs.org/docs/api-routes/introduction

How to create user authentication and authorization

CODE EXAMPLE:
```
const express = require('express');
const { registerUser, loginUser, verifyToken } = require('./auth');

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const result = await registerUser(username, password);
  res.json(result);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUser(username, password);
  res.json(result);
});

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

app.listen(3000, () => console.log('Server running on port 3000'));

```






Post Creation, Editing, and Deletion

Next.js: https://nextjs.org/docs/api-routes/introduction

SQLite3: https://www.sqlite.org/docs.html

Knex.js: https://knexjs.org/

Commenting, Liking, and Sharing Posts

Next.js: https://nextjs.org/docs

SQLite3: https://www.sqlite.org/docs.html

Axios: https://axios-http.com/docs/intro

CODE EXAMPLE:
```
const express = require('express');
const knex = require('knex');

const app = express();
app.use(express.json());

// Initialize knex connection
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
});

// Create posts table if it doesn't exist
const initializeDatabase = async () => {
  const exists = await db.schema.hasTable('posts');
  if (!exists) {
    return db.schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true);
    });
  }
};

// Initialize the database
initializeDatabase();

// Create a new post
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  try {
    const [postId] = await db('posts').insert({ title, content });
    res.status(201).json({ success: true, postId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await db('posts').select('id', 'title', 'content', 'created_at');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get a specific post
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await db('posts')
      .where('id', req.params.id)
      .select('id', 'title', 'content', 'created_at')
      .first();
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Update a post
app.put('/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const updated = await db('posts')
      .where('id', req.params.id)
      .update({ title, content });
    if (updated) {
      res.json({ success: true, message: 'Post updated successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
  try {
    const deleted = await db('posts')
      .where('id', req.params.id)
      .del();
    if (deleted) {
      res.json({ success: true, message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```



Search Functionality

SQLite3: https://www.sqlite.org/docs.html

Knex.js: https://knexjs.org/


CODE EXAMPLE:
```
const express = require('express');
const knex = require('knex');

const app = express();
app.use(express.json());

// Initialize knex connection
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
});

// Create posts table if it doesn't exist
const initializeDatabase = async () => {
  const exists = await db.schema.hasTable('posts');
  if (!exists) {
    return db.schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true);
    });
  }
};

// Initialize the database
initializeDatabase();

// Search posts
app.get('/search', async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ success: false, error: 'Search query is required' });
  }

  try {
    const posts = await db('posts')
      .where('title', 'like', `%${query}%`)
      .orWhere('content', 'like', `%${query}%`)
      .select('id', 'title', 'content', 'created_at');

    res.json({ success: true, results: posts });
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all posts (for testing purposes)
app.get('/posts', async (req, res) => {
  try {
    const posts = await db('posts').select('id', 'title', 'content', 'created_at');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Create a new post (for testing purposes)
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  try {
    const [postId] = await db('posts').insert({ title, content });
    res.status(201).json({ success: true, postId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```


Video Uploading and Viewing

Multer: https://www.npmjs.com/package/multer

Next.js: https://nextjs.org/docs

CODE EXAMPLE:
```
const express = require('express');
const knex = require('knex');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Initialize knex connection
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
});

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create videos table if it doesn't exist
const initializeDatabase = async () => {
  const exists = await db.schema.hasTable('videos');
  if (!exists) {
    return db.schema.createTable('videos', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('filename').notNullable();
      table.timestamps(true, true);
    });
  }
};

// Initialize the database
initializeDatabase();

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Upload a new video
app.post('/videos', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No video file uploaded' });
  }

  const { title } = req.body;
  const filename = req.file.filename;

  try {
    const [videoId] = await db('videos').insert({ title, filename });
    res.status(201).json({ success: true, videoId });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all videos
app.get('/videos', async (req, res) => {
  try {
    const videos = await db('videos').select('id', 'title', 'filename', 'created_at');
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Stream a specific video
app.get('/videos/:id', async (req, res) => {
  try {
    const video = await db('videos').where('id', req.params.id).first();
    if (!video) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }

    const videoPath = path.join(__dirname, 'uploads', video.filename);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
      const chunksize = (end-start)+1;
      const file = fs.createReadStream(videoPath, {start, end});
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    console.error('Error streaming video:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Delete a video
app.delete('/videos/:id', async (req, res) => {
  try {
    const video = await db('videos').where('id', req.params.id).first();
    if (!video) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }

    // Delete the file
    fs.unlinkSync(path.join(__dirname, 'uploads', video.filename));

    // Delete the database entry
    await db('videos').where('id', req.params.id).del();

    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```


Friends List Management

Next.js: https://nextjs.org/docs

SQLite3: https://www.sqlite.org/docs.html

Knex.js: https://knexjs.org/

CODE EXAMPLE:
```
const express = require('express');
const knex = require('knex');

const app = express();
app.use(express.json());

// Initialize knex connection
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
});

// Create users and friendships tables if they don't exist
const initializeDatabase = async () => {
  const usersExists = await db.schema.hasTable('users');
  if (!usersExists) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable(); // Add this line
    });
  }

  const friendshipsExists = await db.schema.hasTable('friendships');
  if (!friendshipsExists) {
    await db.schema.createTable('friendships', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('friend_id').unsigned().references('users.id');
      table.unique(['user_id', 'friend_id']);
    });
  }
};

// Initialize the database
initializeDatabase();

// Create a new user (for testing purposes)
app.post('/users', async (req, res) => {
  const { username, password } = req.body; // Add password here
  try {
    const [userId] = await db('users').insert({ username, password }); // Include password
    res.status(201).json({ success: true, userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Add a friend
app.post('/friends', async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    await db('friendships').insert({ user_id: userId, friend_id: friendId });
    await db('friendships').insert({ user_id: friendId, friend_id: userId });
    res.status(201).json({ success: true, message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Remove a friend
app.delete('/friends', async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    await db('friendships')
      .where({ user_id: userId, friend_id: friendId })
      .orWhere({ user_id: friendId, friend_id: userId })
      .del();
    res.json({ success: true, message: 'Friend removed successfully' });
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get friends list
app.get('/friends/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const friends = await db('friendships')
      .join('users', 'friendships.friend_id', '=', 'users.id')
      .where('friendships.user_id', userId)
      .select('users.id', 'users.username');
    res.json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Check friendship status
app.get('/friends/status', async (req, res) => {
  const { userId, friendId } = req.query;
  try {
    const friendship = await db('friendships')
      .where({ user_id: userId, friend_id: friendId })
      .first();
    res.json({ areFriends: !!friendship });
  } catch (error) {
    console.error('Error checking friendship status:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

Real-Time Notifications

Socket.io: https://socket.io/docs/v4/

Direct Messaging between Users

Socket.io: https://socket.io/docs/v4/

CODE EXAMPLE:`
```
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const knex = require('knex');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// Initialize knex connection
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
});

// Create notifications table if it doesn't exist
const initializeDatabase = async () => {
  const exists = await db.schema.hasTable('notifications');
  if (!exists) {
    return db.schema.createTable('notifications', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('users.id');
      table.string('type').notNullable();
      table.text('content').notNullable();
      table.boolean('read').defaultTo(false);
      table.timestamps(true, true);
    });
  }
};

// Initialize the database
initializeDatabase();

// Store active user connections
const userConnections = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', (userId) => {
    userConnections.set(userId, socket);
    console.log(`User ${userId} registered`);
  });

  socket.on('disconnect', () => {
    for (const [userId, userSocket] of userConnections.entries()) {
      if (userSocket === socket) {
        userConnections.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Create a new notification
app.post('/notifications', async (req, res) => {
  const { userId, type, content } = req.body;
  try {
    const [notificationId] = await db('notifications').insert({
      user_id: userId,
      type,
      content
    });

    // Send real-time notification
    const userSocket = userConnections.get(userId);
    if (userSocket) {
      userSocket.emit('notification', { id: notificationId, type, content });
    }

    res.status(201).json({ success: true, notificationId });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all notifications for a user
app.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await db('notifications')
      .where('user_id', userId)
      .orderBy('created_at', 'desc');
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Mark a notification as read
app.put('/notifications/:id/read', async (req, res) => {
  const { id } = req.params;
  try {
    await db('notifications').where('id', id).update({ read: true });
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```


# Current file structure

socialmedia/

├── client/

│   ├── public/

│   │   ├── index.html

│   │   └── favicon.ico

│   ├── src/

│   │   ├── components/

│   │   │   ├── common/

│   │   │   │   ├── button/

│   │   │   │   │   └── Button.jsx

│   │   │   │   └── input/

│   │   │   │       └── Input.jsx

│   │   │   ├── layout/

│   │   │   │   ├── header/

│   │   │   │   │   └── Header.jsx

│   │   │   │   └── footer/

│   │   │   │       └── Footer.jsx

│   │   │   └── features/

│   │   │       ├── auth/

│   │   │       │   ├── login/

│   │   │       │   │   └── Login.jsx

│   │   │       │   └── register/

│   │   │       │       └── Register.jsx

│   │   │       ├── posts/

│   │   │       │   ├── post-list/

│   │   │       │   │   └── PostList.jsx

│   │   │       │   └── post-item/

│   │   │       │       └── PostItem.jsx

│   │   │       └── profile/

│   │   │           └── Profile.jsx

│   │   ├── pages/

│   │   │   ├── home/

│   │   │   │   └── Home.jsx

│   │   │   ├── profile/

│   │   │   │   └── ProfilePage.jsx

│   │   │   └── auth/

│   │   │       ├── LoginPage.jsx

│   │   │       └── RegisterPage.jsx

│   │   ├── redux/

│   │   │   ├── store.js

│   │   │   └── slices/

│   │   │       ├── authSlice.js

│   │   │       └── postsSlice.js

│   │   ├── services/

│   │   │   └── api.js

│   │   ├── hooks/

│   │   │   └── useAuth.js

│   │   ├── utils/

│   │   │   ├── helpers.js

│   │   │   └── constants.js

│   │   ├── styles/

│   │   │   └── global.css

│   │   ├── App.jsx

│   │   └── index.jsx

│   ├── .env

│   ├── .eslintrc.js

│   ├── .prettierrc

│   ├── package.json

│   └── README.md

├── server/

│   ├── src/

│   │   ├── config/

│   │   │   ├── database.js

│   │   │   └── server.js

│   │   ├── controllers/

│   │   │   ├── authController.js

│   │   │   └── postsController.js

│   │   ├── middleware/

│   │   │   ├── auth.js

│   │   │   └── errorHandler.js

│   │   ├── models/

│   │   │   ├── User.js

│   │   │   └── Post.js

│   │   ├── routes/

│   │   │   ├── authRoutes.js

│   │   │   └── postsRoutes.js

│   │   ├── services/

│   │   │   └── socketService.js

│   │   ├── utils/

│   │   │   └── helpers.js

│   │   └── app.js

│   ├── migrations/

│   │   ├── 20230101000000_create_users_table.js

│   │   └── 20230101000001_create_posts_table.js

│   ├── tests/

│   │   ├── unit/

│   │   │   └── authController.test.js

│   │   └── integration/

│   │       └── auth.test.js

│   ├── .env

│   ├── .eslintrc.js

│   ├── .prettierrc

│   ├── knexfile.js

│   ├── package.json

│   └── README.md

├── .gitignore

├── docker-compose.yml

└── README.md