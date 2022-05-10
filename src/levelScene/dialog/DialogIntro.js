import Phaser from 'phaser';
import { DialogModalPlugin } from "./methodDialog/dialog_plugin";
import {textDialogIntro} from "./methodDialog/textDialogIntro";

export default class DialogIntro extends Phaser.Scene {
    constructor() {
        super({key: 'DialogIntro'})
    }

    preload() {

    }

    create() {
        this.dialogDone = false
        this.iterator = 0
        this.currentDialog = 0
        this.lastShiftDownTime = 0

        this.dialogIntro = new DialogModalPlugin(this)
        this.dialogIntro.init()
        this.dialogIntro.setText(String(textDialogIntro[this.iterator].speaker) + ':\n' + String(textDialogIntro[this.iterator].text), true)

        this.keyboard = this.input.keyboard
        this.inputKeys = this.keyboard.addKeys('SPACE')
    }

    update() {
        // if(this.inputKeys.SPACE.isDown && this.inputKeys.SPACE.timeDown - this.lastShiftDownTime > 500 && !this.dialogDone){
        //     this.dialogDone = true
        //     this.lastShiftDownTime = this.inputKeys.SPACE.timeDown
        //     this.dialogIntro.setText(String(textDialogIntro[this.iterator].speaker) + ':\n' + String(textDialogIntro[this.iterator].text), false)
        //
        //     console.log('into first')
        // }
        // else if(this.inputKeys.SPACE.isDown && this.inputKeys.SPACE.timeDown - this.lastShiftDownTime > 500 && this.iterator < textDialogIntro.length && this.dialogDone){
        //     this.dialogDone = false
        //     this.iterator += 1
        //     this.dialogIntro.setText(String(textDialogIntro[this.iterator].speaker) + ':\n' + String(textDialogIntro[this.iterator].text), true)
        //
        //     console.log("into second")
        // }
        //
        // if(this.inputKeys.SPACE.isDown && this.inputKeys.SPACE.timeDown - this.lastShiftDownTime > 500 && this.iterator === textDialogIntro.length - 1) {
        //     this.scene.start('GameView')
        // }


        // if(this.inputKeys.SPACE.isDown && this.inputKeys.SPACE.timeDown - this.lastShiftDownTime > 500 && this.dialogDone){
        //     this.scene.start('GameView');
        // }
        if(this.inputKeys.SPACE.isDown && this.inputKeys.SPACE.timeDown - this.lastShiftDownTime > 500){
            console.log('Before : ' + String(this.currentDialog) + ' ' + String(this.iterator))
            if(this.currentDialog !== this.iterator){
                this.dialogIntro.setText(String(textDialogIntro[this.currentDialog].speaker) + ':\n' + String(textDialogIntro[this.currentDialog].text), true)
                this.iterator += 1
                console.log('not same')
            }
            console.log('Between : ' + String(this.currentDialog) + ' ' + String(this.iterator))
            if(this.currentDialog === this.iterator){
                this.dialogIntro.setText(String(textDialogIntro[this.currentDialog].speaker) + ':\n' + String(textDialogIntro[this.currentDialog].text), false)
                this.currentDialog += 1
                console.log('same')
            }
            console.log('After : ' + String(this.currentDialog) + ' ' + String(this.iterator))


        }
        if(this.iterator === textDialogIntro.length - 1){
            this.dialogDone = true;
        }
    }
}