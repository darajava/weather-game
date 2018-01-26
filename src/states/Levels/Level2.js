import Background from '../../objects/Background';
import Player from '../../objects/Player';
import Controls from '../../objects/Controls';
import Spike from '../../objects/Spike';
import TextOverlay from '../../objects/TextOverlay';
import LevelEnd from '../../objects/LevelEnd';
import LevelStart from '../../objects/LevelStart';
// import Level2 from '../objects/Level2';

class Level2 extends Phaser.State {

  create() {
    let levelWidth = this.game.width * 5;
    
    this.background = new Background(this.game, levelWidth);

    this.game.world.setBounds(0, 0, levelWidth, this.game.height);

    this.controls = new Controls(this.game);
    this.player = new Player(this.game, this.controls, levelWidth);

    this.player.sprite.x = this.game.width / 2 + 700;

    this.controls.setPlayerSprite(this.player.sprite);

    this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON);

    this.breeze = this.game.add.audio('breeze');
    this.breeze.loop = true;
    this.breeze.volume = 0.3;
    this.breeze.play();

    let game = this.game;

    this.levelWidth = levelWidth;
    this.densityFactor = window.devicePixelRatio / 3;

    this.grass = game.add.tileSprite(0,
      game.height - game.cache.getImage('grass').height * this.densityFactor,
      levelWidth / this.densityFactor,
      game.cache.getImage('grass').height,
      'grass'
    );
    game.physics.enable(this.grass);
    this.grass.body.moves = false;
    this.grass.body.immovable = true;
    this.grass.body.collideWorldBounds = true;
    this.grass.body.setSize(this.grass.width, this.grass.height - 20, 0, 20);

    this.block = game.add.sprite(game.width / 8,
      game.height / 2,
      'block'
    );


    game.physics.enable(this.block);
    this.block.body.moves = true;
    this.block.body.immovable = false;
    this.block.body.collideWorldBounds = true;
    this.block.body.drag.set(200);

    this.spikes = [];
    for (let i = 1; i < 5; i++) {
      this.spikes.push(new Spike(this.game, this.player, this.game.width + 700 * i, this.game.height - this.grass.body.height));      
    }
    for (let i = 1; i < 10; i++) {
      this.spikes.push(new Spike(this.game, this.player, this.game.width + 700 * 4 + i * 60, this.game.height - this.grass.body.height));      
    }

    // game.physics.enable(this.spike);
    // this.spike.body.moves = true;
    // this.spike.body.immovable = true ;
    // this.spike.body.setSize(this.spike.width, this.block.height - 20, 0, 20);
    
    game.world.bringToTop(this.grass);

    this.fixDensity();

    let levelStart = new LevelStart(this.game, this.levelWidth);
    levelStart.fadeIn();
  }

  fixDensity() {
    this.grass.scale.setTo(this.densityFactor, this.densityFactor);
    this.block.scale.setTo(this.densityFactor * 4, this.densityFactor * 1.5);
    // this.text1.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text2.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text3.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text4.scale.setTo(this.densityFactor, this.densityFactor);
    // this.titleText.scale.setTo(this.densityFactor, this.densityFactor);
  }

  update() {
    let distanceFromEnd = this.levelWidth - this.player.sprite.x;

    this.game.physics.arcade.collide(this.player.sprite, this.grass);
    this.game.physics.arcade.collide(this.player.sprite, this.block);
    this.game.physics.arcade.collide(this.grass, this.block);

    this.player.update();
    this.background.update({x: this.player.sprite.x});

    for (let i = 0; i < this.spikes.length; i++)
      this.spikes[i].update();
  }

}

export default Level2;
