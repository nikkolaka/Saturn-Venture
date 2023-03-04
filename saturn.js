class Saturn{
    constructor(game){

        this.friction = 0;

        this.vel = new Vector(2,0);
        this.acc = new Vector(0,0);
        this.grav = new Vector(0,0);

        this.acceleration = 0.05;
        

        this.game = game;
        this.radius = 5;
        this.diameter = this.radius*2;
        this.x = 800;
        this.y = 200;
        this.dead = false;
        this.tooFar = false;




        



    };

    update() {
        /* if(this.game.keys.a) this.acc.x = -this.acceleration; */
        if(this.game.keys.w) this.acc.y = -this.acceleration;
        /* if(this.game.keys.d) this.acc.x = this.acceleration; */
        if(this.game.keys.s) this.acc.y = this.acceleration;                         

        if(!this.game.keys.s && !this.game.keys.w) this.acc.y = 0;
        /* if(!this.game.keys.a && !this.game.keys.d) this.acc.x = 0; */

        
        

        

        

        this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc.add(this.grav))
        this.vel = this.vel.mult(1-this.friction)

        this.x += this.vel.x*this.game.clockTick*100;
        this.y += this.vel.y*this.game.clockTick*100;


        this.grav = new Vector(0,0);
        
        if(this.y > params.screenHeight + 500 || this.y < -500) this.tooFar = true;


        

        
        
    };

    draw(ctx){
        /* this.vel.drawVector(this.x- this.game.camera.x, this.y, 10, "green", ctx)
        this.acc.drawVector(this.x- this.game.camera.x, this.y, 100, "blue", ctx)
        this.grav.drawVector(this.x- this.game.camera.x, this.y, 50, "black", ctx) */
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(this.x - this.game.camera.x, this.y, this.radius, 0, 2 * Math.PI);    
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke(); 
    };

    gravity(planet){
        var dx = planet.x - this.x;
        var dy = planet.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        
        dx /= distance;
        dy /= distance;

        let newGrav = (new Vector(dx, dy)).mult((planet.mass/(distance**2)));

        this.grav = this.grav.add(newGrav);
        
        
        planet.playerGrav = (planet.mass/(distance**2));

        if(this.game.largestGrav === undefined || (planet.mass/(distance**2)) > this.game.largestGrav.playerGrav){
            this.game.largestGrav = planet;
        }
        



        




    }
    collision(planet){

        var dx = this.x - planet.x;
        var dy = this.y - planet.y;

        var radiusSum = this.radius+planet.radius
    
        if((dx * dx + dy * dy) < (radiusSum)*(radiusSum)){
            this.dead = true;
            
            /* var distance = Math.sqrt(dx * dx + dy * dy);
            var step = radiusSum - distance;
            
            dx /= distance;
            dy /= distance;
            this.x += dx*step/COLLISIONREBOUND;
            this.y += dy*step/COLLISIONREBOUND; */


        }
    
    }
    
}