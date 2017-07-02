/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {


    export class gameFlux extends Phaser.Sprite {

       
        private currentState: GameGem;
    
        constructor(game: Phaser.Game) {

            super(game, 770, 515, "flux");

            
            this.currentState = <GameGem>this.game.state.getCurrentState();
            this.animations.add('anim', [0,1,2], 12, true);

            this.currentState.groupTimer.add(this);
             this.play('anim');
            

        }

        
        

    }

}