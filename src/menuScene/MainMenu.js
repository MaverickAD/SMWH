import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({key: 'MainMenu'});
    }

    preload(){

    }

    create() {
        this.selectedButton = 0
        this.lastShiftDownTime = 0

        const {width, height} = this.scale;
        let widthButton = 600;
        let heightButton = 75;

        this.playButton     = this.add.rectangle(width / 2, 1 * height / 4, widthButton, heightButton, 0x0000FF, 1)
        this.playText       = this.add.text(this.playButton.x, this.playButton.y, "Play", {color: '#000000'}).setOrigin(0.5)

        this.settingsButton = this.add.rectangle(width / 2, 2 * height / 4, widthButton, heightButton, 0xFFFFFF, 1)
        this.settingsText   = this.add.text(this.settingsButton.x, this.settingsButton.y, "Settings", {color: '#000000'}).setOrigin(0.5)

        this.creditButton   = this.add.rectangle(width / 2, 3 * height / 4, widthButton, heightButton, 0xFFFFFF, 1)
        this.creditText     = this.add.text(this.creditButton.x, this.creditButton.y, "Credit", {color: "#000000"}).setOrigin(0.5)

        this.keyBoard      = this.input.keyboard;
        this.inputKeysMeta = this.keyBoard.addKeys('Z, S, ENTER');
    }

    update() {
        if (this.inputKeysMeta.Z.isDown && this.inputKeysMeta.Z.timeDown - this.lastShiftDownTime > 100){
            this.lastShiftDownTime = this.inputKeysMeta.Z.timeDown
            switch (this.selectedButton) {
                case 1:
                    this.playButton.setFillStyle(0x0000FF, 1)
                    this.settingsButton.setFillStyle(0xFFFFFF, 1)
                    this.selectedButton -= 1
                    break;
                case 2:
                    this.settingsButton.setFillStyle(0x0000FF, 1)
                    this.creditButton.setFillStyle(0xFFFFFF, 1)
                    this.selectedButton -= 1
                    break;
            }
        }

        if (this.inputKeysMeta.S.isDown && this.inputKeysMeta.S.timeDown - this.lastShiftDownTime > 100){
            this.lastShiftDownTime = this.inputKeysMeta.S.timeDown
            switch (this.selectedButton) {
                case 0:
                    this.settingsButton.setFillStyle(0x0000FF, 1)
                    this.playButton.setFillStyle(0xFFFFFF, 1)
                    this.selectedButton += 1
                    break;
                case 1:
                    this.creditButton.setFillStyle(0x0000FF, 1)
                    this.settingsButton.setFillStyle(0xFFFFFF, 1)
                    this.selectedButton += 1
                    break;
            }
        }

        this.playButton.setInteractive()
        this.playButton.on('pointerdown', () => {
            this.scene.start('DialogLevel1')
        })

        this.settingsButton.setInteractive()
        this.settingsButton.on('pointerdown', () => {
            this.scene.start('SettingsMenu')
        })


        if (this.inputKeysMeta.ENTER.isDown && this.selectedButton === 0){
            this.scene.start('DialogLevel1')
        }
        else if (this.inputKeysMeta.ENTER.isDown && this.selectedButton === 1){
            this.scene.start('SettingsMenu')
        }


    }

    anyOfKey(keys, duration=0) {
        for (let key of keys)
            if (this.keyBoard.checkDown(key, duration)) return true;
        return false;
    }
}