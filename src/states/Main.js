import Background from 'objects/Background';
import Player from 'objects/Player';
import Controls from 'objects/Controls';
import Fire from 'objects/Fire';

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

    let levelWidth = this.game.width * 2;

    this.background = new Background(this.game, levelWidth);

    this.game.world.setBounds(0, 0, this.game.width * 2, this.game.height);


    this.controls = new Controls(this.game);
    this.player = new Player(this.game, this.controls);

    this.controls.setPlayerSprite(this.player.getPlayerSprite());

    // level stuff
    this.grass = this.game.add.tileSprite(0,
      this.game.height - this.game.cache.getImage('grass').height,
      levelWidth,
      this.game.cache.getImage('grass').height,
      'grass'
    );
    this.game.physics.enable(this.grass);
    // this.grass.body.moves = false;
    this.grass.body.collideWorldBounds = true;
    this.grass.body.setSize(this.grass.width, this.grass.height - 20, 0, 20);

    
    this.block = this.game.add.sprite(this.game.width / 2,
      this.game.height - this.grass.body.height - this.game.cache.getImage('grass').height + 20,
      'block'
    );
    this.game.physics.enable(this.block);
    this.block.body.moves = false;
    this.block.body.immovable = true;
    // this.block.body.setSize(this.block.width, this.block.height - 20, 0, 20);

    
    this.fire = new Fire(this.game, levelWidth - 500, this.game.height - 20);

    this.game.world.bringToTop(this.grass);

    // this.backgroundGroup.add(this.grass);

    // end level stuff

    // DO THIS NEXT

    this.game.camera.follow(this.player.getPlayerSprite(), Phaser.Camera.FOLLOW_LOCKON);
    console.log('hhhj')

    this.x = 0;
  }

  update() {

    this.game.physics.arcade.collide(this.player.getPlayerSprite(), this.grass);
    this.game.physics.arcade.collide(this.player.getPlayerSprite(), this.block);
    this.game.physics.arcade.collide(this.grass, this.block);


    // this.player.body.velocity.x = 0;
    // this.player.body.velocity.y = 0;

    this.player.update();
    this.background.update({x: this.player.getPlayerSprite().x});
  }

}

export default Main;
