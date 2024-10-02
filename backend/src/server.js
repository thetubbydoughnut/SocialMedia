require('dotenv').config();

const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./db/knexfile');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts'); // Add this line

const app = express();

// Initialize Knex with the configuration
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

app.use(cors());
app.use(express.json());

// Inject db instance into request object
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes); // Add this line

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`JWT_SECRET is ${process.env.JWT_SECRET ? 'set' : 'not set'}`);
});