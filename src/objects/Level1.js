import Fire from './Fire';
import TextOverlay from './TextOverlay';

class Level1 {

  constructor(game, player, levelWidth){
    this.game = game;
    this.player = player;
    console.log('jdjdj')
    this.levelWidth = levelWidth;
    
    this.fireSound = game.add.audio('fire');
    this.fireSound.loop = true;

    this.sizzle = game.add.audio('sizzle');
    this.sizzle.volume = 0.17;
    this.sizzle.loop = false;

    this.grass = game.add.tileSprite(0,
      game.height - game.cache.getImage('grass').height,
      levelWidth,
      game.cache.getImage('grass').height,
      'grass'
    );
    game.physics.enable(this.grass);
    // this.grass.body.moves = false;
    this.grass.body.collideWorldBounds = true;
    this.grass.body.setSize(this.grass.width, this.grass.height - 20, 0, 20);

    this.block = game.add.sprite(game.width / 2,
      game.height - this.grass.body.height - game.cache.getImage('grass').height + 20,
      'block'
    );

    game.physics.enable(this.block);
    this.block.body.moves = false;
    this.block.body.immovable = true;
    // this.block.body.setSize(this.block.width, this.block.height - 20, 0, 20);
    
    this.fire = new Fire(game, levelWidth - 500, game.height - 20);

    game.world.bringToTop(this.grass);

    this.titleText = new TextOverlay(game, 'Fog', 150, true)

    this.text1 = new TextOverlay(game, 'It\'s quite a bit scary,', game.width + game.width / 2)
    this.text2 = new TextOverlay(game, 'but go in you must,', game.width * 2 + game.width / 2)
    this.text3 = new TextOverlay(game, 'little tangerine fairies,', game.width * 3 + game.width / 2)
    this.text4 = new TextOverlay(game, 'will turn you to dust.', game.width * 4 + game.width / 2)
  }

  update() {
    let distanceFromEnd = this.levelWidth - this.player.getPlayerSprite().x;

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
    }

    this.titleText.update(this.player.getPlayerSprite().x)

    this.text1.update(this.player.getPlayerSprite().x)
    this.text2.update(this.player.getPlayerSprite().x)
    this.text3.update(this.player.getPlayerSprite().x)
    this.text4.update(this.player.getPlayerSprite().x)
    this.game.physics.arcade.collide(this.player.getPlayerSprite(), this.grass);
    this.game.physics.arcade.collide(this.player.getPlayerSprite(), this.block);
    this.game.physics.arcade.collide(this.grass, this.block);
  }

  kill() {

  }

}

export default Level1;