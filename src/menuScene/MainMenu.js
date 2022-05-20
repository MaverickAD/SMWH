import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    this.load.image(
      "homemenu1",
      "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/homemenu1.jpg"
    );
    this.load.image(
      "homemenu2",
      "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/homemenu2.jpg"
    );
    this.load.image(
      "homemenu3",
      "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/homemenu3.jpg"
    );
    this.load.image(
      "homemenu4",
      "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/homemenu4.jpg"
    );
  }

  create() {
    this.allBackground = [
      this.add.image(0, 0, "homemenu1").setOrigin(0, 0),
      this.add.image(0, 0, "homemenu2").setOrigin(0, 0),
      this.add.image(0, 0, "homemenu3").setOrigin(0, 0),
      this.add.image(0, 0, "homemenu4").setOrigin(0, 0),
    ];

    this.allBackground.forEach(i => {
      i.displayHeight = this.sys.canvas.height;
      i.displayWidth = this.sys.canvas.width;
      i.visible = false
    });
    this.allBackground[(this.n = 0)].visible = true;


    this.keyBoard = this.input.keyboard;
    this.inputKeysMeta = this.keyBoard.addKeys("ENTER");
  }

  update() {
    this.n = this.n === 39 ? 0 : this.n + 1;

    this.allBackground.forEach(i => i.visible = false);
    this.allBackground[Math.floor(this.n / 10)].visible = true;

    if (this.inputKeysMeta.ENTER.isDown) this.scene.start("DialogEnd");
  }
}
