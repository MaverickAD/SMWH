export class BottleSpawner {
    constructor(obj, scene) {

        this.scene  = scene;
        this.obj    = obj;

        
        this.x      = this.obj.x;
        this.y      = this.obj.y;

        this.clink = this.scene.sound.add("clink");
        this.img = this.scene.add.image(this.x, this.y - 250, "shelf").setScale(5);
        this.img.setDepth(3);

    
        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    generateNewBottle(texture) {
        this.newBottle = new Bottle(this.scene, texture);
        this.clink.play();
        return this.newBottle
    }
}

export class Bottle {
    constructor(scene, texture) {
        this.id = "bottle"

        this.scene = scene;
        this.obj = this.scene.add.image(this.scene.ball.x, this.scene.ball.y, texture);

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

        this.bow = this.scene.sound.add("bow");
        this.sprite = this.scene.add.image(this.x - 30, this.y - 20, "Arte1").setScale(1.4);
        this.sprite.setDepth(4);

        this.frame = 0;
        this.animated = false;

        this.scene.physics.add.existing(this.obj, true);
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    putTag(bottle) {
        bottle.obj.setTexture("bottle" + bottle.color + "WithTag");
        bottle.tag = true;
        bottle.id_state += 1;
        this.animated = true;
        this.bow.play();
    }

    update() {
        if(this.animated){
            this.frame += 1;

            for (let i = 1; i <= 9; i++){
                if(this.frame == 2 * i){
                    this.sprite.setTexture("Arte" + i);
                }   
            }
            if(this.frame == 2 * 10){
                this.sprite.setTexture("Arte1");
                this.frame = 0;
                this.animated = false;
            }
        }
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
        this.cut = this.scene.sound.add("cut");
        
        this.x      = this.obj.x;
        this.y      = this.obj.y;
        
        this.scene.add.image(this.x, this.y, 'bush').setScale(3);
        this.waitingGrape = new Grape (this.scene, this.color, this.scene.add.image(this.x, this.y, "Grape" + this.color).setScale(2.5));

        this.scene.physics.add.existing(this.obj, true); 
        this.scene.physics.add.collider(this.obj, this.scene.ball);
    }

    generateNewGrape() {
        this.waitingGrape = new Grape (this.scene, this.color, this.scene.add.image(this.x, this.y, "Grape" + this.color).setScale(2.5));
    }

    getGrape(){
        this.generateNewGrape();
        this.cut.play();
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
        this.squish = this.scene.sound.add("squish");
        this.fill = this.scene.sound.add("bottle_fill");


        this.x      = this.obj.x;
        this.y      = this.obj.y;
        
        this.advencementBar = this.scene.add.rectangle(this.x - 75, this.y + 150, 0, 25, 0xFFD700, 0.75);
        this.advencementBar.setDisplayOrigin(0,1);
        this.img =  this.scene.add.image(this.x, this.y, "press" + this.state).setScale(2.5);
        
        
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
        if (this.scene.currentAlter == 3){this.pressAdvencement += 15};
        this.advencementBar.width = this.pressAdvencement * 1.5;
        this.frame ++; 
        if (this.frame == 4){
            this.frame = 1;
        }

        this.img.setTexture("press" + this.state + this.frame);
        if(!this.squish.isPlaying){
            this.squish.play();
        }

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

        const config = {
            mute: false,
            volume: 1,
            rate: 1.8,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        this.fill.play(config)

        this.img.setTexture("pressEmpty");
        this.state = "Empty"; 
        this.collectable = false;
        this.color = "Empty"
        this.space = true;
    }
}

export class Command {
    constructor(scene, position) {
        this.position = position;
        this.scene = scene;

        const randIndicator = Math.random()
        if (randIndicator <= 0.33) {
            this.command = "Red";
        }
        else if (0.33 < randIndicator && randIndicator <= 0.66) {
            this.command = "White";
        }
        else {
            this.command = "Rose";
        }


        this.img = this.scene.add.image(((this.position * 1.5 + 0.5) / 12) * window.innerWidth, (1 / 8 ) * window.innerHeight, "command" + this.command).setScale(0.8);
        this.good = this.scene.sound.add("good");
        this.error = this.scene.sound.add("error");

        this.x = this.img.x
        this.y = this.img.y

    }

    receiveBottle(bottle){
        if(this.command == bottle.color && bottle.tag){
            this.good.play();
            this.scene.score += 10; 
            this.scene.allCommands = this.scene.allCommands.filter(item => item != this);
            this.scene.commandState[this.position - 1] = false;
            this.scene.allBottle = this.scene.allBottle.filter(item => item != bottle);
            bottle.destroy();
            console.log(this.scene.score);
            this.destroy();
            
        }
        else{
            this.error.play();
            this.scene.score -= 10;
            this.scene.allBottle = this.scene.allBottle.filter(item => item != bottle);
            bottle.destroy();
            console.log(this.scene.score);
        }
    }

    destroy(){this.img.destroy()}


}