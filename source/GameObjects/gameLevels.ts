/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>



module healtwenty {


    export class gameLevels extends Phaser.Sprite {


        private currentState: GameGem;
        private levelsObj: Array<any> = [

            { velocity: .1, tiles2collect: 20 },
            { velocity: .15, tiles2collect: 25 },
            { velocity: .2, tiles2collect: 30 },
            { velocity: .25, tiles2collect: 35 },
            { velocity: .3, tiles2collect: 40 },
            { velocity: .35, tiles2collect: 45 },
            { velocity: .4, tiles2collect: 50 },
            { velocity: .45, tiles2collect: 55 },
            { velocity: .5, tiles2collect: 60 },
            { velocity: .55, tiles2collect: 65 },
            { velocity: .6, tiles2collect: 70 }


        ];
        private currentLevel: number = 0;
        private levelsSprite: Array<Phaser.Sprite> = [];
        private levelsSpriteText: Array<Phaser.Text> = [];
        private message: Phaser.Text;
        private levelTween: Phaser.Tween;

        constructor(game: Phaser.Game) {

            super(game, 8, 0, "levelsBg");
            this.currentState = <GameGem>this.game.state.getCurrentState();
            this.currentLevel = 0;
            this.currentState.groupTimer.add(this);
            let _tileLevel: Phaser.Sprite;
            let _tileLevelText: Phaser.Text;
            let _counter:number=0;
            let _styleL: any = { font: 'normal 12px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            let _date:string="";
            

            this.levelsObj.forEach((element, index) => {

                _tileLevel = this.game.add.sprite((82 * index) + 75, 9, "tileLevel");
                _tileLevel.alpha = 0;

                // in case of custom date. to replace with better code in case
                switch(index){
                    case 0: _date="1997"; break;
                    case 1: _date="1999"; break;
                    case 2: _date="2001"; break;
                    case 3: _date="2003"; break;
                    case 4: _date="2005"; break;
                    case 5: _date="2007"; break;
                    case 6: _date="2009"; break;
                    case 7: _date="2011"; break;
                    case 8: _date="2013"; break;
                    case 9: _date="2015"; break;
                    case 10: _date="2017"; break;

                }

                _tileLevelText=this.game.add.text(_tileLevel.width/2, _tileLevel.height/2,  _date, _styleL);
                _tileLevelText.anchor.set(.5);
                _tileLevelText.align = "center";
                _tileLevelText.font = 'Press Start 2P';
                _tileLevel.addChild(_tileLevelText);
                this.addChild(_tileLevel);
                this.levelsSprite.push(_tileLevel);

            });

            let _panel: Phaser.Sprite = this.game.add.sprite(52, 124, this.game.cache.getBitmapData("levelPanel"), 0, this.currentState.groupLevels);
            _panel.alpha = .75;

            let _style: any = { font: 'normal 25px', fill: '#000000', stroke: '#ffffff', strokeThickness: 4 };
            this.message = this.game.add.text(this.game.world.centerX - 160, this.game.world.centerY, "", _style, this.currentState.groupLevels);
            this.message.anchor.set(.5);
            this.message.align = "center";
            this.message.font = 'Press Start 2P';

            this.currentState.setTimeVelocity(this.levelsObj[this.currentLevel].velocity);
            this.currentState.setTiles2Collect(this.levelsObj[this.currentLevel].tiles2collect);
            this.currentState.setTilesCollected(0);

            this.start();

        }

        showPanel() {

            this.currentState.deckObj.stop();
            this.currentState.timerObj.stop();
            this.currentState.timerObj.restart();
            this.message.alpha = 0;
            let _tween: Phaser.Tween = this.game.add.tween(this.currentState.groupLevels).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            _tween.onComplete.add(() => { this.showMessage() }, this);


        }


        showMessage() {

            this.message.y = this.game.world.centerY + 50
            this.message.text = "GET READY FOR LEVEL " + (this.currentLevel + 1) + "\n\n COLLECT " + this.levelsObj[this.currentLevel].tiles2collect + " TILES \n\n GOOD LUCK!!! :D";

            let _tween: Phaser.Tween = this.game.add.tween(this.message).to({ y: this.game.world.centerY, alpha: 1 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);

            _tween.onComplete.add(() => { this.game.time.events.add(4000, () => { this.hidePanel() }, this); }, this);

        }

        hidePanel() {

            let _tween: Phaser.Tween = this.game.add.tween(this.currentState.groupLevels).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            _tween.onComplete.add(() => {
                this.currentState.deckObj.start();
                this.currentState.timerObj.start();
            }, this);

            this.levelsSprite[this.currentLevel].frame = 1;

            this.levelsSprite[this.currentLevel].alpha=.3;
            this.levelTween = this.game.add.tween(this.levelsSprite[this.currentLevel]).to({ alpha: .9 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);


        }

       


        start() {

            this.showPanel();
        }

        nextLevel(): void {

            this.levelsSprite[this.currentLevel].frame = 2;
            this.levelsSprite[this.currentLevel].alpha = .5;
            this.game.tweens.remove(this.levelTween);
            this.currentLevel++;
            this.currentState.setTimeVelocity(this.levelsObj[this.currentLevel].velocity);
            this.currentState.setTiles2Collect(this.levelsObj[this.currentLevel].tiles2collect);
            this.currentState.setTilesCollected(0);
            playSound(gameSound.levelchange);
            this.showPanel();


        }


    }

}