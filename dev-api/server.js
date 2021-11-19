const express = require('express');
const socket = require('socket.io');

const app = express();

let messages = [];
let users = [];
let cards = [];
let votes = []

// TODO join server and FE before start in Heroku
// app.use(express.static(path.join(__dirname, '/client')));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('card', (card) => {
    console.log("Oh, I've got something from " + socket.id);
    cards.push(card);
    socket.broadcast.emit('card', card);
  });
  socket.on('vote', (vote) => {
    console.log("Oh, I've got something from " + socket.id);
    votes.push(vote);
    socket.broadcast.emit('card', vote);
  });
  socket.on('join', (user) => {
    console.log('Oh, we have a new user ' + socket.id);
    users.push(user);
    console.log(users);
  });
  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    const user = users.filter((user) => user.id == socket.id);
    const index = users.indexOf(user);
    socket.broadcast.emit('message', {
      author: 'Chat Bot',
      content: `${user[0].name} has left the conversation... :(`,
    });
    users.splice(index, 1);
  });
  console.log("I've added a listener on message and disconnect events \n");
});