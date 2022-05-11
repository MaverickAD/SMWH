export class Spawner {
    constructor(obj, scene) {

        this.scene  = scene;
        this.obj    = obj;


        this.x      = this.obj.x;
        this.y      = this.obj.y;

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    getObj(){
        this.fill = false;
        return this.waitingObject;
    }
}


//presse
//bottle
//etiqueteur
//spwaner raisin et bottle
//mailbox
