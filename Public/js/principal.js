var config = {
  type: Phaser.CANVAS,
  parent: 'phaser-example',
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
 
function preload() {
  this.load.image('bg','images/bg.jpg')
  this.load.image('box','images/box.jpg')      
}
var counter = 30;
function create() {
  var self= this;
  this.add.tileSprite(300,20,500,1000,'bg');
  this.add.tileSprite(920,0,300,1500,'box');
  this.socket = io();
  this.add.text(16, 530, 'Jugador 1', { fontSize: '32px', fill: '#0000FF' });
  this.add.text(570, 530, 'Jugador 2', { fontSize: '32px', fill: '#FF0000' });
  text = this.add.text(800, 16, 'Time 00:'+counter, { font: "32px Arial", fill: "#ffffff", align: "center" });
  timer = juego.time.create(false);


    timer.loop(2000, updateCounter, this);

    timer.start();
}
function update() {
 }
function updateCounter() {
  counter++;
  text.setText('Time 00:' + counter);
}