import LevelRestart from './LevelRestart';

class Player {

  constructor(game, controls, levelWidth){
    this.game = game;
    this.levelWidth = levelWidth;

    this.controls = controls;

    this.densityFactor = window.devicePixelRatio / 3;

    this.speed = 550 * this.densityFactor;
    this.jumpSpeed = 700;

    this.player = this.game.add.sprite(150, this.game.height - 250, 'player');

    this.sprite = this.player;

    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.player.body.setSize(this.player.width - 16, this.player.height - 8, 8, 0);

    var idle = this.player.animations.add('idle', [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    var run = this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7]);

    this.jumpTimer = 0;
    this.player.scale.setTo(4, 4);
    this.footsteps = game.add.audio('footsteps');
    this.jumpNoise = game.add.audio('jumpNoise');
    this.player.anchor.setTo(0.5, 0.5);

    this.fixDensity();
  }

  fixDensity() {
    this.player.scale.setTo(this.densityFactor * 4, this.densityFactor * 4);
    console.log(this.densityFactor);
  }

  update() {
    let controls = this.controls.getOutputs();

    if (this.controlDisabled) return;

    if (controls.right) {
      this.player.body.velocity.x = this.speed;
      this.player.scale.setTo(this.densityFactor * 4, this.densityFactor * 4);
      this.playFootsteps();
      this.player.animations.play('run', 15, true);
    } else if (controls.left) {
      this.player.body.velocity.x = -this.speed;
      this.playFootsteps();
      this.player.scale.setTo(-this.densityFactor * 4, this.densityFactor * 4);
      this.player.animations.play('run', 15, true);
    } else {
      this.player.body.velocity.x = 0;
      this.stopFootsteps();
      this.player.animations.play('idle', 10, true);
    }

    if (!this.player.body.touching.down) {
      this.player.animations.play('idle', 10, true);
    }

    if (controls.jump && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.jumpSpeed;
      this.jumpTimer = this.game.time.now + 350;
      this.stopFootsteps();
      this.jumpNoise.volume = 0.15;
      this.jumpNoise.play();
    }
  }

  disableControls() {
    this.controlDisabled = true;
    this.player.animations.play('idle', 10, true);
    this.player.body.velocity.x = 0;
    this.stopFootsteps();
  }

  playFootsteps() {
    if (this.playingFootsteps) return;
    if (!this.player.body.touching.down) return;
    this.playingFootsteps = true;
    this.footsteps.loop = true;
    this.footsteps.volume = 0.5;
    this.footsteps.play();
  }

  stopFootsteps() {
    this.playingFootsteps = false;

    this.footsteps.stop();
  }

  kill() {
    this.game.world.bringToTop(this.player);
    this.player.anchor.setTo(0.5, 0.6);
    this.game.add.tween(this.player).to( { angle: 90}, 50, null, true);
    this.player.animations.stop(null, true);
    let restart = new LevelRestart(this.game, this.levelWidth);
    restart.restart();
  }

}

export default Player;