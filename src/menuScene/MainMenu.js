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
    this.allBackground.forEach((i) => (i.visible = false));
    this.allBackground[(this.n = 0)].visible = true;


    this.keyBoard = this.input.keyboard;
    this.inputKeysMeta = this.keyBoard.addKeys("ENTER");
  }

  update() {
    this.n = this.n === 39 ? 0 : this.n + 1;

    this.allBackground.forEach((i) => (i.visible = false));
    this.allBackground[Math.floor(this.n / 10)].visible = true;

<<<<<<< HEAD
    if (this.inputKeysMeta.ENTER.isDown) this.scene.start("LevelFirst");
=======
    if (
      this.inputKeysMeta.UP.isDown &&
      this.inputKeysMeta.UP.timeDown - this.lastShiftDownTime > 100
    ) {
      this.lastShiftDownTime = this.inputKeysMeta.UP.timeDown;
      switch (this.selectedButton) {
        case 1:
          this.playButton.setFillStyle(0x0000ff, 1);
          this.settingsButton.setFillStyle(0xffffff, 1);
          this.selectedButton -= 1;
          break;
        case 2:
          this.settingsButton.setFillStyle(0x0000ff, 1);
          this.creditButton.setFillStyle(0xffffff, 1);
          this.selectedButton -= 1;
          break;
      }
    }

    if (
      this.inputKeysMeta.DOWN.isDown &&
      this.inputKeysMeta.DOWN.timeDown - this.lastShiftDownTime > 100
    ) {
      this.lastShiftDownTime = this.inputKeysMeta.DOWN.timeDown;
      switch (this.selectedButton) {
        case 0:
          this.settingsButton.setFillStyle(0x0000ff, 1);
          this.playButton.setFillStyle(0xffffff, 1);
          this.selectedButton += 1;
          break;
        case 1:
          this.creditButton.setFillStyle(0x0000ff, 1);
          this.settingsButton.setFillStyle(0xffffff, 1);
          this.selectedButton += 1;
          break;
      }
    }

    if (this.inputKeysMeta.ENTER.isDown && this.selectedButton === 0)
      this.scene.start("LevelFirst");
    else if (this.inputKeysMeta.ENTER.isDown && this.selectedButton === 1)
      this.scene.start("SettingsMenu");
  }

  anyOfKey(keys, duration = 0) {
    for (let key of keys)
      if (this.keyBoard.checkDown(key, duration)) return true;
    return false;
>>>>>>> adaa933c8cf1a87001eb7d3feb61d761d20499e0
  }
}
