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

        

        for(let i = 0; i < 30; i++){
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