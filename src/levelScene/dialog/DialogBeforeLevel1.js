import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import { textDialogIntro } from './methodDialog/textDialogIntro';

export default class DialogBeforeLevel1 extends Phaser.Scene {
    constructor() {
        super({key: 'DialogLevel1'})
    }

    preload() {
        this.load.image('zeus',    'https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/Zeus.svg');
        this.load.image('trident', 'https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/trident.png')
        this.load.audio('meuh',    'https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/meuh.wav');
    }

    create() {
        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : textDialogIntro,
            nextScene : 'LevelSecond'
        })
    }

    update() {}
}