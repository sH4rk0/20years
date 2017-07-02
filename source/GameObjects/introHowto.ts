/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {



    export class introHowto extends Phaser.Sprite {

        private delorean: Phaser.Sprite;
        private deloreanW1: Phaser.Sprite;
        private deloreanW2: Phaser.Sprite;
        private currentState: Menu;

        constructor(game: Phaser.Game, ) {

            super(game, 0, 0, "howtoplay");
            this.currentState = <Menu>this.game.state.getCurrentState();
            this.currentState.how2playGroup.x=-1024;
            this.inputEnabled=true;
             this.events.onInputDown.add(function () {

                //stopSound(gameSound.menu);
                this.close();
            }, this);
            
            
        }


        update() {

        }


        public open() {

            console.log("open")

            this.currentState.buttonsGroup.ignoreChildInput = true;
            let tween = this.game.add.tween(this.currentState.how2playGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {  this.currentState.how2playGroup.ignoreChildInput = false; }, this)

        }

        public close() {

            /* this.game.time.events.add(300, function () { 
                 
                 playSound(gameSound.lightsaber);
              }, this);*/

            this.currentState.how2playGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.currentState.how2playGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () { this.currentState.buttonsGroup.ignoreChildInput = false; }, this)

        }

    }

}