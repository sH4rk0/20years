/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {


    export class gameScore extends Phaser.Sprite {

        private index: number;
        private currentState: GameGem;
        private score: Phaser.BitmapText;
        private scoreBack: Phaser.BitmapText;
        private time: number;
        private tween: Phaser.Tween;
        public signal: Phaser.Signal;

        constructor(game: Phaser.Game) {

            super(game, 0, 0);

            this.signal = new Phaser.Signal();
            this.time = 10000;
            this.currentState = <GameGem>this.game.state.getCurrentState();


            this.scoreBack = this.game.add.bitmapText(790, 140, 'digital','0000',64);
            this.scoreBack.tint=0x015b01;
            this.addChild(this.scoreBack);

            this.score = this.game.add.bitmapText(790, 140, 'digital','0000',64);
            this.score.tint=0x00ff00;
            this.addChild(this.score);


            this.currentState.groupTimer.add(this);


        }

        update() { }


        addScore(end: number): void {

                        let obj:Phaser.BitmapText = this.score;
                        let _zeros="";
                        let _val=0;
                        var scoreValue = { score: 0, end: end, start:  this.currentState.score };
                        this.currentState.score += end;
                        setScore(this.currentState.score);

                        let scoreTween:Phaser.Tween = this.game.add.tween(scoreValue).to({ score: scoreValue.end }, 200, Phaser.Easing.Quadratic.Out);

                        scoreTween.onUpdateCallback(function () { 


                            _val= (scoreValue.start + Math.round(scoreValue.score));
                            if(_val<1000){_zeros="0"}
                            if(_val<100){_zeros="00"}
                            if(_val<10){_zeros="000"}
                             
                            obj.text =_zeros + _val; 
                            //console.log(obj.text)
                    
                });
                        scoreTween.onComplete.add(function () { 
                            //console.log("completed",scoreValue.start , scoreValue.end)
                            _val= (scoreValue.start + scoreValue.end);
                           if(_val<1000){_zeros="0"}
                            if(_val<100){_zeros="00"}
                            if(_val<10){_zeros="000"}
                            
                            //console.log(_zeros + (scoreValue.start + scoreValue.end));
                            obj.text = _zeros + (scoreValue.start + scoreValue.end); 
                        
                    
                }, this);
                        scoreTween.start();

                };

       


    }

}