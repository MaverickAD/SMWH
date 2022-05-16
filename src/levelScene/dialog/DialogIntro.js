import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import {textDialogIntro} from "./methodDialog/textDialogIntro";

export default class DialogIntro extends Phaser.Scene {
    constructor() {
        super({key: 'DialogIntro'})
    }

    preload() {
        this.load.image('zeus', 'https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/Zeus.svg');
        for (let i = 1; i < 17; i++) 
            this.load.image(`eclair${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/eclair${i}.png`);
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
        })

    }

    update() {
        
    }
}