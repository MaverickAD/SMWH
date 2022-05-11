import Phaser from 'phaser';
import {Packer, Spawner} from "./methodLevel/objects";
import {walls} from "./methodLevel/wallsLevel2";

const ww = window.innerWidth;
const wh = window.innerHeight;

export default class LevelSecond extends Phaser.Scene {
    constructor() {
        super({key: "LevelSecond"});
    }

    preload() {
        this.load.image('persobas1',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-bas1.png');
        this.load.image('persobas2',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-bas2.png');
        this.load.image('persodroite1', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-droite1.png');
        this.load.image('persodroite2', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-droite2.png');
        this.load.image('persogauche1', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-gauche1.png');
        this.load.image('persogauche2', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-gauche2.png');
        this.load.image('persohaut1',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-haut1.png');
        this.load.image('persohaut2',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-haut2.png');
        this.load.image('packer1',      'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/packer1.png');
        this.load.image('packer2',      'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/packer2.png');
    }

    create() {
        //init player
        this.ball = this.add.circle(400, 250, 10, 0xFFFFFF, 0);
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

        //init spawner
        //here 1 spawner
        this.allSpawner = [
            new Spawner(
                this.add.rectangle(ww*(0.5/20), wh*(4.5/12), ww*(1/20), wh*(1/12), 0xFFD700, 1), this
            )
        ];

        //init packer at the center
        this.allPacker = [
            new Packer(
                this.add.rectangle(ww*(12/20), wh*(8.5/20), ww*(1/10), wh*(1/10), 0xFFD700, 0),
                this.add.image(ww*(12/20), wh*(8.5/20), 'packer1').setScale(2),
                this.add.image(ww*(12/20), wh*(8.5/20), 'packer2').setScale(2),
                this
            )
        ];

        this.secBall = undefined;//init if something are in the hand
        this.allSpawner.forEach(s => s.generateNewBottle());//generate new bottle to package

        //sprite for the player, walk effect
        this.allFramesWalk = [
            this.add.image(this.ball.x, this.ball.y, 'persobas1').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persobas2').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persohaut1').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persohaut2').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persodroite1').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persodroite2').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persogauche1').setScale(2.5),
            this.add.image(this.ball.x, this.ball.y, 'persogauche2').setScale(2.5)
        ];
        this.allFramesWalk.forEach(i => i.visible = false)
        this.allFramesWalk[0].visible = true;
        this.actualFrame = 0;
        this.wichSubFrame = 0;
    }

    update() {
        //if player are something in his hand, put the object near of player
        if(this.secBall){
            this.secBall.obj.x = this.ball.x + 10;
            this.secBall.obj.y = this.ball.y + 10;
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
                this.ball.body.setVelocityY(-200);
                this.actualFrame = 2;
            }
            else if (this.anyOfKey(this.downKeys)) {
                this.ball.body.setVelocityY(200);
                this.actualFrame = 0;
            }
        }

        if (vx != 0 || vy != 0) {
            this.allFramesWalk.forEach(i => i.visible = false)
            this.allFramesWalk[this.actualFrame + (this.wichSubFrame > 5)].visible = true;
        }

        if (this.inputKeysMeta.SPACE.isDown && this.inputKeysMeta.SPACE.timeDown - this.lastSpaceDown > 100 ) {

            if (!this.secBall) {
                for (let s of this.allSpawner)
                    if (this.isInRect(this.ball, s, 60)) {
                        this.secBall = s.getObj();
                    }

                for (let p of this.allPacker) {
                    if (p.finished && this.isInRect(this.ball, p, 150)) {
                        this.secBall = p.package;
                        p.takeObject();
                        break;
                    }
                }

            }

            else {
                // if ( this.secBall.id == this.mailBoxCerbere.id
                //     && this.secBall.isPacked && this.isInRect(this.ball, this.mailBoxCerbere, 100)) {
                //     this.score += 15;
                // }
                // else if (this.secBall.id == this.mailBoxMedusa.id
                //     &&   this.secBall.isPacked && this.isInRect(this.ball, this.mailBoxMedusa, 100)) {
                //     this.score += 15;
                // }
                // else if (this.secBall.id == this.mailBoxCerbere.id
                //     &&   this.secBall.isPacked && this.isInRect(this.ball, this.mailBoxIcare, 100)) {
                //     this.score += 15;
                // }
                //
                for (let p of this.allPacker) {
                    if (!this.secBall.isPacked && this.isInRect(this.ball, p, 150)) {
                        this.score += 5;
                        if (!p.package) {
                            p.initPackaging(this.secBall, this.time.now);
                            break;
                        }
                    }
                }

                this.secBall.destroy();
                this.secBall = undefined;
                this.score   -= 5;
                this.allSpawner.forEach(s => s.fill ? undefined : s.generateNewBottle());
            }

            this.lastSpaceDown = this.inputKeysMeta.SPACE.timeDown;
        }

        this.wichSubFrame = this.wichSubFrame == 10 ? 0 : this.wichSubFrame + 1;
        this.allPacker.forEach(p => p.actualizeSituationPackage(this.time.now, this.wichSubFrame > 5));
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