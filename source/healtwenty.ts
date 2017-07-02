
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/GameOver.ts"/>

module healtwenty {

    let _newGame: initGame;
    let _playerScore: number = 0;
    let _firstTime: boolean = true;
    let _level: number = 2;
    let _game: Phaser.Game;
    let _gameSetup: boolean = false;
    let _gameSounds: Array<Phaser.Sound> = [];
    let _ismobile: boolean = true;
    let _player: any;

    export function setFirstTime(_val: boolean): void { _firstTime = _val; }
    export function getFirstTime(): boolean { return _firstTime; }

    export function getScore(): number { return _playerScore; }
    export function setScore(val: number): void { _playerScore = val; }

    export function setGame(game: Phaser.Game) { _game = game; }
    export function getGame(): Phaser.Game { return _game; }

    export function setPlayer(player: any) { _player = player; }
    export function getPlayer(): any { return _player; }

    export function getSound(_sound: gameSound): Phaser.Sound {

        return _gameSounds[_sound];

    }

    export function playSound(_sound: gameSound): void {

        _gameSounds[_sound].play();

    }

    export function stopSound(_sound: gameSound): void {

        _gameSounds[_sound].stop();

    }

    export function fadeOutSound(_sound: gameSound,_time:number): void {

        _gameSounds[_sound].fadeOut(_time);

    }

    export function fadeInSound(_sound: gameSound,_time:number): void {

        _gameSounds[_sound].fadeIn(_time);

    }

    export function pauseSound(_sound: gameSound): void {

        _gameSounds[_sound].stop();

    }

    export function setSoundVolume(_sound: gameSound, _volume: number): void {

        _gameSounds[_sound].volume = _volume;

    }

    export enum gameSound {
        intro,
        menu,
        gameover,
        ingame,
        thunder,
        squealing,
        fall,
        error,
        levelchange,
        button,
        verygood,
        thatsgreat,
        wow,
        excellent,
        fantastic,
        amazing
    }

    export function setUpGame(_game: Phaser.Game): void {

        if (!_gameSetup) {

            //console.log("gameSetup");
            setGame(_game);

            var _sound: Phaser.Sound;
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                _sound = _game.add.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].volume, gameData.assets.sounds[i].loop);
                _sound.allowMultiple = true;
                _gameSounds.push(_sound);
            }
            _gameSetup = true;

        }

    }

    export function isMobile(): boolean {

        return _ismobile;
    }

    export function setDevice(isMobile: boolean): void {

        _ismobile = isMobile;
    }



    export function getUrlParameter(sParam: string): any {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    export function goState(_state: string, _game: Phaser.Game): void {

        var st = <Phaser.Plugin.StateTransition>_game.plugins.add(Phaser.Plugin.StateTransition);

        st.configure({
            duration: 500,
            ease: Phaser.Easing.Exponential.InOut,
            properties: { alpha: 0 }
        });
        st.to(_state);
        /*
    if (isMobile()) {

        st.configure({
            duration: 1000,
            ease: Phaser.Easing.Exponential.InOut,
            properties: { alpha: 0 }
        });

    } else {
        st.configure({
            duration: 1000,
            ease: Phaser.Easing.Exponential.InOut,
            properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
        });

    }


   */

    }

    export function toggleFullScreen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {



            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {


            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    export function saveScore(): void {

        let _playerObj:any=getPlayer();

        $.ajax({
            url: "http://www.zero89.it/api/jsonp/scores/core.aspx",
            data: { who: "save", game: "20years", name: JSON.stringify(_playerObj), callback: "gamescores", score: healtwenty.getScore() },
            dataType: "jsonp",
            type: "POST",
            jsonpCallback: "gamescores",
            context: document.body
        }).done( (data)=> { }).fail((err)=>{ console.log(err)});

    }

    export class initGame {


        public game: Phaser.Game;

        constructor(width?: number, height?: number) {

            var dpr: number = 1;
            try {
                if (devicePixelRatio != undefined) {
                    dpr = devicePixelRatio || 1;


                    if (!width) {
                        width = screen.width * dpr;
                    }
                    if (!height) {
                        height = screen.height * dpr;
                    }

                }

            } catch (err) { }

            this.game = new Phaser.Game(width, height, Phaser.CANVAS, "", null, false, true);

            this.game.state.add("Boot", Boot, false);
            this.game.state.add("Preloader", Preloader, false);
            this.game.state.add("Intro", Intro, false);
            this.game.state.add("Menu", Menu, false);
            this.game.state.add("GameGem", GameGem, false);
            this.game.state.add("Gameover", GameOver, false);
            this.game.state.start("Boot");






        }

    }


    window.onresize = () => { }

    window.onload = () => { _newGame = new initGame(1024, 768); }


}

// when the page has finished loading, create our game
var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }

};


