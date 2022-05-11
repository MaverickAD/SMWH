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
        this.dialogFirst.init({allText : ["oaentuhaonstuh", 'caca']})
    }

    update() {}
}