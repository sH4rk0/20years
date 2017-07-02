/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {


    export class gameElectro extends Phaser.Sprite {

       
        private currentState: GameGem;
    
        constructor(game: Phaser.Game) {

            super(game, 0, 0, "electro");
             this.currentState = <GameGem>this.game.state.getCurrentState();

             this.anchor.set(.5);
            let anim:Phaser.Animation=this.animations.add('anim', [0,1,2,3,4,5,6,7,8,9], 24, false);
            anim.onComplete.add(this.stopAnimation, this);
            this.alpha=0;
            this.currentState.groupBonus.add(this);
           

        }

        show(_row:number,_column:number, _direction: dragDirection){

            if(_direction==dragDirection.HORIZONTAL_DRAG){

                this.showHorizontal(_row)
            }else{

                this.showVertical(_column)
            }


        }

        showHorizontal(_position:number){
            this.alpha=1;
            this.angle=90;
            this.y=(_position*80)+70+80;
            this.x=320;
            this.play('anim');
            
            
            
            // this.game.add.tween(this).to({alpha:0},20,Phaser.Easing.Quadratic.InOut,true,300,0,false);

        }

        showVertical(_position:number){
            this.alpha=1;
            this.angle=0;
            this.x=(_position*80)+80;
            this.y=320+120;
            this.play('anim');
           
          


        }

        stopAnimation(){
            this.animations.stop();
            this.alpha=0;


        }

    

    
        

    }

}