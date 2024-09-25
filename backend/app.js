const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/database');
const loggerMiddleware = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');

const homeRouter = require('./routes/homeRouter');
const profileRouter = require('./routes/profileRouter');
const newsfeedRouter = require('./routes/newsfeedRouter');
const marketplaceRouter = require('./routes/marketplaceRouter');
const watchRouter = require('./routes/watchRouter');
const messageRouter = require('./routes/messageRouter');
const authRouter = require('./routes/authRouter');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust this to match your frontend URL
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/auth', authRouter);
app.use('/', homeRouter);
app.use('/profile', profileRouter);
app.use('/newsfeed', newsfeedRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/watch', watchRouter);
app.use('/messages', messageRouter);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Sync database and start server
sequelize.sync().then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 9000; // Use environment variable or default to 9000
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});