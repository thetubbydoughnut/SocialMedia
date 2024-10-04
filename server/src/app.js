require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path'); // Add this line
const db = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');

const app = express();
const server = http.createServer(app); // Add this line

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize socket service
let socketService;
try {
  const SocketService = require('./services/socketService');
  const io = socketIo(server, {
    cors: corsOptions
  });
  socketService = new SocketService(io);
} catch (error) {
  console.warn('socketService not found. Real-time features will be disabled.');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// Conditionally load postsRoutes if it exists
try {
  const postsRoutes = require('./routes/postsRoutes');
  app.use('/api/posts', postsRoutes);
} catch (error) {
  console.warn('postsRoutes not found. Skipping...');
}

// Error handling middleware
try {
  const errorHandler = require('./middleware/errorHandler');
  app.use(errorHandler);
} catch (error) {
  console.warn('errorHandler not found. Using default error handling.');
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'An unexpected error occurred', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 9000;

// Initialize database
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected');
    // Start server here
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    console.error('Current working directory:', process.cwd());
    console.error('Attempted database path:', path.resolve(__dirname, '..', 'database.sqlite'));
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
