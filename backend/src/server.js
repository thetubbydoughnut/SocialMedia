require('dotenv').config();

const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./db/knexfile');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts'); // Add this line
const notificationsRoutes = require('./routes/notifications');
const usersRoutes = require('./routes/users');
const marketplaceRoutes = require('./routes/marketplace');
const searchRoutes = require('./routes/search');
const friendsRoutes = require('./routes/friends');

const app = express();

// Initialize Knex with the configuration
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

app.use(cors({
  origin: 'http://localhost:3000', // or whatever your frontend URL is
  credentials: true,
}));

app.use(express.json());

// Inject db instance into request object
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes); // Add this line
app.use('/api/notifications', notificationsRoutes); // Add this line
app.use('/api/users', usersRoutes); // Add this line
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/friends', friendsRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});