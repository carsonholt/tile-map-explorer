import Game from './game';
import Player from './player';
import Phaser from './phaser.min';

// Create the game
var game = new Game(1024, 768);

// Create the player and add it to the game
game.addEntity(new Player(60, 60));

// Start the main game loop
game.loop();
