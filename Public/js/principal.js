var config = {
  type: Phaser.AUTO,
  parent: 'bloque_juego',
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var juego = new Phaser.Game(config);

var lr, ud;
var d1, d2, d3, d4;
var tank1, tank2;
var prueba;
var tl = null;//aqui se guarda el sprite que se va a mover
var txte;// esta es la capacidad de el sprite que se va a mover
var inpuntClick;
var text;
var clr, cud, cd1, cd2, cd3, cd4;//aqui vamos a guardar el txt de las capacidades para poder moverlo
var groupTank;
var sw = false;//esta variable se activa si se esta moviendo una tuberia
var AKey, SKey;
function preload() {
  this.load.image('bg', 'images/bg.jpg')
  this.load.image('UD', 'images/UD.png')
  this.load.image('LR', 'images/LR.png')
  this.load.image('D1', 'images/D1.png')
  this.load.image('D2', 'images/D2.png')
  this.load.image('D3', 'images/D3.png')
  this.load.image('D4', 'images/D4.png')
  this.load.image('Tank', 'images/Tanque.png')
}


function create() {

  cargaInicial(this);
  moverSprite(lr, this, "LR");
  moverSprite(ud, this, "UD");
  moverSprite(d1, this, "D1");
  moverSprite(d2, this, "D2");
  moverSprite(d3, this, "D3");
  moverSprite(d4, this, "D4");
}
function update() {


  if (tl != null) {

    tl.on('pointerdown', function (pointer) {//se activa cuandola tuberia se le esta haciendo click
      sw = true;

      tl.on('drag', function (pointer, dragX, dragY) {//esta funcion se activa caundo hay un arrastre en el objeto tl
        //console.log(tl.angle);

        tl.x = dragX;
        tl.y = dragY;

      });

    });

    tl.on('pointerup', function (pointer) {
      //comproamos que la tuberia concuerde con otra y si no es asi entonces la destruimos
      if (correct()) {
        tl.destroy();
        sw = false;
      }
    });
    this.socket.emit('seMovio', tl, tl.x, tl.y, tl.angle);
  } else {
    //console.log("null(no te awites!)");
  }

}

function correct() {
  //aqui se comprueba si la tuberia conecta a otra tuberia
  return true;
}




function moverSprite(algo, ga, t) {//recibe un sprite
  algo.on('pointerout', function (pointer) {//se activa cuando se pasa eñ ratpn por  el sprite algo 

    if (pointer.isDown & !sw) {
      if (tl != null) {
        tl.destroy();
      }
      tl = null;//ESTO PARA QUE CUADO SE ESTE MOVIENDO OTRA TUERIA NO SEA LA MIMA QUE L ANTERIOR
      txte = null;
      tl = ga.add.sprite(pointer.x, pointer.y, t).setInteractive({ draggable: true });
      //falta mover el texto de la capacidad
      sw = false;
    }
  });
}

function cargaInicial(game) {

  game.add.tileSprite(0, 150, 2000, 1500, 'bg');
  //el .setInteractive sirve para poder mover con el rator
  lr = game.physics.add.sprite(890, 100, 'LR').setInteractive();
  ud = game.add.sprite(890, 180, 'UD').setInteractive();
  d1 = game.add.sprite(890, 260, 'D1').setInteractive();
  d2 = game.add.sprite(890, 360, 'D2').setInteractive();
  d3 = game.add.sprite(890, 440, 'D3').setInteractive();
  d4 = game.add.sprite(890, 520, 'D4').setInteractive();


  //se crea u grupo de tanques y le asignamos un cuerpo
  groupTank = game.physics.add.group();
  groupTank.enableBody = true;//esto le dice que los objetos de esta madre tiene cuerpo (algo cleve en las colisiones)

  game.socket = io();

  var s1, s2, s3, s4, st1, st2, sl, su;
  game.socket.on('Capacidades', function (c1, c2, c3, c4, ct1, ct2, cl, cu) {
    s1 = c1; s2 = c2; s3 = c3; s4 = c4; sl = cl; su = cu; st1 = ct1; st2 = ct2;

    //aqui agregamos los tanks a el grupo de tanques
    tank1 = groupTank.create(st1, 50, 'Tank');
    tank2 = groupTank.create(st2, 450, 'Tank');

    //las guardamos en variables globales para luego poder utilizarlas al momento de construir el grafo
    clr = game.add.text(880, 93, '' + sl, { fontSize: '16px', fill: '#0000FF' });
    cud = game.add.text(880, 173, '' + su, { fontSize: '16px', fill: '#0000FF' });
    cd1 = game.add.text(873, 263, '' + s1, { fontSize: '16px', fill: '#0000FF' });
    cd2 = game.add.text(873, 343, '' + s2, { fontSize: '16px', fill: '#0000FF' });
    cd3 = game.add.text(885, 423, '' + s3, { fontSize: '16px', fill: '#0000FF' });
    cd4 = game.add.text(885, 523, '' + s4, { fontSize: '16px', fill: '#0000FF' });

  })

  /*game.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
      } else {
        addOtherPlayers(self, players[id]);
      }
    });
  });*/
  game.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });
  game.socket.on('disconnect', function (playerId) {
    /* self.otherPlayers.getChildren().forEach(function (otherPlayer) {
    if (playerId === otherPlayer.playerId) {
      otherPlayer.destroy();
    }
  });*/
  });
  groupTank.enableBody = true;
  groupTank.physicsBodyType = Phaser.Physics.ARCADE;

  //texto de los jugadores
  game.add.text(16, 530, 'Jugador 1', { fontSize: '32px', fill: '#0000FF' });
  game.add.text(570, 530, 'Jugador 2', { fontSize: '32px', fill: '#FF0000' });
  //text = this.add.text(800, 16, 'Time 00:' + counter, { font: "32px Arial", fill: "#ffffff", align: "center" });

  ;
  AKey = game.input.keyboard.addKey('A');
  SKey = game.input.keyboard.addKey('S');

  game.socket.on('seMovio', function (playerInfo) {
    /*tl.destroy();
    sw = false;
    tl = playerInfo.tlr;
    tl.x = playerInfo.x;
    tl.y = playerInfo.y;
    tl.angle = playerInfo.a;*/
  });
}
function addPlayer(self, playerInfo) {
  ///alll
}
