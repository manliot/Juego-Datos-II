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
var sl, su, s1, s2, s3, s4;
var swsocket = false;
var temp
var lr, ud;
var d1, d2, d3, d4;
var tank1, tank2;

var tl = null;//aqui se guarda el sprite que se va a mover
var tlText;
var txte;// esta es la capacidad de el sprite que se va a mover

var clr, cud, cd1, cd2, cd3, cd4;//aqui vamos a guardar el txt de las capacidades para poder moverlo
var groupTank;
var sw = false;//esta variable se activa si se esta moviendo una tuberia

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

  moverSprite(lr, this, "LR", sl);
  moverSprite(ud, this, "UD", su);
  moverSprite(d1, this, "D1", s2);
  moverSprite(d2, this, "D2", s2);
  moverSprite(d3, this, "D3", s3);
  moverSprite(d4, this, "D4", s4);

}
var tuberiaotro, Imagetu;
function update() {

  //this.physics.overlap(tank1,tl,conectar(tank1,tl),null,this);
  if (tl != null) {

    tl.on('pointerdown', function (pointer) {//se activa cuandola tuberia se le esta haciendo click
      sw = true;

      tl.on('drag', function (pointer, dragX, dragY) {//esta funcion se activa caundo hay un arrastre en el objeto tl

        tl.x = tlText.x = dragX;
        tl.y = tlText.y = dragY;

      });

    });
    this.socket.emit("memovi", tl);

    tl.on('pointerout', function (pointer) {
      //comproamos que la tuberia concuerde con otra y si no es asi entonces la destruimos
      if (!correct(tl)) {
        tl.destroy();

      }
      sw = false;
    });

  } else {
    //console.log("null(no te awites!)");
  }
  this.socket.on('otroMovio', function (tube, ID, pls) {

    console.log(ID);

    if (IDe == ID) {
      console.log("songiuales");
    } else {
      tuberiaotro = tl = tub = G.add.sprite(tube.x, tube.y, Imagetu).setInteractive({ draggable: true });

    }

  });

}
function conectar(tank, t) {

}
function correct(tl) {
  //aqui se comprueba si la tuberia conecta a otra tuberia


  if (temp != null) {
    /*console.log(temp.x);
    console.log(temp.y);
    console.log(tl.x);
    console.log(tl.y);*/
    if (temp.x + 50 > tl.x & temp.x - 50 < tl.x & temp.y + 50 > tl.y & temp.y - 50 < tl.y) {

      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}



function moverSprite(algo, ga, t, c) {//recibe un sprite
  algo.on('pointerout', function (pointer) {//se activa cuando se pasa eñ ratpn por  el sprite algo 
    Imagetu = t;
    if (pointer.isDown & !sw) {
      if (tl != null) {
        if (tl.x > 760) {

          tl.destroy();
        }
        temp = tl;
      }
      tl = null;//ESTO PARA QUE CUADO SE ESTE MOVIENDO OTRA TUERIA NO SEA LA MIMA QUE L ANTERIOR
      txte = null;
      tl = tub = ga.add.sprite(pointer.x, pointer.y, t).setInteractive({ draggable: true });


      tlText = ga.add.text(pointer.x, pointer.y, '' + c, { fontSize: '16px', fill: '#0000FF' });

      sw = false;
    }
  });
}
var IDe, G;
function cargaInicial(game) {
  G = game;
  game.socket = io();
  self = this;
  //this.otherPlayers = this.physics.add.group();

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

  game.socket.on('Capacidades', function (c1, c2, c3, c4, ct1, ct2, cl, cu) {
    swsocket = true;
    tank1.x = ct1; tank2.x = ct2; clr.setText(cl); cud.setText(cu);
    cd1.setText(c1); cd2.setText(c2); cd3.setText(c3); cd4.setText(c4);

    s1 = c1; s2 = c2; s3 = c3; s4 = c4; sl = cl; su = cu; st1 = ct1; st2 = ct2;
    console.log(game.socket.id);
    IDe = game.socket.id;

  })


  //aqui agregamos los tanks a el grupo de tanques
  tank1 = groupTank.create(0, 60, 'Tank');
  tank2 = groupTank.create(0, 438, 'Tank');

  //las guardamos en variables globales para luego poder utilizarlas al momento de construir el grafo
  clr = game.add.text(880, 93, '' + null, { fontSize: '16px', fill: '#0000FF' });
  cud = game.add.text(880, 173, '' + null, { fontSize: '16px', fill: '#0000FF' });
  cd1 = game.add.text(873, 263, '' + null, { fontSize: '16px', fill: '#0000FF' });
  cd2 = game.add.text(873, 343, '' + null, { fontSize: '16px', fill: '#0000FF' });
  cd3 = game.add.text(885, 423, '' + null, { fontSize: '16px', fill: '#0000FF' });
  cd4 = game.add.text(885, 523, '' + null, { fontSize: '16px', fill: '#0000FF' });


  groupTank.enableBody = true;
  groupTank.physicsBodyType = Phaser.Physics.ARCADE;

  //texto de los jugadores
  game.add.text(16, 530, 'Jugador 1', { fontSize: '32px', fill: '#0000FF' });
  game.add.text(570, 530, 'Jugador 2', { fontSize: '32px', fill: '#FF0000' });
  //text = this.add.text(800, 16, 'Time 00:' + counter, { font: "32px Arial", fill: "#ffffff", align: "center" });

  ;


}


