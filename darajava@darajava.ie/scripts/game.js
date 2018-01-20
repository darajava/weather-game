(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _statesBoot = require('states/Boot');

var _statesBoot2 = _interopRequireDefault(_statesBoot);

var _statesPreload = require('states/Preload');

var _statesPreload2 = _interopRequireDefault(_statesPreload);

var _statesGameTitle = require('states/GameTitle');

var _statesGameTitle2 = _interopRequireDefault(_statesGameTitle);

var _statesMain = require('states/Main');

var _statesMain2 = _interopRequireDefault(_statesMain);

var _statesGameOver = require('states/GameOver');

var _statesGameOver2 = _interopRequireDefault(_statesGameOver);

var Game = (function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		_get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

		this.state.add('Boot', _statesBoot2['default'], false);
		this.state.add('Preload', _statesPreload2['default'], false);
		this.state.add('GameTitle', _statesGameTitle2['default'], false);
		this.state.add('Main', _statesMain2['default'], false);
		this.state.add('GameOver', _statesGameOver2['default'], false);

		this.state.start('Boot');
	}

	return Game;
})(Phaser.Game);

new Game();

},{"states/Boot":4,"states/GameOver":5,"states/GameTitle":6,"states/Main":7,"states/Preload":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayCycle = (function () {
  function DayCycle(game, dayLength) {
    _classCallCheck(this, DayCycle);

    this.game = game;
    this.dayLength = dayLength;
    this.shading = false;
    this.sunSprite = false;
    this.moonSprite = false;
  }

  _createClass(DayCycle, [{
    key: "initSun",
    value: function initSun(sprite) {
      this.sunSprite = sprite;
      this.sunset(sprite);
    }
  }, {
    key: "initMoon",
    value: function initMoon(sprite) {
      this.moonSprite = sprite;
      this.moonrise(sprite);
    }
  }, {
    key: "initShading",
    value: function initShading(sprites) {
      this.shading = sprites;
    }
  }, {
    key: "sunrise",
    value: function sunrise(sprite) {
      var _this = this;

      sprite.position.x = this.game.width - this.game.width / 4;

      this.sunTween = this.game.add.tween(sprite).to({ y: -550 }, this.dayLength, null, true);
      this.sunTween.onComplete.add(this.sunset, this);

      if (this.shading) {
        this.shading.forEach(function (sprite) {
          _this.tweenTint(sprite, false);
        });
      }
    }
  }, {
    key: "sunset",
    value: function sunset(sprite) {
      var _this2 = this;

      sprite.position.x = 50;

      this.sunTween = this.game.add.tween(sprite).to({ y: this.game.world.height }, this.dayLength, null, true);
      this.sunTween.onComplete.add(this.sunrise, this);

      if (this.shading) {
        this.shading.forEach(function (sprite) {
          _this2.tweenTint(sprite, true);
        });
      }
    }
  }, {
    key: "moonrise",
    value: function moonrise(sprite) {
      sprite.position.x = this.game.width - this.game.width / 4;

      this.moonTween = this.game.add.tween(sprite).to({ y: -450 }, this.dayLength, null, true);
      this.moonTween.onComplete.add(this.moonset, this);
    }
  }, {
    key: "moonset",
    value: function moonset(sprite) {

      sprite.position.x = 50;

      this.moonTween = this.game.add.tween(sprite).to({ y: this.game.world.height }, this.dayLength, null, true);
      this.moonTween.onComplete.add(this.moonrise, this);
    }
  }, {
    key: "tweenTint",
    value: function tweenTint(spriteToTween, darker) {
      var maxAlpha = 1.5;

      var colorBlend = { alpha: darker ? 0 : 1 / maxAlpha };

      this.game.add.tween(colorBlend).to({ alpha: darker ? 1 / maxAlpha : 0 }, this.dayLength, darker ? Phaser.Easing.Quadratic.In : Phaser.Easing.Quadratic.Out, false).onUpdateCallback(function () {
        if (spriteToTween.less !== true) spriteToTween.sprite.alpha = colorBlend.alpha / maxAlpha;else spriteToTween.sprite.alpha = colorBlend.alpha / maxAlpha / 2;

        if (spriteToTween.stars) {
          if (darker) {
            spriteToTween.sprite.alpha = colorBlend.alpha;
          } else {
            spriteToTween.sprite.alpha = colorBlend.alpha;
          }
        }
      }).start();
    }
  }]);

  return DayCycle;
})();

exports["default"] = DayCycle;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Weather = (function () {
  function Weather(game) {
    _classCallCheck(this, Weather);

    this.game = game;

    this.rain = game.add.audio('rain');
    this.thunder = game.add.audio('thunder');
  }

  _createClass(Weather, [{
    key: 'addRain',
    value: function addRain() {
      this.rain.loop = true;
      this.rain.volume = 0.7;
      this.rain.play();
      this.thunder.volume = 0.2;
      this.thunder.play();

      var rainParticle = this.game.add.bitmapData(15, 50);

      rainParticle.ctx.rect(0, 0, 15, 1000);
      rainParticle.ctx.fillStyle = '#7d7d7d';
      rainParticle.ctx.fill();

      this.emitter = this.game.add.emitter(this.game.world.centerX, -100, 400);

      this.emitter.width = this.game.world.width;
      this.emitter.angle = 4;

      this.emitter.makeParticles(rainParticle);

      this.emitter.minParticleScale = 0.1;
      this.emitter.maxParticleScale = 0.3;

      this.emitter.setYSpeed(1200, 2000);
      this.emitter.setXSpeed(0, 5);

      this.emitter.minRotation = 0;
      this.emitter.maxRotation = 1;

      this.emitter.start(false, 1600, 5, 0);

      var rainParticle2 = this.game.add.bitmapData(15, 50);

      rainParticle2.ctx.rect(0, 0, 15, 1000);
      rainParticle2.ctx.fillStyle = '#bbb';
      rainParticle2.ctx.fill();

      this.emitter2 = this.game.add.emitter(this.game.world.centerX, -100, 400);

      this.emitter2.width = this.game.world.width;
      this.emitter2.angle = 4;

      this.emitter2.makeParticles(rainParticle2);

      this.emitter2.minParticleScale = 0.1;
      this.emitter2.maxParticleScale = 0.3;

      this.emitter2.setYSpeed(1200, 2000);
      this.emitter2.setXSpeed(0, 5);

      this.emitter2.minRotation = 0;
      this.emitter2.maxRotation = 1;

      this.emitter2.start(false, 1600, 5, 0);
    }
  }, {
    key: 'removeRain',
    value: function removeRain() {
      this.emitter.kill();
    }
  }]);

  return Weather;
})();

exports['default'] = Weather;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boot = (function (_Phaser$State) {
	_inherits(Boot, _Phaser$State);

	function Boot() {
		_classCallCheck(this, Boot);

		_get(Object.getPrototypeOf(Boot.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Boot, [{
		key: "preload",
		value: function preload() {}
	}, {
		key: "create",
		value: function create() {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.state.start("Preload");
		}
	}]);

	return Boot;
})(Phaser.State);

exports["default"] = Boot;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameOver = (function (_Phaser$State) {
	_inherits(GameOver, _Phaser$State);

	function GameOver() {
		_classCallCheck(this, GameOver);

		_get(Object.getPrototypeOf(GameOver.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(GameOver, [{
		key: "create",
		value: function create() {}
	}, {
		key: "restartGame",
		value: function restartGame() {
			this.game.state.start("Main");
		}
	}]);

	return GameOver;
})(Phaser.State);

exports["default"] = GameOver;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameTitle = (function (_Phaser$State) {
	_inherits(GameTitle, _Phaser$State);

	function GameTitle() {
		_classCallCheck(this, GameTitle);

		_get(Object.getPrototypeOf(GameTitle.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(GameTitle, [{
		key: "create",
		value: function create() {}
	}, {
		key: "startGame",
		value: function startGame() {
			this.game.state.start("Main");
		}
	}]);

	return GameTitle;
})(Phaser.State);

exports["default"] = GameTitle;
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsDayCycle = require('objects/DayCycle');

var _objectsDayCycle2 = _interopRequireDefault(_objectsDayCycle);

var _objectsWeather = require('objects/Weather');

var _objectsWeather2 = _interopRequireDefault(_objectsWeather);

var Main = (function (_Phaser$State) {
  _inherits(Main, _Phaser$State);

  function Main() {
    _classCallCheck(this, Main);

    _get(Object.getPrototypeOf(Main.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Main, [{
    key: 'create',
    value: function create() {
      this.dayCycle = new _objectsDayCycle2['default'](this.game, 1000 * 60 * 1);

      //Enable Arcade Physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // //Set the games background colour
      this.game.stage.backgroundColor = '#DDD';

      this.fog1 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'fog1');

      this.fog2 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'fog2');

      this.backgroundBackgroundBackgroundSprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'backgroundSprite');

      this.sunSprite = this.game.add.sprite(50, -250, 'sun');
      this.moonSprite = this.game.add.sprite(this.game.width - this.game.width / 4, this.game.height + 500, 'moon');

      this.mountainsBack = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-back').height, this.game.width, this.game.cache.getImage('mountains-back').height, 'mountains-back');

      this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid1').height, this.game.width, this.game.cache.getImage('mountains-mid1').height, 'mountains-mid1');

      this.fog3 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'fog3');

      this.backgroundBackgroundSprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'backgroundSprite');

      this.stars = this.game.add.tileSprite(0, 0, this.game.width, this.game.cache.getImage('stars').height, 'stars');

      this.mountainsMid2 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid2').height, this.game.width, this.game.cache.getImage('mountains-mid2').height, 'mountains-mid2');

      this.fog4 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'fog4');

      this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');

      this.game.physics.enable(this.player);

      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.backgroundSprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'backgroundSprite');

      this.fog1.alpha = 0.3;
      this.fog2.alpha = 0.1;
      this.fog3.alpha = 0.1;
      this.fog4.alpha = 0.1;
      // this.frames = 0;

      var backgroundSprites = [{ sprite: this.backgroundBackgroundBackgroundSprite }, { sprite: this.backgroundBackgroundSprite }, { sprite: this.backgroundSprite, less: true }, { sprite: this.stars, stars: true }];

      this.weather = new _objectsWeather2['default'](this.game);
      this.weather.addRain();

      this.dayCycle.initShading(backgroundSprites);
      this.dayCycle.initSun(this.sunSprite);
      this.dayCycle.initMoon(this.moonSprite);
    }
  }, {
    key: 'update',
    value: function update() {

      this.player.body.velocity = 0;

      if (this.cursors.left.isDown) {
        this.player.x -= 5;
      } else if (this.cursors.right.isDown) {
        this.player.x += 5;
      }

      this.mountainsBack.tilePosition.x -= 0.9;
      this.mountainsMid1.tilePosition.x -= 2;
      this.mountainsMid2.tilePosition.x -= 5;

      // this.mountainsBack.alpha = 0;
      // this.mountainsMid1.alpha = 0;
      // this.mountainsMid2.alpha = 0;

      this.fog1.tilePosition.x += 0.2;
      this.fog2.tilePosition.x -= 0.5;
      this.fog3.tilePosition.x += 0.8;
      this.fog4.tilePosition.x -= 1;
    }
  }]);

  return Main;
})(Phaser.State);

exports['default'] = Main;
module.exports = exports['default'];

},{"objects/DayCycle":2,"objects/Weather":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preload = (function (_Phaser$State) {
  _inherits(Preload, _Phaser$State);

  function Preload() {
    _classCallCheck(this, Preload);

    _get(Object.getPrototypeOf(Preload.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Preload, [{
    key: 'preload',
    value: function preload() {
      /* Preload required assets */
      this.game.load.path = '/';
      //this.game.load.image('myImage', 'assets/my-image.png');
      //this.game.load.audio('myAudio', 'assets/my-audio.wav');
      //this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
      this.game.load.image('backgroundSprite', 'assets/background.png');
      this.game.load.image('mountains-back', 'assets/mountains-back.png');
      this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
      this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');
      this.game.load.image('stars', 'assets/stars.png');
      this.game.load.image('fog1', 'assets/fog1.png');
      this.game.load.image('fog2', 'assets/fog2.png');
      this.game.load.image('fog3', 'assets/fog3.png');
      this.game.load.image('fog4', 'assets/fog4.png');

      this.game.load.image('sun', 'assets/sun.png');
      this.game.load.image('moon', 'assets/moon.png');

      this.game.load.image('player', 'assets/player.png');

      this.game.load.audio('thunder', 'assets/thunder.mp3');
      this.game.load.audio('rain', 'assets/rain.ogg');
    }
  }, {
    key: 'create',
    value: function create() {
      //NOTE: Change to GameTitle if required
      this.game.state.start("Main");
    }
  }]);

  return Preload;
})(Phaser.State);

exports['default'] = Preload;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=game.js.map
