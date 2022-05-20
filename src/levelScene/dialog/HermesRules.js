import Phaser from 'phaser';


export default class HermesRules extends Phaser.Scene {
    constructor() {
        super({key: 'HermesRules'})
    }

    preload() {
        this.load.image('parchemin',    'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/parcheminObjets.png');
        this.load.audio('instructions', 'https://raw.githubusercontent.com/MaverickAD/SMWH/main/assets/DIALOGUECUT/Hermes/Hermes4.mp3');
    }

    create() {
        this.add.image(window.width / 2, window.height / 2, 'parchemin');
        this.sound.add('instructions').play();
    }

}