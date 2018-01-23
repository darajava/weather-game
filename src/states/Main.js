import Background from '../objects/Background';
import Player from '../objects/Player';
import Controls from '../objects/Controls';
import Level1 from '../objects/Level1';

class Main extends Phaser.State {

  create() {
    this.jumpTimer = 0;

    //Enable Arcade Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 2050;

    this.breeze = this.game.add.audio('breeze');
    this.breeze.loop = true;
    this.breeze.volume = 0.3;
    this.breeze.play();

    let levelWidth = this.game.width * 5;

    this.background = new Background(this.game, levelWidth);

    this.game.world.setBounds(0, 0, levelWidth, this.game.height);

    this.controls = new Controls(this.game);
    this.player = new Player(this.game, this.controls);

    this.controls.setPlayerSprite(this.player.getPlayerSprite());

    this.level1 = new Level1(this.game, this.player, levelWidth);

    this.game.camera.follow(this.player.getPlayerSprite(), Phaser.Camera.FOLLOW_LOCKON);

    this.x = 0;
  }

  update() {
    this.level1.update();
    this.player.update();
    this.background.update({x: this.player.getPlayerSprite().x});
  }

}

export default Main;
