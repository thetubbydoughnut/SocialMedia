require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./config/database'); // Knex instance
const loggerMiddleware = require('./middleware/logger');
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const path = require('path');

// Import Routers
const homeRouter = require('./routes/homeRouter');
const profileRouter = require('./routes/profileRouter');
const newsfeedRouter = require('./routes/newsfeedRouter');
const marketplaceRouter = require('./routes/marketplaceRouter');
const watchRouter = require('./routes/watchRouter');
const messageRouter = require('./routes/messagingRouter'); // Updated
const authRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postsRouter');
const chatsRouter = require('./routes/messagingRouter'); // Updated
const friendsRouter = require('./routes/friendsRouter');
const videoUploadRouter = require('./routes/videoUploadRouter');
const hashtagsRouter = require('./routes/hashtagsRouter');
const searchRouter = require('./routes/searchRouter');
const notificationsRouter = require('./routes/notificationsRouter');
const storiesRouter = require('./routes/storiesRouter');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust as needed for security
    methods: ['GET', 'POST'],
  },
});

// Make io accessible to routes
app.set('io', io);

// Initialize Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join user-specific rooms for notifications and messaging
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room user_${userId}`);
  });

  // Join chat rooms for direct messaging
  socket.on('join_chat', (chatId) => {
    socket.join(`chat_${chatId}`);
    console.log(`Joined chat room chat_${chatId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Use Routers
app.use('/home', homeRouter);
app.use('/profile', profileRouter);
app.use('/newsfeed', newsfeedRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/watch', watchRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/chats', authMiddleware, chatsRouter);
app.use('/friends', authMiddleware, friendsRouter);
app.use('/api/videos', videoUploadRouter);
app.use('/api/hashtags', hashtagsRouter);
app.use('/api/search', searchRouter);
app.use('/notifications', authMiddleware, notificationsRouter);
app.use('/messages', authMiddleware, messageRouter);
app.use('/stories', authMiddleware, storiesRouter);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error handling middleware (should be after all other app.use())
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(async () => {
    console.log('Server shut down');
    await db.destroy();
    console.log('Database connection closed');
    process.exit(0);
  });
});

module.exports = { app, server, io };