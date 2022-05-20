import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import { textDialogBeforeSecond } from './methodDialog/textDialogBeforeSecond';

export default class DialogBeforeLevel2 extends Phaser.Scene {
    constructor() {
        super({key: 'DialogBeforeLevel2'})
    }

    preload() {
        this.load.image('hermes',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/hermes.png');
        this.load.image('dyonisos', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/dyonisos.png');

        for (let i = 1; i < 8; i++)
            this.load.audio(`hermes${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Hermes/Hermes${i}.mp3`);
    
        for (let i = 6; i < 11; i++) 
            this.load.audio(`pat${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Patos/Patos${i}.mp3`);
    }

    create() {
        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : textDialogBeforeSecond,
            nextScene : 'LevelSecond'
        })
    }

    update() {}
}