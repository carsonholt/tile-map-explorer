import Input from './input';
import map from "./assets/suburb.json";
import Camera from "./camera";

/** @class Game
  * A class representing the high-level functionality
  * of a game - the game loop, buffer swapping, etc.
  */  
export default class Game { 
  /** @constructor
    * Creates the game instance
    * @param {integer} width - the width of the game screen in pixels
    * @param {integer} heght - the height of the game screen in pixels
    */
  constructor(width, height) {
    this._start = null;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.input = new Input();
    this.entities = [];

    // Set up the back buffer
    this.backBuffer = document.createElement('canvas');
    this.backBuffer.width = this.WIDTH;
    this.backBuffer.height = this.HEIGHT;
    this.backBufferCtx = this.backBuffer.getContext('2d');

    // Set up the screen buffer
    this.screenBuffer = document.createElement('canvas');
    this.screenBuffer.width = this.WIDTH;
    this.screenBuffer.height = this.HEIGHT;
    this.screenBufferCtx = this.screenBuffer.getContext('2d');
    document.body.append(this.screenBuffer);
	
	// Set up camera
	this.camera = new Camera(map, 1024, 768);
  }

  /** @method addEntity
    * Adds an entity to the game world
    * Entities should have an update() and render()
    * method.
    * @param {Object} entity - the entity.
    */
  addEntity(entity) {
    this.entities.push(entity);
  }
  /** @method update
    * Updates the game state
    * @param {integer} elapsedTime - the number of milliseconds per frame
    */
  update(elapsedTime) {

    // Update game entitites
    this.entities.forEach(entity => entity.update(elapsedTime, this.input));

    // Swap input buffers
    this.input.update();
  }
  
  drawTile(tile, x, y) {
	  if (tile == 1) {
		//draw grass
		var img = new Image();
		img.src = '/grass.png';
		this.backBufferCtx.drawImage(img, 0, 0, 32, 32, x, y, 32, 32);
	  } else if (tile == 2) {
		  //draw sidewalk
		var img = new Image();
		img.src = '/sidewalk.png';
		this.backBufferCtx.drawImage(img, 0, 0, 32, 32, x, y, 32, 32);
	  } else if (tile == 3) {
		  //draw street
		var img = new Image();
		img.src = '/street.png';
		this.backBufferCtx.drawImage(img, 0, 0, 32, 32, x, y, 32, 32);
	  }
  }
  
  /** @method render
    * Renders the game state
    * @param {integer} elapsedTime - the number of milliseconds per frame
    */
  render(elapsedTime) {
    // Clear the back buffer
    this.backBufferCtx.fillStyle = "white";
    this.backBufferCtx.fillRect(0,0,this.WIDTH, this.HEIGHT);

    // TODO: Render game
	for (var i = 0; i < map.layers[0].chunks.length; i++) {
		var k = 0;
		for (var r = 0; r < map.layers[0].chunks[i].data.length; r++) {		
			for (var c = 0; c < map.layers[0].chunks[i].data.length; c++) {
				var tile = map.layers[0].chunks[i].data[k];
				this.drawTile(tile, (map.layers[0].chunks[i].x * 16) + (16 * r) + (16 * c) + (88 * 16), (map.layers[0].chunks[i].y * 16) + (16 * r) + (16 * c) - 512 );
				k++;
			}
		}
	}
	
    // Render entities
    this.entities.forEach(entity => entity.render(elapsedTime, this.backBufferCtx));

    // Flip the back buffer
    this.screenBufferCtx.drawImage(this.backBuffer, 0, 0);
  }

  /** @method loop
    * Updates and renders the game,
    * and calls itself on the next draw cycle.
    * @param {DOMHighResTimestamp} timestamp - the current system time
    */
  loop(timestamp) {
    var elapsedTime = this._frame_start ? timestamp - this._frame_start : 0;
    this.update(elapsedTime);
    this.render(elapsedTime);
    this._frame_start = timestamp;
    window.requestAnimationFrame((timestamp) => {this.loop(timestamp)});
  }
}