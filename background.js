class Background{
    constructor(game){
        this.starmap = [];

        this.game = game;

        this.x1 = Math.floor(this.game.player.x - params.screenWidth/2);
        this.x2 = Math.floor(this.game.player.x + params.screenWidth/2);

        this.generatedX = this.x2;
        this.density = 4;


        this.buildBackground(0, this.x2);

        

    }
    update(){
        this.x1 = Math.floor(this.game.player.x - params.screenWidth/2);
        this.x2 = Math.floor(this.game.player.x + params.screenWidth/2);
        

        

        if(this.x2 > this.starmap[this.starmap.length-1][0].x){
            this.buildBackground(this.generatedX, this.x2)
        }
    }

    draw(ctx){
        let leftx = this.x1
        if(this.x1 < 0) leftx = 0;
        
        for(let i = leftx; i < this.x2; i++){
            for(let j = 0; j < this.starmap[i].length; j++){
                let star = this.starmap[i][j];
                this.drawCircle(ctx, star.x , star.y, star.radius, star.hsl);
            
            }
        }
    }

    buildBackground(lx, rx){
        
        
        for(let i = lx; i < rx; i++){
            let starslice = []
            starslice.push({x: i, y: -20, radius: Math.random() * (5 - 0.1) + 0.1, hsl: {h:randomInt(361), s:100, l:randomInt(101)}});
            
            for(let j = 0; j < randomInt(this.density); j++){

                starslice.push({x: i, y: randomInt(params.screenHeight), radius: Math.random() * (2.5 - 0.1) + 0.1, hsl: {h:randomInt(361), s:20, l:randomInt(101)}});
            }
            this.starmap.push(starslice);
            
        }

        this.generatedX = rx;
        
        
        
    }

    

    
    drawCircle(ctx, x, y, radius, hsl) {
        ctx.beginPath()
        ctx.arc(x - this.game.camera.x, y, radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        ctx.fill()
        
    }






}