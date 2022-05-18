import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import {textDialogIntro} from "./methodDialog/textDialogIntro";

export default class DialogIntro extends Phaser.Scene {
    constructor() {
        super({key: 'DialogIntro'})
    }

    preload() {
        
        this.load.image('zeus',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/Zeus.svg');
        this.load.image('pathos',  'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/perso-grand.png');
        
        for (let i = 1; i < 3; i++) {
            this.load.audio(`nar${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Narrateur/Narrateur${i}.mp3`);
        }

        for (let i = 1; i < 6; i++) {
            this.load.audio(`pat${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Patos/Patos${i}.mp3`);
        }

        this.load.audio('zeus1',   'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Zeus/Zeus.mp3');
        for(let i = 2; i < 8;i++) {
            this.load.audio(`zeus${i}`, `https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Zeus/Zeus${i-1}.mp3`);
        }
    }

    create() {
        this.dialogFirst = new DialogModalPlugin(this)
        this.dialogFirst.init({
            dialogs : textDialogIntro,
            nextScene : 'LevelFirst'
        });

    }

    update() {
        
    }
}