import Phaser from "phaser";

export default class EndMenu extends Phaser.Scene {
  constructor() {
    super({ key: "EndMenu" });
  }

  preload() {
    for(let i = 1; i <= 8; i++){
        this.load.image(`endMenu${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/endmenu/endMenu${i}.png`)
    }
  }

  create() {
    this.allBackground = [
      this.add.image(0, 0, "endMenu1").setOrigin(0, 0),
      this.add.image(0, 0, "endMenu2").setOrigin(0, 0),
      this.add.image(0, 0, "endMenu3").setOrigin(0, 0),
      this.add.image(0, 0, "endMenu4").setOrigin(0, 0),
      this.add.image(0, 0, "endMenu5").setOrigin(0, 0),
      this.add.image(0, 0, "endMenu6").setOrigin(0, 0),
      this.add.image(0, 0, "endMenu7").setOrigin(0, 0),
      this.add.image(0, 0, "endMenu8").setOrigin(0, 0),
    ];

    this.allBackground.forEach((i) => {
      i.displayHeight = this.sys.canvas.height;
      i.displayWidth = this.sys.canvas.width;
      i.visible = false;
    });
    this.allBackground[(this.n = 0)].visible = true;


    this.mainEndMessage = this.add.text(100, 100, "The end !", {
        color: "#FFFFFF",
        fontSize: "24px",
        fontFamily: '"greek", sans-serif'
    })

    this.keyBoard = this.input.keyboard;
    this.inputKeysMeta = this.keyBoard.addKeys("ENTER");
  }
  update() {
    this.n = this.n === 39 ? 0 : this.n + 1;

    this.allBackground.forEach((i) => (i.visible = false));
    this.allBackground[Math.floor(this.n / 10)].visible = true;

    if (this.inputKeysMeta.ENTER.isDown) this.scene.start("LevelFirst");
  }
}
