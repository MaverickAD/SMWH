import Phaser from 'phaser';
import {BottleSpawner, Etiqueteur, Bottle, GrapeSpawner, Press, SendBottle} from "./methodLevel/objectsLevel2";
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
        this.load.image('bottleEmptyWithoutTag',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_empty_without_tag.png');
        this.load.image('bottleEmptyWithTag',       'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_empty_with_tag.png');
        this.load.image('bottleRedWithoutTag',      'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_red_without_tag.png');
        this.load.image('bottleRedWithTag',         'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_red_with_tag.png');
        this.load.image('bottleRoseWithoutTag',     'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_rose_without_tag.png');
        this.load.image('bottleRoseWithTag',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_rose_with_tag.png');
        this.load.image('bottleWhiteWithoutTag',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_white_without_tag.png');
        this.load.image('bottleWhiteWithTag',       'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bottle_of_wine_white_with_tag.png');
        this.load.image('GrapeRed',                 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/GrapeRed.png');
        this.load.image('GrapeWhite',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/GrapeWhite.png');
        this.load.image('bush',                     'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bush.png');
        this.load.image('grass',                    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/grass.png');
        this.load.image('pressEmpty',               'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressEmpty.png');
        this.load.image('pressHalfRedUnpressed',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressHalfRedUnpressed.png');
        this.load.image('pressHalfWhiteUnpressed',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressHalfWhiteUnpressed.png');
        this.load.image('pressFullRedUnpressed',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullRedUnpressed.png');
        this.load.image('pressFullWhiteUnpressed',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullWhiteUnpressed.png');
        this.load.image('pressFullRoseUnpressed',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressFullRoseUnpressed.png');
        this.load.image('pressWhitePressed',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressWhitePressed.png');
        this.load.image('pressRedPressed',          'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressRedPressed.png');
        this.load.image('pressRosePressed',         'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/pressRosePressed.png');
        this.load.image('shelf',                    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/shelf.png');
    }


    create() {
        this.add.tileSprite(ww * (9/12), wh * (6.5/8) ,  ww * (1/2), wh * (3/8), 'grass');


        //init player
        this.ball = this.add.rectangle(400, 250, 40, 75, 0xFFFFFF, 0);
        this.physics.add.existing(this.ball);
        this.ball.body.setCollideWorldBounds(true, 0.3, 0.3);

        
        walls.forEach(elem => {
            let closure = this.add.rectangle(...elem, 0xFFFFFF, 1);
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
                this.add.rectangle(ww*(3/12), wh*(8/8), ww*(2/12), wh*(1/8), 0xFFD700, 0), this
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

        this.sendBottle = new SendBottle(
            this.add.rectangle(ww*(6.5/20), wh*(1/2), ww*(1/40), wh*(1/24), 0xFF00FF, 1), this
        )
        

        this.allPress = [
            new Press (
                this.add.rectangle(ww*(7.5/12), wh*(1.5/16), ww*(0.5/12), wh*(1.5/12), 0xFFD700, 0), this 
            ), 
            new Press (
                this.add.rectangle(ww*(9.5/12), wh*(1.5/16), ww*(0.5/12), wh*(1.5/12), 0xFFD700, 0), this 
            )
        ]
        this.secBall = undefined;//init if something are in the hand

        //sprite for the player, walk effect
        this.allFramesWalk = [
            this.add.image(this.ball.x, this.ball.y, 'persobas1grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persobas2grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persohaut1grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persohaut2grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persodroite1grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persodroite2grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persogauche1grand').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persogauche2grand').setScale(2.5)
        ];
        this.allFramesWalk.forEach(i => i.visible = false)
        this.allFramesWalk[0].visible = true;
        this.actualFrame = 0;
        this.wichSubFrame = 0;

        this.allBottle = []
    }

    update() {
        //if player are something in his hand, put the object near of player
        if(this.secBall){
            this.secBall.obj.x = this.ball.x + 10;
            this.secBall.x = this.ball.x + 10;
            this.secBall.obj.y = this.ball.y + 10;
            this.secBall.y = this.ball.y + 10;
        }

        //update of sprite when the player move
        this.allFramesWalk.forEach(i => {
            i.x = this.ball.x;
            i.y = this.ball.y;
        })

        const vx = this.ball.body.velocity.x;
        const vy = this.ball.body.velocity.y;

        if (vx > 0) this.ball.body.setVelocityX(Math.max(vx - this.loosedSpeedperFrame, 0));
        if (vy > 0) this.ball.body.setVelocityY(Math.max(vy - this.loosedSpeedperFrame, 0));
        if (vx < 0) this.ball.body.setVelocityX(Math.min(vx + this.loosedSpeedperFrame, 0));
        if (vy < 0) this.ball.body.setVelocityY(Math.min(vy + this.loosedSpeedperFrame, 0));

        if (vx > -300 && vx < 300) {
            if (this.anyOfKey(this.rightKeys)) {
                this.ball.body.setVelocityX(300);
                this.actualFrame = 4;
            }
            else if (this.anyOfKey(this.leftKeys)) {
                this.ball.body.setVelocityX(-300);
                this.actualFrame = 6;
            }
        }

        if (vy > -300 && vy < 300) {
            if (this.anyOfKey(this.upKeys)) {
                
                if(!this.anyOfKey(this.leftKeys) && !this.anyOfKey(this.rightKeys)){
                    this.ball.body.setVelocityY(-300);
                    this.actualFrame = 2;
                }
            }
            else if (this.anyOfKey(this.downKeys)) {

                if(!this.anyOfKey(this.leftKeys) && !this.anyOfKey(this.rightKeys)){
                    this.ball.body.setVelocityY(300);
                    this.actualFrame = 0;
                }

            }
        }

        if (vx != 0 || vy != 0) {
            this.allFramesWalk.forEach(i => i.visible = false)
            this.allFramesWalk[this.actualFrame + (this.wichSubFrame > 5)].visible = true;
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
                        this.secBall = this.bottleSpawner.generateNewBottle('bottleEmptyWithoutTag');
                        this.allBottle.push(this.secBall);
                        this.sendBottle.generateCommand()
                    }
                }

                for(let spawner of this.allGrapeSpawner) {
                    if(this.isInRect(this.ball, spawner, 100)){
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
                if(this.isInRect(this.ball, this.etiqueteur, 100) && this.secBall.id == "bottle"){
                    this.etiqueteur.putTag(this.secBall);
                    DidSmth = true;
                }
                if(this.secBall.id == "grape" && !DidSmth){
                    for(let press of this.allPress) {
                        if(this.isInRect(this.ball, press, 80)){
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
                if(this.isInRect(this.ball, this.sendBottle, 100)){
                    console.log('sendBottle')
                    console.log(this.secBall)
                    this.secBall.destroy()
                    this.secBall = undefined;
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