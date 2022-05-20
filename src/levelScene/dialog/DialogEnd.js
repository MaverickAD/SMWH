import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import { textDialogEnd } from "./methodDialog/textDialogEnd";

export default class DialogEnd extends Phaser.Scene {
    constructor() {
        super({key: 'DialogEnd'})
    }

    preload() {
        
        this.load.image('zeus',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/Zeus.svg');
        this.load.image('pathos',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-grand.png');
        this.load.image('bg',      'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/fonddialog1.png');


        for (let i = 19; i < 21; i++) {
            this.load.audio(`pat${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Patos/Patos${i}.mp3`);
        }

        for(let i = 5; i < 8;i++) {
            this.load.audio(`zeus${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Zeus/Zeus${i}.mp3`);
        }
    }

    create() {

        const bg = this.add.image(0, 0, 'bg').setOrigin(0,0);
        bg.displayHeight = this.sys.canvas.height;
        bg.displayWidth = this.sys.canvas.width;

        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : textDialogEnd,
            nextScene : 'MainMenu'
        });

    }

    update() {
        
    }
}