import Weather from './Weather';
import DayCycle from './DayCycle';

class Background {
 
  constructor(game, levelWidth) {
    this.game = game;

    this.dayCycle = new DayCycle(this.game, 1000 * 60 * 1);

    // Set the games background colour
    this.game.stage.backgroundColor = '#000';


    this.fog1 = this.game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'fog1'
    );

    this.fog2 = this.game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'fog2'
    );


    this.sunSprite = this.game.add.sprite(this.game.width / 4, -500, 'sun');
    this.moonSprite = this.game.add.sprite(this.game.width - (this.game.width / 4), this.game.height + 500, 'moon');

    this.sunSprite.anchor.setTo(0.5, 0.5);
    this.moonSprite.anchor.setTo(0.5, 0.5);

    this.stars = this.game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'stars'
    );


    this.mountainsBack = this.game.add.tileSprite(0,
      this.game.height - this.game.cache.getImage('mountains-back').height,
      levelWidth,
      this.game.cache.getImage('mountains-back').height,
      'mountains-back'
    );


    this.mountainsMid1 = this.game.add.tileSprite(0,
      this.game.height - this.game.cache.getImage('mountains-mid1').height,
      levelWidth,
      this.game.cache.getImage('mountains-mid1').height,
      'mountains-mid1'
    );

    this.fog3 = this.game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'fog3'
    );

    // this.backgroundBackgroundSprite = this.game.add.tileSprite(0,
    //   0,
    //   levelWidth,
    //   this.game.height,
    //   'backgroundSprite'
    // );

  
    this.mountainsMid2 = this.game.add.tileSprite(0,
      this.game.height - this.game.cache.getImage('mountains-mid2').height,
      levelWidth,
      this.game.cache.getImage('mountains-mid2').height,
      'mountains-mid2' 
    ); 

    this.fog4 = this.game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'fog4'
    );

    this.backgroundSprite = this.game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'backgroundSprite'
    );

    // this.backgroundSprite.inputEnabled = true;
    // this.backgroundSprite.events.onInputDown.add(() => this.jumpFunc());
    // this.backgroundSprite.events.onInputUp.add(() => this.stopItemRight());

    this.fog1.alpha = 0.3; 
    this.fog2.alpha = 0.1; 
    this.fog3.alpha = 0.1; 
    this.fog4.alpha = 0.1; 

    let backgroundSprites = [
      // {sprite: this.backgroundBackgroundSprite},
      {sprite: this.backgroundSprite, less: true},
      {sprite: this.stars, stars: true},
    ];

    this.weather = new Weather(this.game);
    this.weather.addRain();

    this.dayCycle.initShading(backgroundSprites);
    this.dayCycle.initSun(this.sunSprite);
    this.dayCycle.initMoon(this.moonSprite);
  }

  update(position) {
    this.mountainsBack.tilePosition.x = position.x * -0.1;
    this.mountainsMid1.tilePosition.x = position.x * 2;
    this.mountainsMid2.tilePosition.x = position.x * 4; 

    // this.mountainsBack.alpha = 0;
    // this.mountainsMid1.alpha = 0;
    // this.mountainsMid2.alpha = 0; 

    this.fog1.tilePosition.x += 1; 
    this.fog2.tilePosition.x -= 5;
    this.fog3.tilePosition.x += 8; 
    this.fog4.tilePosition.x -= 4;
  }

 
}
 
export default Background;