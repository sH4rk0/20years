/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module healtwenty {
    export class Menu extends Phaser.State {


        private fade: Phaser.Sprite;
        private sky: Phaser.TileSprite;
        private rocks: Phaser.TileSprite;
        private ground: Phaser.TileSprite;
        private cloud1: Phaser.TileSprite;
        private cloud2: Phaser.TileSprite;
        private delorean: introDelorean;
        private btnGreen: Phaser.Sprite;
        private btnBlue: Phaser.Sprite;
        private btnRed: Phaser.Sprite;
        private howTo: introHowto;
        private logo: Phaser.Image;
         private gameSubTitle:Phaser.Text;

        public groupFlames: Phaser.Group;
        public groupFlames2: Phaser.Group;
        public groupDelorean: Phaser.Group;
        public buttonsGroup: Phaser.Group;
        public how2playGroup: Phaser.Group;

       

        private bgVel1:number;
        private bgVel2:number;
        


        constructor() {

            super();


        }

        create() {
            let _style: any;

            this.game.world.setBounds(0, 0, 1024, 768);
            this.bgVel1=10;
            this.bgVel2=0.25;
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


                playSound(gameSound.button);
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
            this.howTo = new introHowto(this.game);
            this.how2playGroup.add(this.howTo);
            this.how2playGroup.inputEnableChildren = false;

            this.delorean = new introDelorean(this.game);
            this.groupDelorean.add(this.delorean);

            playSound(gameSound.menu);
            //fadeInSound(gameSound.menu,0);
            setSoundVolume(gameSound.menu,0.1);

        }


        update() {

            this.ground.tilePosition.x -= this.bgVel1;
            this.rocks.tilePosition.x -= this.bgVel2;

            this.cloud1.tilePosition.x -= 0.1;
            this.cloud2.tilePosition.x -= 0.3;

            

        }


        fadeOut(){

            let _tween=this.game.add.tween(this.fade).to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 0);
            _tween.onComplete.add(()=>{
                                stopSound(gameSound.menu);
                                healtwenty.goState("GameGem", this.game);

            })

        }


        tweenScroll(_state: Menu, _start?: Object, _end?: Object, _time?: number): void {

                        var backValue: any = { back1: 10, back2: 0.25 };

                        if (_start != null) backValue = _start;

                        var backEnd: any = { back1: 0, back2: 0 };

                        if (_end != null) backEnd = _end;

                        var backTween: Phaser.Tween = this.game.add.tween(backValue).to(backEnd, _time, Phaser.Easing.Quadratic.Out);

                        backTween.onUpdateCallback(function () {

                                _state.bgVel1 = backValue.back1;
                                _state.bgVel2 = backValue.back2;

                        });

                        backTween.start();
                }

        render() {


            //this.game.debug.bodyInfo(this.delorean, 32, 132);
            //this.game.debug.body( this.delorean)


        }

        play() {

            this.buttonsGroup.inputEnableChildren = false;
            
            this.tweenScroll(this, { back1: 10, back2: 0.25}, { back1: 0, back2: 0},300);
            let _tween: Phaser.Tween = this.game.add.tween(this.buttonsGroup).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true, 0, 0, false);

            _tween.onComplete.add(()=>{

                    this.delorean.playAnimation();
                       

            },this)

           

             


            

           

        }





    }
}