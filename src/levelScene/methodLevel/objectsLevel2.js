export class Spawner {
    constructor(obj, scene) {

        this.scene  = scene;
        this.obj    = obj;


        this.x      = this.obj.x;
        this.y      = this.obj.y;

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    generateNewBottle(texture) {
        this.newBottle = new Bottle(1,  this.scene, texture);
        return this.newBottle
    }
}

export class Bottle {
    constructor(id, scene, texture) {
        this.id = id;
        this.scene = scene;
        this.obj = this.scene.add.image(this.scene.ball.x, this.scene.ball.y, texture);

        this.x = this.scene.ball.x;
        this.y = this.scene.ball.y;
    }

    destroy() {
        this.obj.destroy()
    }
}


//presse
//bottle
//etiqueteur
//spwaner raisin et bottle
//mailbox
