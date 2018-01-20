import Background from 'objects/Background';
import Player from 'objects/Player';
import Controls from 'objects/Controls';

class Main extends Phaser.State {

  create() {
    this.jumpTimer = 0;

    let levelWidth = this.game.width * 2;

    this.background = new Background(this.game, levelWidth);

    this.game.world.setBounds(0, 0, this.game.width * 2, this.game.height);


    this.controls = new Controls(this.game);
    this.player = new Player(this.game, this.controls);

    this.controls.setPlayerSprite(this.player.getPlayerSprite());

    this.game.camera.follow(this.player.getPlayerSprite(), Phaser.Camera.FOLLOW_LOCKON);
    console.log('hhhj')

    //Enable Arcade Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 2050;
    this.x = 0;
  }

  update() {

    // this.player.body.velocity.x = 0;
    // this.player.body.velocity.y = 0;

    this.player.update();
    this.background.update({x: -this.player.getPlayerSprite().x / 20});
  }

}

export default Main;
