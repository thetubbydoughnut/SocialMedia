const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('../knexfile');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

app.use(cors());
app.use(express.json());

// Inject db instance into request object
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Add this before your other routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));