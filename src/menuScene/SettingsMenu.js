import Phaser from 'phaser'

export default class SettingsMenu extends Phaser.Scene {
    constructor() {
        super({key: 'SettingsMenu'});
    }

    preload() {

    }

    create() {
        const {width, height} = this.scale;
        this.blockWidth = 600
        this.blockHeight = 100

        this.allSettingsBlock   = this.add.rectangle(width / 2, height / 2, this.blockWidth, 6 * this.blockHeight, 0xFFFFFF, 1)

        this.settingsTextBlock  = this.add.rectangle(width / 2, height / 2 - 2.5 * this.blockHeight, this.blockWidth, this.blockHeight, 0xFFFF00, 1)
        this.settingsText       = this.add.text(this.settingsTextBlock.x, this.settingsTextBlock.y, 'SETTINGS', {color: '#000000'}).setOrigin(0.5)

        this.languageBlock      = this.add.rectangle(width / 2, height / 2 - 1.5 * this.blockHeight, this.blockWidth, this.blockHeight, 0xFF00FF, 1)
        this.languageText       = this.add.text(this.languageBlock.x - this.blockWidth / 2, this.languageBlock.y, 'LANGUAGE', {color: '#000000'}).setOrigin(0, 0.5)

        this.englishBlock       = this.add.rectangle(this.languageBlock.x + 1 * this.languageBlock.width / 5, this.languageBlock.y, this.languageBlock.width / 5, this.blockHeight / 2, 0x808080, 1)
        this.englishText        = this.add.text(this.englishBlock.x, this.englishBlock.y,'ENGLISH', {color: '#000000'}).setOrigin(0.5)
        this.frenchBlock        = this.add.rectangle(this.languageBlock.x + 2 * this.languageBlock.width / 5, this.languageBlock.y, this.languageBlock.width / 5, this.blockHeight / 2, 0xA6A6A6, 1)
        this.frenchText         = this.add.text(this.frenchBlock.x, this.frenchBlock.y, 'FRANCAIS', {color: '#000000'}).setOrigin(0.5)

        this.setting2Block      = this.add.rectangle(width / 2, height / 2 - 0.5 * this.blockHeight, this.blockWidth, this.blockHeight, 0xFF0000, 1)
        this.setting2Text       = this.add.text(this.setting2Block.x - this.blockWidth / 2, this.setting2Block.y, 'SETTING 2', {color: '#000000'}).setOrigin(0, 0.5)

        this.setting3Block      = this.add.rectangle(width / 2, height / 2 + 0.5 * this.blockHeight, this.blockWidth, this.blockHeight, 0x00FFFF, 1)
        this.setting3Text       = this.add.text(this.setting3Block.x - this.blockWidth / 2, this.setting3Block.y, 'SETTING 3', {color: '#000000'}).setOrigin(0, 0.5)

        this.setting4Block      = this.add.rectangle(width / 2, height / 2 + 1.5 * this.blockHeight, this.blockWidth, this.blockHeight, 0x00FF00, 1)
        this.setting4Text       = this.add.text(this.setting4Block.x - this.blockWidth / 2, this.setting4Block.y, 'SETTING 4', {color: '#000000'}).setOrigin(0, 0.5)

        this.controlBlock       = this.add.rectangle(width / 2, height / 2 + 2.5 * this.blockHeight, this.blockWidth, this.blockHeight, 0x0000FF, 1)
        this.controlText        = this.add.text(this.controlBlock.x - this.blockWidth / 2, this. controlBlock.y, 'CONTROL', {color: '#000000'}).setOrigin(0, 0.5)
        this.controlButtonBlock = this.add.rectangle(this.controlBlock.x + 2 * this.controlBlock.width / 5, this.controlBlock.y, this.controlBlock.width / 8, this.blockHeight / 2, 0xA6A6A6, 1)
        this.controlButtonText  = this.add.text(this.controlButtonBlock.x, this.controlButtonBlock.y, '->', {color: "#000000"}).setOrigin(0.5)


        this.keyBoard = this.input.keyboard;
        this.inputKeys = this.keyBoard.addKeys('ESC');
    }

    update() {
        this.englishBlock.setInteractive();
        this.englishBlock.on('pointerdown',  () => {
            this.englishBlock.setFillStyle(0x808080, 1)
            this.frenchBlock.setFillStyle(0xA6A6A6, 1)
        })

        this.frenchBlock.setInteractive();
        this.frenchBlock.on('pointerdown',  () => {
            this.englishBlock.setFillStyle(0xA6A6A6, 1)
            this.frenchBlock.setFillStyle(0x808080, 1)
        })

        this.controlButtonBlock.setInteractive();
        this.controlButtonBlock.on('pointerdown', () => {
            this.scene.start('ControlMenu')
        })

        if(this.inputKeys.ESC.isDown){
            this.scene.start('MainMenu')
        }
    }
}