class Controls {
 
  constructor(game) {
    this.game = game;

    this.controlSprites = game.add.group();

    this.outputs = {
      left: false,
      right: false,
      jump: false,
      weather: false,
    }

    this.left = this.game.add.tileSprite(0,
      0,
      this.game.width / 3,
      this.game.height,
      'left'
    );

    this.right = this.game.add.tileSprite(2 * this.game.width / 3,
      0,
      this.game.width / 3,
      this.game.height,
      'right'
    );

    this.jump1 = this.game.add.tileSprite(0,
      0,
      this.game.width / 3,
      this.game.height / 3,
      'left'
    );

    this.jump2 = this.game.add.tileSprite(2 * this.game.width / 3,
      0,
      this.game.width / 3,
      this.game.height / 3,
      'jump'
    );

    this.weather = this.game.add.tileSprite(this.game.width / 3,
      0,
      this.game.width / 3,
      this.game.height / 4,
      'weather'
    );

    this.left.inputEnabled = true;
    this.right.inputEnabled = true;
    this.jump1.inputEnabled = true;
    this.jump2.inputEnabled = true;
    this.weather.inputEnabled = true;

    this.controlSprites.add(this.left);
    this.controlSprites.add(this.right);
    this.controlSprites.add(this.jump1);
    this.controlSprites.add(this.jump2);
    this.controlSprites.add(this.weather);
    this.controlSprites.fixedToCamera = true;
    this.controlSprites.alpha = 0;

    this.left.events.onInputDown.add(() => this.turnOn(['left']));
    this.right.events.onInputDown.add(() => this.turnOn(['right']));

    this.jump1v
    this.jump2.events.onInputOver.add(() => this.turnOn(['jump', 'right']));

    this.jump1.events.onInputDown.add(() => this.turnOn(['jump']));
    this.jump2.events.onInputDown.add(() => this.turnOn(['jump']));

    this.jump1.events.onInputUp.dispatch(this.jump1, this.game.input.activePointer, false);
    // this.jump2.events.onInputUp.dispatch(this.jump2, this.game.input.activePointer, false);
    console.log('hellodara');

    this.weather.events.onInputDown.add(() => this.turnOn(['weather']));

    this.left.events.onInputUp.add(() => this.turnOff(['jump', 'left']));
    this.right.events.onInputUp.add(() => this.turnOff(['jump', 'right']));

    this.jump1.events.onInputUp.add(() => this.turnOff(['jump', 'left']));
    this.jump2.events.onInputUp.add(() => this.turnOff(['jump', 'right']));
    this.jump1.events.onInputOut.add(() => this.turnOff(['jump']));
    this.jump2.events.onInputOut.add(() => this.turnOff(['jump']));

    console.log(this.jump1);
  }

  setPlayerSprite(player) {
    this.player = player;
  }

  turnOn(key) {
    if(key[0] === 'jump') console.log('jumpon');
    for (let i = 0; i < key.length; i++) {
      this.outputs[key[i]] = true;
    }
      console.log('setting ' + key + ' to trueee');
  }
 
  turnOff(key) {
    if(key[0] === 'jump') {
      this.jump1.events.onInputOver.removeAll();
      this.jump2.events.onInputOver.removeAll();
      this.jump1.events.onInputOver.add(() => this.turnOn(['jump', 'left']));
      this.jump2.events.onInputOver.add(() => this.turnOn(['jump', 'right']));

      this.jump1.events.onInputOut.removeAll();
      this.jump2.events.onInputOut.removeAll();
      this.jump1.events.onInputOut.add(() => this.turnOff(['jump']));
      this.jump2.events.onInputOut.add(() => this.turnOff(['jump']));
    }

    for (let i = 0; i < key.length; i++) {
      this.outputs[key[i]] = false;
    }
      console.log('setting ' + key + ' to false');
  }

  getOutputs() {
    return this.outputs;
  }
 
}
 
export default Controls;