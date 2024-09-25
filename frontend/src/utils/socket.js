// frontend/src/utils/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000', {
    autoConnect: false, // Prevents automatic connection
});

// Connect the socket
socket.connect();

export default socket;