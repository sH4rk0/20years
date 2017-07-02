/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {


   
    export class introDeloreanWheel extends Phaser.Sprite {


        constructor(game: Phaser.Game, x: number, y: number, sprite:string) {

            super(game, x, y, sprite);
            this.anchor.set(.5)
        
        }

        
    }

}