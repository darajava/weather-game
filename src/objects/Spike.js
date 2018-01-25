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

    game.world.bringToTop(this.spike);

    this.fixDensity();
  }

  fixDensity() {
    this.spike.scale.setTo(this.densityFactor, 3 * this.densityFactor);
  }

  popUp() {
    this.spikeNoise.play();
    let tween = this.game.add.tween(this.spike);

    tween.to( { y: this.y }, 50, null, true);

    tween.onComplete.add(() => {
      this.spike.loadTexture('spikeblood');
    }, this);
  }

  update() {
    if (
      !this.dead
      && Math.abs(this.player.sprite.x - this.spike.x) < this.spike.width / 2
      && this.player.sprite.body.touching.down
    ) {
      this.dead = true;
      this.popUp();
      this.player.disableControls();
      this.player.kill();
    }
  }

}

export default Spike;