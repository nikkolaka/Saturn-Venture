class Planet{
    constructor(game, theId, theRadius){

/*         this.vel_x = 0;
        this.vel_y = 0;

        this.acc_x = 0;
        this.acc_y = 0;

        this.acceleration = 1;
        
 */
        
        this.id = theId;
        this.game = game 
        this.radius = theRadius;
        this.diameter = this.radius*2;
        this.x = params.screenWidth/2;
        this.y = params.screenHeight/2;


        this.mass = this.radius*20;
        this.ogMass = this.mass;
        this.playerGrav = 0;



    };

    update() {
        
        
    };

    draw(ctx){

        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x - this.game.camera.x, this.y, this.radius, 0, 2 * Math.PI);    
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.stroke(); 
    };
    
}