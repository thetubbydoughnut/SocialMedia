class SocketService {
  constructor(io) {
    this.io = io;
    this.initialize();
  }

  initialize() {
    this.io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  sendNewComment(comment) {
    this.io.emit('new-comment', comment);
  }
}

module.exports = SocketService;