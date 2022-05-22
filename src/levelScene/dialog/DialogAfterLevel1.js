import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import { textDialogAfterFirst } from './methodDialog/textDialogAfterFirst';

export default class DialogAfterLevel1 extends Phaser.Scene {
    constructor() {
        super({key: 'DialogAfterLevel1'})
    }

    preload() {
        this.load.image('hermes',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/hermes.png');
        this.load.image('pathos',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-grand.png');

        this.load.image('bgHermes',        'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/bgHermes.png');

        for (let i = 7; i < 9; i++)
            this.load.audio(`hermes${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Hermes/Hermes${i}.mp3`);
    
        this.load.audio(`pat11`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Patos/Patos11.mp3`);
        this.load.audio('nar3', `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Narrateur/Narrateur3.mp3`)
    }

    create() {

        const bg = this.add.image(0, 0, 'bgHermes').setOrigin(0, 0);
        bg.displayHeight = window.innerHeight;
        bg.displayWidth = window.innerWidth;

        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : textDialogAfterFirst,
            nextScene : 'DialogBeforeLevel2'
        })
    }

    update() {}
}