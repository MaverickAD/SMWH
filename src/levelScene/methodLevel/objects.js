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
        if (randIndicator <= 0.33)
            this.waitingObject = new Package(
                this.scene.add.circle(this.x, this.y, 10, 0xFF0000, 1),
                0
            );
        else if (randIndicator <= 0.66)
            this.waitingObject = new Package(
                this.scene.add.circle(this.x, this.y,10, 0x00FF00, 1),
                1
            );
        else
            this.waitingObject = new Package(
                this.scene.add.circle(this.x, this.y, 10, 0x0000FF, 1),
                2
            );
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
            this.scene.add.circle(this.x, this.y, 10, 0x000000, 1),
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
            this.package.obj.setFillStyle(0xFF00E5);
        }
    }

    takeObject(){
        this.finished = false;
        this.package  = undefined;
    }


}