require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/database');
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
const messageRouter = require('./routes/messageRouter');
const authRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postsRouter');
const chatsRouter = require('./routes/chatsRouter');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Ensure this matches your frontend URL
        methods: ["GET", "POST"],
    },
});

// Socket.io Connection Handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events as needed
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Example: Listen for sending messages
    socket.on('sendMessage', (message) => {
        // Broadcast the message to other connected clients
        io.emit('receiveMessage', message);
    });
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Routes
app.use('/home', homeRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use('/newsfeed', newsfeedRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/watch', watchRouter);
app.use('/messages', messageRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/chats', chatsRouter);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error handling middleware (should be after all other app.use())
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 9000;

sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Graceful Shutdown
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server shut down');
        process.exit(0);
    });
});


