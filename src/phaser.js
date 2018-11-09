import Phaser from './phaser.min';

var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
   scene: {
        preload: preload,
        create: create,
    }
};
var game = new Phaser.Game(config);

function preload() {
	game.load.tilemap("map","assets/suburb.json",null,Phaser.Tilemap.TILED_JSON);
	game.load.image("houseTiles","assets/house-exteriors.tsx");
	game.load.image("terrainTiles","assets/terrain-tiles.tsx");
}
  
var map;
var layer;

function create(){
    map = game.add.tilemap("map");
    map.addTilesetImage("terrain-tiles","terrainTiles");
	map.addTilesetImage("house-exteriors", "houseTiles");
    layer = map.createLayer("GroundLayer");
	//this.layerBackground = this.map.createLayer('Background');
    layer.resizeWorld();
  }