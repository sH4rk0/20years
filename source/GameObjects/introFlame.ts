/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {


   
    export class introFlame extends Phaser.Sprite {


        constructor(game: Phaser.Game, x: number, y: number, delay:number,frame:number) {

            super(game, x, y, "flame");
            this.animations.add("flame",[0,1,2,3,4,5,6,7,8,9],12,true);
            this.play('flame');
            this.anchor.set(.5,1);
            this.alpha=0;

            this.animations.currentAnim.setFrame(frame);
            

            this.game.add.tween(this.scale).to ( { y: 0, x: 0 }, 2000, null, true, delay, 0, false);
            this.game.time.events.add(delay,  () => { this.alpha=1 }, this);



        }


        update() { 



           
        }

        
    }

}