const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const http = require('http');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Initialize socket service
let socketService;
try {
  const SocketService = require('./services/socketService');
  socketService = new SocketService(io);
} catch (error) {
  console.warn('socketService not found. Real-time features will be disabled.');
}

// Routes
app.use('/api/auth', authRoutes);

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

const PORT = process.env.PORT || 9000;

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
      server.listen(PORT + 1);
    } else {
      console.error('Unable to start server:', err);
    }
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
