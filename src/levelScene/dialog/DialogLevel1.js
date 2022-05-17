import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";

export default class DialogLevel1 extends Phaser.Scene {
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
            dialogs : [
                { text : 'Ou est mon trident', picture : 'zeus',    sound : 'meuh'},
                { text : 'Je suis ici',        picture : 'trident', sound : 'meuh'},
                { text : 'Bonjour a toi',      picture : 'zeus',    sound : 'meuh'},
                { text : 'Bonjour de meme',    picture : 'trident', sound : 'meuh'}
            ],
            nextScene : 'levelFirst'
        })
    }

    update() {}
}