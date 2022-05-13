import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";

export default class DialogLevel1 extends Phaser.Scene {
    constructor() {
        super({key: 'DialogLevel1'})
    }

    preload() {
        this.load.image('zeus', 'https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/Zeus.svg');
    }

    create() {
        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : [
                { text : 'taume tu es tres beau', picture : 'zeus' },
                { text : 'merci ca fait plaisir', picture : 'zeus' },
                { text : 'loick dit que cela n"est pas vrai', picture : 'zeus' }],
        })
    }

    update() {}
}