const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  let username = '';

  socket.on('set username', (name) => {
    username = name;
    socket.broadcast.emit('chat message', `${username} sohbete katıldı.`);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    if (username) {
      io.emit('chat message', `${username} sohbetten ayrıldı.`);
    }
  });
});

http.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor');
});
