class Sun{
    constructor(game){
        this.game = game;
        this.x = -300;
        this.deathX = 615;
        this.red = 255;
        this.green = 255;
        this.blue = 0;
        this.color = rgb(this.red,this.green,this.blue);
        this.startArc = 1.5;
        this.endArc = 0.5;
        this.radius = 1000;
        this.speed = 1;
        
    }

    update(){
        if(this.green > 0){
            this.green -= 0.1;
        } else{
            this.blue += 0.1;
        }

        
        this.color = rgb((this.red),(this.green) ,(this.blue));

        

        
        
        

        if(Math.abs(this.deathX - this.game.player.x)  < 600){
            if(this.speed > 1){
                this.speed -= 0.1;
            } else{
                this.speed = 1
            }
        } else if(this.deathX < this.game.player.x){
            this.speed += 0.01
        } 

        this.x += this.speed;
        this.deathX += this.speed;




    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x - this.game.camera.x, 400,this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.color;
/*         ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(this.deathX - this.game.camera.x, 0);
        ctx.lineTo(this.deathX - this.game.camera.x, params.screenHeight); */
        ctx.stroke();
    }
}