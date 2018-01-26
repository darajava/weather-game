import Background from '../../objects/Background';
import Player from '../../objects/Player';
import Controls from '../../objects/Controls';
import Fire from '../../objects/Fire';
import TextOverlay from '../../objects/TextOverlay';
import LevelEnd from '../../objects/LevelEnd';
// import Level1 from '../objects/Level1';

class Level1 extends Phaser.State {

  create() {
    let levelWidth = this.game.width * 5;
    
    this.game.sound.volume = 1;

    this.background = new Background(this.game, levelWidth);

    this.game.world.setBounds(0, 0, levelWidth, this.game.height);

    this.controls = new Controls(this.game);
    this.player = new Player(this.game, this.controls, levelWidth);

    this.controls.setPlayerSprite(this.player.sprite);

    this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON);

    this.breeze = this.game.add.audio('breeze');
    this.breeze.loop = true;
    this.breeze.volume = 0.5;
    this.breeze.play();

    let game = this.game;

    this.levelWidth = levelWidth;
    this.densityFactor = window.devicePixelRatio / 3;
    
    this.fireSound = game.add.audio('fire');
    this.fireSound.loop = true;

    this.sizzle = game.add.audio('sizzle');
    this.sizzle.volume = 0.5;
    this.sizzle.loop = false;

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

    this.block = game.add.sprite(game.width / 2,
      game.height - this.grass.body.height - game.cache.getImage('grass').height * this.densityFactor + 20,
      'block'
    );

    game.physics.enable(this.block);
    this.block.body.moves = true;
    this.block.body.immovable = true;
    // this.block.body.setSize(this.block.width, this.block.height - 20, 0, 20);
    
    this.fire = new Fire(game, levelWidth - 500, game.height - 20);

    game.world.bringToTop(this.grass);

    this.sizzlePlaying = false;

    this.titleText = new TextOverlay(game, 'Fog', 150, true)

    this.text1 = new TextOverlay(game, 'It\'s pretty scary,', game.width + game.width / 2)
    this.text2 = new TextOverlay(game, 'but go in you must,', game.width * 2 + game.width / 2)
    this.text3 = new TextOverlay(game, 'these tangerine fairies,', game.width * 3 + game.width / 2)
    this.text4 = new TextOverlay(game, 'will turn you to dust.', game.width * 4 + game.width / 2)

    this.fixDensity();
  }

  fixDensity() {
    this.grass.scale.setTo(this.densityFactor, this.densityFactor);
    this.block.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text1.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text2.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text3.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text4.scale.setTo(this.densityFactor, this.densityFactor);
    // this.titleText.scale.setTo(this.densityFactor, this.densityFactor);
  }

  update() {
    let distanceFromEnd = this.levelWidth - this.player.sprite.x;

    if (!this.firePlaying && distanceFromEnd < this.game.width) {
      this.firePlaying = true;
      this.fireSound.fadeIn(7000, true);
    } else if (this.firePlaying && distanceFromEnd > this.game.width) {
      this.firePlaying = false;
      this.fireSound.fadeOut(3000);
    }

    if (distanceFromEnd < 500 && !this.sizzlePlaying) {
      this.sizzle.play();
      this.player.disableControls();
      this.sizzlePlaying = true;
      let levelEnd = new LevelEnd(this.game, this.levelWidth);
      levelEnd.fadeOut('Level2');
    }

    // this.titleText.update(this.player.sprite.x)

    this.text1.update(this.player.sprite.x)
    this.text2.update(this.player.sprite.x)
    this.text3.update(this.player.sprite.x)
    this.text4.update(this.player.sprite.x)
    this.game.physics.arcade.collide(this.player.sprite, this.grass);
    this.game.physics.arcade.collide(this.player.sprite, this.block);
    this.game.physics.arcade.collide(this.grass, this.block);

    this.player.update();
    this.background.update({x: this.player.sprite.x});
  }

}

export default Level1;
