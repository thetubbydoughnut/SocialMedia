require('dotenv').config(); // Add this line at the top

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/database');
const loggerMiddleware = require('./middleware/logger');
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

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

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(authMiddleware);

// Routes
app.use('/home', homeRouter);
app.use('/profile', profileRouter);
app.use('/newsfeed', newsfeedRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/watch', watchRouter);
app.use('/messages', messageRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/chats', chatsRouter);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server shut down');
        process.exit(0);
    });
});