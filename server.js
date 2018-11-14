var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var players = {};
app.use(express.static(__dirname + '/public'));
var capacidades = [10, 20, 30, 40, 50], pos = [100, 250, 400, 550, 700];
var pt1, pt2;
var kl, ku, k1, k2, k3, k4;
var tub1, tub2;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('<<<<<<a user connected >>>>>: ' + socket.id);

  actualizarVariables();

  io.sockets.emit("Capacidades", k1, k2, k3, k4, pt1, pt2, kl, ku);

  // create a new player and add it to our players object
  players[socket.id] = {
    playerId: socket.id,
    tuberiam: null,
  };

  socket.on('memovi', function (turu) {
    players[socket.id].tuberiam = turu;
    
    socket.broadcast.emit('otroMovio', players[socket.id].tuberiam, socket.id);
  })

  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);

  });

});

server.listen(3000, function () {
  console.log("servidor iniciado")
  console.log(`Listening on ${server.address().port}`);

});



function addOtherPlayers(self, playerInfo) {

}
function actualizarVariables() {
  capacidades = [10, 20, 30, 40, 50], pos = [100, 250, 400, 550, 700];
  pt1 = pos[Math.floor(Math.random() * 5)], pt2 = pos[Math.floor(Math.random() * 5)];
  kl = capacidades[Math.floor(Math.random() * 5)], ku = capacidades[Math.floor(Math.random() * 5)],
    k1 = capacidades[Math.floor(Math.random() * 5)],
    k2 = capacidades[Math.floor(Math.random() * 5)],
    k3 = capacidades[Math.floor(Math.random() * 5)],
    k4 = capacidades[Math.floor(Math.random() * 5)];

}