var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            var _this = this;
            this.game.load.onLoadStart.add(function () { }, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(function () {
                this.loadingBar.visible = false;
                this.loadingPerc.visible = false;
                this.startBtn.visible = true;
                healtwenty.setUpGame(this.game);
                healtwenty.setScore(0);
                this.game.input.onDown.addOnce(function () {
                    healtwenty.goState("Intro", this.game);
                    healtwenty.toggleFullScreen();
                }, this);
            }, this);
            //start button
            //--------------------------
            this.startBtn = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('startBtn'));
            this.startBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.startBtn.addChild(_spriteText);
            this.startBtn.visible = false;
            // this.loadingContainer.addChild(this.startBtn);
            //Loading container
            //--------------------------
            this.loadingBar = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('loadingBar'));
            this.loadingBar.anchor.setTo(0.5);
            this.loadingPerc = this.game.add.text(0, 0, '0%', { wordWrap: true, wordWrapWidth: this.loadingBar.width, fill: '#ffffff', stroke: '#0096ff', strokeThickness: 5 });
            this.loadingPerc.anchor.set(0.5);
            this.loadingBar.addChild(this.loadingPerc);
            this.game.load.setPreloadSprite(this.loadingBar);
            //Assets Load
            //--------------------------	
            // IMAGES		
            for (var i = 0; i < gameData.assets.images.length; i++) {
                this.game.load.image(gameData.assets.images[i].name, gameData.assets.images[i].path);
            }
            //profiles
            gameData.assets.profiles.forEach(function (element) {
                _this.game.load.image(element.name + element.surname, element.picture);
            });
            // SPRITESHEETS		
            for (var i = 0; i < gameData.assets.spritesheets.length; i++) {
                this.game.load.spritesheet(gameData.assets.spritesheets[i].name, gameData.assets.spritesheets[i].path, gameData.assets.spritesheets[i].width, gameData.assets.spritesheets[i].height, gameData.assets.spritesheets[i].frames);
            }
            //bitmap fonts
            for (var i = 0; i < gameData.assets.bitmapfont.length; i++) {
                this.game.load.bitmapFont(gameData.assets.bitmapfont[i].name, gameData.assets.bitmapfont[i].imgpath, gameData.assets.bitmapfont[i].xmlpath);
            }
            // SOUNDS
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                this.game.load.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].paths);
            }
            this.game.load.script('webfont', 'js/libs/webfonts.js');
        };
        Preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) { this.loadingPerc.text = progress + "%"; };
        return Preloader;
    }(Phaser.State));
    healtwenty.Preloader = Preloader;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            var bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('loadingBar', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('startBtn', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('button', bmd);
            bmd = this.game.add.bitmapData(1024, 768);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 768);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('layer', bmd);
            bmd = this.game.add.bitmapData(40, 300);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 40, 300);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('timer', bmd);
            bmd = this.game.add.bitmapData(1024, 768);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 768);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('fade', bmd);
            bmd = this.game.add.bitmapData(74, 74);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 74, 74);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('levelTile', bmd);
            bmd = this.game.add.bitmapData(600, 600);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 600, 600);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('levelPanel', bmd);
        };
        Boot.prototype.create = function () {
            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
                healtwenty.setDevice(true);
            }
            else {
                healtwenty.setDevice(false);
            }
            this.game.stage.backgroundColor = '#000000';
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.smoothed = false;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    healtwenty.Boot = Boot;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            return _super.call(this) || this;
        }
        Menu.prototype.create = function () {
            var _style;
            this.game.world.setBounds(0, 0, 1024, 768);
            this.bgVel1 = 10;
            this.bgVel2 = 0.25;
            this.sky = this.game.add.tileSprite(0, 0, 1024, 768, "sky");
            this.cloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.cloud1.fixedToCamera = true;
            this.cloud1.tilePosition.x = 0;
            this.cloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.cloud2.fixedToCamera = true;
            this.cloud2.tilePosition.x = 0;
            this.logo = this.game.add.image(this.game.world.centerX + 200, 150, "bttf-logo");
            this.logo.anchor.set(.5);
            this.logo.alpha = 0;
            this.game.add.tween(this.logo).to({ alpha: 1, x: this.game.world.centerX }, 1000, Phaser.Easing.Cubic.Out, true, 500);
            _style = { font: 'normal 45px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
            this.gameSubTitle = this.game.add.text(this.game.world.centerX, 285, "20 Years Edition", _style);
            this.gameSubTitle.anchor.set(.5);
            this.gameSubTitle.alpha = 0;
            this.gameSubTitle.font = 'Press Start 2P';
            this.game.add.tween(this.gameSubTitle).to({ alpha: 1 }, 2000, Phaser.Easing.Cubic.Out, true, 1200);
            this.rocks = this.game.add.tileSprite(0, 0, 1024, 768, "rocks");
            this.ground = this.game.add.tileSprite(0, 0, 1024, 768, "ground");
            this.groupFlames2 = this.game.add.group();
            this.groupFlames = this.game.add.group();
            this.groupDelorean = this.game.add.group();
            this.buttonsGroup = this.game.add.group();
            this.how2playGroup = this.game.add.group();
            this.fade = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("fade"));
            this.game.add.tween(this.fade).to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.Out, true, 0);
            //btn Blue
            /*
            this.btnBlue = this.game.add.sprite(200, this.game.world.centerY, "btnBlue");
            this.btnBlue.anchor.setTo(0.5);
            this.btnBlue.alpha = 0;
            _style = { font: 'normal 17px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'HOW2PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnBlue.addChild(_spriteText);
            this.btnBlue.inputEnabled = true;
            this.btnBlue.events.onInputDown.add(function () {


                this.game.add.tween(this.btnBlue.scale).to({ x:.9,y:.9}, 50, Phaser.Easing.Cubic.Out,true, 0, 0, true );

                playSound(gameSound.button);
                this.howTo.open();
            }, this);
            this.game.add.tween(this.btnBlue).to({ alpha: 1, x: 250 }, 1000, Phaser.Easing.Cubic.Out, true, 0);
*/
            //btn Green
            this.btnGreen = this.game.add.sprite(500, this.game.world.centerY, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'START', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {
                healtwenty.playSound(healtwenty.gameSound.button);
                this.play();
            }, this);
            this.game.add.tween(this.btnGreen.scale).to({ x: 1.5, y: 1.5 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            //btn Red
            /*
            this.btnRed = this.game.add.sprite(800, this.game.world.centerY, "btnRed");
            this.btnRed.anchor.setTo(0.5);
            this.btnRed.alpha = 0;
            _style = { font: 'normal 13px', fill: '#ffffff', stroke: '#9f1912', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'HALLOFFAME', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnRed.addChild(_spriteText);
            this.btnRed.inputEnabled = true;
            this.btnRed.events.onInputDown.add(function () {

                
                playSound(gameSound.button);
                this.game.add.tween(this.btnRed.scale).to({ x:.9,y:.9}, 50, Phaser.Easing.Cubic.Out,true, 0, 0, true );

                //this.openCredits();
            }, this);

            this.game.add.tween(this.btnRed).to({ alpha: 1, x: 750 }, 1000, Phaser.Easing.Cubic.Out, true, 0);
*/
            // this.buttonsGroup.add(this.btnBlue);
            // this.buttonsGroup.add(this.btnRed);
            this.buttonsGroup.add(this.btnGreen);
            //how2play screen start
            //------------------------------------------
            this.howTo = new healtwenty.introHowto(this.game);
            this.how2playGroup.add(this.howTo);
            this.how2playGroup.inputEnableChildren = false;
            this.delorean = new healtwenty.introDelorean(this.game);
            this.groupDelorean.add(this.delorean);
            healtwenty.playSound(healtwenty.gameSound.menu);
            //fadeInSound(gameSound.menu,0);
            healtwenty.setSoundVolume(healtwenty.gameSound.menu, 0.1);
        };
        Menu.prototype.update = function () {
            this.ground.tilePosition.x -= this.bgVel1;
            this.rocks.tilePosition.x -= this.bgVel2;
            this.cloud1.tilePosition.x -= 0.1;
            this.cloud2.tilePosition.x -= 0.3;
        };
        Menu.prototype.fadeOut = function () {
            var _this = this;
            var _tween = this.game.add.tween(this.fade).to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 0);
            _tween.onComplete.add(function () {
                healtwenty.stopSound(healtwenty.gameSound.menu);
                healtwenty.goState("GameGem", _this.game);
            });
        };
        Menu.prototype.tweenScroll = function (_state, _start, _end, _time) {
            var backValue = { back1: 10, back2: 0.25 };
            if (_start != null)
                backValue = _start;
            var backEnd = { back1: 0, back2: 0 };
            if (_end != null)
                backEnd = _end;
            var backTween = this.game.add.tween(backValue).to(backEnd, _time, Phaser.Easing.Quadratic.Out);
            backTween.onUpdateCallback(function () {
                _state.bgVel1 = backValue.back1;
                _state.bgVel2 = backValue.back2;
            });
            backTween.start();
        };
        Menu.prototype.render = function () {
            //this.game.debug.bodyInfo(this.delorean, 32, 132);
            //this.game.debug.body( this.delorean)
        };
        Menu.prototype.play = function () {
            var _this = this;
            this.buttonsGroup.inputEnableChildren = false;
            this.tweenScroll(this, { back1: 10, back2: 0.25 }, { back1: 0, back2: 0 }, 300);
            var _tween = this.game.add.tween(this.buttonsGroup).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true, 0, 0, false);
            _tween.onComplete.add(function () {
                _this.delorean.playAnimation();
            }, this);
        };
        return Menu;
    }(Phaser.State));
    healtwenty.Menu = Menu;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            var _this = _super.call(this) || this;
            _this._gameOverText = ["G", "A", "M", "E", " ", "O", "V", "E", "R"];
            _this._gameOverFired = [
                "\"Sei LICENZIATO!\"",
                "\"You are FIRED!\"",
                "\"I'm waiting for\n a detaild report...YESTERDAY!\""
            ];
            return _this;
        }
        GameOver.prototype.create = function () {
            var _this = this;
            healtwenty.playSound(healtwenty.gameSound.gameover);
            this.game.world.setBounds(0, 0, 1024, 768);
            var bg = this.game.add.image(0, 0, "gameoverBg");
            this.cloud11 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.cloud11.fixedToCamera = true;
            this.cloud11.tilePosition.x = 0;
            this.cloud22 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.cloud22.fixedToCamera = true;
            this.cloud22.tilePosition.x = 0;
            var bgdel = this.game.add.image(0, 0, "deloreanBg");
            var _roblegs = this.game.add.image(100, 750, "roblegs");
            _roblegs.anchor.set(0, 1);
            var _roblarm = this.game.add.image(216, 460, "roblarm");
            _roblarm.anchor.set(0);
            this.game.add.tween(_roblarm).to({ y: 465 }, 1000, Phaser.Easing.Quadratic.InOut, true, 200, -1, true);
            var _robchest = this.game.add.image(180, 500, "robchest");
            _robchest.anchor.set(.5);
            this.game.add.tween(_robchest).to({ y: 505 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            var _robrarm = this.game.add.image(170, 460, "robrarm");
            _robrarm.anchor.set(1, 0);
            this.game.add.tween(_robrarm).to({ y: 465 }, 1000, Phaser.Easing.Quadratic.InOut, true, 200, -1, true);
            var _robhead = this.game.add.image(180, 425, "robhead");
            _robhead.anchor.set(0.5);
            this.game.add.tween(_robhead).to({ y: 430 }, 1000, Phaser.Easing.Quadratic.InOut, true, 100, -1, true);
            var _style = { font: 'normal 70px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
            var _letter;
            this._gameOverText.forEach(function (element, index) {
                if (element != "") {
                    _letter = _this.game.add.text((70 * index) + 230, 60, element, _style);
                    _letter.font = 'Press Start 2P';
                    _letter.anchor.set(0.5);
                    _letter.alpha = 0;
                    _this.game.add.tween(_letter).to({ alpha: 1 }, 1000, Phaser.Easing.Default, true, 100 * index, 0, false);
                    _this.game.add.tween(_letter).to({ y: 100 }, 1000, Phaser.Easing.Quadratic.InOut, true, 100 * index, -1, true);
                }
            });
            //btn Green
            this.btnGreen = this.game.add.sprite(this.game.world.centerX, 250, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            this.btnGreen.scale.set(1.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {
                var _this = this;
                //stopSound(gameSound.gameover);
                this.game.add.tween(this.btnGreen.scale).to({ x: 1.4, y: 1.4 }, 50, Phaser.Easing.Cubic.Out, true, 0, 0, true);
                healtwenty.stopSound(healtwenty.gameSound.gameover);
                healtwenty.playSound(healtwenty.gameSound.button);
                this.game.time.events.add(100, function () { healtwenty.goState("GameGem", _this.game); }, this);
            }, this);
            var _style = { font: 'normal 70px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
            //btn Blue
            this.btnBlue = this.game.add.sprite(900, 660, "btnBlue");
            this.btnBlue.anchor.setTo(0.5);
            _style = { font: 'normal 13px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'HALLOFFAME', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnBlue.addChild(_spriteText);
            this.btnBlue.inputEnabled = true;
            this.btnBlue.events.onInputDown.add(function () {
                this.game.add.tween(this.btnBlue.scale).to({ x: .9, y: .9 }, 50, Phaser.Easing.Cubic.Out, true, 0, 0, true);
                healtwenty.playSound(healtwenty.gameSound.button);
                this.game.time.events.add(100, function () {
                    window.open("/halloffame.html", "_blank");
                }, this);
                // getLoginStatus();
            }, this);
            //btn Red
            this.btnRed = this.game.add.sprite(900, 720, "btnRed");
            this.btnRed.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#851600', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'HOME', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnRed.addChild(_spriteText);
            this.btnRed.inputEnabled = true;
            this.btnRed.events.onInputDown.add(function () {
                var _this = this;
                //stopSound(gameSound.gameover);
                this.game.add.tween(this.btnRed.scale).to({ x: .9, y: .9 }, 50, Phaser.Easing.Cubic.Out, true, 0, 0, true);
                healtwenty.stopSound(healtwenty.gameSound.gameover);
                healtwenty.playSound(healtwenty.gameSound.button);
                this.game.time.events.add(100, function () { healtwenty.goState("Menu", _this.game); }, this);
            }, this);
            _style = { font: 'normal 40px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 8 };
            var _gameOverSpeech = this.game.add.text(this.game.world.centerX, 200, 'You score ' + healtwenty.getScore() + ' points!\n', _style);
            _gameOverSpeech.font = 'Press Start 2P';
            _gameOverSpeech.anchor.set(0.5);
            _style = { font: 'normal 20px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            var _gameOverSpeech2 = this.game.add.text(240, 430, this._gameOverFired[this.game.rnd.integerInRange(0, this._gameOverFired.length - 1)], _style);
            _gameOverSpeech2.font = 'Press Start 2P';
            _gameOverSpeech2.anchor.set(0);
            healtwenty.saveScore();
        };
        GameOver.prototype.update = function () {
            this.cloud11.tilePosition.x -= 0.1;
            this.cloud22.tilePosition.x -= 0.3;
        };
        return GameOver;
    }(Phaser.State));
    healtwenty.GameOver = GameOver;
})(healtwenty || (healtwenty = {}));
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/GameOver.ts"/>
var healtwenty;
(function (healtwenty) {
    var _newGame;
    var _playerScore = 0;
    var _firstTime = true;
    var _level = 2;
    var _game;
    var _gameSetup = false;
    var _gameSounds = [];
    var _ismobile = true;
    var _player;
    function setFirstTime(_val) { _firstTime = _val; }
    healtwenty.setFirstTime = setFirstTime;
    function getFirstTime() { return _firstTime; }
    healtwenty.getFirstTime = getFirstTime;
    function getScore() { return _playerScore; }
    healtwenty.getScore = getScore;
    function setScore(val) { _playerScore = val; }
    healtwenty.setScore = setScore;
    function setGame(game) { _game = game; }
    healtwenty.setGame = setGame;
    function getGame() { return _game; }
    healtwenty.getGame = getGame;
    function setPlayer(player) { _player = player; }
    healtwenty.setPlayer = setPlayer;
    function getPlayer() { return _player; }
    healtwenty.getPlayer = getPlayer;
    function getSound(_sound) {
        return _gameSounds[_sound];
    }
    healtwenty.getSound = getSound;
    function playSound(_sound) {
        _gameSounds[_sound].play();
    }
    healtwenty.playSound = playSound;
    function stopSound(_sound) {
        _gameSounds[_sound].stop();
    }
    healtwenty.stopSound = stopSound;
    function fadeOutSound(_sound, _time) {
        _gameSounds[_sound].fadeOut(_time);
    }
    healtwenty.fadeOutSound = fadeOutSound;
    function fadeInSound(_sound, _time) {
        _gameSounds[_sound].fadeIn(_time);
    }
    healtwenty.fadeInSound = fadeInSound;
    function pauseSound(_sound) {
        _gameSounds[_sound].stop();
    }
    healtwenty.pauseSound = pauseSound;
    function setSoundVolume(_sound, _volume) {
        _gameSounds[_sound].volume = _volume;
    }
    healtwenty.setSoundVolume = setSoundVolume;
    var gameSound;
    (function (gameSound) {
        gameSound[gameSound["intro"] = 0] = "intro";
        gameSound[gameSound["menu"] = 1] = "menu";
        gameSound[gameSound["gameover"] = 2] = "gameover";
        gameSound[gameSound["ingame"] = 3] = "ingame";
        gameSound[gameSound["thunder"] = 4] = "thunder";
        gameSound[gameSound["squealing"] = 5] = "squealing";
        gameSound[gameSound["fall"] = 6] = "fall";
        gameSound[gameSound["error"] = 7] = "error";
        gameSound[gameSound["levelchange"] = 8] = "levelchange";
        gameSound[gameSound["button"] = 9] = "button";
        gameSound[gameSound["verygood"] = 10] = "verygood";
        gameSound[gameSound["thatsgreat"] = 11] = "thatsgreat";
        gameSound[gameSound["wow"] = 12] = "wow";
        gameSound[gameSound["excellent"] = 13] = "excellent";
        gameSound[gameSound["fantastic"] = 14] = "fantastic";
        gameSound[gameSound["amazing"] = 15] = "amazing";
    })(gameSound = healtwenty.gameSound || (healtwenty.gameSound = {}));
    function setUpGame(_game) {
        if (!_gameSetup) {
            //console.log("gameSetup");
            setGame(_game);
            var _sound;
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                _sound = _game.add.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].volume, gameData.assets.sounds[i].loop);
                _sound.allowMultiple = true;
                _gameSounds.push(_sound);
            }
            _gameSetup = true;
        }
    }
    healtwenty.setUpGame = setUpGame;
    function isMobile() {
        return _ismobile;
    }
    healtwenty.isMobile = isMobile;
    function setDevice(isMobile) {
        _ismobile = isMobile;
    }
    healtwenty.setDevice = setDevice;
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
    healtwenty.getUrlParameter = getUrlParameter;
    ;
    function goState(_state, _game) {
        var st = _game.plugins.add(Phaser.Plugin.StateTransition);
        st.configure({
            duration: 500,
            ease: Phaser.Easing.Exponential.InOut,
            properties: { alpha: 0 }
        });
        st.to(_state);
        /*
    if (isMobile()) {

        st.configure({
            duration: 1000,
            ease: Phaser.Easing.Exponential.InOut,
            properties: { alpha: 0 }
        });

    } else {
        st.configure({
            duration: 1000,
            ease: Phaser.Easing.Exponential.InOut,
            properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
        });

    }


   */
    }
    healtwenty.goState = goState;
    function toggleFullScreen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            }
            else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            }
            else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
        else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
    healtwenty.toggleFullScreen = toggleFullScreen;
    function saveScore() {
        var _playerObj = getPlayer();
        //{agency: "@HealthTouch", surname: "Gioia", role: "Associate Designer", name: "Simona", picture: "assets/images/profiles/80_simona.jpg"}
        $.ajax({
            url: "http://www.zero89.it/api/jsonp/scores/core.aspx",
            data: { who: "save", game: "20years", name: JSON.stringify(_playerObj), callback: "gamescores", score: healtwenty.getScore() },
            dataType: "jsonp",
            type: "POST",
            jsonpCallback: "gamescores",
            context: document.body
        }).done(function (data) { }).fail(function (err) { console.log(err); });
    }
    healtwenty.saveScore = saveScore;
    var initGame = (function () {
        function initGame(width, height) {
            var dpr = 1;
            try {
                if (devicePixelRatio != undefined) {
                    dpr = devicePixelRatio || 1;
                    if (!width) {
                        width = screen.width * dpr;
                    }
                    if (!height) {
                        height = screen.height * dpr;
                    }
                }
            }
            catch (err) { }
            this.game = new Phaser.Game(width, height, Phaser.CANVAS, "", null, false, true);
            this.game.state.add("Boot", healtwenty.Boot, false);
            this.game.state.add("Preloader", healtwenty.Preloader, false);
            this.game.state.add("Intro", healtwenty.Intro, false);
            this.game.state.add("Menu", healtwenty.Menu, false);
            this.game.state.add("GameGem", healtwenty.GameGem, false);
            this.game.state.add("Gameover", healtwenty.GameOver, false);
            this.game.state.start("Boot");
        }
        return initGame;
    }());
    healtwenty.initGame = initGame;
    window.onresize = function () { };
    window.onload = function () { _newGame = new initGame(1024, 768); };
})(healtwenty || (healtwenty = {}));
// when the page has finished loading, create our game
var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }
};
var gameData = {
    assets: {
        spritesheets: [
            { name: "tiles", path: "assets/images/game/ingame/tiles2.png", width: 80, height: 80, frames: 6 },
            { name: "flux", path: "assets/images/game/ingame/flux2.png", width: 160, height: 190, frames: 3 },
            { name: "dots", path: "assets/images/game/intro/dots.png", width: 33, height: 62, frames: 2 },
            { name: "dots2", path: "assets/images/game/intro/dots2.png", width: 33, height: 62, frames: 2 },
            { name: "flame", path: "assets/images/game/intro/flame.png", width: 68, height: 82, frames: 10 },
            { name: "roberto", path: "assets/images/game/intro/roberto.png", width: 111, height: 99, frames: 2 },
            { name: "tileLevel", path: "assets/images/game/ingame/tileLevel.png", width: 75, height: 75, frames: 3 },
            { name: "electro", path: "assets/images/game/ingame/electro.png", width: 235, height: 640, frames: 10 }
        ],
        images: [
            { name: "bgGame", path: "assets/images/game/ingame/bg.png" },
            { name: "energyLayer1", path: "assets/images/game/ingame/energy-layer1.png" },
            { name: "energyLayer2", path: "assets/images/game/ingame/energy-layer2.png" },
            { name: "gameoverBg", path: "assets/images/game/gameover/gameoverBg.png" },
            { name: "btnBlue", path: "assets/images/game/btn-blue.png" },
            { name: "btnRed", path: "assets/images/game/btn-red.png" },
            { name: "btnPurple", path: "assets/images/game/btn-purple.png" },
            { name: "btnGreen", path: "assets/images/game/btn-green.png" },
            { name: "introPast", path: "assets/images/game/intro/past.jpg" },
            { name: "introNow", path: "assets/images/game/intro/now.jpg" },
            { name: "celebrating", path: "assets/images/game/intro/celebrating.png" },
            { name: "sky", path: "assets/images/game/intro/sky.png" },
            { name: "rocks", path: "assets/images/game/intro/rocks.png" },
            { name: "ground", path: "assets/images/game/intro/ground.png" },
            { name: "deloreanSide", path: "assets/images/game/intro/delorean-side.png" },
            { name: "deloreanWheelF", path: "assets/images/game/intro/delorean-wheel-ff.png" },
            { name: "deloreanWheelB", path: "assets/images/game/intro/delorean-wheel-f.png" },
            { name: "speed", path: "assets/images/game/ingame/speed.png" },
            { name: "cloud1", path: "assets/images/game/intro/cloud1.png" },
            { name: "cloud2", path: "assets/images/game/intro/cloud2.png" },
            { name: "bttf-logo", path: "assets/images/game/intro/bttf-logo.png" },
            { name: "howtoplay", path: "assets/images/game/intro/howtoplay.jpg" },
            { name: "levelsBg", path: "assets/images/game/ingame/levelsBg.png" },
            { name: "people", path: "assets/images/game/ingame/people.png" },
            { name: "btnx", path: "assets/images/game/btnx.png" },
            { name: "deloreanBg", path: "assets/images/game/gameover/deloreanBg.png" },
            { name: "roblegs", path: "assets/images/game/gameover/rob-legs.png" },
            { name: "robchest", path: "assets/images/game/gameover/rob-chest.png" },
            { name: "robhead", path: "assets/images/game/gameover/rob-head.png" },
            { name: "roblarm", path: "assets/images/game/gameover/rob-l-arm.png" },
            { name: "robrarm", path: "assets/images/game/gameover/rob-r-arm.png" }
        ],
        sounds: [
            { name: "intro", paths: ["assets/sounds/intro1.ogg", "assets/sounds/intro1.m4a"], volume: 3, loop: false },
            { name: "menu", paths: ["assets/sounds/main.ogg", "assets/sounds/main.m4a"], volume: .1, loop: true },
            { name: "gameover", paths: ["assets/sounds/gameover.ogg", "assets/sounds/gameover.m4a"], volume: .2, loop: true },
            { name: "ingame", paths: ["assets/sounds/ingame.ogg", "assets/sounds/ingame.m4a"], volume: .2, loop: true },
            { name: "thunder", paths: ["assets/sounds/thunder.ogg", "assets/sounds/thunder.m4a"], volume: .2, loop: false },
            { name: "squealing", paths: ["assets/sounds/squealing.ogg", "assets/sounds/squealing.m4a"], volume: .2, loop: false },
            { name: "fall", paths: ["assets/sounds/fall.ogg", "assets/sounds/fall.m4a"], volume: .5, loop: false },
            { name: "error", paths: ["assets/sounds/error.ogg", "assets/sounds/error.m4a"], volume: .3, loop: false },
            { name: "levelchange", paths: ["assets/sounds/levelchange.ogg", "assets/sounds/levelchange.m4a"], volume: .2, loop: false },
            { name: "button", paths: ["assets/sounds/button.ogg", "assets/sounds/button.m4a"], volume: .5, loop: false },
        ],
        bitmapfont: [
            { name: "digital", imgpath: "assets/fonts/digital_0.png", xmlpath: "assets/fonts/digital.xml", jsonpath: "" }
        ],
        profiles: [
            {
                agency: "@HealthwareInternational", surname: "Bove", role: "Senior Acoount Manager",
                name: "Annadina",
                picture: "assets/images/profiles/1_annadina.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Quattrucci", role: "Project Manager",
                name: "Valentina",
                picture: "assets/images/profiles/37_valentina.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Esposito", role: "Senior Developer",
                name: "Gianluca",
                picture: "assets/images/profiles/75_gianluca.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Urso", role: "Marketing & External Relations assistant",
                name: "Giovanna",
                picture: "assets/images/profiles/76_giovanna.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Pannella", role: "Marketing & External Relations",
                name: "Antonietta",
                picture: "assets/images/profiles/2_antonietta.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Marinelli", role: "System Administrator",
                name: "Carlo",
                picture: "assets/images/profiles/3_carlo.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Ambrosio", role: "Account executive",
                name: "Liana",
                picture: "assets/images/profiles/4_liana.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Palladino", role: "Delivery Director",
                name: "Rosy",
                picture: "assets/images/profiles/5_rosy.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Pirofalo", role: "Experience Director",
                name: "Elena",
                picture: "assets/images/profiles/6_elena.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Amelia", role: "Group Account Director",
                name: "Michela",
                picture: "assets/images/profiles/7_michela.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Anfuso", role: "Senior Developer",
                name: "Gianni",
                picture: "assets/images/profiles/8_gianni.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "De Luca", role: "Content Strategist",
                name: "Melania",
                picture: "assets/images/profiles/9_melania.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Labruna", role: "Media Strategy Director",
                name: "Tiziana",
                picture: "assets/images/profiles/10_tiziana.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Marafioti", role: "Business Development Manager",
                name: "Joe",
                picture: "assets/images/profiles/11_joe.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Roberto", role: "Technical Architect",
                name: "Luca",
                picture: "assets/images/profiles/12_luca.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Mari", role: "Senior Technical Architect",
                name: "Lino",
                picture: "assets/images/profiles/13_lino.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Scala", role: "Strategy Director",
                name: "Ferdinando",
                picture: "assets/images/profiles/14_ferdinando.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Pantalena", role: "IT&IS Manager",
                name: "Daniele",
                picture: "assets/images/profiles/15_daniele.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Casella", role: "Senior Developer",
                name: "Daniela",
                picture: "assets/images/profiles/16_daniela.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Fortini", role: "Content Manager",
                name: "Flaviana",
                picture: "assets/images/profiles/17_flaviana.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Ferrara", role: "Office Manager",
                name: "Barbara",
                picture: "assets/images/profiles/18_barbara.jpg"
            },
            {
                agency: "PM.it", surname: "Sommino", role: "Associate Designer",
                name: "Francesca",
                picture: "assets/images/profiles/74_francesca.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Fortini", role: "Managing Director",
                name: "Fulvio",
                picture: "assets/images/profiles/19_fulvio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Wenzel", role: "Content Manager",
                name: "Annegret",
                picture: "assets/images/profiles/20_annegret.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Villani", role: "Technical Architect",
                name: "Ivana",
                picture: "assets/images/profiles/21_ivana.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Spacagna", role: "Senior Technical Architect",
                name: "Fabio",
                picture: "assets/images/profiles/22_fabio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Santoro", role: "Senior Project Manager",
                name: "Valter",
                picture: "assets/images/profiles/23_valter.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Pozzi", role: "Account Coordinator",
                name: "Rebecca",
                picture: "assets/images/profiles/70_rebecca.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Gioia", role: "Associate Designer",
                name: "Simona",
                picture: "assets/images/profiles/80_simona.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Trezza", role: "Senior Developer",
                name: "Pietro",
                picture: "assets/images/profiles/24_pietro.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Pisapia", role: "Finance Controller",
                name: "Sara",
                picture: "assets/images/profiles/25_sara.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Spera", role: "Senior Developer",
                name: "Gianni",
                picture: "assets/images/profiles/26_gianni.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Catalano", role: "Managing Partner",
                name: "Salvatore",
                picture: "assets/images/profiles/67_salvatore.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Paraggio", role: "Art Director",
                name: "Andrea",
                picture: "assets/images/profiles/27_andrea.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "De Simone", role: "Senior Art Director",
                name: "Alfredo",
                picture: "assets/images/profiles/28_alfredo.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Corti", role: "Junior Copywriter",
                name: "Chiara",
                picture: "assets/images/profiles/66_chiara.jpg"
            },
            {
                agency: "@Paginemediche", surname: "Iagulli", role: "Technology Operations",
                name: "Pierpaolo",
                picture: "assets/images/profiles/29_pierpaolo.jpg"
            },
            {
                agency: "@Esense ventures", surname: "Bilotta", role: "Operations & Portfolio Manager",
                name: "Graziella",
                picture: "assets/images/profiles/30_graziella.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Vento", role: "Account Coordinator",
                name: "Giulia",
                picture: "assets/images/profiles/31_giulia.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Bakhareva", role: "Account Coordinator",
                name: "Alexandra",
                picture: "assets/images/profiles/71_alexandra.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Palermo", role: "Developer",
                name: "Giorgio",
                picture: "assets/images/profiles/68_giorgio.jpg"
            },
            {
                agency: "@Videum", surname: "Scarpinati", role: "Project & Content Manager",
                name: "Sara",
                picture: "assets/images/profiles/33_sara.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Meo", role: "Designer",
                name: "Vincenzo",
                picture: "assets/images/profiles/34_vincenzo.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Finelli", role: "Creative Technologist",
                name: "Erminio",
                picture: "assets/images/profiles/35_erminio.jpg"
            },
            {
                agency: "@Paginemediche", surname: "Arminante", role: "Marketing & Communications PM.it",
                name: "Antonella",
                picture: "assets/images/profiles/36_antonella.jpg"
            },
            {
                agency: "@Esense ventures", surname: "Vinci", role: "President eSense",
                name: "Leo",
                picture: "assets/images/profiles/38_leo.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Raimondo", role: "Presenation Layer Architect",
                name: "Francesco",
                picture: "assets/images/profiles/39_francesco.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Arminante", role: "",
                name: "Floriana",
                picture: "assets/images/profiles/72_floriana.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Ascione", role: "CEO",
                name: "Roberto",
                picture: "assets/images/profiles/40_roberto.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Sabatino", role: "Senior Account Manager ",
                name: "Gabriele",
                picture: "assets/images/profiles/41_gabriele.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Gualdi", role: "Office Manager",
                name: "Francesca",
                picture: "assets/images/profiles/42_francesca.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Miconi", role: "Account Manager",
                name: "Roberta",
                picture: "assets/images/profiles/44_roberta.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Nardone", role: "Account Manager",
                name: "Manuela",
                picture: "assets/images/profiles/45_manuela.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Fortini", role: "Senior Project Manager",
                name: "Fabrizio",
                picture: "assets/images/profiles/46_fabrizio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Raimondo", role: "Financial Operations Manager",
                name: "Anna",
                picture: "assets/images/profiles/47_anna.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Amore", role: "Presentation Layer Developer",
                name: "Nicola",
                picture: "assets/images/profiles/48_nicola.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Petraglia", role: "Associate Experience Director",
                name: "Gianfranco",
                picture: "assets/images/profiles/49_gianfranco.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Amelia", role: "Group Account Director",
                name: "Alessandra",
                picture: "assets/images/profiles/50_alessandra.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Romano", role: "Senior Developer",
                name: "Vincenzo",
                picture: "assets/images/profiles/51_vincenzo.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Carroccio", role: "Associate Art Director",
                name: "Antonio",
                picture: "assets/images/profiles/52_antonio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Muccioli", role: "Technical Architect",
                name: "Davide",
                picture: "assets/images/profiles/53_davide.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Peluso", role: "Content & Social Media Strategy",
                name: "Marina",
                picture: "assets/images/profiles/73_marina.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Memoli", role: "Presentation Layer Developer",
                name: "Christian",
                picture: "assets/images/profiles/55_christian.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Collina", role: "Content Strategist",
                name: "Roberta",
                picture: "assets/images/profiles/57_roberta.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Ravot", role: "Scientific Director",
                name: "Elisabetta",
                picture: "assets/images/profiles/58_elisabetta.jpg"
            },
            {
                agency: "@intouchsolutions", surname: "Robbiani", role: "Finance Controller",
                name: "Luisa",
                picture: "assets/images/profiles/82_luisa.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Ascienzo", role: "Senior Art Director",
                name: "Dennis",
                picture: "assets/images/profiles/81_dennis.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Scali", role: "Co-Founder @ Reckon Digital LTd",
                name: "Gabriel",
                picture: "assets/images/profiles/77_gabriel.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Zecchina", role: "Senior Medical Writer ",
                name: "Marica",
                picture: "assets/images/profiles/59_marica.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Fulgheri", role: "Strategy Director",
                name: "Alessandro",
                picture: "assets/images/profiles/60_alessandro.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Tovo", role: "Account Manager",
                name: "Monica",
                picture: "assets/images/profiles/62_monica.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Pattini", role: "Client Service Director",
                name: "Patrizia",
                picture: "assets/images/profiles/64_patrizia.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Alexandre", role: "Group Account Director",
                name: "Valerie",
                picture: "assets/images/profiles/65_valerie.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Vettori", role: "Client Service Director",
                name: "Fabrizio",
                picture: "assets/images/profiles/69_fabrizio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Natali", role: "Co-Founder @ Reckon Digital LTd",
                name: "Fabio",
                picture: "assets/images/profiles/78_fabio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Chillè", role: "General Partner",
                name: "Gerry",
                picture: "assets/images/profiles/79_gerry.jpg"
            },
            {
                agency: "@intouchsolutions", surname: "Capretti", role: "Medical Writer",
                name: "Valentina",
                picture: "assets/images/profiles/54_valentina.jpg"
            }
        ]
    }
};
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var dragDirection;
    (function (dragDirection) {
        dragDirection[dragDirection["NO_DRAG"] = 0] = "NO_DRAG";
        dragDirection[dragDirection["HORIZONTAL_DRAG"] = 1] = "HORIZONTAL_DRAG";
        dragDirection[dragDirection["VERTICAL_DRAG"] = 2] = "VERTICAL_DRAG";
    })(dragDirection = healtwenty.dragDirection || (healtwenty.dragDirection = {}));
    var gameGlobalState;
    (function (gameGlobalState) {
        gameGlobalState[gameGlobalState["GAME_STATE_IDLE"] = 0] = "GAME_STATE_IDLE";
        gameGlobalState[gameGlobalState["GAME_STATE_DRAG"] = 1] = "GAME_STATE_DRAG";
        gameGlobalState[gameGlobalState["GAME_STATE_STOP"] = 2] = "GAME_STATE_STOP";
    })(gameGlobalState = healtwenty.gameGlobalState || (healtwenty.gameGlobalState = {}));
    var gameDeck = (function (_super) {
        __extends(gameDeck, _super);
        function gameDeck(game) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.gameOptions = {
                gameWidth: 640,
                gameHeight: 640,
                spritesheetSize: 80,
                tileSize: 80,
                fieldSize: 7,
                tileTypes: 6,
                offsetX: 70,
                offsetY: 143,
                tweenSpeed: 50,
                fadeSpeed: 250,
                fallSpeed: 75
            };
            _this.tileArray = [];
            _this.tilePool = [];
            _this.tilesToRemove = [];
            _this.bonusTexts = ["", "Very good!", "That's Great!", "Wow!", "Excellent!", "Fantastic!", "Amazing!"];
            _this.bonusVoice = [null, healtwenty.gameSound.verygood, healtwenty.gameSound.thatsgreat, healtwenty.gameSound.wow, healtwenty.gameSound.excellent, healtwenty.gameSound.fantastic, healtwenty.gameSound.amazing];
            _this.isStarted = false;
            _this.currentState = _this.game.state.getCurrentState();
            _this.globalMatches = 0;
            _this.isDragging = false;
            _this.currentState.groupDeck.x = _this.gameOptions.offsetX;
            _this.currentState.groupDeck.y = _this.gameOptions.offsetY;
            _this.tileMask = _this.game.add.graphics(_this.currentState.groupDeck.x, _this.currentState.groupDeck.y);
            _this.tileMask.beginFill(0xffffff);
            _this.tileMask.drawRect(0, 0, _this.gameOptions.fieldSize * _this.gameOptions.tileSize, _this.gameOptions.fieldSize * _this.gameOptions.tileSize);
            _this.currentState.groupDeck.mask = _this.tileMask;
            _this.tileMask.visible = true;
            for (var i = 0; i < _this.gameOptions.fieldSize; i++) {
                _this.tileArray[i] = [];
                for (var j = 0; j < _this.gameOptions.fieldSize; j++) {
                    _this.addTile(i, j);
                }
            }
            _this.addTempTile();
            _this.game.input.onDown.add(_this.pickTile, _this);
            _this.gameState = gameGlobalState.GAME_STATE_IDLE;
            return _this;
        }
        gameDeck.prototype.start = function () {
            //console.log("start")
            this.isStarted = true;
            this.game.input.onDown.add(this.pickTile, this);
        };
        gameDeck.prototype.stop = function () {
            //console.log("stop")
            this.isStarted = false;
        };
        gameDeck.prototype.update = function () {
            switch (this.gameState) {
                case gameGlobalState.GAME_STATE_DRAG:
                    this.handleDrag();
                    break;
                case gameGlobalState.GAME_STATE_STOP:
                    this.handleStop();
                    break;
            }
            this.gameState = gameGlobalState.GAME_STATE_IDLE;
        };
        gameDeck.prototype.addTile = function (row, col) {
            var theTile = this.game.add.sprite(col * this.gameOptions.tileSize, row * this.gameOptions.tileSize, "tiles");
            theTile.width = this.gameOptions.tileSize;
            theTile.height = this.gameOptions.tileSize;
            do {
                var randomTile = this.game.rnd.integerInRange(0, this.gameOptions.tileTypes - 1);
                this.tileArray[row][col] = {
                    tileSprite: theTile,
                    tileValue: randomTile,
                    isEmpty: false
                };
            } while (this.isMatch(row, col));
            theTile.frame = randomTile;
            this.currentState.groupDeck.add(theTile);
        };
        gameDeck.prototype.isMatch = function (row, col) {
            return this.isHorizontalMatch(row, col) || this.isVerticalMatch(row, col);
        };
        gameDeck.prototype.isHorizontalMatch = function (row, col) {
            return this.tileAt(row, col).tileValue == this.tileAt(row, col - 1).tileValue && this.tileAt(row, col).tileValue == this.tileAt(row, col - 2).tileValue;
        };
        gameDeck.prototype.isVerticalMatch = function (row, col) {
            return this.tileAt(row, col).tileValue == this.tileAt(row - 1, col).tileValue && this.tileAt(row, col).tileValue == this.tileAt(row - 2, col).tileValue;
        };
        gameDeck.prototype.tileAt = function (row, col) {
            if (row < 0 || row >= this.gameOptions.fieldSize || col < 0 || col >= this.gameOptions.fieldSize) {
                return false;
            }
            return this.tileArray[row][col];
        };
        gameDeck.prototype.addTempTile = function () {
            this.tempTile = this.game.add.sprite(0, 0, "tiles");
            this.tempTile.width = this.gameOptions.tileSize;
            this.tempTile.height = this.gameOptions.tileSize;
            this.tempTile.visible = false;
            this.currentState.groupDeck.add(this.tempTile);
        };
        gameDeck.prototype.pickTile = function (e) {
            //console.log("pick")
            if (!this.isStarted)
                return;
            this.movingRow = Math.floor((e.position.y - this.gameOptions.offsetY) / this.gameOptions.tileSize);
            this.movingCol = Math.floor((e.position.x - this.gameOptions.offsetX) / this.gameOptions.tileSize);
            if (this.movingRow >= 0 && this.movingCol >= 0 && this.movingRow < this.gameOptions.fieldSize && this.movingCol < this.gameOptions.fieldSize) {
                this.dragDirection = dragDirection.NO_DRAG;
                this.game.input.onDown.remove(this.pickTile, this);
                this.game.input.onUp.add(this.releaseTile, this);
                this.game.input.addMoveCallback(this.moveTile, this);
            }
        };
        gameDeck.prototype.moveTile = function (e) {
            this.gameState = gameGlobalState.GAME_STATE_DRAG;
            this.distX = e.position.x - e.positionDown.x;
            this.distY = e.position.y - e.positionDown.y;
            if (this.dragDirection == dragDirection.NO_DRAG) {
                var distance = e.position.distance(e.positionDown);
                if (distance > 5) {
                    this.isDragging = true;
                    var dragAngle = Math.abs(Math.atan2(this.distY, this.distX));
                    if ((dragAngle > Math.PI / 4 && dragAngle < 3 * Math.PI / 4)) {
                        this.dragDirection = dragDirection.VERTICAL_DRAG;
                    }
                    else {
                        this.dragDirection = dragDirection.HORIZONTAL_DRAG;
                    }
                }
            }
        };
        gameDeck.prototype.releaseTile = function () {
            if (this.isDragging) {
                this.isDragging = false;
                this.gameState = gameGlobalState.GAME_STATE_STOP;
                this.game.input.onUp.remove(this.releaseTile, this);
                this.game.input.deleteMoveCallback(this.moveTile, this);
            }
        };
        gameDeck.prototype.handleDrag = function () {
            switch (this.dragDirection) {
                case dragDirection.HORIZONTAL_DRAG:
                    //console.log(this.movingRow,this.movingCol);
                    this.tempTile.visible = false;
                    this.tempTile.y = this.movingRow * this.gameOptions.tileSize;
                    var deltaX = (Math.floor(this.distX / this.gameOptions.tileSize) % this.gameOptions.fieldSize);
                    if (deltaX >= 0) {
                        this.tempTile.frame = this.tileArray[this.movingRow][this.gameOptions.fieldSize - 1 - deltaX].tileValue;
                    }
                    else {
                        deltaX = deltaX * -1 - 1;
                        this.tempTile.frame = this.tileArray[this.movingRow][deltaX].tileValue;
                    }
                    for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                        this.tileArray[this.movingRow][i].tileSprite.x = (i * this.gameOptions.tileSize + this.distX) % (this.gameOptions.tileSize * this.gameOptions.fieldSize);
                        if (this.tileArray[this.movingRow][i].tileSprite.x < 0) {
                            this.tileArray[this.movingRow][i].tileSprite.x += this.gameOptions.tileSize * this.gameOptions.fieldSize;
                        }
                    }
                    var tileX = this.distX % this.gameOptions.tileSize;
                    if (tileX > 0) {
                        this.tempTile.x = tileX - this.gameOptions.tileSize;
                        this.tempTile.visible = true;
                    }
                    if (tileX < 0) {
                        this.tempTile.x = tileX;
                        this.tempTile.visible = true;
                    }
                    break;
                case dragDirection.VERTICAL_DRAG:
                    this.tempTile.visible = false;
                    this.tempTile.x = this.movingCol * this.gameOptions.tileSize;
                    var deltaY = (Math.floor(this.distY / this.gameOptions.tileSize) % this.gameOptions.fieldSize);
                    if (deltaY >= 0) {
                        this.tempTile.frame = this.tileArray[this.gameOptions.fieldSize - 1 - deltaY][this.movingCol].tileValue;
                    }
                    else {
                        deltaY = deltaY * -1 - 1;
                        this.tempTile.frame = this.tileArray[deltaY][this.movingCol].tileValue;
                    }
                    for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                        this.tileArray[i][this.movingCol].tileSprite.y = (i * this.gameOptions.tileSize + this.distY) % (this.gameOptions.tileSize * this.gameOptions.fieldSize);
                        if (this.tileArray[i][this.movingCol].tileSprite.y < 0) {
                            this.tileArray[i][this.movingCol].tileSprite.y += this.gameOptions.tileSize * this.gameOptions.fieldSize;
                        }
                    }
                    var tileY = this.distY % this.gameOptions.tileSize;
                    if (tileY > 0) {
                        this.tempTile.y = tileY - this.gameOptions.tileSize;
                        this.tempTile.visible = true;
                    }
                    if (tileY < 0) {
                        this.tempTile.y = tileY;
                        this.tempTile.visible = true;
                    }
                    break;
            }
        };
        gameDeck.prototype.handleStop = function () {
            switch (this.dragDirection) {
                case dragDirection.HORIZONTAL_DRAG:
                    var shiftAmount = Math.floor(this.distX / (this.gameOptions.tileSize / 2));
                    shiftAmount = Math.ceil(shiftAmount / 2) % this.gameOptions.fieldSize;
                    var tempArray = [];
                    if (shiftAmount > 0) {
                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                            tempArray[(shiftAmount + i) % this.gameOptions.fieldSize] = this.tileArray[this.movingRow][i].tileValue;
                        }
                    }
                    else {
                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                            tempArray[i] = this.tileArray[this.movingRow][(Math.abs(shiftAmount) + i) % this.gameOptions.fieldSize].tileValue;
                        }
                    }
                    var offset = this.distX % this.gameOptions.tileSize;
                    if (Math.abs(offset) > this.gameOptions.tileSize / 2) {
                        if (offset < 0) {
                            offset = offset + this.gameOptions.tileSize;
                        }
                        else {
                            offset = offset - this.gameOptions.tileSize;
                        }
                    }
                    for (i = 0; i < this.gameOptions.fieldSize; i++) {
                        this.tileArray[this.movingRow][i].tileValue = tempArray[i];
                        this.tileArray[this.movingRow][i].tileSprite.frame = tempArray[i];
                        this.tileArray[this.movingRow][i].tileSprite.x = i * this.gameOptions.tileSize + offset;
                        this.game.add.tween(this.tileArray[this.movingRow][i].tileSprite).to({
                            x: i * this.gameOptions.tileSize
                        }, this.gameOptions.tweenSpeed, Phaser.Easing.Cubic.Out, true);
                    }
                    var tempDestination = -this.gameOptions.tileSize;
                    if (offset < 0) {
                        this.tempTile.x += this.gameOptions.tileSize * this.gameOptions.fieldSize;
                        tempDestination = this.gameOptions.fieldSize * this.gameOptions.tileSize;
                    }
                    var tween = this.game.add.tween(this.tempTile).to({
                        x: tempDestination
                    }, this.gameOptions.tweenSpeed, Phaser.Easing.Cubic.Out, true);
                    tween.onComplete.add(function () {
                        if (this.matchInBoard()) {
                            this.handleMatches();
                        }
                        else {
                            // console.log(this.movingRow,this.movingCol);
                            this.currentState.electroObj.show(this.movingRow, this.movingCol, dragDirection.HORIZONTAL_DRAG);
                            healtwenty.playSound(healtwenty.gameSound.error);
                            //
                            if (shiftAmount != 0) {
                                shiftAmount *= -1;
                                tempArray = [];
                                if (shiftAmount > 0) {
                                    for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                        tempArray[(shiftAmount + i) % this.gameOptions.fieldSize] = this.tileArray[this.movingRow][i].tileValue;
                                    }
                                }
                                else {
                                    for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                        tempArray[i] = this.tileArray[this.movingRow][(Math.abs(shiftAmount) + i) % this.gameOptions.fieldSize].tileValue;
                                    }
                                }
                                for (i = 0; i < this.gameOptions.fieldSize; i++) {
                                    this.tileArray[this.movingRow][i].tileValue = tempArray[i];
                                    this.tileArray[this.movingRow][i].tileSprite.frame = tempArray[i];
                                    this.tileArray[this.movingRow][i].tileSprite.x = i * this.gameOptions.tileSize;
                                    var tween = this.game.add.tween(this.tileArray[this.movingRow][i].tileSprite).to({
                                        alpha: 0.5
                                    }, this.gameOptions.tweenSpeed / 8, Phaser.Easing.Bounce.Out, true, 0, 8, true);
                                }
                                tween.onComplete.add(function () {
                                    // console.log("man1",tween.manager.getAll().length)
                                    if (tween.manager.getAll().length == 2) {
                                        this.game.input.onDown.add(this.pickTile, this);
                                    }
                                }, this);
                            }
                            else {
                                this.game.input.onDown.add(this.pickTile, this);
                            }
                        }
                    }, this);
                    break;
                case dragDirection.VERTICAL_DRAG:
                    var shiftAmount = Math.floor(this.distY / (this.gameOptions.tileSize / 2));
                    shiftAmount = Math.ceil(shiftAmount / 2) % this.gameOptions.fieldSize;
                    var tempArray = [];
                    if (shiftAmount > 0) {
                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                            tempArray[(shiftAmount + i) % this.gameOptions.fieldSize] = this.tileArray[i][this.movingCol].tileValue;
                        }
                    }
                    else {
                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                            tempArray[i] = this.tileArray[(Math.abs(shiftAmount) + i) % this.gameOptions.fieldSize][this.movingCol].tileValue;
                        }
                    }
                    var offset = this.distY % this.gameOptions.tileSize;
                    if (Math.abs(offset) > this.gameOptions.tileSize / 2) {
                        if (offset < 0) {
                            offset = offset + this.gameOptions.tileSize;
                        }
                        else {
                            offset = offset - this.gameOptions.tileSize;
                        }
                    }
                    for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                        this.tileArray[i][this.movingCol].tileValue = tempArray[i];
                        this.tileArray[i][this.movingCol].tileSprite.frame = tempArray[i];
                        this.tileArray[i][this.movingCol].tileSprite.y = i * this.gameOptions.tileSize + offset;
                        this.game.add.tween(this.tileArray[i][this.movingCol].tileSprite).to({
                            y: i * this.gameOptions.tileSize
                        }, this.gameOptions.tweenSpeed, Phaser.Easing.Cubic.Out, true);
                    }
                    var tempDestination = -this.gameOptions.tileSize;
                    if (offset < 0) {
                        this.tempTile.y += this.gameOptions.tileSize * this.gameOptions.fieldSize;
                        tempDestination = this.gameOptions.fieldSize * this.gameOptions.tileSize;
                    }
                    var tween = this.game.add.tween(this.tempTile).to({
                        y: tempDestination
                    }, this.gameOptions.tweenSpeed, Phaser.Easing.Cubic.Out, true);
                    tween.onComplete.add(function () {
                        if (this.matchInBoard()) {
                            this.handleMatches();
                        }
                        else {
                            // console.log(this.movingRow,this.movingCol);
                            this.currentState.electroObj.show(this.movingRow, this.movingCol, dragDirection.VERTICAL_DRAG);
                            healtwenty.playSound(healtwenty.gameSound.error);
                            if (shiftAmount != 0) {
                                shiftAmount *= -1;
                                tempArray = [];
                                if (shiftAmount > 0) {
                                    for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                        tempArray[(shiftAmount + i) % this.gameOptions.fieldSize] = this.tileArray[i][this.movingCol].tileValue;
                                    }
                                }
                                else {
                                    for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                        tempArray[i] = this.tileArray[(Math.abs(shiftAmount) + i) % this.gameOptions.fieldSize][this.movingCol].tileValue;
                                    }
                                }
                                for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                    this.tileArray[i][this.movingCol].tileValue = tempArray[i];
                                    this.tileArray[i][this.movingCol].tileSprite.frame = tempArray[i];
                                    this.tileArray[i][this.movingCol].tileSprite.y = i * this.gameOptions.tileSize;
                                    var tween = this.game.add.tween(this.tileArray[i][this.movingCol].tileSprite).to({
                                        alpha: 0.5
                                    }, this.gameOptions.tweenSpeed / 8, Phaser.Easing.Bounce.Out, true, 0, 8, true);
                                }
                                tween.onComplete.add(function () {
                                    //console.log("man2",tween.manager.getAll().length)
                                    if (tween.manager.getAll().length == 2) {
                                        this.game.input.onDown.add(this.pickTile, this);
                                    }
                                }, this);
                            }
                            else {
                                this.game.input.onDown.add(this.pickTile, this);
                            }
                        }
                    }, this);
                    break;
            }
            this.dragDirection = dragDirection.NO_DRAG;
        };
        gameDeck.prototype.handleMatches = function () {
            this.tilesToRemove = [];
            for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                this.tilesToRemove[i] = [];
                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                    this.tilesToRemove[i][j] = 0;
                }
            }
            this.handleHorizontalMatches();
            this.handleVerticalMatches();
            this.checkScore();
            for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                    if (this.tilesToRemove[i][j] != 0) {
                        var tween = this.game.add.tween(this.tileArray[i][j].tileSprite).to({
                            alpha: 0
                        }, this.gameOptions.fadeSpeed, Phaser.Easing.Linear.None, true);
                        this.tilePool.push(this.tileArray[i][j].tileSprite);
                        tween.onComplete.add(function (e) {
                            //console.log("man3",tween.manager.getAll().length,tween.manager.getAll())
                            if (tween.manager.getAll().length == 2) {
                                this.fillVerticalHoles();
                                healtwenty.playSound(healtwenty.gameSound.fall);
                            }
                        }, this);
                        this.tileArray[i][j].isEmpty = true;
                    }
                }
            }
        };
        gameDeck.prototype.checkScore = function () {
            var _this = this;
            var score = 0;
            this.tilesToRemove.forEach(function (element) {
                element.forEach(function (element) {
                    if (element == 1) {
                        score++;
                        _this.globalMatches++;
                    }
                });
            });
            //  console.log(score);
            this.currentState.timerObj.addTime(score * 5);
            this.currentState.scoreObj.addScore(score * 5);
            this.currentState.setTilesCollected(this.currentState.getTilesCollected() + score);
        };
        gameDeck.prototype.checkLevel = function () {
            //console.log(this.currentState.getTilesCollected(), this.currentState.getTiles2Collect())
            if (this.currentState.getTilesCollected() >= this.currentState.getTiles2Collect()) {
                this.currentState.nextLevel();
            }
        };
        gameDeck.prototype.handleHorizontalMatches = function () {
            for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                var colorStreak = 1;
                var currentColor = -1;
                var startStreak = 0;
                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                    if (this.tileAt(i, j).tileValue == currentColor) {
                        colorStreak++;
                    }
                    if (this.tileAt(i, j).tileValue != currentColor || j == this.gameOptions.fieldSize - 1) {
                        if (colorStreak > 2) {
                            var endStreak = j - 1;
                            if (this.tileAt(i, j).tileValue == currentColor) {
                                endStreak = j;
                            }
                            for (var k = startStreak; k <= endStreak; k++) {
                                this.tilesToRemove[i][k]++;
                            }
                        }
                        currentColor = this.tileAt(i, j).tileValue;
                        colorStreak = 1;
                        startStreak = j;
                    }
                }
            }
        };
        gameDeck.prototype.handleVerticalMatches = function () {
            for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                var colorStreak = 1;
                var currentColor = -1;
                var startStreak = 0;
                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                    if (this.tileAt(j, i).tileValue == currentColor) {
                        colorStreak++;
                    }
                    if (this.tileAt(j, i).tileValue != currentColor || j == this.gameOptions.fieldSize - 1) {
                        if (colorStreak > 2) {
                            var endStreak = j - 1;
                            if (this.tileAt(j, i).tileValue == currentColor) {
                                endStreak = j;
                            }
                            for (var k = startStreak; k <= endStreak; k++) {
                                this.tilesToRemove[k][i]++;
                            }
                        }
                        currentColor = this.tileAt(j, i).tileValue;
                        colorStreak = 1;
                        startStreak = j;
                    }
                }
            }
        };
        gameDeck.prototype.fillVerticalHoles = function () {
            for (var i = this.gameOptions.fieldSize - 2; i >= 0; i--) {
                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                    if (!this.tileArray[i][j].isEmpty) {
                        var holesBelow = this.countSpacesBelow(i, j);
                        if (holesBelow) {
                            this.moveDownTile(i, j, i + holesBelow, false);
                        }
                    }
                }
            }
            for (i = 0; i < this.gameOptions.fieldSize; i++) {
                var topHoles = this.countSpacesBelow(-1, i);
                for (j = topHoles - 1; j >= 0; j--) {
                    var reusedTile = this.tilePool.shift();
                    reusedTile.y = (j - topHoles) * this.gameOptions.tileSize;
                    reusedTile.x = i * this.gameOptions.tileSize;
                    reusedTile.alpha = 1;
                    var randomTile = this.game.rnd.integerInRange(0, this.gameOptions.tileTypes - 1);
                    reusedTile.frame = randomTile;
                    this.tileArray[j][i] = {
                        tileSprite: reusedTile,
                        tileValue: randomTile,
                        isEmpty: false
                    };
                    this.moveDownTile(0, i, j, true);
                }
            }
        };
        gameDeck.prototype.countSpacesBelow = function (row, col) {
            var result = 0;
            for (var i = row + 1; i < this.gameOptions.fieldSize; i++) {
                if (this.tileArray[i][col].isEmpty) {
                    result++;
                }
            }
            return result;
        };
        gameDeck.prototype.moveDownTile = function (fromRow, fromCol, toRow, justMove) {
            if (!justMove) {
                var spriteSave = this.tileArray[fromRow][fromCol].tileSprite;
                var valueSave = this.tileArray[fromRow][fromCol].tileValue;
                this.tileArray[toRow][fromCol] = {
                    tileSprite: spriteSave,
                    tileValue: valueSave,
                    isEmpty: false
                };
                this.tileArray[fromRow][fromCol].isEmpty = true;
            }
            var distanceToTravel = toRow - this.tileArray[toRow][fromCol].tileSprite.y / this.gameOptions.tileSize;
            var tween = this.game.add.tween(this.tileArray[toRow][fromCol].tileSprite).to({
                y: toRow * this.gameOptions.tileSize
            }, distanceToTravel * this.gameOptions.fallSpeed, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                //console.log("man4",tween.manager.getAll().length)
                if (tween.manager.getAll().length == 2) {
                    //console.log("shake")
                    this.shake();
                    if (this.matchInBoard()) {
                        this.handleMatches();
                    }
                    else {
                        //console.log(this.globalMatches);
                        this.game.input.onDown.add(this.pickTile, this);
                        this.bonusLevel();
                        this.checkLevel();
                        this.globalMatches = 0;
                    }
                }
            }, this);
        };
        gameDeck.prototype.bonusLevel = function () {
            var _val = 0;
            if (this.globalMatches >= 6 && this.globalMatches < 9) {
                _val = 1;
            }
            else if (this.globalMatches > 8 && this.globalMatches < 12) {
                _val = 2;
            }
            else if (this.globalMatches > 11 && this.globalMatches < 16) {
                _val = 3;
            }
            else if (this.globalMatches > 15 && this.globalMatches < 21) {
                _val = 4;
            }
            else if (this.globalMatches > 20 && this.globalMatches < 27) {
                _val = 5;
            }
            else if (this.globalMatches > 26) {
                _val = 6;
            }
            if (_val > 0) {
                // playSound(this.bonusVoice[_val]);
                var _style = { font: 'normal 55px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
                var _bonutText = this.game.add.text(this.game.world.centerX - 150, this.game.world.centerY, this.bonusTexts[_val], _style);
                _bonutText.font = 'Press Start 2P';
                _bonutText.anchor.set(0.5);
                var _tween = this.game.add.tween(_bonutText).to({ y: this.game.world.centerY - 50, alpha: 0 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
                _tween.onComplete.add(function (param) {
                    param.kill();
                    param.destroy();
                }, null, null, [_bonutText]);
            }
        };
        gameDeck.prototype.shake = function () {
            this.game.camera.shake(0.005, 200, true, Phaser.Camera.SHAKE_VERTICAL, true);
        };
        gameDeck.prototype.matchInBoard = function () {
            for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                    if (this.isMatch(i, j)) {
                        return true;
                    }
                }
            }
            return false;
        };
        return gameDeck;
    }(Phaser.Sprite));
    healtwenty.gameDeck = gameDeck;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var gameElectro = (function (_super) {
        __extends(gameElectro, _super);
        function gameElectro(game) {
            var _this = _super.call(this, game, 0, 0, "electro") || this;
            _this.currentState = _this.game.state.getCurrentState();
            _this.anchor.set(.5);
            var anim = _this.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 24, false);
            anim.onComplete.add(_this.stopAnimation, _this);
            _this.alpha = 0;
            _this.currentState.groupBonus.add(_this);
            return _this;
        }
        gameElectro.prototype.show = function (_row, _column, _direction) {
            if (_direction == healtwenty.dragDirection.HORIZONTAL_DRAG) {
                this.showHorizontal(_row);
            }
            else {
                this.showVertical(_column);
            }
        };
        gameElectro.prototype.showHorizontal = function (_position) {
            this.alpha = 1;
            this.angle = 90;
            this.y = (_position * 80) + 70 + 80;
            this.x = 320;
            this.play('anim');
            // this.game.add.tween(this).to({alpha:0},20,Phaser.Easing.Quadratic.InOut,true,300,0,false);
        };
        gameElectro.prototype.showVertical = function (_position) {
            this.alpha = 1;
            this.angle = 0;
            this.x = (_position * 80) + 80;
            this.y = 320 + 120;
            this.play('anim');
        };
        gameElectro.prototype.stopAnimation = function () {
            this.animations.stop();
            this.alpha = 0;
        };
        return gameElectro;
    }(Phaser.Sprite));
    healtwenty.gameElectro = gameElectro;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var gameFlux = (function (_super) {
        __extends(gameFlux, _super);
        function gameFlux(game) {
            var _this = _super.call(this, game, 770, 515, "flux") || this;
            _this.currentState = _this.game.state.getCurrentState();
            _this.animations.add('anim', [0, 1, 2], 12, true);
            _this.currentState.groupTimer.add(_this);
            _this.play('anim');
            return _this;
        }
        return gameFlux;
    }(Phaser.Sprite));
    healtwenty.gameFlux = gameFlux;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var gameLevels = (function (_super) {
        __extends(gameLevels, _super);
        function gameLevels(game) {
            var _this = _super.call(this, game, 8, 0, "levelsBg") || this;
            _this.levelsObj = [
                { velocity: .1, tiles2collect: 20 },
                { velocity: .15, tiles2collect: 25 },
                { velocity: .2, tiles2collect: 30 },
                { velocity: .25, tiles2collect: 35 },
                { velocity: .3, tiles2collect: 40 },
                { velocity: .35, tiles2collect: 45 },
                { velocity: .4, tiles2collect: 50 },
                { velocity: .45, tiles2collect: 55 },
                { velocity: .5, tiles2collect: 60 },
                { velocity: .55, tiles2collect: 65 },
                { velocity: .6, tiles2collect: 70 }
            ];
            _this.currentLevel = 0;
            _this.levelsSprite = [];
            _this.levelsSpriteText = [];
            _this.currentState = _this.game.state.getCurrentState();
            _this.currentLevel = 0;
            _this.currentState.groupTimer.add(_this);
            var _tileLevel;
            var _tileLevelText;
            var _counter = 0;
            var _styleL = { font: 'normal 12px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            var _date = "";
            _this.levelsObj.forEach(function (element, index) {
                _tileLevel = _this.game.add.sprite((82 * index) + 75, 9, "tileLevel");
                _tileLevel.alpha = 0;
                // in case of custom date. to replace with better code in case
                switch (index) {
                    case 0:
                        _date = "1997";
                        break;
                    case 1:
                        _date = "1999";
                        break;
                    case 2:
                        _date = "2001";
                        break;
                    case 3:
                        _date = "2003";
                        break;
                    case 4:
                        _date = "2005";
                        break;
                    case 5:
                        _date = "2007";
                        break;
                    case 6:
                        _date = "2009";
                        break;
                    case 7:
                        _date = "2011";
                        break;
                    case 8:
                        _date = "2013";
                        break;
                    case 9:
                        _date = "2015";
                        break;
                    case 10:
                        _date = "2017";
                        break;
                }
                _tileLevelText = _this.game.add.text(_tileLevel.width / 2, _tileLevel.height / 2, _date, _styleL);
                _tileLevelText.anchor.set(.5);
                _tileLevelText.align = "center";
                _tileLevelText.font = 'Press Start 2P';
                _tileLevel.addChild(_tileLevelText);
                _this.addChild(_tileLevel);
                _this.levelsSprite.push(_tileLevel);
            });
            var _panel = _this.game.add.sprite(52, 124, _this.game.cache.getBitmapData("levelPanel"), 0, _this.currentState.groupLevels);
            _panel.alpha = .75;
            var _style = { font: 'normal 25px', fill: '#000000', stroke: '#ffffff', strokeThickness: 4 };
            _this.message = _this.game.add.text(_this.game.world.centerX - 160, _this.game.world.centerY, "", _style, _this.currentState.groupLevels);
            _this.message.anchor.set(.5);
            _this.message.align = "center";
            _this.message.font = 'Press Start 2P';
            _this.currentState.setTimeVelocity(_this.levelsObj[_this.currentLevel].velocity);
            _this.currentState.setTiles2Collect(_this.levelsObj[_this.currentLevel].tiles2collect);
            _this.currentState.setTilesCollected(0);
            _this.start();
            return _this;
        }
        gameLevels.prototype.showPanel = function () {
            var _this = this;
            this.currentState.deckObj.stop();
            this.currentState.timerObj.stop();
            this.currentState.timerObj.restart();
            this.message.alpha = 0;
            var _tween = this.game.add.tween(this.currentState.groupLevels).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            _tween.onComplete.add(function () { _this.showMessage(); }, this);
        };
        gameLevels.prototype.showMessage = function () {
            var _this = this;
            this.message.y = this.game.world.centerY + 50;
            this.message.text = "GET READY FOR LEVEL " + (this.currentLevel + 1) + "\n\n COLLECT " + this.levelsObj[this.currentLevel].tiles2collect + " TILES \n\n GOOD LUCK!!! :D";
            var _tween = this.game.add.tween(this.message).to({ y: this.game.world.centerY, alpha: 1 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            _tween.onComplete.add(function () { _this.game.time.events.add(4000, function () { _this.hidePanel(); }, _this); }, this);
        };
        gameLevels.prototype.hidePanel = function () {
            var _this = this;
            var _tween = this.game.add.tween(this.currentState.groupLevels).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            _tween.onComplete.add(function () {
                _this.currentState.deckObj.start();
                _this.currentState.timerObj.start();
            }, this);
            this.levelsSprite[this.currentLevel].frame = 1;
            this.levelsSprite[this.currentLevel].alpha = .3;
            this.levelTween = this.game.add.tween(this.levelsSprite[this.currentLevel]).to({ alpha: .9 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
        };
        gameLevels.prototype.start = function () {
            this.showPanel();
        };
        gameLevels.prototype.nextLevel = function () {
            this.levelsSprite[this.currentLevel].frame = 2;
            this.levelsSprite[this.currentLevel].alpha = .5;
            this.game.tweens.remove(this.levelTween);
            this.currentLevel++;
            this.currentState.setTimeVelocity(this.levelsObj[this.currentLevel].velocity);
            this.currentState.setTiles2Collect(this.levelsObj[this.currentLevel].tiles2collect);
            this.currentState.setTilesCollected(0);
            healtwenty.playSound(healtwenty.gameSound.levelchange);
            this.showPanel();
        };
        return gameLevels;
    }(Phaser.Sprite));
    healtwenty.gameLevels = gameLevels;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var gamePlayerSelect = (function (_super) {
        __extends(gamePlayerSelect, _super);
        function gamePlayerSelect(game) {
            var _this = _super.call(this, game, 0, 0, "howtoplay") || this;
            _this.currentState = _this.game.state.getCurrentState();
            _this.currentState.groupPlayers.add(_this);
            _this.profileImage = _this.game.add.sprite(0, 0, "");
            _this.profileImage.anchor.set(.5);
            _this.profileImage.alpha = 0;
            var _style;
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
            _this.profileName = _this.game.add.text(_this.game.world.centerX, _this.game.world.centerY + 40, "", _style);
            _this.profileName.anchor.set(.5);
            _this.profileName.alpha = 1;
            _this.profileName.font = 'Press Start 2P';
            _style = { font: 'normal 25px', fill: '#ff0000', stroke: '#000000', strokeThickness: 8 };
            _this.profileRole = _this.game.add.text(_this.game.world.centerX, _this.game.world.centerY + 85, "", _style);
            _this.profileRole.anchor.set(.5);
            _this.profileRole.alpha = 1;
            _this.profileRole.font = 'Press Start 2P';
            _style = { font: 'normal 25px', fill: '#0096ff', stroke: '#ffffff', strokeThickness: 4 };
            _this.profileAgency = _this.game.add.text(_this.game.world.centerX, _this.game.world.centerY + 160, "", _style);
            _this.profileAgency.anchor.set(.5);
            _this.profileAgency.alpha = 1;
            _this.profileAgency.font = 'Press Start 2P';
            var _layer = _this.game.add.sprite(0, 0, "people");
            _layer.inputEnabled = true;
            //btn Green
            _this.btnGreen = _this.game.add.sprite(_this.game.world.centerX, 695, "btnGreen");
            _this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = _this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            _this.btnGreen.scale.set(1.5);
            _this.btnGreen.addChild(_spriteText);
            _this.btnGreen.inputEnabled = true;
            _this.btnGreen.events.onInputDown.add(function () {
                healtwenty.playSound(healtwenty.gameSound.button);
                this.game.add.tween(this.btnGreen.scale).to({ x: .9, y: .9 }, 50, Phaser.Easing.Cubic.Out, true, 0, 0, true);
                this.hidePlayer();
                this.currentState.play();
            }, _this);
            _this.btnClose = _this.game.add.sprite(915, 80, "btnx");
            _this.btnClose.anchor.setTo(0);
            _this.btnClose.inputEnabled = true;
            _this.btnClose.events.onInputDown.add(function () {
                healtwenty.playSound(healtwenty.gameSound.button);
                this.game.add.tween(this.btnClose.scale).to({ x: .9, y: .9 }, 50, Phaser.Easing.Cubic.Out, true, 0, 0, true);
                this.hidePlayer();
            }, _this);
            _this.currentState.groupProfile.add(_layer);
            _this.currentState.groupProfile.add(_this.profileImage);
            _this.currentState.groupProfile.add(_this.profileName);
            _this.currentState.groupProfile.add(_this.profileRole);
            _this.currentState.groupProfile.add(_this.profileAgency);
            _this.currentState.groupProfile.add(_this.btnGreen);
            _this.currentState.groupProfile.add(_this.btnClose);
            var _x = 0;
            var _y = 0;
            var _xPos = 0;
            var _yPos = 0;
            var _profile;
            gameData.assets.profiles.forEach(function (element, index) {
                _x = index % 11;
                _y = parseInt(index / 11);
                _xPos = (85 * _x) + 85;
                _yPos = (85 * _y) + 130;
                _profile = _this.game.add.sprite(_xPos + (_this.game.rnd.integerInRange(-50, 50)), _yPos + (_this.game.rnd.integerInRange(-50, 50)), element.name + element.surname);
                _profile.scale.set(.4);
                _profile.anchor.set(0.5);
                _profile.z = index;
                _profile.alpha = 0;
                _profile.inputEnabled = true;
                _profile.events.onInputDown.add(function (btn) {
                    this.game.add.tween(btn.scale).to({ x: .3, y: .3 }, 50, Phaser.Easing.Cubic.Out, true, 0, 0, true);
                    healtwenty.playSound(healtwenty.gameSound.button);
                    this.selectPlayer(_profile, element);
                }, _this, null, [_profile]);
                _this.game.add.tween(_profile).to({ alpha: 1, x: _xPos, y: _yPos }, 300, Phaser.Easing.Quadratic.InOut, true, 10 * index, 0, false);
                _this.currentState.groupPlayers.add(_profile);
            });
            _style = { font: 'normal 40px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
            var _health = _this.game.add.text(_this.game.world.centerX, 40, "The Healthwarians", _style);
            _health.anchor.set(.5);
            _health.alpha = 1;
            _health.font = 'Press Start 2P';
            _this.currentState.groupPlayers.add(_health);
            _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
            var _select = _this.game.add.text(_this.game.world.centerX, 730, "Select a Player", _style);
            _select.anchor.set(.5);
            _select.alpha = 1;
            _select.font = 'Press Start 2P';
            _this.currentState.groupPlayers.add(_select);
            return _this;
        }
        gamePlayerSelect.prototype.create = function () { };
        gamePlayerSelect.prototype.update = function () { };
        gamePlayerSelect.prototype.selectPlayer = function (profile, profileObj) {
            console.log(profileObj.name);
            // 
            //this.profileImage = this.game.add.sprite(this.game.world.centerX, -200, profileObj.name + profileObj.surname);
            this.profileImage.loadTexture(profileObj.name + profileObj.surname);
            this.profileImage.x = this.game.world.centerX;
            this.profileImage.scale.set(2);
            this.profileName.text = profileObj.name + " " + profileObj.surname;
            this.profileRole.text = profileObj.role;
            this.profileAgency.text = profileObj.agency;
            healtwenty.setPlayer(profileObj);
            this.showPlayer();
        };
        gamePlayerSelect.prototype.showPlayer = function () {
            this.currentState.groupProfile.x = -1024;
            this.profileImage.y = -200;
            this.game.add.tween(this.currentState.groupProfile).to({ alpha: 1, x: 0, }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.profileImage).to({ alpha: 1, y: this.game.world.centerY - 100, }, 1000, Phaser.Easing.Bounce.Out, true, 500, 0, false);
        };
        gamePlayerSelect.prototype.hidePlayer = function () {
            this.game.add.tween(this.currentState.groupProfile).to({ alpha: 0, x: 1024, }, 500, Phaser.Easing.Quadratic.InOut, true, 100, 0, false);
        };
        return gamePlayerSelect;
    }(Phaser.Sprite));
    healtwenty.gamePlayerSelect = gamePlayerSelect;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var gameScore = (function (_super) {
        __extends(gameScore, _super);
        function gameScore(game) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.signal = new Phaser.Signal();
            _this.time = 10000;
            _this.currentState = _this.game.state.getCurrentState();
            _this.scoreBack = _this.game.add.bitmapText(790, 140, 'digital', '0000', 64);
            _this.scoreBack.tint = 0x015b01;
            _this.addChild(_this.scoreBack);
            _this.score = _this.game.add.bitmapText(790, 140, 'digital', '0000', 64);
            _this.score.tint = 0x00ff00;
            _this.addChild(_this.score);
            _this.currentState.groupTimer.add(_this);
            return _this;
        }
        gameScore.prototype.update = function () { };
        gameScore.prototype.addScore = function (end) {
            var obj = this.score;
            var _zeros = "";
            var _val = 0;
            var scoreValue = { score: 0, end: end, start: this.currentState.score };
            this.currentState.score += end;
            healtwenty.setScore(this.currentState.score);
            var scoreTween = this.game.add.tween(scoreValue).to({ score: scoreValue.end }, 200, Phaser.Easing.Quadratic.Out);
            scoreTween.onUpdateCallback(function () {
                _val = (scoreValue.start + Math.round(scoreValue.score));
                if (_val < 1000) {
                    _zeros = "0";
                }
                if (_val < 100) {
                    _zeros = "00";
                }
                if (_val < 10) {
                    _zeros = "000";
                }
                obj.text = _zeros + _val;
                //console.log(obj.text)
            });
            scoreTween.onComplete.add(function () {
                //console.log("completed",scoreValue.start , scoreValue.end)
                _val = (scoreValue.start + scoreValue.end);
                if (_val < 1000) {
                    _zeros = "0";
                }
                if (_val < 100) {
                    _zeros = "00";
                }
                if (_val < 10) {
                    _zeros = "000";
                }
                //console.log(_zeros + (scoreValue.start + scoreValue.end));
                obj.text = _zeros + (scoreValue.start + scoreValue.end);
            }, this);
            scoreTween.start();
        };
        ;
        return gameScore;
    }(Phaser.Sprite));
    healtwenty.gameScore = gameScore;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var gameTimer = (function (_super) {
        __extends(gameTimer, _super);
        function gameTimer(game) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.signal = new Phaser.Signal();
            _this.time = 10000;
            _this.currentState = _this.game.state.getCurrentState();
            _this.isStarted = false;
            _this.addChild(_this.game.add.sprite(823, 223, 'energyLayer1'));
            _this.timerSprite = _this.game.add.sprite(872, 540, _this.game.cache.getBitmapData('timer'));
            _this.timerSprite.visible = true;
            _this.timerSprite.angle = 180;
            _this.timerSprite.alpha = .9;
            _this.addChild(_this.timerSprite);
            _this.currentState.groupTimer.add(_this);
            _this.addChild(_this.game.add.sprite(823, 223, 'energyLayer2'));
            _this.game.add.sprite(733, 667, 'speed', 0, _this.currentState.groupSpeed);
            _this.speedBg = _this.game.add.bitmapText(750, 677, "digital", "00", 76, _this.currentState.groupSpeed);
            _this.speedBg.tint = 0x422304;
            _this.speed = _this.game.add.bitmapText(750, 677, "digital", "", 76, _this.currentState.groupSpeed);
            _this.speed.tint = 0xfcb13d;
            return _this;
        }
        gameTimer.prototype.start = function () {
            this.isStarted = true;
        };
        gameTimer.prototype.restart = function () {
            this.timerSprite.height = 300;
        };
        gameTimer.prototype.stop = function () {
            this.isStarted = false;
        };
        gameTimer.prototype.update = function () {
            if (this.isStarted) {
                this.timerSprite.height -= this.currentState.getTimeVelocity();
                var _speed = (Math.round((this.timerSprite.height * 88) / 300));
                if (_speed != this.speedVal) {
                    this.speedVal = _speed;
                    if (_speed < 10) {
                        if (_speed < 0)
                            _speed = 0;
                        this.speed.text = "0" + _speed;
                    }
                    else {
                        this.speed.text = "" + _speed;
                    }
                    this.speed.tint = 0xfcb13f;
                }
                else {
                    this.speed.tint = 0xfcb13d;
                }
                if (this.timerSprite.height <= 0) {
                    this.timeEnded();
                }
            }
        };
        gameTimer.prototype.addTime = function (amount) {
            this.timerSprite.height += amount;
            if (this.timerSprite.height > 300)
                this.timerSprite.height = 300;
        };
        gameTimer.prototype.timeEnded = function () {
            this.sendSignal();
            this.stop();
        };
        gameTimer.prototype.sendSignal = function () {
            this.signal.dispatch();
        };
        return gameTimer;
    }(Phaser.Sprite));
    healtwenty.gameTimer = gameTimer;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var introDelorean = (function (_super) {
        __extends(introDelorean, _super);
        function introDelorean(game) {
            var _this = _super.call(this, game, -850, 520, "") || this;
            _this.angle1 = 15;
            _this.angle2 = 15.5;
            _this.anchor.set(.5);
            _this.scale.set(.6);
            _this.game.physics.arcade.enable(_this);
            _this.body.setSize(100, 100, 715, 150);
            _this.currentState = _this.game.state.getCurrentState();
            _this.delorean = _this.game.add.sprite(0, 0, "deloreanSide");
            _this.game.add.tween(_this.delorean).to({ y: -10 }, 100, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            _this.addChild(_this.delorean);
            _this.roberto = _this.game.add.sprite(325, 40, "roberto");
            _this.roberto.animations.add('idle', [0], 0, false);
            _this.roberto.animations.add('electricity', [0, 1], 22, true);
            _this.roberto.play("idle");
            _this.game.add.tween(_this.roberto).to({ y: 30 }, 100, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            _this.addChild(_this.roberto);
            _this.deloreanW2 = new healtwenty.introDeloreanWheel(_this.game, 190, 245, "deloreanWheelB");
            _this.addChild(_this.deloreanW2);
            _this.deloreanW1 = new healtwenty.introDeloreanWheel(_this.game, 660, 245, "deloreanWheelF");
            _this.addChild(_this.deloreanW1);
            var tween = _this.game.add.tween(_this).to({ x: 240 }, 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            return _this;
        }
        introDelorean.prototype.update = function () {
            this.deloreanW1.angle += this.angle1;
            this.deloreanW2.angle += this.angle2;
        };
        introDelorean.prototype.playAnimation = function () {
            this.createLightning(512, 0, this.x + 100, this.y + 100);
            healtwenty.fadeOutSound(healtwenty.gameSound.menu, 500);
            healtwenty.playSound(healtwenty.gameSound.thunder);
            this.game.time.events.add(500, function () { healtwenty.playSound(healtwenty.gameSound.squealing); }, this);
            this.angle1 = 0;
            this.angle2 = 20;
        };
        introDelorean.prototype.run = function () {
            var _this = this;
            var tween = this.game.add.tween(this).to({ x: 1024 }, 500, Phaser.Easing.Quadratic.In, true, 0, 0, false);
            this.angle1 = 15;
            this.angle2 = 15;
            this.game.time.events.add(500, function () { _this.currentState.fadeOut(); }, this);
            for (var i = 0; i < 25; i++) {
                this.currentState.groupFlames2.add(new healtwenty.introFlame(this.game, 400 + (i * 48), 670, 50 * i, i));
            }
            for (var i = 0; i < 25; i++) {
                this.currentState.groupFlames.add(new healtwenty.introFlame(this.game, 400 + (i * 50), 700, 50 * i, i));
            }
            tween.onComplete.add(function () {
            }, this);
        };
        introDelorean.prototype.createLightning = function (startX, startY, endX, endY) {
            var _this = this;
            this.lightningBitmap = this.game.add.bitmapData(200, 1000);
            this.lightning = this.game.add.image(startX, startY, this.lightningBitmap);
            this.lightning.anchor.setTo(0.5, 0);
            // this.lightning.filters = [ this.game.add.filter('Glow') ];
            this.lightning.rotation =
                this.game.math.degToRad(90 - this.game.math.radToDeg(this.game.math.angleBetween(startX, startY, endX, endY))) * -1;
            var distance = this.game.math.distance(startX, startY, endX, endY);
            this.createLightningTexture(this.lightningBitmap, this.lightningBitmap.width / 2, 0, 20, 4, false, distance);
            this.roberto.play("electricity");
            var tween = this.game.add.tween(this.lightning)
                .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 0 }, 100, Phaser.Easing.Bounce.Out)
                .start();
            tween.onComplete.add(function () {
                _this.roberto.play("idle");
                _this.run();
            }, this);
        };
        ;
        introDelorean.prototype.createLightningTexture = function (lightningBitmap, x, y, segments, boltWidth, branch, distance) {
            var ctx = lightningBitmap.context;
            var width = lightningBitmap.width;
            var height = lightningBitmap.height;
            // Our lightning will be made up of several line segments starting at
            // the center of the top edge of the bitmap and ending at the target.
            // Clear the canvas
            if (!branch)
                ctx.clearRect(0, 0, width, height);
            // Draw each of the segments
            for (var i = 0; i < segments; i++) {
                // Set the lightning color and bolt width
                ctx.strokeStyle = 'rgb(255, 255, 0)';
                ctx.lineWidth = boltWidth;
                ctx.beginPath();
                ctx.moveTo(x, y);
                // Calculate an x offset from the end of the last line segment and
                // keep it within the bounds of the bitmap
                if (branch) {
                    // For a branch
                    x += this.game.rnd.integerInRange(-10, 10);
                }
                else {
                    // For the main bolt
                    x += this.game.rnd.integerInRange(-30, 30);
                }
                if (x <= 10)
                    x = 10;
                if (x >= width - 10)
                    x = width - 10;
                // Calculate a y offset from the end of the last line segment.
                // When we've reached the target or there are no more segments left,
                // set the y position to the distance to the target. For branches, we
                // don't care if they reach the target so don't set the last coordinate
                // to the target if it's hanging in the air.
                if (branch) {
                    // For a branch
                    y += this.game.rnd.integerInRange(10, 20);
                }
                else {
                    // For the main bolt
                    y += this.game.rnd.integerInRange(20, distance / segments);
                }
                if ((!branch && i == segments - 1) || y > distance) {
                    // This causes the bolt to always terminate at the center
                    // lightning bolt bounding box at the correct distance to
                    // the target. Because of the way the lightning sprite is
                    // rotated, this causes this point to be exactly where the
                    // player clicked or tapped.
                    y = distance;
                    if (!branch)
                        x = width / 2;
                }
                // Draw the line segment
                ctx.lineTo(x, y);
                ctx.stroke();
                // Quit when we've reached the target
                if (y >= distance)
                    break;
                // Draw a branch 20% of the time off the main bolt only
                if (!branch) {
                    if (this.chanceRoll(20)) {
                        // Draws another, thinner, bolt starting from this position
                        this.createLightningTexture(lightningBitmap, x, y, 20, 1, true, distance);
                    }
                }
            }
            // This just tells the engine it should update the texture cache
            lightningBitmap.dirty = true;
        };
        ;
        introDelorean.prototype.chanceRoll = function (chance) {
            if (chance === undefined) {
                chance = 50;
            }
            return chance > 0 && (Math.random() * 100 <= chance);
        };
        ;
        return introDelorean;
    }(Phaser.Sprite));
    healtwenty.introDelorean = introDelorean;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var introDeloreanWheel = (function (_super) {
        __extends(introDeloreanWheel, _super);
        function introDeloreanWheel(game, x, y, sprite) {
            var _this = _super.call(this, game, x, y, sprite) || this;
            _this.anchor.set(.5);
            return _this;
        }
        return introDeloreanWheel;
    }(Phaser.Sprite));
    healtwenty.introDeloreanWheel = introDeloreanWheel;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var introFlame = (function (_super) {
        __extends(introFlame, _super);
        function introFlame(game, x, y, delay, frame) {
            var _this = _super.call(this, game, x, y, "flame") || this;
            _this.animations.add("flame", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
            _this.play('flame');
            _this.anchor.set(.5, 1);
            _this.alpha = 0;
            _this.animations.currentAnim.setFrame(frame);
            _this.game.add.tween(_this.scale).to({ y: 0, x: 0 }, 2000, null, true, delay, 0, false);
            _this.game.time.events.add(delay, function () { _this.alpha = 1; }, _this);
            return _this;
        }
        introFlame.prototype.update = function () {
        };
        return introFlame;
    }(Phaser.Sprite));
    healtwenty.introFlame = introFlame;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var introHowto = (function (_super) {
        __extends(introHowto, _super);
        function introHowto(game) {
            var _this = _super.call(this, game, 0, 0, "howtoplay") || this;
            _this.currentState = _this.game.state.getCurrentState();
            _this.currentState.how2playGroup.x = -1024;
            _this.inputEnabled = true;
            _this.events.onInputDown.add(function () {
                //stopSound(gameSound.menu);
                this.close();
            }, _this);
            return _this;
        }
        introHowto.prototype.update = function () {
        };
        introHowto.prototype.open = function () {
            console.log("open");
            this.currentState.buttonsGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.currentState.how2playGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () { this.currentState.how2playGroup.ignoreChildInput = false; }, this);
        };
        introHowto.prototype.close = function () {
            /* this.game.time.events.add(300, function () {
                 
                 playSound(gameSound.lightsaber);
              }, this);*/
            this.currentState.how2playGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.currentState.how2playGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () { this.currentState.buttonsGroup.ignoreChildInput = false; }, this);
        };
        return introHowto;
    }(Phaser.Sprite));
    healtwenty.introHowto = introHowto;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var typeText;
    (function (typeText) {
        typeText[typeText["letters"] = 0] = "letters";
        typeText[typeText["numbers"] = 1] = "numbers";
    })(typeText = healtwenty.typeText || (healtwenty.typeText = {}));
    var introLetter = (function (_super) {
        __extends(introLetter, _super);
        function introLetter(game, x, y, endChar, delay, color, color2, backColor, group) {
            var _this = _super.call(this, game, x, y, "digital", "", 110) || this;
            _this.letters = [
                ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            ];
            _this.endChar = endChar;
            _this.charType = typeText.letters;
            _this.color = color;
            _this.color2 = color2;
            _this.charBack = _this.game.add.bitmapText(x, y, 'digital', '0', 110);
            _this.charBack.tint = backColor;
            group.add(_this.charBack);
            group.add(_this);
            _this.tint = color;
            _this.game.time.events.add(delay, _this.start, _this);
            return _this;
        }
        introLetter.prototype.update = function () {
        };
        introLetter.prototype.start = function () {
            var scoreValue = { score: 0, end: 50, game: this.game, val: this, letters: this.letters[this.charType], letter: this.endChar };
            var scoreTween = this.game.add.tween(scoreValue).to({ score: 50 }, 500, Phaser.Easing.Quadratic.Out, false, 0);
            scoreTween.onUpdateCallback(function () {
                if (scoreValue.last != parseInt(scoreValue.score)) {
                    scoreValue.last = parseInt(scoreValue.score);
                    scoreValue.val.text = scoreValue.letters[scoreValue.game.rnd.integerInRange(0, 10)];
                }
            }, this);
            scoreTween.onComplete.add(function () {
                this.text = this.endChar;
                this.tint = this.color2;
            }, this);
            scoreTween.start();
        };
        return introLetter;
    }(Phaser.BitmapText));
    healtwenty.introLetter = introLetter;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var GameGem = (function (_super) {
        __extends(GameGem, _super);
        function GameGem() {
            var _this = _super.call(this) || this;
            _this.tilesCollected = 0;
            _this.tiles2collect = 0;
            _this.timerVelocity = 0;
            return _this;
        }
        GameGem.prototype.preload = function () { };
        GameGem.prototype.create = function () {
            this.game.world.setBounds(0, 0, 1024, 768 + 100);
            this.game.add.image(0, 0, "bgGame");
            this.score = 0;
            this.groupTimer = this.game.add.group();
            this.groupSpeed = this.game.add.group();
            this.groupDeck = this.game.add.group();
            this.groupBonus = this.game.add.group();
            this.groupPlayers = this.game.add.group();
            this.groupProfile = this.game.add.group();
            this.groupLevels = this.game.add.group();
            this.groupLevels.alpha = 0;
            this.groupProfile.x = -1024;
            this.groupProfile.alpha = 0;
            this.groupPlayers.add(new healtwenty.gamePlayerSelect(this.game));
            //this.play();
            healtwenty.playSound(healtwenty.gameSound.ingame);
        };
        GameGem.prototype.timeOver = function () {
            healtwenty.stopSound(healtwenty.gameSound.ingame);
            healtwenty.goState("Gameover", this.game);
        };
        GameGem.prototype.setTimeVelocity = function (velocity) { this.timerVelocity = velocity; };
        GameGem.prototype.getTimeVelocity = function () { return this.timerVelocity; };
        GameGem.prototype.setTiles2Collect = function (tiles) { this.tiles2collect = tiles; };
        GameGem.prototype.getTiles2Collect = function () { return this.tiles2collect; };
        GameGem.prototype.setTilesCollected = function (tiles) { this.tilesCollected = tiles; };
        GameGem.prototype.getTilesCollected = function () { return this.tilesCollected; };
        GameGem.prototype.play = function () {
            this.groupPlayers.alpha = 0;
            this.groupPlayers.x = -1024;
            this.deckObj = new healtwenty.gameDeck(this.game);
            this.timerObj = new healtwenty.gameTimer(this.game);
            this.timerObj.signal.add(this.timeOver, this);
            this.scoreObj = new healtwenty.gameScore(this.game);
            this.levelsObj = new healtwenty.gameLevels(this.game);
            this.electroObj = new healtwenty.gameElectro(this.game);
            new healtwenty.gameFlux(this.game);
            this.groupDeck.add(this.deckObj);
        };
        GameGem.prototype.nextLevel = function () {
            this.levelsObj.nextLevel();
        };
        GameGem.prototype.update = function () { };
        return GameGem;
    }(Phaser.State));
    healtwenty.GameGem = GameGem;
})(healtwenty || (healtwenty = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var healtwenty;
(function (healtwenty) {
    var Intro = (function (_super) {
        __extends(Intro, _super);
        function Intro() {
            var _this = _super.call(this) || this;
            _this.dots = [];
            _this.texts = [
                ["J", "U", "L", "0", "4", "1", "9", "9", "7", "2", "0", "0", "0"],
                ["J", "U", "L", "0", "4", "2", "0", "1", "7", "2", "0", "0", "0"],
                ["A", "N", "8", "-", "b", "i", "t", "P", "R", "O", "D", "U", "C", "T", "I", "O", "N"]
            ];
            return _this;
        }
        Intro.prototype.create = function () {
            var _this = this;
            healtwenty.playSound(healtwenty.gameSound.intro);
            this.dots.push(this.game.add.sprite(839, 85, "dots2"));
            this.dots[0].animations.add('anim', [0, 1], 1, true);
            this.dots[0].play('anim');
            this.dots.push(this.game.add.sprite(839, 85, "dots"));
            this.dots[1].animations.add('anim', [0, 1], 1, true);
            this.dots[1].play('anim');
            this.groupTitle = this.game.add.group();
            this.groupTitle.y = 330;
            var offset = 0;
            this.texts[2].forEach(function (element, index) {
                if (index == 2) {
                    offset = 48;
                }
                if (index == 7) {
                    offset = 96;
                }
                new healtwenty.introLetter(_this.game, (52 * index + offset), 0, element, (200 * index), 0x00ff00, 0x00ee00, 0x04200a, _this.groupTitle);
            });
            this.groupTitle.x = 25;
            this.game.add.tween(this.groupTitle).to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.Out, true, 4000);
            this.groupPast = this.game.add.group();
            this.groupPast.add(this.game.add.image(0, 0, "introPast"));
            this.groupPast.add(this.dots[0]);
            this.groupPast.y = -100;
            offset = 0;
            this.texts[0].forEach(function (element, index) {
                if (index == 3) {
                    offset = 60;
                }
                if (index == 5) {
                    offset = 120;
                }
                if (index == 9) {
                    offset = 210;
                }
                if (index == 11) {
                    offset = 270;
                }
                new healtwenty.introLetter(_this.game, (52 * index + 45 + offset), 60, element, (200 * index) + 4000, 0xfcb13c, 0xfcb13d, 0x422304, _this.groupPast);
            });
            this.groupPast.alpha = 0;
            this.game.add.tween(this.groupPast).to({ alpha: 1, y: 0 }, 1000, Phaser.Easing.Cubic.Out, true, 4000);
            this.groupNow = this.game.add.group();
            this.groupNow.alpha = 0;
            this.groupNow.y = 633;
            this.groupNow.add(this.game.add.image(0, 0, "introNow"));
            this.groupNow.add(this.dots[1]);
            offset = 0;
            this.texts[1].forEach(function (element, index) {
                if (index == 3) {
                    offset = 60;
                }
                if (index == 5) {
                    offset = 120;
                }
                if (index == 9) {
                    offset = 210;
                }
                if (index == 11) {
                    offset = 270;
                }
                new healtwenty.introLetter(_this.game, (52 * index + 45 + offset), 60, element, (200 * index) + 10000, 0x00ff00, 0x00ee00, 0x04200a, _this.groupNow);
            });
            this.game.add.tween(this.groupNow).to({ alpha: 1, y: 533 }, 1000, Phaser.Easing.Cubic.Out, true, 10000);
            this.groupNow = this.game.add.group();
            this.celebrating = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "celebrating");
            this.celebrating.alpha = 0;
            this.celebrating.scale.set(.5);
            this.celebrating.anchor.set(.5);
            this.game.add.tween(this.celebrating).to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 15500);
            this.game.time.events.add(18500, function () { _this.game.camera.fade(0xffffff, 500); }, this);
            this.game.camera.onFadeComplete.add(function () { _this.fade.alpha = 1; healtwenty.goState("Menu", _this.game); }, this);
            this.fade = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("fade"));
            this.fade.alpha = 0;
        };
        Intro.prototype.update = function () {
        };
        return Intro;
    }(Phaser.State));
    healtwenty.Intro = Intro;
})(healtwenty || (healtwenty = {}));
