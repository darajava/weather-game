class Preload extends Phaser.State {

  preload() {
    /* Preload required assets */
    this.game.load.image('backgroundSprite', 'assets/background.png');

    // Todo: rename
    this.game.load.image('mountains-back', 'assets/mountains-back.png');
    this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
    this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');

    this.game.load.image('stars', 'assets/stars.png');

    this.game.load.image('fog1', 'assets/fog1.png');
    this.game.load.image('fog2', 'assets/fog2.png');
    this.game.load.image('fog3', 'assets/fog3.png');
    this.game.load.image('fog4', 'assets/fog4.png');

    this.game.load.image('sun', 'assets/sun.png');
    this.game.load.image('moon', 'assets/moon.png');

    this.game.load.image('right', 'assets/right.png');
    this.game.load.image('left', 'assets/right.png');
    this.game.load.image('jump', 'assets/jump.png');
    this.game.load.image('weather', 'assets/weather.png');

    this.game.load.image('grass', 'assets/grass.png');
    this.game.load.image('block', 'assets/block.png');


    this.game.load.spritesheet('player','assets/player.png', 49, 69, 20);

    this.game.load.audio('thunder', 'assets/thunder.mp3');
    this.game.load.audio('rain', 'assets/rain.ogg');
    this.game.load.audio('footsteps', 'assets/footsteps.ogg');
    this.game.load.audio('breeze', 'assets/breeze.ogg');
    this.game.load.audio('jumpNoise', 'assets/jump.ogg');
  }

  create() {
    //NOTE: Change to GameTitle if required
    this.game.state.start("Main");
  }

}

export default Preload;
