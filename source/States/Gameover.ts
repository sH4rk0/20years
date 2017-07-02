
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module healtwenty {
    export class GameOver extends Phaser.State {

        private btnGreen: Phaser.Sprite;
        private btnBlue: Phaser.Sprite;
        private btnRed: Phaser.Sprite;
        public player: number;
        
        private _gameOverText: Array<string> = ["G", "A", "M", "E", " ", "O", "V", "E", "R"]
        private _gameOverFired: Array<string> = [
            "\"Sei LICENZIATO!\"",
            "\"You are FIRED!\"",
            "\"I'm waiting for\n a detaild report...YESTERDAY!\""
            
            ];
        
        private cloud11: Phaser.TileSprite;
        private cloud22: Phaser.TileSprite;



        constructor() {

            super();

            


        }


        create() {

            playSound(gameSound.gameover);
            this.game.world.setBounds(0, 0, 1024, 768);
            let bg: Phaser.Image = this.game.add.image(0, 0, "gameoverBg");

            this.cloud11 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.cloud11.fixedToCamera = true;
            this.cloud11.tilePosition.x = 0;

            this.cloud22 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.cloud22.fixedToCamera = true;
            this.cloud22.tilePosition.x = 0;

            let bgdel: Phaser.Image = this.game.add.image(0, 0, "deloreanBg");


            let _roblegs:Phaser.Image = this.game.add.image(100, 750, "roblegs");
            _roblegs.anchor.set(0,1);

             let _roblarm:Phaser.Image = this.game.add.image(216, 460, "roblarm");
            _roblarm.anchor.set(0);
             this.game.add.tween(_roblarm).to({ y: 465 }, 1000, Phaser.Easing.Quadratic.InOut, true, 200, -1, true);
            
            let _robchest:Phaser.Image = this.game.add.image(180, 500, "robchest");
            _robchest.anchor.set(.5);
            this.game.add.tween(_robchest).to({ y: 505 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);

             let _robrarm:Phaser.Image = this.game.add.image(170, 460, "robrarm");
            _robrarm.anchor.set(1,0);
             this.game.add.tween(_robrarm).to({ y:465 }, 1000, Phaser.Easing.Quadratic.InOut, true, 200, -1, true);

              let _robhead:Phaser.Image = this.game.add.image(180, 425, "robhead");
            _robhead.anchor.set(0.5);
             this.game.add.tween(_robhead).to({ y:430 }, 1000, Phaser.Easing.Quadratic.InOut, true, 100, -1, true);


            var _style = { font: 'normal 70px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };

            let _letter: Phaser.Text;

            this._gameOverText.forEach((element, index) => {

                if (element != "") {
                    _letter = this.game.add.text((70 * index) + 230, 60, element, _style);
                    _letter.font = 'Press Start 2P';
                    _letter.anchor.set(0.5);
                    _letter.alpha = 0;

                    this.game.add.tween(_letter).to({ alpha: 1 }, 1000, Phaser.Easing.Default, true, 100 * index, 0, false);
                    this.game.add.tween(_letter).to({ y: 100 }, 1000, Phaser.Easing.Quadratic.InOut, true, 100 * index, -1, true);

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
                //stopSound(gameSound.gameover);
                this.game.add.tween(this.btnGreen.scale).to({ x: 1.4, y: 1.4 }, 50, Phaser.Easing.Cubic.Out, true, 0, 0, true);
                stopSound(gameSound.gameover);
                playSound(gameSound.button);
                  this.game.time.events.add(100, () => { healtwenty.goState("GameGem", this.game); }, this);

                
               
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
                    this.game.add.tween(this.btnBlue.scale).to({ x:.9,y:.9}, 50, Phaser.Easing.Cubic.Out,true, 0, 0, true );

                playSound(gameSound.button);
                this.game.time.events.add(100,  () => { 

                    window.open("/halloffame.html","_blank")

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
                //stopSound(gameSound.gameover);
                this.game.add.tween(this.btnRed.scale).to({ x:.9,y:.9}, 50, Phaser.Easing.Cubic.Out,true, 0, 0, true );
                stopSound(gameSound.gameover);
               playSound(gameSound.button);
                this.game.time.events.add(100,  () => {  healtwenty.goState("Menu", this.game); }, this);
             
        
       
            }, this);
    


     _style = { font: 'normal 40px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 8 };
    let _gameOverSpeech = this.game.add.text(this.game.world.centerX, 200, 'You score ' + getScore() + ' points!\n', _style);
    _gameOverSpeech.font = 'Press Start 2P';
    _gameOverSpeech.anchor.set(0.5);


    _style = { font: 'normal 20px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
    let _gameOverSpeech2 = this.game.add.text(240, 430, this._gameOverFired[this.game.rnd.integerInRange(0,this._gameOverFired.length-1)], _style);
    _gameOverSpeech2.font = 'Press Start 2P';
    _gameOverSpeech2.anchor.set(0);

         
           saveScore();

        }


        update() { this.cloud11.tilePosition.x -= 0.1;
            this.cloud22.tilePosition.x -= 0.3;}


           


    }


}