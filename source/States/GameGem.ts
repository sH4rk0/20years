
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module healtwenty {



        export class GameGem extends Phaser.State {

                public groupTimer: Phaser.Group;
                public groupSpeed: Phaser.Group;
                public groupDeck: Phaser.Group;
                public groupLevels: Phaser.Group;
                public groupPlayers: Phaser.Group;
                public groupBonus: Phaser.Group;
                public groupProfile: Phaser.Group;
                public levelsObj: gameLevels;
                public timerObj: gameTimer;
                public scoreObj: gameScore;
                public deckObj: gameDeck;
                public score: number;
                public electroObj: gameElectro;

                private timerVelocity:number;
                private tiles2collect:number;
                private tilesCollected:number;
                


                constructor() {

                        super();
                        this.tilesCollected=0;
                        this.tiles2collect=0;
                        this.timerVelocity=0;
                         

                }

                preload() { }

                create() {

                        this.game.world.setBounds(0, 0, 1024, 768+100);
                        this.game.add.image(0, 0, "bgGame");
                        this.score = 0;
                        this.groupTimer = this.game.add.group();
                        this.groupSpeed = this.game.add.group();
                        this.groupDeck = this.game.add.group();
                        this.groupBonus = this.game.add.group();
                        this.groupPlayers = this.game.add.group();
                        this.groupProfile = this.game.add.group();
                        this.groupLevels = this.game.add.group();
                        this.groupLevels.alpha=0;
                        this.groupProfile.x=-1024;
                        this.groupProfile.alpha=0;

                        this.groupPlayers.add(new gamePlayerSelect(this.game));
                        //this.play();
                        playSound(gameSound.ingame);
                }

                timeOver() {

                        stopSound(gameSound.ingame);
                        goState("Gameover", this.game);

                }

                setTimeVelocity(velocity:number):void{ this.timerVelocity=velocity;}
                getTimeVelocity():number{ return this.timerVelocity;}

                setTiles2Collect(tiles:number):void{this.tiles2collect=tiles}
                getTiles2Collect():number{ return this.tiles2collect;}

                setTilesCollected(tiles:number):void{this.tilesCollected=tiles}
                getTilesCollected():number{ return this.tilesCollected;}

                play(){

                        this.groupPlayers.alpha=0;
                        this.groupPlayers.x=-1024;
                        
                        this.deckObj = new gameDeck(this.game);
                        this.timerObj = new gameTimer(this.game);
                        this.timerObj.signal.add(this.timeOver, this);

                        this.scoreObj = new gameScore(this.game);
                        this.levelsObj = new gameLevels(this.game);

                        this.electroObj= new gameElectro(this.game);
                       
                        new gameFlux(this.game);
                        this.groupDeck.add(this.deckObj);
                       

                }

                nextLevel():void{

                        this.levelsObj.nextLevel();
                       

                }

               

                update() { }

        }


}