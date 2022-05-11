import Phaser from 'phaser';

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
    }

    create() {

        this.ball = this.add.circle(400, 250, 10, 0xFFFFFF, 0);
        this.physics.add.existing(this.ball);
        this.ball.body.setCollideWorldBounds(true, 0.3, 0.3);

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

        if (this.inputKeysMeta.SHIFT.isDown && this.inputKeysMeta.SHIFT.timeDown - this.lastShiftDown > 500) {

            this.lastShiftDown = this.inputKeysMeta.SHIFT.timeDown;

            const ratioX = Math.min(1, Math.abs(vx / 200));
            const ratioY = Math.min(1, Math.abs(vy / 200));

            this.ball.body.setVelocityX(ratioX * (vx >= 0 ? 900 : -900));
            this.ball.body.setVelocityY(ratioY * (vy >= 0 ? 900 : -900));
        }

        this.wichSubFrame = this.wichSubFrame == 10 ? 0 : this.wichSubFrame + 1;
    }

    anyOfKey(keys, duration=0) {
        for (let key of keys)
            if (this.keyBoard.checkDown(key, duration)) return true;
        return false;
    }
}