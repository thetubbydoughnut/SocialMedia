import { io } from 'socket.io-client';

const socket = io('http://localhost:9000', {
  autoConnect: false, // Prevents automatic connection before authentication
});

export default socket;
