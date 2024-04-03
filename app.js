const express = require('express');
const { createServer } = require('http'); // Import 'http' module directly, not 'node:http'
const path = require('path'); // Import 'path' module directly, not 'node:path'

const app = express();
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
