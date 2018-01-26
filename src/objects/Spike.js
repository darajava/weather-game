class Spike {

  constructor(game, player, x, y){
    this.densityFactor = window.devicePixelRatio / 3;

    this.dead = false;

    this.game = game;
    this.y = y;
    this.player = player;

    this.spike = game.add.sprite(x, y + (game.cache.getImage('spike').height * this.densityFactor) * 3 - 60 * this.densityFactor, 'spike');

    this.spikeNoise = game.add.audio('spike');
    this.spikeNoise.volume = 0.7;

    this.spike.anchor.setTo(0.5, 1);

    game.physics.arcade.enable(this.spike);
    this.spike.body.moves = false;

    game.world.bringToTop(this.spike);
    this.spike.body.setSize(this.spike.width / 4, this.spike.height / 2, this.spike.width / 4 + this.spike.width / 8, 0);


    this.fixDensity();
  }

  fixDensity() {
    this.spike.scale.setTo(this.densityFactor, 3 * this.densityFactor);
  }

  popUp() {
    if (this.dead) return;

    this.dead = true;
    this.player.disableControls();
    this.player.kill();

    this.spikeNoise.play();
    let tween = this.game.add.tween(this.spike);

    tween.to( { y: this.y }, 50, null, true);

    tween.onComplete.add(() => {
      this.spike.loadTexture('spikeblood');
    }, this);
  }

  update() {
    this.game.debug.body(this.spike);
    this.game.physics.arcade.collide(this.spike, this.player.sprite, () => {this.popUp()}, null, this);
  }

}

export default Spike;