const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	var planet = new Planet(gameEngine, 0);

	gameEngine.addEntity(planet);

	gameEngine.init(ctx);

	gameEngine.start();
});
