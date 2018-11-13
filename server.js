var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var players = {};
var capacidades = [10, 20, 30, 40, 50], pos = [100, 250, 400, 550, 700];
var pt1 = pos[Math.floor(Math.random() * 5)], pt2 = pos[Math.floor(Math.random() * 5)];
var kl = capacidades[Math.floor(Math.random() * 5)], ku = capacidades[Math.floor(Math.random() * 5)], k1 = capacidades[Math.floor(Math.random() * 5)], k2 = capacidades[Math.floor(Math.random() * 5)], k3 = capacidades[Math.floor(Math.random() * 5)], k4 = capacidades[Math.floor(Math.random() * 5)];
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected' + socket.id);
  socket.emit("Capacidades", k1, k2, k3, k4, pt1, pt2, kl, ku);

  // create a new player and add it to our players object
  players[socket.id] = {
    playerId: socket.id,
    // tlr, x, y, a
  };
  socket.on('seMovio', function (tlt, x, y, a) {
    players[socket.id].tlr = tlt;
    players[socket.id].x = x;
    players[socket.id].y = y;
    players[socket.id].a = a;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('seMovio', players[socket.id]);
  })
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('disconnect', function () {

    console.log('user disconnected');
  });
});

server.listen(3000, function () {
  console.log(`Listening on ${server.address().port}`);
});



function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  if (playerInfo.team === 'blue') {
    otherPlayer.setTint(0x0000ff);
  } else {
    otherPlayer.setTint(0xff0000);
  }
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}
