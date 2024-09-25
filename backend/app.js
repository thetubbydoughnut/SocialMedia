const express = require('express');
const app = express();
const loggerMiddleware = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');

const homeRouter = require('./routes/homeRouter');
const profileRouter = require('./routes/profileRouter');
const newsfeedRouter = require('./routes/newsfeedRouter');
const marketplaceRouter = require('./routes/marketplaceRouter');
const watchRouter = require('./routes/watchRouter');
const messageRouter = require('./routes/messageRouter');

// Middleware
app.use(loggerMiddleware);
app.use(authMiddleware);

// Routes
app.use('/', homeRouter);
app.use('/profile', profileRouter);
app.use('/newsfeed', newsfeedRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/watch', watchRouter);
app.use('/messages', messageRouter);

module.exports = app;