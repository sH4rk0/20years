/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {


    export class gamePlayerSelect extends Phaser.Sprite {


        private currentState: GameGem;
        private groupProfile: Phaser.Group;
        private profileImage: Phaser.Sprite;
        private profileName: Phaser.Text;
        private profileRole: Phaser.Text;
        private profileAgency: Phaser.Text;
        private btnGreen: Phaser.Sprite;
        private btnClose: Phaser.Sprite;

        constructor(game: Phaser.Game) {

            super(game, 0, 0, "howtoplay");

        

            this.currentState = <GameGem>this.game.state.getCurrentState();
             this.currentState.groupPlayers.add(this);

            this.profileImage=this.game.add.sprite(0,0,"");
            this.profileImage.anchor.set(.5);
            this.profileImage.alpha=0;

            let _style: any;
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
            this.profileName = this.game.add.text(this.game.world.centerX, this.game.world.centerY+40, "", _style);
            this.profileName.anchor.set(.5);
            this.profileName.alpha = 1;
            this.profileName.font = 'Press Start 2P';

            _style = { font: 'normal 25px', fill: '#ff0000', stroke: '#000000', strokeThickness: 8 };
            this.profileRole = this.game.add.text(this.game.world.centerX, this.game.world.centerY+85, "", _style);
            this.profileRole.anchor.set(.5);
            this.profileRole.alpha = 1;
            this.profileRole.font = 'Press Start 2P';

            _style = { font: 'normal 25px', fill: '#0096ff', stroke: '#ffffff', strokeThickness: 4 };
            this.profileAgency = this.game.add.text(this.game.world.centerX, this.game.world.centerY+160, "", _style);
            this.profileAgency.anchor.set(.5);
            this.profileAgency.alpha = 1;
            this.profileAgency.font = 'Press Start 2P';

            let _layer=this.game.add.sprite(0,0,"people");
            _layer.inputEnabled=true;
           


             //btn Green
            this.btnGreen = this.game.add.sprite(this.game.world.centerX, 695, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.scale.set(1.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {
                playSound(gameSound.button);
                this.game.add.tween(this.btnGreen.scale).to({ x:.9,y:.9}, 50, Phaser.Easing.Cubic.Out,true, 0, 0, true );
                this.hidePlayer();
                this.currentState.play();

            }, this);

            this.btnClose = this.game.add.sprite(915, 80, "btnx");
            this.btnClose.anchor.setTo(0);
            this.btnClose.inputEnabled = true;
            this.btnClose.events.onInputDown.add(function () {
                playSound(gameSound.button);
                this.game.add.tween(this.btnClose.scale).to({ x:.9,y:.9}, 50, Phaser.Easing.Cubic.Out,true, 0, 0, true );
                this.hidePlayer();
                
            }, this);

            this.currentState.groupProfile.add(_layer);
            this.currentState.groupProfile.add(this.profileImage);
            this.currentState.groupProfile.add(this.profileName);
            this.currentState.groupProfile.add(this.profileRole);
            this.currentState.groupProfile.add(this.profileAgency);
            this.currentState.groupProfile.add(this.btnGreen);
            this.currentState.groupProfile.add(this.btnClose);

            let _x: number = 0;
            let _y: number = 0;
            let _xPos: number = 0;
            let _yPos: number = 0;
            let _profile: Phaser.Sprite;

            gameData.assets.profiles.forEach((element, index: number) => {



                _x = index % 11;
                _y = parseInt(index / 11);



                _xPos = (85 * _x) + 85;
                _yPos = (85 * _y) + 130;

                _profile = this.game.add.sprite(_xPos + (this.game.rnd.integerInRange(-50, 50)), _yPos + (this.game.rnd.integerInRange(-50, 50)), element.name + element.surname);
                _profile.scale.set(.4);
                _profile.anchor.set(0.5);
               
                _profile.z = index;
                _profile.alpha = 0;
                _profile.inputEnabled = true;
                _profile.events.onInputDown.add(function (btn) {

                   this.game.add.tween(btn.scale).to({ x:.3,y:.3}, 50, Phaser.Easing.Cubic.Out,true, 0, 0, true );
                    playSound(gameSound.button);
                    this.selectPlayer(_profile, element);

                }, this,null,[_profile]);

                this.game.add.tween(_profile).to({ alpha: 1, x: _xPos, y: _yPos }, 300, Phaser.Easing.Quadratic.InOut, true, 10 * index, 0, false);

                this.currentState.groupPlayers.add(_profile);
            });

            _style = { font: 'normal 40px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };

            let _health = this.game.add.text(this.game.world.centerX, 40, "The Healthwarians", _style);
            _health.anchor.set(.5);
            _health.alpha = 1;
            _health.font = 'Press Start 2P';
             this.currentState.groupPlayers.add(_health);

             _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
            let _select = this.game.add.text(this.game.world.centerX, 730, "Select a Player", _style);
            _select.anchor.set(.5);
            _select.alpha = 1;
            _select.font = 'Press Start 2P';


              this.currentState.groupPlayers.add(_select);

           

        }

        create() { }

        update() { }

        selectPlayer(profile: Phaser.Sprite, profileObj: any): void {

            console.log(profileObj.name);
            // 

            //this.profileImage = this.game.add.sprite(this.game.world.centerX, -200, profileObj.name + profileObj.surname);
            this.profileImage.loadTexture(profileObj.name + profileObj.surname)
            this.profileImage.x=this.game.world.centerX;
            this.profileImage.scale.set(2)
            this.profileName.text = profileObj.name + " " + profileObj.surname;
            this.profileRole.text = profileObj.role;
            this.profileAgency.text = profileObj.agency;
            setPlayer(profileObj);
            this.showPlayer();

 }

        showPlayer(){ 
            this.currentState.groupProfile.x=-1024;
            this.profileImage.y=-200;
            this.game.add.tween(this.currentState.groupProfile).to({ alpha: 1, x: 0,  }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);

            this.game.add.tween(this.profileImage).to({ alpha: 1, y: this.game.world.centerY-100,  }, 1000, Phaser.Easing.Bounce.Out, true, 500, 0, false);

           


        }

        hidePlayer(){ 

            this.game.add.tween(this.currentState.groupProfile).to({ alpha: 0, x: 1024,  }, 500, Phaser.Easing.Quadratic.InOut, true, 100, 0, false);

        }

      



    }

}