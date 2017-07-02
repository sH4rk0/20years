/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {


    export enum typeText { letters, numbers }
    export class introLetter extends Phaser.BitmapText {

        private letters: Array<Array<string>> =

        [
            ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        ];

        private endChar: string;
        private charType: typeText;
        private charBack: Phaser.BitmapText;
        private color:number;
        private color2:number;

        constructor(game: Phaser.Game, x: number, y: number, endChar: string, delay: number, color: number, color2: number, backColor:number, group:Phaser.Group) {

            super(game, x, y, "digital", "", 110);

            this.endChar = endChar;
            this.charType = typeText.letters;
            this.color=color;
            this.color2=color2;

            this.charBack = this.game.add.bitmapText(x, y, 'digital', '0', 110);
            this.charBack.tint = backColor;
            group.add(this.charBack)

            group.add(this);
            
            this.tint = color;
            this.game.time.events.add(delay, this.start, this);


        }


        update() {


        }

        start() {

           
             var scoreValue: any = { score: 0, end: 50, game: this.game, val: this, letters: this.letters[this.charType],letter:this.endChar };

            var scoreTween = this.game.add.tween(scoreValue).to({ score: 50 }, 500, Phaser.Easing.Quadratic.Out, false, 0);

            scoreTween.onUpdateCallback(function () {

             
                    if (scoreValue.last != parseInt(scoreValue.score)) {
                        scoreValue.last = parseInt(scoreValue.score);
                        scoreValue.val.text = scoreValue.letters[scoreValue.game.rnd.integerInRange(0, 10)];
                    }
               

            },this);

            scoreTween.onComplete.add(function () {

              
                this.text=this.endChar;
                this.tint=this.color2;

            },this);

            

            scoreTween.start();

        }






    }

}