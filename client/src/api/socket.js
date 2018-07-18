import openSocket from 'socket.io-client/dist/socket.io';
const  socket = openSocket('https://metcs673-team6.herokuapp.com/');

function receiveUpdate(cb) {
    socket.on('receiveUpdate', () => cb());
}

function onUpdate() {
    socket.emit('onUpdate');    
}

export { receiveUpdate, onUpdate };

