import Phaser from "phaser";
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import { textDialogAfterSecond } from "./methodDialog/textDialogAfterSecond";

export default class DialogAfterLevel2 extends Phaser.Scene {
  constructor() {
    super({ key: "DialogAfterLevel2" });
  }

  preload() {

    this.load.image('bg', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bgDyoni.png');

    this.load.image(
      "dionysos",
      "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/dionysos.png"
    );
    this.load.image(
      "pathos",
      "https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-grand.png"
    );

    for (let i = 7; i < 10; i++)
      this.load.audio(
        `diony${i}`,
        `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Dyonisos/Dyonisos${i}.mp3`
      );

    this.load.audio(
      `pat18`,
      `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Patos/Patos18.mp3`
    );
    this.load.audio(
      "nar4",
      `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Narrateur/Narrateur4.mp3`
    );
  }

  create() {
 
    const bg = this.add.image(0,0,'bg').setOrigin(0, 0);
    bg.displayHeight = window.innerHeight;
    bg.displayWidth = window.innerWidth;

    this.dialogFirst = new DialogModalPlugin(this);
    this.dialogFirst.init({
      dialogs: textDialogAfterSecond,
      nextScene: "DialogEnd",
    });
  }

  update() {}
}
