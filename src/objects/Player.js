class Player {

  constructor(game, controls){
    this.game = game;

    this.controls = controls;

    this.player = this.game.add.sprite(250, this.game.height, 'player');

    this.game.physics.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.jumpTimer = 0;
    this.player.scale.setTo(4, 4);
    this.footsteps = game.add.audio('footsteps');
  }

  update() {
    let controls = this.controls.getOutputs();

    if (controls.right) {
      this.player.body.velocity.x = 450;
      this.playFootsteps();
    } else if (controls.left) {
      this.player.body.velocity.x = -450;
      this.playFootsteps();
    } else {
      this.player.body.velocity.x = 0;
      this.stopFootsteps();
    }

    if (controls.jump && this.player.body.onFloor() && this.game.time.now > this.jumpTimer) {
      this.player.body.velocity.y = -750;
      this.jumpTimer = this.game.time.now + 350;
      this.stopFootsteps();
    }
  }

  playFootsteps() {
    if (this.playingFootsteps) return;
    if (!this.player.body.onFloor()) return;
    this.playingFootsteps = true;
    this.footsteps.loop = true;
    this.footsteps.play();
  }

  stopFootsteps() {
    this.playingFootsteps = false;

    this.footsteps.stop();
  }

  getPlayerSprite() {
    return this.player;
  }

}

export default Player;