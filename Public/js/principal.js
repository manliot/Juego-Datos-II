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
var capacidades = [10, 20, 30, 40, 50], pos = [100, 250, 400, 550, 700];
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
  moverSprite(lr, this, clr);
  moverSprite(ud, this, cud);
  moverSprite(d1, this, d1);
  moverSprite(d2, this, d2);
  moverSprite(d3, this, d3);
  moverSprite(d4, this, d4);
}
function update() {
  this.physics.arcade.collide(groupTank,lr);
  if (tl != null) {

    tl.on('pointerdown', function (pointer) {//se activa cuandola tuberia se le esta haciendo click


      tl.on('drag', function (pointer, dragX, dragY) {//esta funcion se activa caundo hay un arrastre en el objeto tl
        tl.x = dragX;
        tl.y = dragY;
      });

    });

    tl.on('pointerup', function (pointer) {
      //comproamos que la tuberia concuerde con otra y si no es asi entonces la destruimos
      if (correct()) {
        tl.destroy();
      }
    });
  } else {
    console.log("null(no te awites!)");
  }
}

function correct() {
  //aqui se comprueba si la tuberia conecta a otra tuberia
  return true;
}



function moverSprite(algo, ga, t) {//recibe un sprite
  algo.on('pointerout', function (pointer) {
    console.log("se esta paso el mause por ahi");

    if (pointer.isDown) {
      tl = null;
      txte = null;
      tl = ga.add.sprite(pointer.x, pointer.y, 'LR').setInteractive({ draggable: true });
      //falta mover el texto de la capacidad
    }
  });
}

function cargaInicial(game) {

  var counter = 30;
  game.add.tileSprite(0, 150, 2000, 1500, 'bg');
  lr = game.add.sprite(890, 100, 'LR').setInteractive();
  ud = game.add.sprite(890, 180, 'UD').setInteractive();
  d1 = game.add.sprite(890, 260, 'D1').setInteractive();
  d2 = game.add.sprite(890, 360, 'D2').setInteractive();
  d3 = game.add.sprite(890, 440, 'D3').setInteractive();
  d4 = game.add.sprite(890, 520, 'D4').setInteractive();
  groupTank = game.add.group();
  groupTank.enableBody=true;//esto le dice que los objetos de esta madre tiene cuerpo (algo cleve en las colisiones)

  tank1 = groupTank.create(pos[Math.floor(Math.random() * 5)], 50, 'Tank');
  tank2 = groupTank.create(pos[Math.floor(Math.random() * 5)], 450, 'Tank');
  
  clr = game.add.text(880, 93, '' + capacidades[Math.floor(Math.random() * 5)], { fontSize: '16px', fill: '#0000FF' });
  cud = game.add.text(880, 173, '' + capacidades[Math.floor(Math.random() * 5)], { fontSize: '16px', fill: '#0000FF' });
  cd1 = game.add.text(873, 263, '' + capacidades[Math.floor(Math.random() * 5)], { fontSize: '16px', fill: '#0000FF' });
  cd2 = game.add.text(873, 343, '' + capacidades[Math.floor(Math.random() * 5)], { fontSize: '16px', fill: '#0000FF' });
  cd3 = game.add.text(885, 423, '' + capacidades[Math.floor(Math.random() * 5)], { fontSize: '16px', fill: '#0000FF' });
  cd4 = game.add.text(885, 523, '' + capacidades[Math.floor(Math.random() * 5)], { fontSize: '16px', fill: '#0000FF' });
  game.socket = io();
  game.add.text(16, 530, 'Jugador 1', { fontSize: '32px', fill: '#0000FF' });
  game.add.text(570, 530, 'Jugador 2', { fontSize: '32px', fill: '#FF0000' });
  //text = this.add.text(800, 16, 'Time 00:' + counter, { font: "32px Arial", fill: "#ffffff", align: "center" });
  
}
