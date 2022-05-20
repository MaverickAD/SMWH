import Phaser from "phaser";
import { walls, decoration } from "./methodLevel/walls";
import { MailBox, Spawner, Packer } from "./methodLevel/objects";

const ww = window.innerWidth;
const wh = window.innerHeight;

export default class LevelFirst extends Phaser.Scene {
  constructor() {
    super({ key: "LevelFirst" });
  }

  preload() {
    this.load.image("mask_blur", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/maskBlur.png");
    this.load.image("murHorizon", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/murHorizon.png");
    this.load.image("murVerti", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/murVerti.png");
    this.load.image("ground", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/ground.png");
    this.load.image("persobas1", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-bas1.png");
    this.load.image("persobas2", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-bas2.png");
    this.load.image("persodroite1", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-droite1.png");
    this.load.image("persodroite2", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-droite2.png");
    this.load.image("persogauche1", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-gauche1.png");
    this.load.image("persogauche2", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-gauche2.png");
    this.load.image("persohaut1", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-haut1.png");
    this.load.image("persohaut2", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-marche-haut2.png");
    this.load.image("mailboxblueOpen", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/mailboxblue1_open.png");
    this.load.image("mailboxblueClose", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/mailboxblue1_close.png");
    this.load.image("mailboxredOpen", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/mailboxred1_open.png");
    this.load.image("mailboxredClose", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/mailboxred1_close.png");
    this.load.image("mailboxgreen", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/mailboxgreen1.png");
    this.load.image("packer1", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/packer1.png");
    this.load.image("packer2", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/packer2.png");
    this.load.image("packedpacket", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/packedpacket.png");
    this.load.image("trident", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/trident.png");
    this.load.image("lyre", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/lyre.png");
    this.load.image("caducee", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/caducee.png");
    this.load.image("marteau", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/marteau.png");
    this.load.image("rat", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/rat.png");
    this.load.image("spawner", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/spawner.png");
    this.load.image("leaf", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/object_blue_leaf.png");
    this.load.image("sunglasses", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/object_blue_sunglasses.png");
    this.load.image("miror", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/object_green_miror.png");
    this.load.image("medusa", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/object_green_medusa.png");
    this.load.image("bone", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/object_red_bone.png");
    this.load.image("bowl", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/object_red_bowl.png");
    this.load.image("box", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/box_packed.png");
    this.load.image("endScreenLaurier", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/end_screen_level_1_laurier.png");
    this.load.image("endScreenBackground", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/end_screen_level_1_pantheon.png");
    
    this.load.audio("travailtermine", "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/travailtermine.mp3");
    this.load.audio('musique', "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/musiquegrecque.mp3")
    this.load.audio('courrier', "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/courrier.mp3")
    this.load.audio('thunder', "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/thunder.mp3")

    for (let i = 1; i < 17; i++) {
      this.load.image(`eclair${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/eclair${i}.png`);
    }

    this.chronoText = this.add.text(ww - 190, 0,"Timer : " + this.minuteChrono + "0:0" + this.secondChrono, {
      fontSize: "24px",
      fontFamily: '"greek", sans-serif'
    });
    this.chronoText.setAlpha(0);
    this.scoreText = this.add.text(ww - 190, 25, "Score : " + this.score, {
      fontSize: "24px",
      fontFamily: '"greek", sans-serif'
    });
    this.scoreText.setAlpha(0);
    
  }

  create() {

    //sprite for the ground
    this.add.tileSprite(ww * 0.5, wh * 0.5, ww, wh, "ground");

    //init player
    this.ball = this.add.circle((3/20)*ww, wh / 2, 10, 0xffffff, 0);
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true, 0.3, 0.3);

    //init walls
    walls.forEach((elem) => {
      let closure = this.add.rectangle(...elem, 0xffffff, 0);
      this.physics.add.existing(closure, true);
      this.physics.add.collider(closure, this.ball);
      if (elem[3] == 10) this.add.tileSprite(...elem, "murHorizon").setDepth(6);
      else this.add.tileSprite(...elem, "murVerti").setDepth(6);
    });

    decoration.forEach((elem) => {
      const temp = this.add.image(elem[0], elem[1], elem[2]);
      if (elem[3].scale) temp.setScale(elem[3].scale);
      if (elem[3].rotation) {
        if (elem[3].rotation === "flip") temp.flipX = true;
        else temp.rotation = elem[3].rotation;
      }
    });

    //init key of keyboard
    this.keyBoard = this.input.keyboard;
    this.inputKeysDir = this.keyBoard.addKeys(
      "Z,Q,S,D,UP,RIGHT,LEFT,UP,DOWN",
      true,
      true
    );
    this.inputKeysMeta = this.keyBoard.addKeys("SHIFT,SPACE");

    this.upKeys = [this.inputKeysDir.UP, this.inputKeysDir.Z];
    this.downKeys = [this.inputKeysDir.DOWN, this.inputKeysDir.S];
    this.leftKeys = [this.inputKeysDir.LEFT, this.inputKeysDir.Q];
    this.rightKeys = [this.inputKeysDir.RIGHT, this.inputKeysDir.D];

    this.lastShiftDown = 0;
    this.lastSpaceDown = 0;
    this.loosedSpeedperFrame = 20;

    this.score = 0;

    // init spawner
    // here 2 spawner but we can add more
    this.allSpawner = [
      new Spawner(
        this.add
          .image(ww * (0.5 / 20), wh * (4.5 / 12), "spawner")
          .setScale(0.5),
        this
      ),

      new Spawner(
        this.add
          .image(ww * (0.5 / 20), wh * (6.5 / 12), "spawner")
          .setScale(0.5),
        this
      ),
    ];

    //init mailbox
    this.mailBoxCerbere = new MailBox(
      this.add
        .image(ww * (7.5 / 20), wh * (0.5 / 12), "mailboxredOpen")
        .setScale(0.5),
      this,
      0
    );

    this.mailBoxMedusa = new MailBox(
      this.add
        .image(ww * (7.5 / 20), wh * (11.5 / 12), "mailboxgreen")
        .setScale(0.5),
      this,
      1
    );

    this.mailBoxIcare = new MailBox(
      this.add
        .image(ww * (19.5 / 20), wh * (1 / 2), "mailboxblueOpen")
        .setScale(0.5),
      this,
      2
    );

    //init packer at the center
    this.allPacker = [
      new Packer(
        this.add.rectangle(
          ww * (12 / 20),
          wh * (8.5 / 20),
          ww * (1 / 10),
          wh * (1 / 10),
          0xffd700,
          0
        ),
        this.add.image(ww * (12 / 20), wh * (8.5 / 20), "packer1").setScale(2),
        this.add.image(ww * (12 / 20), wh * (8.5 / 20), "packer2").setScale(2),
        this
      ),
      new Packer(
        this.add.rectangle(
          ww * (12 / 20),
          wh * (11.5 / 20),
          ww * (1 / 10),
          wh * (1 / 12),
          0xffd700,
          0
        ),
        this.add.image(ww * (12 / 20), wh * (11.5 / 20), "packer1").setScale(2),
        this.add.image(ww * (12 / 20), wh * (11.5 / 20), "packer2").setScale(2),
        this
      ),
    ];

    this.secBall = undefined; //init if something are in the hand
    this.allSpawner.forEach(s => s.generateNewPackage()); //generate new object to package

    //init maks around the player
    this.spotlight = this.add
      .image(this.ball.x, this.ball.y, "mask_blur")
      .setDepth(10);
    this.spotlight.visible = false;

    //sprite for the player, walk effect
    this.allFramesWalk = [
      this.add.image(this.ball.x, this.ball.y, "persobas1").setScale(2.5),
      this.add.image(this.ball.x, this.ball.y, "persobas2").setScale(2.5),
      this.add.image(this.ball.x, this.ball.y, "persohaut1").setScale(2.5),
      this.add.image(this.ball.x, this.ball.y, "persohaut2").setScale(2.5),
      this.add.image(this.ball.x, this.ball.y, "persodroite1").setScale(2.5),
      this.add.image(this.ball.x, this.ball.y, "persodroite2").setScale(2.5),
      this.add.image(this.ball.x, this.ball.y, "persogauche1").setScale(2.5),
      this.add.image(this.ball.x, this.ball.y, "persogauche2").setScale(2.5),
    ];

    // this.add.image(this.mailBoxIcare.x,   this.mailBoxIcare.y, 'mailboxblue1').setScale(0.5);
    // this.add.image(this.mailBoxCerbere.x, this.mailBoxCerbere.y, 'mailboxred1').setScale(0.5);
    // this.add.image(this.mailBoxMedusa.x,  this.mailBoxMedusa.y, 'mailboxgreen1').setScale(0.5);

    this.allFramesWalk.forEach((i) => (i.visible = false));
    this.allFramesWalk[0].visible = true;
    this.actualFrame = 0;
    this.wichSubFrame = 0;

    this.chronoText;
    this.myTimer;
    this.secondChrono = 0;
    this.minuteChrono = 0;

    this.myTimer = this.time.addEvent({
      delay: 1000,
      callback: this.startChrono,
      callbackScope: this,
      loop: true,
    });

    this.chronoText.setAlpha(1)
    this.chronoText.setScrollFactor(0);
    this.chronoText.setDepth(15);

    this.scoreText.setAlpha(1)
    this.scoreText.setScrollFactor(0);
    this.scoreText.setDepth(15);

    this.timeForMailBox = undefined;
    this.sound.add('musique').play();
  }

  update() {
    //if player are something in his hand, put the object near of player
    if (this.secBall) {
      this.secBall.obj.x = this.ball.x + 10;
      this.secBall.obj.y = this.ball.y + 10;
    }

    //update of sprite when the player move
    this.allFramesWalk.forEach((i) => {
      i.x = this.ball.x;
      i.y = this.ball.y;
    });

    const vx = this.ball.body.velocity.x;
    const vy = this.ball.body.velocity.y;

    this.spotlight.x = this.ball.x - 30;
    this.spotlight.y = this.ball.y - 30;

    if (vx > 0)
      this.ball.body.setVelocityX(Math.max(vx - this.loosedSpeedperFrame, 0));
    if (vy > 0)
      this.ball.body.setVelocityY(Math.max(vy - this.loosedSpeedperFrame, 0));
    if (vx < 0)
      this.ball.body.setVelocityX(Math.min(vx + this.loosedSpeedperFrame, 0));
    if (vy < 0)
      this.ball.body.setVelocityY(Math.min(vy + this.loosedSpeedperFrame, 0));

    if (vx > -200 && vx < 200) {
      if (this.anyOfKey(this.rightKeys)) {
        this.ball.body.setVelocityX(200);
        this.actualFrame = 4;
      } else if (this.anyOfKey(this.leftKeys)) {
        this.ball.body.setVelocityX(-200);
        this.actualFrame = 6;
      }
    }

    if (vy > -200 && vy < 200) {
      if (this.anyOfKey(this.upKeys)) {
        if (!this.anyOfKey(this.leftKeys) && !this.anyOfKey(this.rightKeys)) {
          this.ball.body.setVelocityY(-200);
          this.actualFrame = 2;
        }
      } else if (this.anyOfKey(this.downKeys)) {
        if (!this.anyOfKey(this.leftKeys) && !this.anyOfKey(this.rightKeys)) {
          this.ball.body.setVelocityY(200);
          this.actualFrame = 0;
        }
      }
    }

    if (vx != 0 || vy != 0) {
      this.allFramesWalk.forEach((i) => (i.visible = false));
      this.allFramesWalk[
        this.actualFrame + (this.wichSubFrame > 5)
      ].visible = true;
    }

    //dash with SHIFT key
    if (
      this.inputKeysMeta.SHIFT.isDown &&
      this.inputKeysMeta.SHIFT.timeDown - this.lastShiftDown > 500
    ) {
      this.lastShiftDown = this.inputKeysMeta.SHIFT.timeDown;

      const ratioX = Math.min(1, Math.abs(vx / 200));
      const ratioY = Math.min(1, Math.abs(vy / 200));

      this.ball.body.setVelocityX(ratioX * (vx >= 0 ? 900 : -900));
      this.ball.body.setVelocityY(ratioY * (vy >= 0 ? 900 : -900));
    }

    //get object with SPACE key
    if (
      this.inputKeysMeta.SPACE.isDown &&
      this.inputKeysMeta.SPACE.timeDown - this.lastSpaceDown > 100
    ) {
      if (!this.secBall) {
        for (let s of this.allSpawner)
          if (this.isInRect(this.ball, s, 60)) {
            this.secBall = s.getObj();
          }

        for (let p of this.allPacker) {
          if (p.finished && this.isInRect(this.ball, p, 150)) {
            this.secBall = p.package;
            this.secBall.obj.setScale(0.3);
            p.takeObject();
            break;
          }
        }
      } else {
        let tmp = this.secBall.id;

        if (this.isInRect(this.ball, this.mailBoxCerbere, 100)
        || this.isInRect(this.ball, this.mailBoxMedusa, 100)
        || this.isInRect(this.ball, this.mailBoxIcare, 100)) {
          if (!this.spotlight.visible) {
            this.spotlight.visible = true;
            this.sound.add('thunder').play();
          }
          this.sound.add('courrier').play();
        }

        this.timeForMailBox = undefined ? this.secondChrono : "";
        if (
          this.secBall.id == this.mailBoxCerbere.id &&
          this.secBall.isPacked &&
          this.isInRect(this.ball, this.mailBoxCerbere, 100)
        ) {
          this.score += 15;
          this.mailBoxCerbere.obj.setTexture("mailboxredClose");
        } else if (
          this.secBall.id == this.mailBoxMedusa.id &&
          this.secBall.isPacked &&
          this.isInRect(this.ball, this.mailBoxMedusa, 100)
        ) {
          this.score += 15;
        } else if (
          this.secBall.id == this.mailBoxIcare.id &&
          this.secBall.isPacked &&
          this.isInRect(this.ball, this.mailBoxIcare, 100)
        ) {
          this.score += 15;
          this.mailBoxIcare.obj.setTexture("mailboxblueClose");
        }

        for (let p of this.allPacker) {
          if (!this.secBall.isPacked && this.isInRect(this.ball, p, 150)) {
            if (!p.package) {
              this.score += 5;
              p.initPackaging(this.secBall, this.time.now);
              break;
            }
          }
        }

        this.secBall.destroy();
        this.secBall = undefined;
        this.score -= 5;
        this.allSpawner.forEach((s) =>
          s.fill ? undefined : s.generateNewPackage()
        );

        if (this.timeForMailBox !== undefined && tmp === 0) {
          this.mailBoxCerbere.obj.setTexture("mailboxredOpen");
          this.timeForMailBox = undefined;
        }
        if (this.timeForMailBox !== undefined && tmp === 2) {
          this.mailBoxIcare.obj.setTexture("mailboxblueOpen");
          this.timeForMailBox = undefined;
        }
      }

      this.lastSpaceDown = this.inputKeysMeta.SPACE.timeDown;

      if (this.minuteChrono === 0 && this.secondChrono === 30 && this.score >= 0) {
        this.scene.start("DialogAfterLevel1");
      }
      else if (this.minuteChrono === 0 && this.secondChrono === 30 && this.score < 0){
        this.scene.start("LevelFirst")
      }
    }

    this.wichSubFrame = this.wichSubFrame == 10 ? 0 : this.wichSubFrame + 1;
    this.allPacker.forEach((p) =>
      p.actualizeSituationPackage(this.time.now, this.wichSubFrame > 5)
    );
    this.scoreText.text = "Score : " + this.score;

    if (this.minuteChrono === 0 && this.secondChrono === 30) {
      this.myTimer.paused = true;
      this.upKeys = [];
      this.downKeys = [];
      this.leftKeys = [];
      this.rightKeys = [];
      this.endMessageBlock = this.add.image(
        ww / 2,
        wh / 2,
        "endScreenBackground"
      );
      this.endMessageBlock.setDepth(20);
      this.endMessageScreen = this.add
        .image(
          this.endMessageBlock.x - (1.3 / 5) * this.endMessageBlock.x,
          this.endMessageBlock.y - (1.2 / 5) * this.endMessageBlock.y,
          "endScreenLaurier"
        )
        .setScale(0.9, 0.9);
      this.endMessageScreen.setDepth(20);
      if (this.score >= 60) {
        this.endMessageText1 = this.add
          .text(
            this.endMessageBlock.x,
            this.endMessageBlock.y - (1.9 / 5) * this.endMessageBlock.y,
            "YOU WIN !!!",
            { color: "000000", fontSize: "24px" }
          )
          .setOrigin(0.5);
      } else {
        this.endMessageText1 = this.add
          .text(
            this.endMessageBlock.x,
            this.endMessageBlock.y - (1.9 / 5) * this.endMessageBlock.y,
            "YOU LOSE !!!",
            { color: "000000", fontSize: "24px" }
          )
          .setOrigin(0.5);
      }
      this.endMessageText1.setDepth(20);
      this.endMessageText2 = this.add
        .text(
          this.endMessageBlock.x,
          this.endMessageBlock.y + (0.85 / 5) * this.endMessageBlock.y,
          "Your score is " + this.score,
          { color: "000000", fontSize: "24px" }
        )
        .setOrigin(0.5);
      this.endMessageText2.setDepth(20);
    }
  }

  anyOfKey(keys, duration = 0) {
    for (let key of keys)
      if (this.keyBoard.checkDown(key, duration)) return true;
    return false;
  }

  isInRect(obj, obj2, n) {
    return this.calcDistance(obj, obj2) <= n;
  }

  calcDistance(obj1, obj2) {
    return Math.sqrt(
      Math.pow(obj1.y - obj2.y, 2) + Math.pow(obj1.x - obj2.x, 2)
    );
  }

  startChrono() {
    this.secondChrono += 1;
    if (this.secondChrono === 60) {
      this.minuteChrono += 1;
      this.secondChrono = 0;
    }

    if (this.secondChrono < 10) {
      if (this.minuteChrono < 10) {
        this.chronoText.setText(
          "Timer : " + "0" + this.minuteChrono + ":0" + this.secondChrono
        );
      } else {
        this.chronoText.setText(
          "Timer : " + this.minuteChrono + ":0" + this.secondChrono
        );
      }
    } else {
      if (this.minuteChrono < 10) {
        this.chronoText.setText(
          "Timer : " + "0" + this.minuteChrono + ":" + this.secondChrono
        );
      } else {
        this.chronoText.setText(
          "Timer : " + this.minuteChrono + ":" + this.secondChrono
        );
      }
    }
  }
}

//bind after first object
//mailbox animated or uni
