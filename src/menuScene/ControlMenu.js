import Phaser from 'phaser'

export default class ControlMenu extends Phaser.Scene {
    constructor() {
        super({key: 'ControlMenu'})
    }

    preload() {

    }

    create() {
        const {width, height} = this.scale
        this.test = this.add.text(width / 2, height / 2, "CONTROL", {color: '#FFFFFF'})

        this.keyBoard = this.input.keyboard;
        this.inputKeys = this.keyBoard.addKeys('ESC');
    }

    update() {
        if(this.inputKeys.ESC.isDown){
            this.scene.start('SettingsMenu')
        }
    }
}