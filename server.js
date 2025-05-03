const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);
const path = require('path');

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg); // send to other users
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 8888;
http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
