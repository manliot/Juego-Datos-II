var config = {
  type: Phaser.AUTO,
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
  this.load.image('UD','images/UD.jpg')
  this.load.image('LR','images/LR.jpg')
}
var counter = 30;
function create() {
  var self= this;
  this.add.tileSprite(0,150,2000,1500,'bg');
  this.add.image(890,100,'LR');
  this.add.image(890,160,'UD');
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