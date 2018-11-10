/** @module Player
  * A class representing the player.
  */
export default class Player {
  /** @constructor
    * Constructs a new player instance
    * @param {float} x - the player's x position
    * @param {float} y - the player's y position
    */
  constructor(x, y) {
	this.img = new Image();
	this.img.src = "player-front.png";
    this.x = x;
    this.y = y;
  }

  /** @method update
    * Updates the player
    * @param {double} deltaT - the elapsed time
    * @param {Input} input - the input object
    */
  update(deltaT, input) {
    if(input.keyPressed("ArrowLeft")) {
		this.x--;
		this.img.src = "player-left.png";
	}
    if(input.keyPressed("ArrowRight")) {
		this.x++;
		this.img.src = "player-right.png";
	}
    if(input.keyPressed("ArrowUp")) {
		this.y--;
		this.img.src = "player-back.png";
	}
    if(input.keyPressed("ArrowDown")) {
		this.y++;
		this.img.src = "player-front.png";
	}
  }

  /** @method render
    * Renders the player
    * @param {double} deltaT - elapsed time
    * @param {Context2D} context - the rendering context
    */
  render(deltaT, context) {
	context.drawImage(this.img, this.x, this.y);
  }

}
