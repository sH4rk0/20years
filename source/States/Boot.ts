/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module healtwenty{
    export class Boot extends Phaser.State{

        preload(){
         var bmd : Phaser.BitmapData = this.game.add.bitmapData(200,50);
			
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingBar', bmd);

			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('startBtn', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('button', bmd);

			

			bmd = this.game.add.bitmapData(1024,768);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 768);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('layer', bmd);

			bmd = this.game.add.bitmapData(40,300);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 300);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('timer', bmd);

			bmd = this.game.add.bitmapData(1024,768);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 768);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('fade', bmd);

			bmd = this.game.add.bitmapData(74,74);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 74, 74);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('levelTile', bmd);

			bmd = this.game.add.bitmapData(600,600);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 600, 600);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('levelPanel', bmd);


        }

     create(){
        

		   if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
				setDevice(true);
            }
            else {
                setDevice(false);
            }

            this.game.stage.backgroundColor = '#000000';
		    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		    this.game.stage.smoothed=false;
		    this.game.scale.pageAlignHorizontally = true;
    	    this.game.scale.pageAlignVertically = true;
		    this.game.state.start('Preloader');



           
        }
    }
}