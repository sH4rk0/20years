
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module healtwenty {

        export enum dragDirection { NO_DRAG, HORIZONTAL_DRAG, VERTICAL_DRAG }
        export enum gameGlobalState { GAME_STATE_IDLE, GAME_STATE_DRAG, GAME_STATE_STOP }

        export class gameDeck extends Phaser.Sprite {


                private tempTile: Phaser.Sprite;

                private gameOptions: any = {
                        gameWidth: 640,
                        gameHeight: 640,

                        spritesheetSize: 80,
                        tileSize: 80,
                        fieldSize: 7,

                        tileTypes: 6,

                        offsetX: 70,
                        offsetY: 143,
                        tweenSpeed: 50,
                        fadeSpeed: 250,
                        fallSpeed: 75
                }

                private tileArray: any = [];
                private tilePool: any = [];
                private tilesToRemove: any = [];
                private tileMask: Phaser.Graphics;
                private movingRow: number;
                private movingCol: number;
                private gameState: number;
                private dragDirection: number;
                private distX: number;
                private distY: number;
                private isDragging: boolean;
                private currentState: GameGem;
                private globalMatches: number;
                private isStarted: boolean;




                private bonusTexts: Array<string> = ["", "Very good!", "That's Great!", "Wow!", "Excellent!", "Fantastic!", "Amazing!"];

                private bonusVoice: Array<gameSound> = [null, gameSound.verygood, gameSound.thatsgreat, gameSound.wow, gameSound.excellent, gameSound.fantastic, gameSound.amazing];



                constructor(game: Phaser.Game) {


                        super(game, 0, 0);
                        this.isStarted = false;
                        this.currentState = <GameGem>this.game.state.getCurrentState();

                        this.globalMatches = 0;
                        this.isDragging = false;

                        this.currentState.groupDeck.x = this.gameOptions.offsetX;
                        this.currentState.groupDeck.y = this.gameOptions.offsetY;
                        this.tileMask = this.game.add.graphics(this.currentState.groupDeck.x, this.currentState.groupDeck.y);
                        this.tileMask.beginFill(0xffffff);
                        this.tileMask.drawRect(0, 0, this.gameOptions.fieldSize * this.gameOptions.tileSize, this.gameOptions.fieldSize * this.gameOptions.tileSize);
                        this.currentState.groupDeck.mask = this.tileMask;
                        this.tileMask.visible = true;

                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                this.tileArray[i] = [];
                                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                                        this.addTile(i, j);
                                }
                        }
                        this.addTempTile();
                        this.game.input.onDown.add(this.pickTile, this);
                        this.gameState = gameGlobalState.GAME_STATE_IDLE;

                }


                start(): void {
                        //console.log("start")
                        this.isStarted = true;
                        this.game.input.onDown.add(this.pickTile, this);
                }

                stop(): void {
                        //console.log("stop")
                        this.isStarted = false;
                }


                update() {

                        switch (this.gameState) {
                                case gameGlobalState.GAME_STATE_DRAG:
                                        this.handleDrag();
                                        break;
                                case gameGlobalState.GAME_STATE_STOP:
                                        this.handleStop();
                                        break;
                        }
                        this.gameState = gameGlobalState.GAME_STATE_IDLE;


                }

                addTile(row, col): void {
                        let theTile = this.game.add.sprite(col * this.gameOptions.tileSize, row * this.gameOptions.tileSize, "tiles");
                        theTile.width = this.gameOptions.tileSize;
                        theTile.height = this.gameOptions.tileSize;
                        do {
                                var randomTile = this.game.rnd.integerInRange(0, this.gameOptions.tileTypes - 1);
                                this.tileArray[row][col] = {
                                        tileSprite: theTile,
                                        tileValue: randomTile,
                                        isEmpty: false
                                };
                        } while (this.isMatch(row, col));
                        theTile.frame = randomTile;
                        this.currentState.groupDeck.add(theTile);
                }

                isMatch(row, col): boolean {

                        return this.isHorizontalMatch(row, col) || this.isVerticalMatch(row, col);
                }

                isHorizontalMatch(row, col): boolean {

                        return this.tileAt(row, col).tileValue == this.tileAt(row, col - 1).tileValue && this.tileAt(row, col).tileValue == this.tileAt(row, col - 2).tileValue;
                }

                isVerticalMatch(row, col): boolean {

                        return this.tileAt(row, col).tileValue == this.tileAt(row - 1, col).tileValue && this.tileAt(row, col).tileValue == this.tileAt(row - 2, col).tileValue;
                }

                tileAt(row, col): any {
                        if (row < 0 || row >= this.gameOptions.fieldSize || col < 0 || col >= this.gameOptions.fieldSize) {
                                return false;
                        }
                        return this.tileArray[row][col];
                }

                addTempTile(): void {
                        this.tempTile = this.game.add.sprite(0, 0, "tiles");
                        this.tempTile.width = this.gameOptions.tileSize;
                        this.tempTile.height = this.gameOptions.tileSize;
                        this.tempTile.visible = false;
                        this.currentState.groupDeck.add(this.tempTile);
                }

                pickTile(e): void {
                        //console.log("pick")
                        if (!this.isStarted) return;
                        this.movingRow = Math.floor((e.position.y - this.gameOptions.offsetY) / this.gameOptions.tileSize);
                        this.movingCol = Math.floor((e.position.x - this.gameOptions.offsetX) / this.gameOptions.tileSize);
                        if (this.movingRow >= 0 && this.movingCol >= 0 && this.movingRow < this.gameOptions.fieldSize && this.movingCol < this.gameOptions.fieldSize) {
                                this.dragDirection = dragDirection.NO_DRAG;
                                this.game.input.onDown.remove(this.pickTile, this);
                                this.game.input.onUp.add(this.releaseTile, this);
                                this.game.input.addMoveCallback(this.moveTile, this);

                        }
                }

                moveTile(e): void {
                        this.gameState = gameGlobalState.GAME_STATE_DRAG;
                        this.distX = e.position.x - e.positionDown.x;
                        this.distY = e.position.y - e.positionDown.y;
                        if (this.dragDirection == dragDirection.NO_DRAG) {
                                var distance = e.position.distance(e.positionDown);
                                if (distance > 5) {
                                        this.isDragging = true;
                                        var dragAngle = Math.abs(Math.atan2(this.distY, this.distX));
                                        if ((dragAngle > Math.PI / 4 && dragAngle < 3 * Math.PI / 4)) {
                                                this.dragDirection = dragDirection.VERTICAL_DRAG;
                                        } else {
                                                this.dragDirection = dragDirection.HORIZONTAL_DRAG;
                                        }
                                }
                        }
                }

                releaseTile(): void {
                        if (this.isDragging) {
                                this.isDragging = false;
                                this.gameState = gameGlobalState.GAME_STATE_STOP;
                                this.game.input.onUp.remove(this.releaseTile, this);
                                this.game.input.deleteMoveCallback(this.moveTile, this);
                        }
                }


                handleDrag(): void {

                        switch (this.dragDirection) {
                                case dragDirection.HORIZONTAL_DRAG:
                                        //console.log(this.movingRow,this.movingCol);

                                        this.tempTile.visible = false;
                                        this.tempTile.y = this.movingRow * this.gameOptions.tileSize;
                                        var deltaX = (Math.floor(this.distX / this.gameOptions.tileSize) % this.gameOptions.fieldSize);
                                        if (deltaX >= 0) {
                                                this.tempTile.frame = this.tileArray[this.movingRow][this.gameOptions.fieldSize - 1 - deltaX].tileValue;
                                        }
                                        else {
                                                deltaX = deltaX * -1 - 1;
                                                this.tempTile.frame = this.tileArray[this.movingRow][deltaX].tileValue;
                                        }
                                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                this.tileArray[this.movingRow][i].tileSprite.x = (i * this.gameOptions.tileSize + this.distX) % (this.gameOptions.tileSize * this.gameOptions.fieldSize);
                                                if (this.tileArray[this.movingRow][i].tileSprite.x < 0) {
                                                        this.tileArray[this.movingRow][i].tileSprite.x += this.gameOptions.tileSize * this.gameOptions.fieldSize;
                                                }
                                        }
                                        var tileX = this.distX % this.gameOptions.tileSize;
                                        if (tileX > 0) {
                                                this.tempTile.x = tileX - this.gameOptions.tileSize;
                                                this.tempTile.visible = true;
                                        }
                                        if (tileX < 0) {
                                                this.tempTile.x = tileX;
                                                this.tempTile.visible = true;
                                        }

                                        break;
                                case dragDirection.VERTICAL_DRAG:

                                        this.tempTile.visible = false;
                                        this.tempTile.x = this.movingCol * this.gameOptions.tileSize;
                                        var deltaY = (Math.floor(this.distY / this.gameOptions.tileSize) % this.gameOptions.fieldSize);
                                        if (deltaY >= 0) {
                                                this.tempTile.frame = this.tileArray[this.gameOptions.fieldSize - 1 - deltaY][this.movingCol].tileValue;
                                        } else {
                                                deltaY = deltaY * -1 - 1;
                                                this.tempTile.frame = this.tileArray[deltaY][this.movingCol].tileValue;
                                        }
                                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                this.tileArray[i][this.movingCol].tileSprite.y = (i * this.gameOptions.tileSize + this.distY) % (this.gameOptions.tileSize * this.gameOptions.fieldSize);
                                                if (this.tileArray[i][this.movingCol].tileSprite.y < 0) {
                                                        this.tileArray[i][this.movingCol].tileSprite.y += this.gameOptions.tileSize * this.gameOptions.fieldSize;
                                                }
                                        }
                                        var tileY = this.distY % this.gameOptions.tileSize;
                                        if (tileY > 0) {
                                                this.tempTile.y = tileY - this.gameOptions.tileSize;
                                                this.tempTile.visible = true;
                                        }
                                        if (tileY < 0) {
                                                this.tempTile.y = tileY;
                                                this.tempTile.visible = true;
                                        }

                                        break;
                        }
                }

                handleStop(): void {
                        switch (this.dragDirection) {
                                case dragDirection.HORIZONTAL_DRAG:
                                        var shiftAmount = Math.floor(this.distX / (this.gameOptions.tileSize / 2));
                                        shiftAmount = Math.ceil(shiftAmount / 2) % this.gameOptions.fieldSize;
                                        var tempArray = [];
                                        if (shiftAmount > 0) {
                                                for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                        tempArray[(shiftAmount + i) % this.gameOptions.fieldSize] = this.tileArray[this.movingRow][i].tileValue;
                                                }
                                        }
                                        else {
                                                for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                        tempArray[i] = this.tileArray[this.movingRow][(Math.abs(shiftAmount) + i) % this.gameOptions.fieldSize].tileValue;
                                                }
                                        }
                                        var offset = this.distX % this.gameOptions.tileSize;
                                        if (Math.abs(offset) > this.gameOptions.tileSize / 2) {
                                                if (offset < 0) {
                                                        offset = offset + this.gameOptions.tileSize;
                                                } else {
                                                        offset = offset - this.gameOptions.tileSize;
                                                }
                                        }
                                        for (i = 0; i < this.gameOptions.fieldSize; i++) {
                                                this.tileArray[this.movingRow][i].tileValue = tempArray[i];
                                                this.tileArray[this.movingRow][i].tileSprite.frame = tempArray[i];
                                                this.tileArray[this.movingRow][i].tileSprite.x = i * this.gameOptions.tileSize + offset;
                                                this.game.add.tween(this.tileArray[this.movingRow][i].tileSprite).to({
                                                        x: i * this.gameOptions.tileSize
                                                }, this.gameOptions.tweenSpeed, Phaser.Easing.Cubic.Out, true);
                                        }
                                        var tempDestination = -this.gameOptions.tileSize
                                        if (offset < 0) {
                                                this.tempTile.x += this.gameOptions.tileSize * this.gameOptions.fieldSize;
                                                tempDestination = this.gameOptions.fieldSize * this.gameOptions.tileSize;
                                        }
                                        var tween = this.game.add.tween(this.tempTile).to({
                                                x: tempDestination
                                        }, this.gameOptions.tweenSpeed, Phaser.Easing.Cubic.Out, true);
                                        tween.onComplete.add(function () {
                                                if (this.matchInBoard()) {
                                                        this.handleMatches();
                                                } else {
                                                        // console.log(this.movingRow,this.movingCol);
                                                        this.currentState.electroObj.show(this.movingRow, this.movingCol, dragDirection.HORIZONTAL_DRAG);
                                                        playSound(gameSound.error);
                                                        //


                                                        if (shiftAmount != 0) {
                                                                shiftAmount *= -1;
                                                                tempArray = [];
                                                                if (shiftAmount > 0) {
                                                                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                                                tempArray[(shiftAmount + i) % this.gameOptions.fieldSize] = this.tileArray[this.movingRow][i].tileValue;
                                                                        }
                                                                } else {
                                                                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                                                tempArray[i] = this.tileArray[this.movingRow][(Math.abs(shiftAmount) + i) % this.gameOptions.fieldSize].tileValue;
                                                                        }
                                                                }
                                                                for (i = 0; i < this.gameOptions.fieldSize; i++) {
                                                                        this.tileArray[this.movingRow][i].tileValue = tempArray[i];
                                                                        this.tileArray[this.movingRow][i].tileSprite.frame = tempArray[i];
                                                                        this.tileArray[this.movingRow][i].tileSprite.x = i * this.gameOptions.tileSize;


                                                                        var tween = this.game.add.tween(this.tileArray[this.movingRow][i].tileSprite).to({
                                                                                alpha: 0.5
                                                                        }, this.gameOptions.tweenSpeed / 8, Phaser.Easing.Bounce.Out, true, 0, 8, true);

                                                                }

                                                                tween.onComplete.add(function () {
                                                                        // console.log("man1",tween.manager.getAll().length)
                                                                        if (tween.manager.getAll().length == 2) {
                                                                                this.game.input.onDown.add(this.pickTile, this);
                                                                        }
                                                                }, this)
                                                        } else {
                                                                this.game.input.onDown.add(this.pickTile, this);
                                                        }
                                                }
                                        }, this)
                                        break;
                                case dragDirection.VERTICAL_DRAG:
                                        var shiftAmount = Math.floor(this.distY / (this.gameOptions.tileSize / 2));
                                        shiftAmount = Math.ceil(shiftAmount / 2) % this.gameOptions.fieldSize;
                                        var tempArray = [];
                                        if (shiftAmount > 0) {
                                                for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                        tempArray[(shiftAmount + i) % this.gameOptions.fieldSize] = this.tileArray[i][this.movingCol].tileValue;
                                                }
                                        } else {
                                                for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                        tempArray[i] = this.tileArray[(Math.abs(shiftAmount) + i) % this.gameOptions.fieldSize][this.movingCol].tileValue;
                                                }
                                        }
                                        var offset = this.distY % this.gameOptions.tileSize;
                                        if (Math.abs(offset) > this.gameOptions.tileSize / 2) {
                                                if (offset < 0) {
                                                        offset = offset + this.gameOptions.tileSize;
                                                } else {
                                                        offset = offset - this.gameOptions.tileSize;
                                                }
                                        }
                                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                this.tileArray[i][this.movingCol].tileValue = tempArray[i];
                                                this.tileArray[i][this.movingCol].tileSprite.frame = tempArray[i];
                                                this.tileArray[i][this.movingCol].tileSprite.y = i * this.gameOptions.tileSize + offset;
                                                this.game.add.tween(this.tileArray[i][this.movingCol].tileSprite).to({
                                                        y: i * this.gameOptions.tileSize
                                                }, this.gameOptions.tweenSpeed, Phaser.Easing.Cubic.Out, true);
                                        }
                                        var tempDestination = -this.gameOptions.tileSize
                                        if (offset < 0) {
                                                this.tempTile.y += this.gameOptions.tileSize * this.gameOptions.fieldSize;
                                                tempDestination = this.gameOptions.fieldSize * this.gameOptions.tileSize;
                                        }
                                        var tween = this.game.add.tween(this.tempTile).to({
                                                y: tempDestination
                                        }, this.gameOptions.tweenSpeed, Phaser.Easing.Cubic.Out, true);

                                        tween.onComplete.add(function () {
                                                if (this.matchInBoard()) {
                                                        this.handleMatches();
                                                } else {
                                                        // console.log(this.movingRow,this.movingCol);
                                                        this.currentState.electroObj.show(this.movingRow, this.movingCol, dragDirection.VERTICAL_DRAG);

                                                        playSound(gameSound.error);
                                                        if (shiftAmount != 0) {
                                                                shiftAmount *= -1;
                                                                tempArray = [];
                                                                if (shiftAmount > 0) {
                                                                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                                                tempArray[(shiftAmount + i) % this.gameOptions.fieldSize] = this.tileArray[i][this.movingCol].tileValue;
                                                                        }
                                                                } else {
                                                                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                                                tempArray[i] = this.tileArray[(Math.abs(shiftAmount) + i) % this.gameOptions.fieldSize][this.movingCol].tileValue;
                                                                        }
                                                                }
                                                                for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                                                        this.tileArray[i][this.movingCol].tileValue = tempArray[i];
                                                                        this.tileArray[i][this.movingCol].tileSprite.frame = tempArray[i];
                                                                        this.tileArray[i][this.movingCol].tileSprite.y = i * this.gameOptions.tileSize;

                                                                        var tween = this.game.add.tween(this.tileArray[i][this.movingCol].tileSprite).to({
                                                                                alpha: 0.5
                                                                        }, this.gameOptions.tweenSpeed / 8, Phaser.Easing.Bounce.Out, true, 0, 8, true);
                                                                }

                                                                tween.onComplete.add(function () {
                                                                        //console.log("man2",tween.manager.getAll().length)
                                                                        if (tween.manager.getAll().length == 2) {
                                                                                this.game.input.onDown.add(this.pickTile, this);
                                                                        }
                                                                }, this)
                                                        } else {
                                                                this.game.input.onDown.add(this.pickTile, this);
                                                        }
                                                }
                                        }, this)
                                        break;
                        }
                        this.dragDirection = dragDirection.NO_DRAG;
                }


                handleMatches(): void {
                        this.tilesToRemove = [];
                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                this.tilesToRemove[i] = [];
                                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                                        this.tilesToRemove[i][j] = 0;
                                }
                        }

                        this.handleHorizontalMatches();
                        this.handleVerticalMatches();
                        this.checkScore();

                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                                        if (this.tilesToRemove[i][j] != 0) {
                                                var tween = this.game.add.tween(this.tileArray[i][j].tileSprite).to({
                                                        alpha: 0
                                                }, this.gameOptions.fadeSpeed, Phaser.Easing.Linear.None, true);
                                                this.tilePool.push(this.tileArray[i][j].tileSprite);
                                                tween.onComplete.add(function (e) {
                                                        //console.log("man3",tween.manager.getAll().length,tween.manager.getAll())

                                                        if (tween.manager.getAll().length == 2) {

                                                                this.fillVerticalHoles();
                                                                playSound(gameSound.fall);

                                                        }
                                                }, this);
                                                this.tileArray[i][j].isEmpty = true;
                                        }
                                }
                        }
                }

                checkScore(): void {

                        let score = 0;

                        this.tilesToRemove.forEach(element => {

                                element.forEach(element => {

                                        if (element == 1) { score++; this.globalMatches++; }

                                });

                        });

                        //  console.log(score);
                        this.currentState.timerObj.addTime(score * 5);
                        this.currentState.scoreObj.addScore(score * 5);
                        this.currentState.setTilesCollected(this.currentState.getTilesCollected() + score);

                }


                checkLevel() {


                        //console.log(this.currentState.getTilesCollected(), this.currentState.getTiles2Collect())
                        if (this.currentState.getTilesCollected() >= this.currentState.getTiles2Collect()) {

                                this.currentState.nextLevel();
                        }
                }






                handleHorizontalMatches(): void {

                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                var colorStreak = 1;
                                var currentColor = -1;
                                var startStreak = 0;
                                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                                        if (this.tileAt(i, j).tileValue == currentColor) {
                                                colorStreak++;
                                        }
                                        if (this.tileAt(i, j).tileValue != currentColor || j == this.gameOptions.fieldSize - 1) {
                                                if (colorStreak > 2) {
                                                        var endStreak = j - 1
                                                        if (this.tileAt(i, j).tileValue == currentColor) {
                                                                endStreak = j;
                                                        }
                                                        for (var k = startStreak; k <= endStreak; k++) {
                                                                this.tilesToRemove[i][k]++;
                                                        }
                                                }
                                                currentColor = this.tileAt(i, j).tileValue
                                                colorStreak = 1;
                                                startStreak = j;
                                        }
                                }
                        }
                }

                handleVerticalMatches(): void {

                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                var colorStreak = 1;
                                var currentColor = -1;
                                var startStreak = 0;
                                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                                        if (this.tileAt(j, i).tileValue == currentColor) {
                                                colorStreak++;
                                        }
                                        if (this.tileAt(j, i).tileValue != currentColor || j == this.gameOptions.fieldSize - 1) {
                                                if (colorStreak > 2) {
                                                        var endStreak = j - 1
                                                        if (this.tileAt(j, i).tileValue == currentColor) {
                                                                endStreak = j;
                                                        }
                                                        for (var k = startStreak; k <= endStreak; k++) {
                                                                this.tilesToRemove[k][i]++;
                                                        }
                                                }
                                                currentColor = this.tileAt(j, i).tileValue
                                                colorStreak = 1;
                                                startStreak = j;
                                        }
                                }
                        }
                }


                fillVerticalHoles(): void {
                        for (var i = this.gameOptions.fieldSize - 2; i >= 0; i--) {
                                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                                        if (!this.tileArray[i][j].isEmpty) {
                                                var holesBelow = this.countSpacesBelow(i, j);
                                                if (holesBelow) {
                                                        this.moveDownTile(i, j, i + holesBelow, false);
                                                }
                                        }
                                }
                        }
                        for (i = 0; i < this.gameOptions.fieldSize; i++) {
                                var topHoles = this.countSpacesBelow(-1, i);
                                for (j = topHoles - 1; j >= 0; j--) {
                                        var reusedTile = this.tilePool.shift();
                                        reusedTile.y = (j - topHoles) * this.gameOptions.tileSize;
                                        reusedTile.x = i * this.gameOptions.tileSize;
                                        reusedTile.alpha = 1;
                                        var randomTile = this.game.rnd.integerInRange(0, this.gameOptions.tileTypes - 1);
                                        reusedTile.frame = randomTile;
                                        this.tileArray[j][i] = {
                                                tileSprite: reusedTile,
                                                tileValue: randomTile,
                                                isEmpty: false
                                        }
                                        this.moveDownTile(0, i, j, true);
                                }
                        }
                }


                countSpacesBelow(row, col): number {
                        var result = 0;
                        for (var i = row + 1; i < this.gameOptions.fieldSize; i++) {
                                if (this.tileArray[i][col].isEmpty) {
                                        result++;
                                }
                        }
                        return result;
                }

                moveDownTile(fromRow, fromCol, toRow, justMove): void {
                        if (!justMove) {
                                var spriteSave = this.tileArray[fromRow][fromCol].tileSprite;
                                var valueSave = this.tileArray[fromRow][fromCol].tileValue;
                                this.tileArray[toRow][fromCol] = {
                                        tileSprite: spriteSave,
                                        tileValue: valueSave,
                                        isEmpty: false
                                };
                                this.tileArray[fromRow][fromCol].isEmpty = true;
                        }
                        var distanceToTravel = toRow - this.tileArray[toRow][fromCol].tileSprite.y / this.gameOptions.tileSize
                        var tween = this.game.add.tween(this.tileArray[toRow][fromCol].tileSprite).to({
                                y: toRow * this.gameOptions.tileSize
                        }, distanceToTravel * this.gameOptions.fallSpeed, Phaser.Easing.Linear.None, true);
                        tween.onComplete.add(function () {
                                //console.log("man4",tween.manager.getAll().length)
                                if (tween.manager.getAll().length == 2) {
                                        //console.log("shake")
                                        this.shake();
                                        if (this.matchInBoard()) {
                                                this.handleMatches();
                                        } else {
                                                //console.log(this.globalMatches);

                                                this.game.input.onDown.add(this.pickTile, this);
                                                this.bonusLevel();
                                                this.checkLevel();
                                                this.globalMatches = 0;

                                        }
                                }
                        }, this)
                }

                bonusLevel() {

                        let _val: number = 0;
                        if (this.globalMatches >= 6 && this.globalMatches < 9) {
                                _val = 1;
                        } else if (this.globalMatches > 8 && this.globalMatches < 12) {
                                _val = 2;
                        } else if (this.globalMatches > 11 && this.globalMatches < 16) {
                                _val = 3;
                        } else if (this.globalMatches > 15 && this.globalMatches < 21) {
                                _val = 4;
                        } else if (this.globalMatches > 20 && this.globalMatches < 27) {
                                _val = 5;
                        } else if (this.globalMatches > 26) {
                                _val = 6;
                        }


                        if (_val > 0) {

                               // playSound(this.bonusVoice[_val]);
                                let _style: any = { font: 'normal 55px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
                                let _bonutText: Phaser.Text = this.game.add.text(this.game.world.centerX - 150, this.game.world.centerY, this.bonusTexts[_val], _style);
                                _bonutText.font = 'Press Start 2P';
                                _bonutText.anchor.set(0.5);

                                let _tween: Phaser.Tween = this.game.add.tween(_bonutText).to({ y: this.game.world.centerY - 50, alpha: 0 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
                                _tween.onComplete.add((param) => {
                                        param.kill(); param.destroy();
                                }, null, null, [_bonutText]);

                        }


                }





                shake() {


                        this.game.camera.shake(0.005, 200, true, Phaser.Camera.SHAKE_VERTICAL, true)
                }

                matchInBoard(): boolean {
                        for (var i = 0; i < this.gameOptions.fieldSize; i++) {
                                for (var j = 0; j < this.gameOptions.fieldSize; j++) {
                                        if (this.isMatch(i, j)) {
                                                return true;
                                        }
                                }
                        }
                        return false;
                }






        }


}