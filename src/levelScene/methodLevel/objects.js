export class Spawner {
    constructor(obj, scene) {

        this.scene  = scene;
        this.obj    = obj;

        this.fill   = false;

        this.x      = this.obj.x;
        this.y      = this.obj.y;

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    generateNewPackage() {
        this.fill = true;
        const randIndicator = Math.random()
        if (randIndicator <= 0.16){
            this.waitingObject = new Package(
                this.scene.add.image(this.x - 5, this.y - 30, 'leaf').setScale(0.8),
                2
            );
        }
        else if (0.16 < randIndicator && randIndicator <= 0.32){
            this.waitingObject = new Package(
                this.scene.add.image(this.x - 5, this.y - 30, 'sunglasses').setScale(1.2),
                2
            );
        }
        else if (0.32 < randIndicator && randIndicator <= 0.48){
            this.waitingObject = new Package(
                this.scene.add.image(this.x - 5, this.y - 30, 'miror').setScale(1),
                1
            );
        }
        else if (0.48 < randIndicator && randIndicator <= 0.64){
            this.waitingObject = new Package(
                this.scene.add.image(this.x - 5, this.y - 30, 'medusa').setScale(1.2),
                1
            );
        }
        else if (0.64 < randIndicator && randIndicator <= 0.80){
            this.waitingObject = new Package(
                this.scene.add.image(this.x - 5, this.y - 30, 'bone').setScale(2),
                0
            );
        }
        else if (0.80 < randIndicator){
            this.waitingObject = new Package(
                this.scene.add.image(this.x - 5, this.y - 30, 'bowl').setScale(1.5),
                0
            );
        }
        this.waitingObject.obj.setDepth(5)
    }

    getObj(){
        this.fill = false;
        return this.waitingObject;
    }
}

export class Package {
    constructor(obj, id){
        this.obj = obj;
        this.id  = id;

        this.x = this.obj.x;
        this.y = this.obj.y;

        this.isPacked = false;
    }
    destroy(){
        this.obj.destroy();
    }
}

export class MailBox {
    constructor(obj, scene, id) {
        this.obj   = obj;
        this.scene = scene;
        this.id    = id;

        this.x = this.obj.x;
        this.y = this.obj.y;

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }
}

export class Packer {
    constructor(obj, firstFrame, secondFrame, scene) {

        this.allFrames = [firstFrame, secondFrame];
        this.allFrames[1].visible = false;

        this.scene = scene;
        this.obj   = obj;
        this.x     = this.obj.x;
        this.y     = this.obj.y;

        this.package = undefined;
        this.timePackaging = 0;
        this.finished = false;

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    initPackaging(packageObject, timer){
        this.package = new Package(
            this.scene.add.image(this.x + 20, this.y, packageObject.obj.texture.key),
            packageObject.id
        );
        this.timePackaging = timer;
    }

    actualizeSituationPackage(timer, wich){
        if (!this.package && this.finished) {
            this.finished = false;
            return;
        }
        if (!this.package || this.finished) return;

        this.allFrames[+wich].visible = true;
        this.allFrames[+!wich].visible = false;
        if ((timer - this.timePackaging) > 10000) {
            this.allFrames[0].visible = true;
            this.allFrames[1].visible = false;
            this.package.isPacked = true;
            this.finished = true;
            this.package.obj.setTexture('box');
            this.package.obj.setScale(0.5)
            this.scene.sound.add('travailtermine').play();
        }
    }

    takeObject(){
        this.finished = false;
        this.package  = undefined;
    }


}

