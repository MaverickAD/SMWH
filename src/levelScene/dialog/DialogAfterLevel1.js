import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import { textDialogAfterFirst } from './methodDialog/textDialogAfterFirst';

export default class DialogBeforeLevel1 extends Phaser.Scene {
    constructor() {
        super({key: 'DialogAfterLevel1'})
    }

    preload() {
        this.load.image('hermes',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/hermes.png');
        this.load.image('pathos',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-grand.png');

        for (let i = 7; i < 10; i++)
            this.load.audio(`hermes${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Hermes/Hermes${i}.mp3`);
    
        for (let i = 11; i < 13; i++) 
            this.load.audio(`pat${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Patos/Patos${i}.mp3`);
    }

    create() {
        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : textDialogAfterFirst,
            nextScene : 'DialogBeforeLevel2'
        })
    }

    update() {}
}