export default class Camera {
	constructor (map, width, height) {
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.maxX = map.cols * map.tsize - width;
		this.maxY = map.rows * map.tsize - height;
		this.SPEED = 256; // pixels per second
	}

	move (delta, dirx, diry) {
		// move camera
		this.x += dirx * SPEED * delta;
		this.y += diry * SPEED * delta;
		// clamp values
		this.x = Math.max(0, Math.min(this.x, this.maxX));
		this.y = Math.max(0, Math.min(this.y, this.maxY));
	};
}