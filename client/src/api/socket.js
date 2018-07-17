import openSocket from 'socket.io-client/dist/socket.io';
const  socket = openSocket('http://localhost:5000/');

function receiveUpdate(cb) {
    socket.on('receiveUpdate', () => cb());
}

function onUpdate() {
    socket.emit('onUpdate');    
}

export { receiveUpdate, onUpdate };

