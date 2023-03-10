class SceneManager{
    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0

        this.loadLevel();
        

    }


    loadLevel(){
        this.game.restart = false;
        this.game.entities = [];
        this.game.player = new Saturn(this.game);
        this.game.score = -800;

        this.game.background = new Background(this.game);
        this.game.sun = new Sun(this.game);

        
        for(let i = 0; i < 10; i++){
            var planet = new Planet(this.game, i, randomInt(30)+15);

            if(i % 2 == 0) planet.y = randomInt(200)+(params.screenHeight - 300);
            else planet.y = (300) - randomInt(200);

            planet.x = 400 + i*500;

            
            

            this.game.addEntity(planet)
            
        }
        for(let i = 20; i < 1000; i++){
            var planet = new Planet(this.game, i, randomInt(30)+15);

            planet.y = randomInt(200)+(params.screenHeight/2 - 100);
    
            planet.x = 400 + i*500;

            
            

            this.game.addEntity(planet)
            
        }
    }



    update(){
        if(this.game.restart) this.loadLevel();

        let midpoint = params.screenWidth/2 - this.game.player.radius;
        this.x = this.game.player.x - midpoint;

    }


    draw(ctx){

    }


}