/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>



module healtwenty {


    export class gameTimer extends Phaser.Sprite {

        private index: number;
        private currentState: GameGem;
        private timerSprite: Phaser.Sprite;
        private time: number;
        private tween: Phaser.Tween;
        public signal: Phaser.Signal;
        private isStarted: boolean;
        private speed: Phaser.BitmapText;
         private speedBg: Phaser.BitmapText;
         private speedVal:number;


        constructor(game: Phaser.Game) {

            super(game, 0, 0);

            this.signal = new Phaser.Signal();
            this.time = 10000;
            this.currentState = <GameGem>this.game.state.getCurrentState();
            this.isStarted = false;
            this.addChild(this.game.add.sprite(823, 223, 'energyLayer1'));

            this.timerSprite = this.game.add.sprite(872, 540, this.game.cache.getBitmapData('timer'));
            this.timerSprite.visible = true;
            this.timerSprite.angle = 180;
            this.timerSprite.alpha = .9;
            this.addChild(this.timerSprite);
            this.currentState.groupTimer.add(this);

            this.addChild(this.game.add.sprite(823, 223, 'energyLayer2'));
            
            this.game.add.sprite(733, 667, 'speed', 0, this.currentState.groupSpeed);

            this.speedBg = this.game.add.bitmapText(750, 677, "digital", "00", 76, this.currentState.groupSpeed);
            this.speedBg.tint=0x422304;
            this.speed = this.game.add.bitmapText(750, 677, "digital", "", 76, this.currentState.groupSpeed);
            this.speed.tint = 0xfcb13d;


        }

        start() {

            this.isStarted = true;
        }

        restart(){

        this.timerSprite.height=300;

        }

        stop() {

            this.isStarted = false;
        }

        update() {

            if (this.isStarted) {
                this.timerSprite.height-=this.currentState.getTimeVelocity();


                let _speed:number=(Math.round((this.timerSprite.height*88)/300));

                if(_speed!=this.speedVal){
                    this.speedVal=_speed;

                 
              if (_speed<10){
                    if (_speed<0) _speed=0;
                    this.speed.text="0"+_speed;

                }else{
                    this.speed.text=""+_speed;

                } 

                this.speed.tint=0xfcb13f;
                }else{

                        this.speed.tint=0xfcb13d;                    
                }
                


                if (this.timerSprite.height <= 0) { this.timeEnded(); }
            }


        }

        addTime(amount: number) {


            this.timerSprite.height += amount;
            if (this.timerSprite.height > 300) this.timerSprite.height = 300;

        }

        timeEnded() {

            this.sendSignal();
            this.stop();

        }

        sendSignal() {
            this.signal.dispatch();
        }





    }

}