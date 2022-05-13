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
        this.id = "bottle"

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

        this.id = "grape"

        this.scene = scene;
        this.obj = obj;
        this.color = color;

        this.x = this.obj.x;
        this.y = this.obj.y;
    }

    destroy() {
        this.obj.destroy();
    }
}


export class GrapeSpawner {
    constructor(obj, scene, color) {

        this.scene  = scene;
        this.obj    = obj;

        this.color   = color;
        
        this.x      = this.obj.x;
        this.y      = this.obj.y;
        
        this.scene.add.image(this.x, this.y, 'bush').setScale(1.5);
        this.waitingGrape = new Grape (this.scene, this.color, this.scene.add.image(this.x, this.y, "Grape" + this.color));

        this.scene.physics.add.existing(this.obj, true); 
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    generateNewGrape() {
        this.waitingGrape = new Grape (this.scene, this.color, this.scene.add.image(this.x, this.y, "Grape" + this.color));
    }

    getGrape(){
        this.generateNewGrape();
        return this.waitingGrape;
    }
}


export class Press {
    constructor(obj, scene) {

        this.scene  = scene;
        this.obj    = obj;

        this.state  = "Empty";
        this.space = true;

        this.pressAdvencement = 0; 


        this.x      = this.obj.x;
        this.y      = this.obj.y;
        
        this.img =  this.scene.add.image(this.x, this.y, "press" + this.state)

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    receiveGrape(grape){
        switch (this.state) {
            case 'Empty': 
                this.img.setTexture("pressHalf" + grape.color + "Unpressed"); this.state = "Half" + grape.color + "Unpressed";  break;
            case 'HalfRedUnpressed' : 
                if(grape.color == "Red"){
                    this.img.setTexture("pressFullRedUnpressed"); this.state = "FullRedUnpressed";
                }
                else{
                    this.img.setTexture("pressFullRoseUnpressed"); this.state = "FullRoseUnpressed";
                }
                this.space = false;
                break;
            case 'HalfWhiteUnpressed' : 
                if(grape.color == "Red"){
                    this.img.setTexture("pressFullRoseUnpressed"); this.state = "FullRoseUnpressed";
                }
                else{
                    this.img.setTexture("pressFullWhiteUnpressed"); this.state = "FullWhiteUnpressed";
                }
                this.space = false;
                break;
        }   

    }

    press(){
        
    }

    giveWine(bottle) {
        this.state = "empty"
    }
}




//presse
//bottle
//etiqueteur
//spwaner raisin et bottle
//mailbox
