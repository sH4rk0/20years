/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>


module healtwenty {



    export class introDelorean extends Phaser.Sprite {

        private delorean: Phaser.Sprite;
        private deloreanW1: Phaser.Sprite;
        private deloreanW2: Phaser.Sprite;
        private currentState: Menu;
        private roberto:Phaser.Sprite;

        private lightningBitmap: Phaser.BitmapData;
        private lightning: Phaser.Image;

        private angle1:number=15;
         private angle2:number=15.5;

        constructor(game: Phaser.Game, ) {

            super(game, -850, 520, "");
            this.anchor.set(.5);
            this.scale.set(.6);
            
            this.game.physics.arcade.enable(this);
            
            this.body.setSize(100,100,715,150);

            this.currentState = <Menu>this.game.state.getCurrentState();
            this.delorean = this.game.add.sprite(0, 0, "deloreanSide");
            this.game.add.tween(this.delorean).to({ y: -10 }, 100, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            this.addChild(this.delorean);

            this.roberto=this.game.add.sprite(325,40,"roberto");
            this.roberto.animations.add('idle', [0], 0, false);
            this.roberto.animations.add('electricity', [0,1], 22, true);
            this.roberto.play("idle");
            this.game.add.tween(this.roberto).to({ y: 30 }, 100, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            this.addChild(this.roberto);

            this.deloreanW2 = new introDeloreanWheel(this.game, 190 , 245, "deloreanWheelB");
            this.addChild(this.deloreanW2);

            this.deloreanW1 = new introDeloreanWheel(this.game, 660, 245, "deloreanWheelF");
            this.addChild(this.deloreanW1);

             let tween: Phaser.Tween = this.game.add.tween(this).to({ x: 240 }, 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            

        }


        update() {

            this.deloreanW1.angle += this.angle1;
            this.deloreanW2.angle += this.angle2;
        }


      

        playAnimation(){

            this.createLightning(512,0,this.x+100,this.y+100);
            fadeOutSound(gameSound.menu,500);
            playSound(gameSound.thunder);
            this.game.time.events.add(500,  () => {  playSound(gameSound.squealing); }, this);
            this.angle1=0;
            this.angle2=20;

        }


        run(){


            let tween=this.game.add.tween(this).to({ x: 1024 }, 500, Phaser.Easing.Quadratic.In, true, 0, 0, false);
            this.angle1=15;
            this.angle2=15;

             this.game.time.events.add(500,  () => { this.currentState.fadeOut(); }, this);
            
            for(let i=0; i<25; i++){

                this.currentState.groupFlames2.add(new introFlame(this.game,400+(i*48),670,50*i,i));

            }

            for(let i=0; i<25; i++){

                this.currentState.groupFlames.add(new introFlame(this.game,400+(i*50),700,50*i,i));


            }
            
            tween.onComplete.add(()=>{



            },this);


        }



        createLightning(startX: number, startY: number, endX: number, endY: number) {



            this.lightningBitmap = this.game.add.bitmapData(200, 1000);
            this.lightning = this.game.add.image(startX, startY, this.lightningBitmap);

            this.lightning.anchor.setTo(0.5, 0);
           // this.lightning.filters = [ this.game.add.filter('Glow') ];
            this.lightning.rotation =
                this.game.math.degToRad(90-this.game.math.radToDeg( this.game.math.angleBetween(
                    startX, startY,
                    endX, endY
                )))*-1;

            var distance = this.game.math.distance(startX, startY, endX, endY);
            this.createLightningTexture(this.lightningBitmap,this.lightningBitmap.width/2, 0, 20, 4, false, distance);

            this.roberto.play("electricity");

            var tween = this.game.add.tween(this.lightning)
                .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 0}, 100, Phaser.Easing.Bounce.Out)
                .start();

              tween.onComplete.add(()=>{

                this.roberto.play("idle");
                this.run();

              },this);  

           
        };


        


        createLightningTexture(lightningBitmap, x:number, y:number, segments:number, boltWidth:number, branch:boolean, distance:number) {
           
           
             var ctx = lightningBitmap.context;
                var width = lightningBitmap.width;
                var height = lightningBitmap.height;

                // Our lightning will be made up of several line segments starting at
                // the center of the top edge of the bitmap and ending at the target.

                // Clear the canvas
                if (!branch) ctx.clearRect(0, 0, width, height);

                // Draw each of the segments
                for(var i = 0; i < segments; i++) {
                    // Set the lightning color and bolt width
                    ctx.strokeStyle = 'rgb(255, 255, 0)';
                    ctx.lineWidth = boltWidth;
                    ctx.beginPath();
                    ctx.moveTo(x, y);

                    // Calculate an x offset from the end of the last line segment and
                    // keep it within the bounds of the bitmap
                    if (branch) {
                        // For a branch
                        x += this.game.rnd.integerInRange(-10, 10);
                    } else {
                        // For the main bolt
                        x += this.game.rnd.integerInRange(-30, 30);
                    }
                    if (x <= 10) x = 10;
                    if (x >= width-10) x = width-10;

                    // Calculate a y offset from the end of the last line segment.
                    // When we've reached the target or there are no more segments left,
                    // set the y position to the distance to the target. For branches, we
                    // don't care if they reach the target so don't set the last coordinate
                    // to the target if it's hanging in the air.
                    if (branch) {
                        // For a branch
                        y += this.game.rnd.integerInRange(10, 20);
                    } else {
                        // For the main bolt
                        y += this.game.rnd.integerInRange(20, distance/segments);
                    }
                    if ((!branch && i == segments - 1) || y > distance) {
                        // This causes the bolt to always terminate at the center
                        // lightning bolt bounding box at the correct distance to
                        // the target. Because of the way the lightning sprite is
                        // rotated, this causes this point to be exactly where the
                        // player clicked or tapped.
                        y = distance;
                        if (!branch) x = width/2;
                    }

                    // Draw the line segment
                    ctx.lineTo(x, y);
                    ctx.stroke();

                    // Quit when we've reached the target
                    if (y >= distance) break;

                    // Draw a branch 20% of the time off the main bolt only
                    if (!branch) {
                        
                        
                        if (this.chanceRoll(20)) {
                            // Draws another, thinner, bolt starting from this position
                            this.createLightningTexture(lightningBitmap, x, y, 20, 1, true, distance);
                        }
                    }
                }

                // This just tells the engine it should update the texture cache
                lightningBitmap.dirty = true;

                
      


        };

        chanceRoll  (chance):boolean {
        if (chance === undefined) { chance = 50; }
        return chance > 0 && (Math.random() * 100 <= chance);
    };

    }

}