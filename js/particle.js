export class Particle {
    constructor(canvas, ctx, velocity_mult = 1, image_bounds=null) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.image_bounds = image_bounds
        this.x = this.get_random_x_position();
        this.y = this.get_random_y_position();
        this.abs_x = Math.floor(this.x);
        this.abs_y = Math.floor(this.y);
        this.speed = 0;
        this.velocity = Math.random() * velocity_mult;
        this.size = Math.random() * 1.5 + 1;
    }

    update(canvas_grid) {
        this.abs_x = Math.floor(this.x);
        this.abs_y = Math.floor(this.y);
        if (this.isWithinBounds(canvas_grid)) {
            this.speed = canvas_grid[this.abs_y][this.abs_x][0]; // brightness value of the pixel
        }
        // brightness is represented by number between 0 and ~2.5
        // want bright pixels to move slow, and dark ones to move fast
        // we substract speed from 2.5 plus velocity for randomness
        let movement = 2.5 - this.speed + this.velocity;
        this.y += movement;

        this.check_y_pos();
    }

    draw(canvas_grid) {
        if (this.isWithinBounds(canvas_grid)) {
            this.ctx.beginPath();
            this.ctx.fillStyle = canvas_grid[this.abs_y][this.abs_x][1]; // rgb value of the pixel
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    get_random_x_position() {
        // generate x position within image bounds if available, otherwise full canvas width
        if (this.image_bounds) {
            return this.image_bounds.x + Math.random() * this.image_bounds.w;
        } else {
            return Math.random() * this.canvas.width;
        }
    }

    get_random_y_position() {
        // generate y position within image bounds if available, otherwise full canvas width
        if (this.image_bounds) {
            return this.image_bounds.y + Math.random() * this.image_bounds.h;
        } else {
            return Math.random() * this.canvas.width;
        }
    }

    isWithinBounds(canvas_grid) {
        // check if current position is within valid canvas_grid bounds
        return this.abs_y >= 0 && this.abs_y < canvas_grid.length && 
               this.abs_x >= 0 && this.abs_x < canvas_grid[0].length &&
               canvas_grid[this.abs_y] && canvas_grid[this.abs_y][this.abs_x];
    }
    
    check_y_pos() {
        if (this.y >= this.canvas.height) {
            this.y = -3; // so pixels will not create line at the top of canvas
            this.x = this.get_random_x_position();
        }
    }
}
