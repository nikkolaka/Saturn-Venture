// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        this.player = new Saturn(this);

        this.sun = new Sun(this);

        this.camera;

        this.largestGrav;

        this.score = 0;

        this.background = new Background(this);


        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false,
        };

        this.restart = false;
        this.canrestart = true;
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, params.screenWidth, params.screenHeight)
        // Draw latest things first
        this.background.draw(this.ctx);
        


        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
            
        }
        this.player.draw(this.ctx);
        this.sun.draw(this.ctx);

        
        this.ctx.stroke();
        this.ctx.font = " 48px pixelmix";
        this.ctx.fillStyle = "#09ff00";
        this.ctx.fillText(this.score, 20, 50);
        this.ctx.font = " 30px pixelmix";
        if(this.player.dead || this.player.tooFar || this.player.incinerated){
            this.ctx.fillStyle = "black";
            this.ctx.fillRect((params.screenWidth/1.5)-(params.screenWidth/2)-25,320, params.screenWidth/1.5 +50, params.screenHeight/4 )
            this.ctx.fillStyle = "white";
            this.ctx.fillRect((params.screenWidth/1.5)-(params.screenWidth/2)+5 - 25,320 +5, params.screenWidth/1.5 - 10 +50, params.screenHeight/4-10)
            this.ctx.fillStyle = "black";
            this.ctx.fillRect((params.screenWidth/1.5)-(params.screenWidth/2)+7.5 -25,320 +7.5, params.screenWidth/1.5 - 15 +50, params.screenHeight/4-15)
            
            
        }
        this.ctx.font = " 30px pixelmix";
        this.ctx.fillStyle = "#09ff00";
        if(this.player.tooFar){
            
            this.ctx.fillText("You have been flung into the void", 165, params.screenHeight/2);
            this.ctx.fillText("Eta: ∞", 450, params.screenHeight/2 + 80);
            
        } else if(this.player.incinerated){
            this.ctx.fillText("Things are getting a bit toasty", 190, params.screenHeight/2);
            this.ctx.fillText("Eta: 10000°F", 410, params.screenHeight/2 + 80);
            
        } else if(this.player.dead){
            console.log("crashed")
            this.ctx.fillText("I think this is the wrong planet", 190, params.screenHeight/2);
            this.ctx.fillText("Eta: I can't find my arm", 290, params.screenHeight/2 + 80);
            
        }
        
    };

    update() {
        //console.log("Sun: " + Math.ceil(this.sun.deathX)+ " Speed: "+Math.ceil(this.sun.speed) + " Saturn: "+Math.ceil(this.player.x))


        let entitiesCount = this.entities.length;

        if(this.keys.r){

            
            if(this.canrestart){
                this.restart = true;
                this.canrestart = false;
                setTimeout(() => {this.canrestart = true;}, 1000)
            }
            
            
        }

        
        
        
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            

            if (!entity.removeFromWorld) {
                this.player.collision(entity);
                this.player.gravity(entity);
                

                entity.update();
            }
        }

        

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        if(!this.player.dead && !this.player.tooFar && !this.player.incinerated){
            this.player.update();
            this.sun.update();
        }
        

        this.background.update();
        

        if(this.player.x > this.score) this.score += Math.floor((this.player.x/100) - this.score);

        this.camera.update();


    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)