let gameData: any = {


    assets: {
        spritesheets: [

            { name: "tiles", path: "assets/images/game/ingame/tiles2.png", width: 80, height: 80, frames: 6 },
            { name: "flux", path: "assets/images/game/ingame/flux2.png", width: 160, height: 190, frames: 3 },
            { name: "dots", path: "assets/images/game/intro/dots.png", width: 33, height: 62, frames: 2 },
            { name: "dots2", path: "assets/images/game/intro/dots2.png", width: 33, height: 62, frames: 2 },
            { name: "flame", path: "assets/images/game/intro/flame.png", width: 68, height: 82, frames: 10 },
            { name: "roberto", path: "assets/images/game/intro/roberto.png", width: 111, height: 99, frames: 2 },
            { name: "tileLevel", path: "assets/images/game/ingame/tileLevel.png", width: 75, height: 75, frames: 3 },
            { name: "electro", path: "assets/images/game/ingame/electro.png", width: 235, height: 640, frames: 10 }
            
        ],

        images: [

            { name: "bgGame", path: "assets/images/game/ingame/bg.png" },
            { name: "energyLayer1", path: "assets/images/game/ingame/energy-layer1.png" },
            { name: "energyLayer2", path: "assets/images/game/ingame/energy-layer2.png" },

            { name: "gameoverBg", path: "assets/images/game/gameover/gameoverBg.png" },
            { name: "btnBlue", path: "assets/images/game/btn-blue.png" },
            { name: "btnRed", path: "assets/images/game/btn-red.png" },
            { name: "btnPurple", path: "assets/images/game/btn-purple.png" },
            { name: "btnGreen", path: "assets/images/game/btn-green.png" },

            { name: "introPast", path: "assets/images/game/intro/past.jpg" },
            { name: "introNow", path: "assets/images/game/intro/now.jpg" },
            { name: "celebrating", path: "assets/images/game/intro/celebrating.png" },

            { name: "sky", path: "assets/images/game/intro/sky.png" },
            { name: "rocks", path: "assets/images/game/intro/rocks.png" },
            { name: "ground", path: "assets/images/game/intro/ground.png" },

            { name: "deloreanSide", path: "assets/images/game/intro/delorean-side.png" },
            { name: "deloreanWheelF", path: "assets/images/game/intro/delorean-wheel-ff.png" },
            { name: "deloreanWheelB", path: "assets/images/game/intro/delorean-wheel-f.png" },
            { name: "speed", path: "assets/images/game/ingame/speed.png" },
            { name: "cloud1", path: "assets/images/game/intro/cloud1.png" },
            { name: "cloud2", path: "assets/images/game/intro/cloud2.png" },
            { name: "bttf-logo", path: "assets/images/game/intro/bttf-logo.png" },
            { name: "howtoplay", path: "assets/images/game/intro/howtoplay.jpg" },
            { name: "levelsBg", path: "assets/images/game/ingame/levelsBg.png" },
            { name: "people", path: "assets/images/game/ingame/people.png" },
            { name: "btnx", path: "assets/images/game/btnx.png" },
             { name: "deloreanBg", path: "assets/images/game/gameover/deloreanBg.png" },
              { name: "roblegs", path: "assets/images/game/gameover/rob-legs.png" },
               { name: "robchest", path: "assets/images/game/gameover/rob-chest.png" },
                { name: "robhead", path: "assets/images/game/gameover/rob-head.png" },
                 { name: "roblarm", path: "assets/images/game/gameover/rob-l-arm.png" },
                  { name: "robrarm", path: "assets/images/game/gameover/rob-r-arm.png" }

        ],

        sounds: [

            { name: "intro", paths: ["assets/sounds/intro1.ogg", "assets/sounds/intro1.m4a"], volume: 3, loop: false },
            { name: "menu", paths: ["assets/sounds/main.ogg", "assets/sounds/main.m4a"], volume: .1, loop: true },
            { name: "gameover", paths: ["assets/sounds/gameover.ogg", "assets/sounds/gameover.m4a"], volume: .2, loop: true },
            { name: "ingame", paths: ["assets/sounds/ingame.ogg", "assets/sounds/ingame.m4a"], volume: .2, loop: true },
            { name: "thunder", paths: ["assets/sounds/thunder.ogg", "assets/sounds/thunder.m4a"], volume: .2, loop: false },
            { name: "squealing", paths: ["assets/sounds/squealing.ogg", "assets/sounds/squealing.m4a"], volume: .2, loop: false },
            { name: "fall", paths: ["assets/sounds/fall.ogg", "assets/sounds/fall.m4a"], volume: .5, loop: false },
             { name: "error", paths: ["assets/sounds/error.ogg", "assets/sounds/error.m4a"], volume: .3, loop: false },
             { name: "levelchange", paths: ["assets/sounds/levelchange.ogg", "assets/sounds/levelchange.m4a"], volume: .2, loop: false },
             { name: "button", paths: ["assets/sounds/button.ogg", "assets/sounds/button.m4a"], volume: .5, loop: false },

             /*{ name: "verygood", paths: ["assets/sounds/VO_VRYGOOD.ogg", "assets/sounds/button.m4a"], volume: .5, loop: false },
             { name: "thatsgreat", paths: ["assets/sounds/VO_THTGREAT.ogg", "assets/sounds/button.m4a"], volume: .5, loop: false },
             { name: "wow", paths: ["assets/sounds/VO_WOW.ogg", "assets/sounds/button.m4a"], volume: .5, loop: false },
             { name: "excellent", paths: ["assets/sounds/VO_EXLNT.ogg", "assets/sounds/button.m4a"], volume: .5, loop: false },
             { name: "fantastic", paths: ["assets/sounds/VO_FANTSTC.ogg", "assets/sounds/button.m4a"], volume: .5, loop: false },
             { name: "amazing", paths: ["assets/sounds/VO_AMAZING.ogg", "assets/sounds/button.m4a"], volume: .5, loop: false },*/




      


            /*{ name: "starwars", paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"], volume: 1, loop: true },
            { name: "lightSaber", paths: ["assets/sounds/lightSaber.ogg", "assets/sounds/lightSaber.m4a"], volume: 1, loop: false },
            { name: "tieShot", paths: ["assets/sounds/tieShot.ogg", "assets/sounds/tieShot.m4a"], volume: .5, loop: false },
            { name: "game", paths: ["assets/sounds/gameTheme.ogg", "assets/sounds/gameTheme.m4a"], volume: 1, loop: true },
            { name: "engine2", paths: ["assets/sounds/engine2.ogg", "assets/sounds/engine2.m4a"], volume: 1, loop: true },
            { name: "explosion", paths: ["assets/sounds/explosion.ogg", "assets/sounds/explosion.m4a"], volume: 1, loop: false },
            { name: "bonus", paths: ["assets/sounds/bonus.ogg", "assets/sounds/bonus.m4a"], volume: .5, loop: false },
            { name: "colliderSound", paths: ["assets/sounds/colliderSound.ogg", "assets/sounds/colliderSound.m4a"], volume: 1, loop: false },
            { name: "yeahh", paths: ["assets/sounds/yeahh.ogg", "assets/sounds/yeahh.m4a"], volume: 1, loop: false },
            { name: "final", paths: ["assets/sounds/final.ogg", "assets/sounds/final.m4a"], volume: .5, loop: true },
            { name: "attackSequence", paths: ["assets/sounds/attackSequence.ogg", "assets/sounds/attackSequence.m4a"], volume: .5, loop: false },
            { name: "stayFocused", paths: ["assets/sounds/stayFocused.ogg", "assets/sounds/stayFocused.m4a"], volume: .5, loop: false },
            { name: "watchEnemy", paths: ["assets/sounds/watchEnemy.ogg", "assets/sounds/watchEnemy.m4a"], volume: .5, loop: false },
            { name: "TheForce", paths: ["assets/sounds/TheForce.ogg", "assets/sounds/TheForce.m4a"], volume: .5, loop: false },
            { name: "stayOnTarget", paths: ["assets/sounds/stayOnTarget.ogg", "assets/sounds/stayOnTarget.m4a"], volume: .5, loop: false },
            { name: "tieFly", paths: ["assets/sounds/tieFly.ogg", "assets/sounds/tieFly.m4a"], volume: .5, loop: false },
            { name: "useTheForce", paths: ["assets/sounds/useTheForce.ogg", "assets/sounds/useTheForce.m4a"], volume: .5, loop: false },
            { name: "booo", paths: ["assets/sounds/booo.ogg", "assets/sounds/booo.m4a"], volume: .7, loop: false },
            { name: "loser", paths: ["assets/sounds/loser.ogg", "assets/sounds/loser.m4a"], volume: .5, loop: false },
            { name: "clap", paths: ["assets/sounds/clap.ogg", "assets/sounds/clap.m4a"], volume: 1, loop: false }

           */
        ],

        bitmapfont: [
            { name: "digital", imgpath: "assets/fonts/digital_0.png", xmlpath: "assets/fonts/digital.xml", jsonpath: "" }
        ],


        profiles: [

            {
                agency: "@HealthwareInternational", surname: "Bove", role: "Senior Acoount Manager",
                name: "Annadina",
                picture: "assets/images/profiles/1_annadina.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Quattrucci", role: "Project Manager",
                name: "Valentina",
                picture: "assets/images/profiles/37_valentina.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "Esposito", role: "Senior Developer",
                name: "Gianluca",
                picture: "assets/images/profiles/75_gianluca.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "D'Urso", role: "Marketing & External Relations assistant",
                name: "Giovanna",
                picture: "assets/images/profiles/76_giovanna.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "Pannella", role: "Marketing & External Relations",
                name: "Antonietta",
                picture: "assets/images/profiles/2_antonietta.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Marinelli", role: "System Administrator",
                name: "Carlo",
                picture: "assets/images/profiles/3_carlo.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Ambrosio", role: "Account executive",
                name: "Liana",
                picture: "assets/images/profiles/4_liana.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "Palladino", role: "Delivery Director",
                name: "Rosy",
                picture: "assets/images/profiles/5_rosy.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Pirofalo", role: "Experience Director",
                name: "Elena",
                picture: "assets/images/profiles/6_elena.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Amelia", role: "Group Account Director",
                name: "Michela",
                picture: "assets/images/profiles/7_michela.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Anfuso", role: "Senior Developer",
                name: "Gianni",
                picture: "assets/images/profiles/8_gianni.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "De Luca", role: "Content Strategist",
                name: "Melania",
                picture: "assets/images/profiles/9_melania.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Labruna", role: "Media Strategy Director",
                name: "Tiziana",
                picture: "assets/images/profiles/10_tiziana.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Marafioti", role: "Business Development Manager",
                name: "Joe",
                picture: "assets/images/profiles/11_joe.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Roberto", role: "Technical Architect",
                name: "Luca",
                picture: "assets/images/profiles/12_luca.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Mari", role: "Senior Technical Architect",
                name: "Lino",
                picture: "assets/images/profiles/13_lino.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Scala", role: "Strategy Director",
                name: "Ferdinando",
                picture: "assets/images/profiles/14_ferdinando.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Pantalena", role: "IT&IS Manager",
                name: "Daniele",
                picture: "assets/images/profiles/15_daniele.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Casella", role: "Senior Developer",
                name: "Daniela",
                picture: "assets/images/profiles/16_daniela.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Fortini", role: "Content Manager",
                name: "Flaviana",
                picture: "assets/images/profiles/17_flaviana.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Ferrara", role: "Office Manager",
                name: "Barbara",
                picture: "assets/images/profiles/18_barbara.jpg"
            },
               {
                agency: "PM.it", surname: "Sommino", role: "Associate Designer",
                name: "Francesca",
                picture: "assets/images/profiles/74_francesca.jpg"
            }

            ,

            {
                agency: "@HealthwareInternational", surname: "Fortini", role: "Managing Director",
                name: "Fulvio",
                picture: "assets/images/profiles/19_fulvio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Wenzel", role: "Content Manager",
                name: "Annegret",
                picture: "assets/images/profiles/20_annegret.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Villani", role: "Technical Architect",
                name: "Ivana",
                picture: "assets/images/profiles/21_ivana.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Spacagna", role: "Senior Technical Architect",
                name: "Fabio",
                picture: "assets/images/profiles/22_fabio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Santoro", role: "Senior Project Manager",
                name: "Valter",
                picture: "assets/images/profiles/23_valter.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Pozzi", role: "Account Coordinator",
                name: "Rebecca",
                picture: "assets/images/profiles/70_rebecca.jpg"
            }
            ,

            {
                agency: "@HealthTouch", surname: "Gioia", role: "Associate Designer",
                name: "Simona",
                picture: "assets/images/profiles/80_simona.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Trezza", role: "Senior Developer",
                name: "Pietro",
                picture: "assets/images/profiles/24_pietro.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Pisapia", role: "Finance Controller",
                name: "Sara",
                picture: "assets/images/profiles/25_sara.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Spera", role: "Senior Developer",
                name: "Gianni",
                picture: "assets/images/profiles/26_gianni.jpg"
            },

            {
                agency: "@HealthTouch", surname: "Catalano", role: "Managing Partner",
                name: "Salvatore",
                picture: "assets/images/profiles/67_salvatore.jpg"
            }
            ,

            {
                agency: "@HealthwareInternational", surname: "Paraggio", role: "Art Director",
                name: "Andrea",
                picture: "assets/images/profiles/27_andrea.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "De Simone", role: "Senior Art Director",
                name: "Alfredo",
                picture: "assets/images/profiles/28_alfredo.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Corti", role: "Junior Copywriter",
                name: "Chiara",
                picture: "assets/images/profiles/66_chiara.jpg"
            },

            {
                agency: "@Paginemediche", surname: "Iagulli", role: "Technology Operations",
                name: "Pierpaolo",
                picture: "assets/images/profiles/29_pierpaolo.jpg"
            },
            {
                agency: "@Esense ventures", surname: "Bilotta", role: "Operations & Portfolio Manager",
                name: "Graziella",
                picture: "assets/images/profiles/30_graziella.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Vento", role: "Account Coordinator",
                name: "Giulia",
                picture: "assets/images/profiles/31_giulia.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Bakhareva", role: "Account Coordinator",
                name: "Alexandra",
                picture: "assets/images/profiles/71_alexandra.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Palermo", role: "Developer",
                name: "Giorgio",
                picture: "assets/images/profiles/68_giorgio.jpg"
            }

            ,
            {
                agency: "@Videum", surname: "Scarpinati", role: "Project & Content Manager",
                name: "Sara",
                picture: "assets/images/profiles/33_sara.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Meo", role: "Designer",
                name: "Vincenzo",
                picture: "assets/images/profiles/34_vincenzo.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Finelli", role: "Creative Technologist",
                name: "Erminio",
                picture: "assets/images/profiles/35_erminio.jpg"
            },
            {
                agency: "@Paginemediche", surname: "Arminante", role: "Marketing & Communications PM.it",
                name: "Antonella",
                picture: "assets/images/profiles/36_antonella.jpg"
            },
            {
                agency: "@Esense ventures", surname: "Vinci", role: "President eSense",
                name: "Leo",
                picture: "assets/images/profiles/38_leo.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Raimondo", role: "Presenation Layer Architect",
                name: "Francesco",
                picture: "assets/images/profiles/39_francesco.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Arminante", role: "",
                name: "Floriana",
                picture: "assets/images/profiles/72_floriana.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "Ascione", role: "CEO",
                name: "Roberto",
                picture: "assets/images/profiles/40_roberto.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Sabatino", role: "Senior Account Manager ",
                name: "Gabriele",
                picture: "assets/images/profiles/41_gabriele.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "Gualdi", role: "Office Manager",
                name: "Francesca",
                picture: "assets/images/profiles/42_francesca.jpg"
            },



            {
                agency: "@HealthwareInternational", surname: "Miconi", role: "Account Manager",
                name: "Roberta",
                picture: "assets/images/profiles/44_roberta.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "Nardone", role: "Account Manager",
                name: "Manuela",
                picture: "assets/images/profiles/45_manuela.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Fortini", role: "Senior Project Manager",
                name: "Fabrizio",
                picture: "assets/images/profiles/46_fabrizio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Raimondo", role: "Financial Operations Manager",
                name: "Anna",
                picture: "assets/images/profiles/47_anna.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Amore", role: "Presentation Layer Developer",
                name: "Nicola",
                picture: "assets/images/profiles/48_nicola.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Petraglia", role: "Associate Experience Director",
                name: "Gianfranco",
                picture: "assets/images/profiles/49_gianfranco.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "D'Amelia", role: "Group Account Director",
                name: "Alessandra",
                picture: "assets/images/profiles/50_alessandra.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Romano", role: "Senior Developer",
                name: "Vincenzo",
                picture: "assets/images/profiles/51_vincenzo.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Carroccio", role: "Associate Art Director",
                name: "Antonio",
                picture: "assets/images/profiles/52_antonio.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Muccioli", role: "Technical Architect",
                name: "Davide",
                picture: "assets/images/profiles/53_davide.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Peluso", role: "Content & Social Media Strategy",
                name: "Marina",
                picture: "assets/images/profiles/73_marina.jpg"
            }
            ,
            {
                agency: "@HealthwareInternational", surname: "Memoli", role: "Presentation Layer Developer",
                name: "Christian",
                picture: "assets/images/profiles/55_christian.jpg"
            },

            {
                agency: "@HealthTouch", surname: "Collina", role: "Content Strategist",
                name: "Roberta",
                picture: "assets/images/profiles/57_roberta.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Ravot", role: "Scientific Director",
                name: "Elisabetta",
                picture: "assets/images/profiles/58_elisabetta.jpg"
            },
            {
                agency: "@intouchsolutions", surname: "Robbiani", role: "Finance Controller",
                name: "Luisa",
                picture: "assets/images/profiles/82_luisa.jpg"
            },
            {
                agency: "@HealthTouch", surname: "Ascienzo", role: "Senior Art Director",
                name: "Dennis",
                picture: "assets/images/profiles/81_dennis.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Scali", role: "Co-Founder @ Reckon Digital LTd",
                name: "Gabriel",
                picture: "assets/images/profiles/77_gabriel.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Zecchina", role: "Senior Medical Writer ",
                name: "Marica",
                picture: "assets/images/profiles/59_marica.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Fulgheri", role: "Strategy Director",
                name: "Alessandro",
                picture: "assets/images/profiles/60_alessandro.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "Tovo", role: "Account Manager",
                name: "Monica",
                picture: "assets/images/profiles/62_monica.jpg"
            },

            {
                agency: "@HealthwareInternational", surname: "Pattini", role: "Client Service Director",
                name: "Patrizia",
                picture: "assets/images/profiles/64_patrizia.jpg"
            },
            {
                agency: "@HealthwareInternational", surname: "Alexandre", role: "Group Account Director",
                name: "Valerie",
                picture: "assets/images/profiles/65_valerie.jpg"
            },





            {
                agency: "@HealthwareInternational", surname: "Vettori", role: "Client Service Director",
                name: "Fabrizio",
                picture: "assets/images/profiles/69_fabrizio.jpg"
            },



            {
                agency: "@HealthwareInternational", surname: "Natali", role: "Co-Founder @ Reckon Digital LTd",
                name: "Fabio",
                picture: "assets/images/profiles/78_fabio.jpg"
            }
            ,


            {
                agency: "@HealthwareInternational", surname: "Chillè", role: "General Partner",
                name: "Gerry",
                picture: "assets/images/profiles/79_gerry.jpg"
            },







            {
                agency: "@intouchsolutions", surname: "Capretti", role: "Medical Writer",
                name: "Valentina",
                picture: "assets/images/profiles/54_valentina.jpg"
            }
        ]

    }

}











