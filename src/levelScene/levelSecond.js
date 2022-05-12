import Phaser from 'phaser';
import {BottleSpawner, Etiqueteur, Bottle} from "./methodLevel/objectsLevel2";
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
    }


    create() {
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
                this.add.rectangle(ww*(3/12), wh*(7/8), ww*(1/12), wh*(1/8), 0xFFD700, 1), this
            );
        
        this.etiqueteur = 
            new Etiqueteur(
                this.add.rectangle(ww*(22.8/24), wh*(6.5/16), ww*(1.5/24), wh*(2/8), 0xFFD700, 1), this
            );

        
        this.secBall = undefined;//init if something are in the hand

        //sprite for the player, walk effect
        this.allFramesWalk = [
            this.add.image(this.ball.x, this.ball.y, 'persobas1grand').setScale(3),
            this.add.image(this.ball.x, this.ball.y, 'persobas2grand').setScale(3),
            this.add.image(this.ball.x, this.ball.y, 'persohaut1grand').setScale(3),
            this.add.image(this.ball.x, this.ball.y, 'persohaut2grand').setScale(3),
            this.add.image(this.ball.x, this.ball.y, 'persodroite1grand').setScale(3),
            this.add.image(this.ball.x, this.ball.y, 'persodroite2grand').setScale(3),
            this.add.image(this.ball.x, this.ball.y, 'persogauche1grand').setScale(3),
            this.add.image(this.ball.x, this.ball.y, 'persogauche2grand').setScale(3)
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

        if (vx > -200 && vx < 200) {
            if (this.anyOfKey(this.rightKeys)) {
                this.ball.body.setVelocityX(200);
                this.actualFrame = 4;
            }
            else if (this.anyOfKey(this.leftKeys)) {
                this.ball.body.setVelocityX(-200);
                this.actualFrame = 6;
            }
        }

        if (vy > -200 && vy < 200) {
            if (this.anyOfKey(this.upKeys)) {
                
                if(!this.anyOfKey(this.leftKeys) && !this.anyOfKey(this.rightKeys)){
                    this.ball.body.setVelocityY(-200);
                    this.actualFrame = 2;
                }
            }
            else if (this.anyOfKey(this.downKeys)) {

                if(!this.anyOfKey(this.leftKeys) && !this.anyOfKey(this.rightKeys)){
                    this.ball.body.setVelocityY(200);
                    this.actualFrame = 0;
                }

            }
        }

        if (vx != 0 || vy != 0) {
            this.allFramesWalk.forEach(i => i.visible = false)
            this.allFramesWalk[this.actualFrame + (this.wichSubFrame > 5)].visible = true;
        }

        if (this.inputKeysMeta.SPACE.isDown && this.inputKeysMeta.SPACE.timeDown - this.lastSpaceDown > 100 ) {

            if (!this.secBall) {
                for (let bottle of this.allBottle) {
                    if (this.isInRect(this.ball, bottle, 60)) {
                        this.secBall = bottle;
                        break;
                    }
                }

                if(!this.secBall){
                    if (this.isInRect(this.ball, this.bottleSpawner, 80)) {
                        this.secBall = this.bottleSpawner.generateNewBottle('bottleEmptyWithoutTag');
                        this.allBottle.push(this.secBall);
                    }
                }
                
            }

            else {
                if(this.isInRect(this.ball, this.etiqueteur, 80)){
                    this.etiqueteur.putTag(this.secBall)
                }
                else{
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