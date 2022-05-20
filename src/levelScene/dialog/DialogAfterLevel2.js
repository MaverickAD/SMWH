import Phaser from 'phaser';
import { DialogModalPlugin }    from "./methodDialog/dialog_plugin";
import { textDialogAfterSecond } from './methodDialog/textDialogAfterSecond';

export default class DialogAfterLevel2 extends Phaser.Scene {
    constructor() {
        super({key: 'DialogAfterLevel2'})
    }

    preload() {
        this.load.image('dionysos', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/dionysos.png');
        this.load.image('pathos',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-grand.png');

        for (let i = 7; i < 10; i++) this.load.audio(`diony${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Dyonisos/Dyonisos${i}.mp3`);
    
        this.load.audio(`pat18`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Patos/Patos18.mp3`);
        this.load.audio('nar4', `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Narrateur/Narrateur4.mp3`)
    }

    create() {
        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : textDialogAfterSecond,
            nextScene : 'DialogAfterLevel2'
        })
    }

    update() {}
}