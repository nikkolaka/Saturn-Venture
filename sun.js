class Sun{
    constructor(game){
        this.game = game;
        this.x = -900;
        this.red = 255;
        this.green = 255;
        this.blue = 0;
        this.color = rgb(this.red,this.green,this.blue);
        this.startArc = 1.5;
        this.endArc = 0.5;
        this.radius = 1000;
        this.speed = 0.075;
        
    }

    update(){
        if(this.green > 0){
            this.green -= this.speed;
        } else{
            this.blue += this.speed;
        }

        
        this.color = rgb((this.red),(this.green) ,(this.blue));

        

        this.startArc += this.speed;
        this.endArc -= this.speed;
        if(this.radius < 10000) this.radius += this.speed;


        if(this.game.player.x - (this.radius + this.x) < 5000)  this.speed = 0.075;
        else this.speed = 0.005




    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x - this.game.camera.x, 400,this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}