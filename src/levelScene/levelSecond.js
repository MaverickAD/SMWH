import Phaser from 'phaser';
import {BottleSpawner, Etiqueteur, Bottle, GrapeSpawner, Press, Command} from "./methodLevel/objectsLevel2";
import {walls} from "./methodLevel/wallsLevel2";

const ww = window.innerWidth;
const wh = window.innerHeight;

export default class LevelSecond extends Phaser.Scene {
    constructor() {
        super({key: "LevelSecond"});
    }

    preload() {
        this.load.image('persobas1grand',           'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-bas1-grand.png');
        this.load.image('persobas2grand',           'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-bas2-grand.png');
        this.load.image('persodroite1grand',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-droite1-grand.png');
        this.load.image('persodroite2grand',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-droite2-grand.png');
        this.load.image('persogauche1grand',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-gauche1-grand.png');
        this.load.image('persogauche2grand',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-gauche2-grand.png');
        this.load.image('persohaut1grand',          'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-haut1-grand.png');
        this.load.image('persohaut2grand',          'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-haut2-grand.png');
        this.load.image('packer1',                  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/packer1.png');
        this.load.image('packer2',                  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/packer2.png');
        this.load.image('bottleEmpty',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_empty_without_tag.png');
        this.load.image('bottleEmptyWithTag',       'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_empty_with_tag.png');
        this.load.image('bottleRed',      'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_red_without_tag.png');
        this.load.image('bottleRedWithTag',         'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_red_with_tag.png');
        this.load.image('bottleRose',     'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_rose_without_tag.png');
        this.load.image('bottleRoseWithTag',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_rose_with_tag.png');
        this.load.image('bottleWhite',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_white_without_tag.png');
        this.load.image('bottleWhiteWithTag',       'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_white_with_tag.png');
        this.load.image('GrapeRed',                 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/GrapeRed.png');
        this.load.image('GrapeWhite',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/GrapeWhite.png');
        this.load.image('bush',                     'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bush.png');
        this.load.image('grass',                    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/grass.png');
        this.load.image('pressEmpty',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressEmpty.png');
        this.load.image('pressHalfRedUnpressed',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressHalfRedUnpressed.png');
        this.load.image('pressHalfWhiteUnpressed',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressHalfWhiteUnpressed.png');
        this.load.image('pressFullRedUnpressed1',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullRedUnpressed.png');
        this.load.image('pressFullRedUnpressed2',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullRedUnpressed2.png');
        this.load.image('pressFullRedUnpressed3',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullRedUnpressed3.png');
        this.load.image('pressFullWhiteUnpressed1',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullWhiteUnpressed.png'); 
        this.load.image('pressFullWhiteUnpressed2',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullWhiteUnpressed2.png'); 
        this.load.image('pressFullWhiteUnpressed3',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullWhiteUnpressed3.png'); 
        this.load.image('pressFullRoseUnpressed1',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullRoseUnpressed.png');
        this.load.image('pressFullRoseUnpressed2',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullRoseUnpressed2.png');
        this.load.image('pressFullRoseUnpressed3',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullRoseUnpressed3.png');
        this.load.image('pressWhitePressed',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressWhitePressed.png');
        this.load.image('pressRedPressed',          'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressRedPressed.png');
        this.load.image('pressRosePressed',         'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressRosePressed.png');
        this.load.image('shelf',                    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/shelf.png');
        this.load.image('ground',                   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/groundLevel2.png');
        this.load.image('commandRed',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/centaure.png');
        this.load.image('commandRose',              'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/cyclope.png');
        this.load.image('commandWhite',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/satyre.png');
        this.load.image('fenceHori',                'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/fence_horizontale.png');
        this.load.image('fenceVert',                'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/fence_vertical.png');
        this.load.image('fence',                    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/fence_alone.png');
        this.load.image('alter1bas1',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter1-marche-bas.png');
        this.load.image('alter1bas2',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter1-marche-bas1.png');
        this.load.image('alter1droite1',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter1-marche-droite.png');
        this.load.image('alter1droite2',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter1-marche-droite1.png');
        this.load.image('alter1gauche1',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter1-marche-gauche.png');
        this.load.image('alter1gauche2',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter1-marche-gauche1.png');
        this.load.image('alter1haut1',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter1-marche-haut.png');
        this.load.image('alter1haut2',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter1-marche-haut1.png');
        this.load.image('alter2bas1',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter2-marche-bas.png');
        this.load.image('alter2bas2',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter2-marche-bas1.png');
        this.load.image('alter2droite1',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter2-marche-droite.png');
        this.load.image('alter2droite2',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter2-marche-droite1.png');
        this.load.image('alter2gauche1',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter2-marche-gauche.png');
        this.load.image('alter2gauche2',             'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter2-marche-gauche1.png');
        this.load.image('alter2haut1',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter2-marche-haut.png');
        this.load.image('alter2haut2',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/alter2-marche-haut1.png');
    }


    create() {
        this.add.tileSprite(ww * 0.5 , wh * 0.5  ,  ww , wh , 'ground').setScale(1);
        this.add.tileSprite(ww * (9/12), wh * (6.5/8) ,  ww * (1/2), wh * (3/8), 'grass');


        this.add.tileSprite(ww * (22/24) ,  wh *  (10/16) ,   ww * (2/12),   wh * (1.45/16), "fenceHori");
        this.add.tileSprite(ww * (14/24),  wh *  (10/16) ,   ww * (2/12),   wh * (1.45/16), "fenceHori");
        this.add.tileSprite(ww * (12/24),  wh *  (10.5/16) , ww * (0.2/24),wh * (1.4/16),  "fenceVert");
        this.add.tileSprite(ww * (12/24),  wh *  (15/16) ,   ww * (0.2/24),wh * (2/16),  "fenceVert");
        [ww * (12/24),  wh *  (10.5/16) , ww * (0.25/24),wh * (1/16)],
        [ww * (12/24),  wh *  (15/16) ,   ww * (0.25/24),wh * (2/16)],
 

        //init player
        this.ball = this.add.rectangle(400, 250, 40, 75, 0xFFFFFF, 0);
        this.physics.add.existing(this.ball);
        this.ball.body.setCollideWorldBounds(true, 0.3, 0.3);

        
        walls.forEach(elem => {
            let closure = this.add.rectangle(...elem, 0xFFFFFF, 0);
            this.physics.add.existing(closure, true);
            this.physics.add.collider(closure, this.ball);
        });
        
        //init key of keyboard
        this.keyBoard = this.input.keyboard;
        this.inputKeysDir  = this.keyBoard.addKeys('Z,Q,S,D,UP,RIGHT,LEFT,UP,DOWN', true, true);

        this.inputKeysMeta = this.keyBoard.addKeys('SHIFT,SPACE');
        this.upKeys        = [this.inputKeysDir.UP,    this.inputKeysDir.Z];
        this.downKeys      = [this.inputKeysDir.DOWN,  this.inputKeysDir.S];
        this.leftKeys      = [this.inputKeysDir.LEFT,  this.inputKeysDir.Q];
        this.rightKeys     = [this.inputKeysDir.RIGHT, this.inputKeysDir.D];

        this.lastShiftDown = 0;
        this.lastSpaceDown = 0;
        this.loosedSpeedperFrame = 20;

        //init bottle spawner
        this.bottleSpawner = 
            new BottleSpawner(
                this.add.rectangle(ww*(3.5/12), wh*(8/8), ww*(2/12), wh*(1/8), 0xFFD700, 0), this
            );
        
        this.etiqueteur = 
            new Etiqueteur(
                this.add.rectangle(ww*(22.8/24), wh*(6.5/16), ww*(1.5/24), wh*(2/8), 0xFFD700, 1), this
            );

        this.allGrapeSpawner = [
            new GrapeSpawner(
                this.add.rectangle(ww*(9/12), wh*(7.5/8), ww*(1/20), wh*(1/12), 0xFFD700, 0), this, "White"
            ),

            new GrapeSpawner(
                this.add.rectangle(ww*(11.5/12), wh*(6.5/8), ww*(1/20), wh*(1/12), 0xFFD700, 0), this, "Red"
            ),
        ]
        

        this.allPress = [
            new Press (
                this.add.rectangle(ww*(7.5/12), wh*(2.5/16), ww*(0.5/12), wh*(1.5/12), 0xFFD700, 0), this, false
            ), 
            new Press (
                this.add.rectangle(ww*(9.5/12), wh*(2.5/16), ww*(0.5/12), wh*(1.5/12), 0xFFD700, 0), this , false
            ),
            new Press (
                this.add.rectangle(ww*(1.5/24), wh*(6.5/8), ww*(0.5/12), wh*(1.5/12), 0xFFD700, 0), this , true
            ),
            new Press (
                this.add.rectangle(ww*(1.5/24), wh*(7.5/16), ww*(0.5/12), wh*(1.5/12), 0xFFD700, 0), this , true
            )
        ]

        this.allCommands = [];

        
        this.secBall = undefined;//init if something are in the hand
        
        //sprite for the player, walk effect
        this.allFramesWalk = [[
            this.add.image(this.ball.x, this.ball.y, 'persobas1grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persobas2grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persohaut1grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persohaut2grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persodroite1grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persodroite2grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persogauche1grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persogauche2grand').setScale(2.5)
            ],
            [
            this.add.image(this.ball.x, this.ball.y, 'alter1bas1').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'alter1bas2').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'alter1haut1').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'alter1haut2').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'alter1droite1').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'alter1droite2').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'alter1gauche1').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'alter1gauche2').setScale(2.5)
            ],
            [
                this.add.image(this.ball.x, this.ball.y, 'alter2bas1').setScale(2.5),
                this.add.image(this.ball.x, this.ball.y, 'alter2bas2').setScale(2.5),
                this.add.image(this.ball.x, this.ball.y, 'alter2haut1').setScale(2.5),
                this.add.image(this.ball.x, this.ball.y, 'alter2haut2').setScale(2.5),
                this.add.image(this.ball.x, this.ball.y, 'alter2droite1').setScale(2.5),
                this.add.image(this.ball.x, this.ball.y, 'alter2droite2').setScale(2.5),
                this.add.image(this.ball.x, this.ball.y, 'alter2gauche1').setScale(2.5),
                this.add.image(this.ball.x, this.ball.y, 'alter2gauche2').setScale(2.5)
            ]

        ];
        this.allFramesWalk.forEach(tab => tab.forEach(i => i.visible = false));
        this.allFramesWalk[0].visible = true;
        this.actualFrame = 0;
        this.wichSubFrame = 0;

        this.allBottle = []
        this.allCommands.push(new Command(this, 1));
        this.commandState = [true, false, false];

        this.currentAlter = 1;

        this.score = 0;

        this.counter = 0;
        
    }
    
    update() {
        this.counter ++;


        //if player are something in his hand, put the object near of player
        if(this.secBall){
            this.secBall.obj.x = this.ball.x + 10;
            this.secBall.x = this.ball.x + 10;
            this.secBall.obj.y = this.ball.y + 10;
            this.secBall.y = this.ball.y + 10;
        }

        //switch alter
        if(this.counter % 180 == 0){
            this.currentAlter = Math.floor(Math.random() * 3 + 1);
            console.log(this.currentAlter);
        }
        
        //update of sprite when the player move
        this.allFramesWalk.forEach(tab => tab.forEach(i => {
            i.x = this.ball.x;
            i.y = this.ball.y;
        }));

        const vx = this.ball.body.velocity.x;
        const vy = this.ball.body.velocity.y;

        if (vx > 0) this.ball.body.setVelocityX(Math.max(vx - this.loosedSpeedperFrame, 0));
        if (vy > 0) this.ball.body.setVelocityY(Math.max(vy - this.loosedSpeedperFrame, 0));
        if (vx < 0) this.ball.body.setVelocityX(Math.min(vx + this.loosedSpeedperFrame, 0));
        if (vy < 0) this.ball.body.setVelocityY(Math.min(vy + this.loosedSpeedperFrame, 0));

        if (vx > -400 && vx < 400) {
            if (this.anyOfKey(this.rightKeys)) {
                this.ball.body.setVelocityX(300 + (this.currentAlter == 2 ? 50 : (this.currentAlter == 3 ? -50 : 0)));
                this.actualFrame = 4;
            }
            else if (this.anyOfKey(this.leftKeys)) {
                this.ball.body.setVelocityX(-300 - (this.currentAlter == 2 ? 50 : (this.currentAlter == 3 ? -50 : 0)));
                this.actualFrame = 6;
            }
        }

        if (vy > -400 && vy < 400) {
            if (this.anyOfKey(this.upKeys)) {
                
                if(!this.anyOfKey(this.leftKeys) && !this.anyOfKey(this.rightKeys)){
                    this.ball.body.setVelocityY(-300 - (this.currentAlter == 2 ? 50 : (this.currentAlter == 3 ? -50 : 0)));
                    this.actualFrame = 2;
                }
            }
            else if (this.anyOfKey(this.downKeys)) {

                if(!this.anyOfKey(this.leftKeys) && !this.anyOfKey(this.rightKeys)){
                    this.ball.body.setVelocityY(300 + (this.currentAlter == 2 ? 50 : (this.currentAlter == 3 ? -50 : 0)));
                    this.actualFrame = 0;
                }

            }
        }

        if (vx != 0 || vy != 0) {
            this.allFramesWalk.forEach(tab => tab.forEach(i => i.visible = false));
            this.allFramesWalk[this.currentAlter - 1][this.actualFrame + (this.wichSubFrame > 5)].visible = true;
        }

        if(this.counter % 1200 ==  0){
            // this.counter = 0;
            for(let i = 0; i < 3; i++){
                if(!this.commandState[i]){
                    this.allCommands.push(new Command(this, i + 1));
                    this.commandState[i] = true;
                    break;
                }
            }
        }


        if (this.inputKeysMeta.SPACE.isDown && this.inputKeysMeta.SPACE.timeDown - this.lastSpaceDown > 50 ) {

            if (!this.secBall) {
                for (let bottle of this.allBottle) {
                    if (this.isInRect(this.ball, bottle, 60)) {
                        this.secBall = bottle;
                        break;
                    }
                }

                if(!this.secBall){
                    if (this.isInRect(this.ball, this.bottleSpawner, 200)) {
                        this.secBall = this.bottleSpawner.generateNewBottle('bottleEmpty');
                        this.allBottle.push(this.secBall);
                    }
                }

                for(let spawner of this.allGrapeSpawner) {
                    if(this.isInRect(this.ball, spawner, 100) && this.currentAlter == 2){
                        this.secBall = spawner.getGrape();
                        break;
                    }
                }

                for(let press of this.allPress){
                    if(this.isInRect(this.ball, press, 80) && press.pressable){
                        press.press();
                    }
                }

            }

            else {
                let DidSmth = false;
                if(this.isInRect(this.ball, this.etiqueteur, 100) && this.secBall.id == "bottle" && this.currentAlter == 1){
                    if(!this.secBall.tag){
                        DidSmth = true;
                        this.etiqueteur.putTag(this.secBall);
                    }
                } 
                if(!DidSmth && this.secBall.id == "grape"){
                    for(let press of this.allPress) {
                        if(this.isInRect(this.ball, press, 100)){
                            DidSmth = true;
                            if(press.space){
                                press.receiveGrape(this.secBall);
                                this.secBall.destroy();
                                this.secBall = undefined;
                                break;
                            }
                        }
                    }
                }

                if(!DidSmth && this.secBall.id == "bottle" ){
                    for(let press of this.allPress) {
                        if(this.isInRect(this.ball, press, 80)){
                            if(press.collectable){
                                DidSmth = true;
                                press.giveWine(this.secBall);
                                break;
                            }
                        }
                    }
                }

                if(!DidSmth && this.secBall.id == "bottle"){
                    for(let command of this.allCommands) {
                        if(this.isInRect(this.ball, command, 100)){
                            command.receiveBottle(this.secBall);
                        }
                    }
                }

                if(!DidSmth) {
                    if(this.secBall.id === "grape"){
                        this.secBall.destroy();
                    }
                    this.secBall = undefined;
                }

            }

            this.lastSpaceDown = this.inputKeysMeta.SPACE.timeDown;
        }

        this.wichSubFrame = this.wichSubFrame == 10 ? 0 : this.wichSubFrame + 1;

    }

    anyOfKey(keys, duration=0) {
        for (let key of keys)
            if (this.keyBoard.checkDown(key, duration)) return true;
        return false;
    }

    isInRect(obj, obj2, n) {
        return this.calcDistance(obj, obj2) <= n;
    }

    calcDistance(obj1, obj2) {
        return Math.sqrt(Math.pow(obj1.y - obj2.y, 2) + Math.pow(obj1.x - obj2.x, 2));
    }
}