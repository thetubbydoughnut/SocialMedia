const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const knex = require('knex');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// Initialize knex connection
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
});

// Create notifications table if it doesn't exist
const initializeDatabase = async () => {
  const exists = await db.schema.hasTable('notifications');
  if (!exists) {
    return db.schema.createTable('notifications', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('users.id');
      table.string('type').notNullable();
      table.text('content').notNullable();
      table.boolean('read').defaultTo(false);
      table.timestamps(true, true);
    });
  }
};

// Initialize the database
initializeDatabase();

// Store active user connections
const userConnections = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', (userId) => {
    userConnections.set(userId, socket);
    console.log(`User ${userId} registered`);
  });

  socket.on('disconnect', () => {
    for (const [userId, userSocket] of userConnections.entries()) {
      if (userSocket === socket) {
        userConnections.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Create a new notification
app.post('/notifications', async (req, res) => {
  const { userId, type, content } = req.body;
  try {
    const [notificationId] = await db('notifications').insert({
      user_id: userId,
      type,
      content
    });

    // Send real-time notification
    const userSocket = userConnections.get(userId);
    if (userSocket) {
      userSocket.emit('notification', { id: notificationId, type, content });
    }

    res.status(201).json({ success: true, notificationId });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all notifications for a user
app.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await db('notifications')
      .where('user_id', userId)
      .orderBy('created_at', 'desc');
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Mark a notification as read
app.put('/notifications/:id/read', async (req, res) => {
  const { id } = req.params;
  try {
    await db('notifications').where('id', id).update({ read: true });
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));