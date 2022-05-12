export class BottleSpawner {
    constructor(obj, scene) {

        this.scene  = scene;
        this.obj    = obj;


        this.x      = this.obj.x;
        this.y      = this.obj.y;

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    generateNewBottle(texture) {
        this.newBottle = new Bottle(this.scene, texture);
        return this.newBottle
    }
}

export class Bottle {
    constructor(scene, texture) {
        this.scene = scene;
        this.obj = this.scene.add.image(this.scene.ball.x, this.scene.ball.y, texture).setScale(0.7);

        this.state = "Empty";

        this.x = this.scene.ball.x;
        this.y = this.scene.ball.y;
    }

    destroy() {
        this.obj.destroy()
    }
}

export class Etiqueteur {
    constructor(obj, scene) {

        this.scene  = scene;
        this.obj    = obj;


        this.x      = this.obj.x;
        this.y      = this.obj.y;

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    putTag(bottle) {
        bottle.obj.setTexture("bottle" + bottle.state + "WithTag");
    }
}


export class Grape {
    constructor(scene, color, obj) {
        this.scene = scene;
        this.obj = obj;
        this.color = color;

        this.x = this.obj.x;
        this.y = this.obj.y;
    }

    destroy() {
        this.obj.destroy()
    }
}


export class GrapeSpawner {
    constructor(obj, scene, color) {

        this.scene  = scene;
        this.obj    = obj;

        this.color   = color;

        this.x      = this.obj.x;
        this.y      = this.obj.y;
        
        this.waitingGrape = new Grape (this.scene.add.image(this.x, this.y, "Grape" + this.color).setScale(0.04), this.scene, this.color);

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    generateNewGrape() {
        this.waitingGrape = new Grape (this.scene.add.image(this.x, this.y, "Grape" + this.color).setScale(0.04), this.scene, this.color);
    }

    getGrape(){
        this.generateNewGrape();
        return this.waitingGrape;
    }
}



//presse
//bottle
//etiqueteur
//spwaner raisin et bottle
//mailbox
