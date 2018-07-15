import openSocket from 'socket.io-client/dist/socket.io';
const  socket = openSocket('http://localhost:5000/');

function receiveTaskUpdate(cb) {
    socket.on('receiveTaskUpdate', () => cb());
}

function onTaskUpdate() {
    socket.emit('taskUpdate');    
}

export { receiveTaskUpdate, onTaskUpdate };

