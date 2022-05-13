export class BottleSpawner {
    constructor(obj, scene) {

        this.scene  = scene;
        this.obj    = obj;

        
        this.x      = this.obj.x;
        this.y      = this.obj.y;
        
        this.img = this.scene.add.image(this.x, this.y - 90, "shelf").setScale(3);
        this.img.setDepth(3);

    
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

        this.id_state = 0;

        this.color = "Empty";
        this.tag = false;

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
        bottle.obj.setTexture("bottle" + bottle.color + "WithTag");
        bottle.tag = true;
        bottle.id_state += 1;
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
        this.color = "Empty"
        this.space = true;
        this.pressable = false;
        this.collectable = false;

        this.frame = 1;
        this.pressAdvencement = 0; 


        this.x      = this.obj.x;
        this.y      = this.obj.y;

        
        this.advencementBar = this.scene.add.rectangle(this.x - 50, this.y + 100, 0, 20, 0xFFD700, 1);
        this.advencementBar.setDisplayOrigin(0,1);
        this.img =  this.scene.add.image(this.x, this.y, "press" + this.state).setScale(1.5);
        
        
        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    receiveGrape(grape){
        switch (this.state) {
            case 'Empty': 
                this.img.setTexture("pressHalf" + grape.color + "Unpressed"); this.state = "Half" + grape.color + "Unpressed";  break;
            case 'HalfRedUnpressed' : 
                if(grape.color == "Red"){
                    this.img.setTexture("pressFullRedUnpressed1"); this.state = "FullRedUnpressed";
                }
                else{
                    this.img.setTexture("pressFullRoseUnpressed1"); this.state = "FullRoseUnpressed";
                }
                this.space = false;
                this.pressable = true;
                break;
            case 'HalfWhiteUnpressed' : 
                if(grape.color == "Red"){
                    this.img.setTexture("pressFullRoseUnpressed1"); this.state = "FullRoseUnpressed";
                }
                else{
                    this.img.setTexture("pressFullWhiteUnpressed1"); this.state = "FullWhiteUnpressed";
                }
                this.space = false;
                this.pressable = true;
                break;
        }   

    }

    press(){
        this.pressAdvencement += 5;
        this.advencementBar.width = this.pressAdvencement;
        this.frame ++; 
        if (this.frame == 4){
            this.frame = 1;
        }

        this.img.setTexture("press" + this.state + this.frame);


        if (this.pressAdvencement >= 100){
            switch (this.state){
                case "FullRedUnpressed" : this.state =   "RedPressed"; this.color = "Red"; break;
                case "FullWhiteUnpressed" : this.state = "WhitePressed"; this.color = "White"; break;
                case "FullRoseUnpressed" : this.state =  "RosePressed"; this.color = "Rose"; break;
            }
            this.collectable = true;
            this.advencementBar.width = 0;
            this.pressAdvencement = 0;
            this.img.setTexture("press" + this.state);
            this.pressable = false;
        }
    }

    giveWine(bottle) {
        
        if (bottle.tag){
            bottle.obj.setTexture("bottle" + this.color + "WithTag");
        }
        else{
            bottle.obj.setTexture("bottle" + this.color);
        }
        bottle.color = this.color;

        this.img.setTexture("pressEmpty");
        this.state = "Empty"; 
        this.collectable = false;
        this.color = "Empty"
        this.space = true;
    }
}

export class SendBottle {
    constructor(obj, scene) {
        this.obj = obj
        this.scene = scene
        this.command = undefined

        this.x = this.obj.x
        this.y = this.obj.y

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    generateCommand(){
        const randIndicator = Math.random()
        if (randIndicator <= 0.33) {
            this.command = "Red"
        }
        else if (0.33 < randIndicator && randIndicator <= 0.66) {
            this.command = "White"
        }
        else if (0.66 < randIndicator && randIndicator < 1){
            this.command = "Rose"
        }
        console.log(this.command)
    }
}





//presse
//bottle
//etiqueteur
//spwaner raisin et bottle
//mailbox