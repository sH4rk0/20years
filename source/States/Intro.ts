/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module healtwenty {
    export class Intro extends Phaser.State {


        public groupTitle: Phaser.Group;
        public groupPast: Phaser.Group;
        public groupNow: Phaser.Group;
        private celebrating: Phaser.Image;
        private dots: Array<Phaser.Sprite> = [];
        private fade: Phaser.Sprite;

        private texts: Array<Array<string>> = [

            ["J", "U", "L", "0", "4", "1", "9", "9", "7", "2", "0", "0", "0"],
            ["J", "U", "L", "0", "4", "2", "0", "1", "7", "2", "0", "0", "0"],

            ["A","N","8","-","b", "i","t", "P", "R", "O", "D", "U", "C", "T","I","O","N"]

        ]

        constructor() {

            super();


        }

        create() {


            playSound(gameSound.intro);


            this.dots.push(this.game.add.sprite(839, 85, "dots2"));
            this.dots[0].animations.add('anim', [0, 1], 1, true);
            this.dots[0].play('anim');
            this.dots.push(this.game.add.sprite(839, 85, "dots"));
            this.dots[1].animations.add('anim', [0, 1], 1, true);
            this.dots[1].play('anim');

            this.groupTitle = this.game.add.group();
            this.groupTitle.y = 330;
            let offset: number = 0;
            this.texts[2].forEach((element, index) => {

                if (index == 2) { offset = 48 }
                if (index == 7) { offset = 96 }
                new introLetter(this.game, (52 * index + offset), 0, element, (200 * index), 0x00ff00, 0x00ee00, 0x04200a, this.groupTitle);

            });

            this.groupTitle.x = 25;

            this.game.add.tween(this.groupTitle).to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.Out, true, 4000);

            this.groupPast = this.game.add.group();
            this.groupPast.add(this.game.add.image(0, 0, "introPast"));
            this.groupPast.add(this.dots[0]);
            this.groupPast.y = -100;
            offset = 0;
            this.texts[0].forEach((element, index) => {

                if (index == 3) { offset = 60 }
                if (index == 5) { offset = 120 }
                if (index == 9) { offset = 210 }
                if (index == 11) { offset = 270 }
                new introLetter(this.game, (52 * index + 45 + offset), 60, element, (200 * index) + 4000, 0xfcb13c, 0xfcb13d, 0x422304, this.groupPast);

            });

            this.groupPast.alpha = 0;

            this.game.add.tween(this.groupPast).to({ alpha: 1, y: 0 }, 1000, Phaser.Easing.Cubic.Out, true, 4000);

            this.groupNow = this.game.add.group();
            this.groupNow.alpha = 0;
            this.groupNow.y = 633;
            this.groupNow.add(this.game.add.image(0, 0, "introNow"));

            this.groupNow.add(this.dots[1]);
            offset = 0;
            this.texts[1].forEach((element, index) => {

                if (index == 3) { offset = 60 }
                if (index == 5) { offset = 120 }
                if (index == 9) { offset = 210 }
                if (index == 11) { offset = 270 }
                new introLetter(this.game, (52 * index + 45 + offset), 60, element, (200 * index) + 10000, 0x00ff00, 0x00ee00, 0x04200a, this.groupNow);

            });

            this.game.add.tween(this.groupNow).to({ alpha: 1, y: 533 }, 1000, Phaser.Easing.Cubic.Out, true, 10000);

            this.groupNow = this.game.add.group();

            this.celebrating = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "celebrating");
            this.celebrating.alpha = 0;
            this.celebrating.scale.set(.5);
            this.celebrating.anchor.set(.5);

            this.game.add.tween(this.celebrating).to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 15500);
            
            this.game.time.events.add(18500,  () => { this.game.camera.fade(0xffffff, 500); }, this);
            this.game.camera.onFadeComplete.add(()=>{ this.fade.alpha=1; goState("Menu",this.game);}, this);

            this.fade=this.game.add.sprite(0,0,this.game.cache.getBitmapData("fade"));
            this.fade.alpha=0;
        }

        update() {



        }





    }
}