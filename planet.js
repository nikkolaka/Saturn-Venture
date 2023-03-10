class Planet{
    constructor(game, theId, theRadius){


        
        this.id = theId;
        this.game = game 
        this.radius = theRadius;
        this.diameter = this.radius*2;
        this.x = params.screenWidth/2;
        this.y = params.screenHeight/2;

        this.seed = randomInt(500000)+100000;


        this.mass = this.radius*20;
        this.ogMass = this.mass;
        this.playerGrav = 0;
        this.hsl = {h:randomInt(361), s:100, l:60}



    };

    update() {
        
        
    };
    

    draw(ctx){

        ctx.strokeStyle = `hsl(${this.hsl.h}, ${this.hsl.s}%, ${this.hsl.l}%)`;
        ctx.beginPath();
        ctx.arc(this.x - this.game.camera.x, this.y, this.radius, 0, 2 * Math.PI);    
        ctx.fillStyle = `hsl(${this.hsl.h}, ${this.hsl.s}%, ${this.hsl.l}%)`;
        ctx.fill();
        ctx.stroke(); 
    };
    
}