import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production' ?
    '/' :
    '//localhost:3030'
var socket;

export default {
    setup,
    terminate,
    on,
    off,
    emit
}

function setup() {
    console.log('setUp');
    socket = io(BASE_URL);
}

function terminate() {
    console.log('terminate');
    socket = null;
}

function on(eventName, cb) {
    console.log('on');
    socket.on(eventName, cb)
}

function off(eventName, cb) {
    console.log('Off');
    socket.off(eventName, cb)
}

function emit(eventName, data) {
    console.log('emit', data);
    socket.emit(eventName, data)
}