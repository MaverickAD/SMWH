import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";

export default class DialogLevel1 extends Phaser.Scene {
    constructor() {
        super({key: 'DialogLevel1'})
    }

    preload() {

    }

    create() {
        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : [
                { text : 'taume tu es tres beau' },
                { text : 'merci ca fait plaisir' },
                { text : 'loick dit que cela n"est pas vrai' }],
        })
    }

    update() {}
}