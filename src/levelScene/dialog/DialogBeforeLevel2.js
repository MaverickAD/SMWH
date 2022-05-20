import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import { textDialogBeforeSecond } from './methodDialog/textDialogBeforeSecond';

export default class DialogBeforeLevel2 extends Phaser.Scene {
    constructor() {
        super({key: 'DialogBeforeLevel2'})
    }

    preload() {
        this.load.image('pathos',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-grand.png');
        this.load.image('dionysos', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/dionysos.png');

        for (let i = 1; i < 8; i++)
            this.load.audio(`diony${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Dyonisos/Dyonisos${i}.mp3`);
    
        for (let i = 12; i < 18; i++) 
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