import { io } from 'socket.io-client';
import store from '../store';

const socket = io('http://localhost:9000', {
  autoConnect: false, // Prevent auto connection
});

export const connectSocket = () => {
  const token = store.getState().auth.token;
  if (token) {
    socket.io.opts.query = { token };
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;