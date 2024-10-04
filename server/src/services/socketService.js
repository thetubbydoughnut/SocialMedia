class SocketService {
  constructor(io) {
    this.io = io;
    this.userConnections = new Map();
    this.initialize();
  }

  initialize() {
    this.io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('register', (userId) => {
        this.userConnections.set(userId, socket);
        console.log(`User ${userId} registered`);
      });

      socket.on('disconnect', () => {
        for (const [userId, userSocket] of this.userConnections.entries()) {
          if (userSocket === socket) {
            this.userConnections.delete(userId);
            console.log(`User ${userId} disconnected`);
            break;
          }
        }
      });
    });
  }

  sendNotification(userId, notification) {
    const userSocket = this.userConnections.get(userId);
    if (userSocket) {
      userSocket.emit('notification', notification);
    }
  }
}

module.exports = SocketService;