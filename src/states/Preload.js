class Preload extends Phaser.State {

  preload() {
    /* Preload required assets */
    this.game.load.image('backgroundSprite', '../static/assets/background.png');

    // Todo: rename
    this.game.load.image('mountains-back', '../static/assets/mountains-back.png');
    this.game.load.image('mountains-mid1', '../static/assets/mountains-mid1.png');
    this.game.load.image('mountains-mid2', '../static/assets/mountains-mid2.png');

    this.game.load.image('stars', '../static/assets/stars.png');

    this.game.load.image('fog1', '../static/assets/fog1.png');
    this.game.load.image('fog2', '../static/assets/fog2.png');
    this.game.load.image('fog3', '../static/assets/fog3.png');
    this.game.load.image('fog4', '../static/assets/fog4.png');

    this.game.load.image('sun', '../static/assets/sun.png');
    this.game.load.image('moon', '../static/assets/moon.png');

    this.game.load.image('right', '../static/assets/right.png');
    this.game.load.image('left', '../static/assets/right.png');
    this.game.load.image('jump', '../static/assets/jump.png');
    this.game.load.image('weather', '../static/assets/weather.png');

    this.game.load.image('grass', '../static/assets/grass.png');
    this.game.load.image('block', '../static/assets/block.png');
    this.game.load.image('spike', '../static/assets/spike.png');
    this.game.load.image('spikeblood', '../static/assets/spikeblood.png');


    this.game.load.spritesheet('player','../static/assets/player.png', 49, 69, 20);

    this.game.load.audio('thunder', '../static/assets/thunder.mp3');
    this.game.load.audio('spike', '../static/assets/spike.mp3');
    this.game.load.audio('rain', '../static/assets/rain.ogg');
    this.game.load.audio('fire', '../static/assets/fire.ogg');
    this.game.load.audio('sizzle', '../static/assets/sizzle.ogg');
    this.game.load.audio('footsteps', '../static/assets/footsteps.ogg');
    this.game.load.audio('breeze', '../static/assets/breeze.ogg');
    this.game.load.audio('jumpNoise', '../static/assets/jump.ogg');

    this.game.add.text(0, 0, '',  { font: "900 86px Raleway", fill: '#000' });
  }

  create() {
    //NOTE: Change to GameTitle if required
    this.game.state.start("Main");
  }

}

export default Preload;
