var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
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
    //cargar recursos
      juego.stage.backgroundColor="#C29A91";
}
 
function create() {
    //
}
 
function update() {
    
}

juego.state.add('principal',scene);
juego.state.start('principal');
