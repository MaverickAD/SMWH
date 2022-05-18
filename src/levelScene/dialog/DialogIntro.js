import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import {textDialogIntro} from "./methodDialog/textDialogIntro";

export default class DialogIntro extends Phaser.Scene {
    constructor() {
        super({key: 'DialogIntro'})
    }

    preload() {
        this.load.image('zeus',    'https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/Zeus.svg');
        this.load.image('pathos',  'https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/perso-grand.png');
        this.load.audio('test',    'https://raw.githubusercontent.com/MaverickAD/SMWH/dialog/assets/DIALOGUE CUT/Narrateur/Narrateur1.mp3');
    }

    create() {
        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : [
                { text : 'Ou est mon trident', picture : 'zeus',    sound : 'test'},
                { text : 'Je suis ici',        picture : 'trident', sound : 'test'},
                { text : 'Bonjour a toi',      picture : 'zeus',    sound : 'test'},
                { text : 'Bonjour de meme',    picture : 'trident', sound : 'test'}
            ],
            nextScene : 'LevelSecond'
        });

    }

    update() {
        
    }
}