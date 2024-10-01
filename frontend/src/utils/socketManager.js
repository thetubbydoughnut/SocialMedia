import socket from '../socket';

export const connectSocket = (user) => {
  if (user) {
    socket.auth = { token: user.token };
    socket.connect();
    socket.emit('join', user.id);
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
};