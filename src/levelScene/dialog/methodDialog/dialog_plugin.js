export var DialogModalPlugin = function (scene) {
    this.scene = scene;
    this.systems = scene.sys;

    this.scene.input.keyboard.on('keydown-SPACE', _ => {
        if (this.iterator.isEnded()) {
            this.scene.sound.stopAll();
            this.scene.scene.start(this.nextScene);
        }
        if (this.isFinished()) {
            this.setText(this.iterator.next());
            const newx = this.iterator.isEven() ? this.otherX : this.defaultX;
            this.graphics.x = newx;
            this.text.x     = newx + 40;
        }
        if (this.timedEvent) this.timedEvent.delay = 0;
    });

    this.scene.input.keyboard.on('keyup-SPACE',   _ => { if (this.timedEvent) this.timedEvent.delay = 90 })
    
    if (!scene.sys.settings.isBooted) scene.sys.events.once('boot', this.boot, this);
};

DialogModalPlugin.register = function (PluginManager) {
    PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal');
};

DialogModalPlugin.prototype = {
    // called when the plugin is loaded by the PluginManager
    boot: function () { this.systems.events.on('destroy', this.destroy, this) },

    // Called when a Scene shuts down, it may then come back again later
    // (which will invoke the 'start' event) but should be considered dormant.
    shutdown: function () {
        if (this.timedEvent) this.timedEvent.remove();
        if (this.text) this.text.destroy();
    },

    // called when a Scene is destroyed by the Scene Manager
    destroy: function () {
        this.shutdown();
        this.scene = undefined;
    },

    // Initialize the dialog modal
    init: function (opts) {
        // Check to see if any optional parameters were passed
        if (!opts) opts = {};
        // set properties from opts object or use defaults
        this.borderThickness = opts.borderThickness || 3;
        this.borderColor     = opts.borderColor     || 0x907748;
        this.borderAlpha     = opts.borderAlpha     || 1;
        this.windowAlpha     = opts.windowAlpha     || 0.8;
        this.windowColor     = opts.windowColor     || 0x303030;
        this.windowHeight    = opts.windowHeight    || 150;
        this.padding         = opts.padding         || 32;
        this.dialogs         = opts.dialogs
        this.nextScene       = opts.nextScene

        this.eventCounter = 0;
        this.stackPicture = [];
        this.pict;
        this.sound;
        this.text;
        this.dialog;
        this.graphics;

        // Create the dialog window
        this._createWindow();
        this.iterator = (() => { 
            let n = 0;
            let m = this.dialogs.length;
            return { next :          () => this.dialogs[n++]?.text,
                     getPicture :    () => this.dialogs[n-1]?.picture,
                     getMusic :      () => this.dialogs[n-1]?.sound,
                     isEven :        () => n % 2 === 0,
                     isEnded :       () => n === m,
                     getAnim :       () => this.dialogs[n-1]?.anim,
                     getAdditional : () => this.dialogs[n-1]?.additional
                   };
        })();
        
        const firstText = this.iterator.next();
        this.setText(firstText);
    },

    // Hide/Show the dialog window
    toggleWindow: function () {
        this.visible = !this.visible;
        if (this.text) this.text.visible = this.visible;
        if (this.graphics) this.graphics.visible = this.visible;
    },

    // Slowly displays the text in the window to make it appear annimated
    _animateText: function () {
        const actual = this.dialog[++this.eventCounter - 1];
        if (this.isFinished()) this.timedEvent.remove();
        if (actual) this.text.setText(this.text.text + actual);
    },

    isFinished: function () { return (this.eventCounter === this.dialog.length) },

    // Sets the text for the dialog window
    setText: function (text) {

        if (text === undefined) return;

        // Reset the dialog
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();

        if (this.stackPicture.length === 2) {
            this.stackPicture[0].destroy();
            this.stackPicture = [this.stackPicture[1]];
        }
        this.stackPicture[0]?.setAlpha(0.3);

        if (!this.iterator.isEven())
            this.stackPicture.push(this.scene.add.image(
                this.padding, 
                this._getGameHeight() - this.windowHeight - this.padding,
                this.iterator.getPicture()
            ).setOrigin(0, 1)
             .setScale(5));
        else {
            this.stackPicture.push(this.scene.add.image(
                this._getGameWidth()  - this.padding,
                this._getGameHeight() - this.windowHeight - this.padding,
                this.iterator.getPicture()
            ).setOrigin(1, 1)
             .setScale(5));
            this.stackPicture[1].flipX = true;
        }

        this.scene.sound.stopAll();
        this.sound = this.scene.sound.add(this.iterator.getMusic()).play();

        this._setText();
        
        this.pict?.destroy();
        if (this.iterator.getAdditional()) { 
            this.pict = this.scene.add.image(window.innerWidth / 2, window.innerHeight / 2.5, this.iterator.getAdditional()).setScale(0.7); 
        }

        this.timedEvent = this.scene.time.addEvent({
            delay: 90,
            callback: this._animateText,
            callbackScope: this,
            loop: true
        });
    },

    animate : function () {
        if (!this.animation) {
            this.timedEvent.destroy();
            return;
        }
        if (this.actualFrameAnimation) this.actualFrameAnimation.destroy();
        this.actualFrameAnimation = this.scene.add.image(
            this._getGameWidth()  - this.padding,
            this._getGameHeight() - this.windowHeight - this.padding,    
            this.animation.shift()
        )
    },

    // Calcuate the position of the text in the dialog window
    _setText: function () {
        // Reset the dialog
        if (this.text) this.text.destroy();

        var x = this.padding + 10;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 10;

        this.text = this.scene.make.text({
            x : x,
            y : y,
            text : "",
            style: { wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 } }
        });
    },

    // Creates the dialog window
    _createWindow: function () {
        var gameHeight = this._getGameHeight();
        var gameWidth = this._getGameWidth();
        var windowDimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();

        this._createOuterWindow(windowDimensions);
        this._createInnerWindow(windowDimensions);
    },

    // Gets the width of the game (based on the scene)
    _getGameWidth: function () {
        return this.scene.sys.game.config.width;
    },

    // Gets the height of the game (based on the scene)
    _getGameHeight: function () {
        return this.scene.sys.game.config.height;
    },

    // Calculates where to place the dialog window based on the game size
    _calculateWindowDimensions: function (width, height) {
        var x          = this.padding;
        var y          = height - this.windowHeight - this.padding;
        var rectWidth  = (width - (x * 2)) * (2/3);
        var rectHeight = this.windowHeight;

        this.defaultX  = this.padding - x;
        this.otherX    = width / 3 - x;

        return { x, y, rectWidth, rectHeight };
    },

    // Creates the inner dialog window (where the text is displayed)
    _createInnerWindow: function ({ x, y, rectWidth, rectHeight }) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    },

    // Creates the border rectangle of the dialog window
    _createOuterWindow: function ({ x, y, rectWidth, rectHeight }) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    },
};
