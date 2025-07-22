export class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = 0;
        this.abs_x = Math.floor(this.x);
        this.abs_y = Math.floor(this.y);
        this.speed = 0;
        this.velocity = Math.random() * 0.5;
        this.size = Math.random() * 1.5 + 1;
    }

    update(canvas_grid) {
        this.abs_x = Math.floor(this.x);
        this.abs_y = Math.floor(this.y);
        if (canvas_grid[this.abs_y]) {
            if (canvas_grid[this.abs_y][this.abs_x]) {
                this.speed = canvas_grid[this.abs_y][this.abs_x][0];
            }
        }

        // brightness is represented by number between 0 and ~2.5
        // want bright pixels to move slow, and dark ones to move fast
        // we substract speed from 2.5 plus velocity for randomness
        let movement = 2.5 - this.speed + this.velocity;
        this.y += movement;

        this.check_y_pos();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#dcd7c9";
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    check_y_pos() {
        if (this.y >= this.canvas.height) {
            this.y = 0;
            this.x = Math.random() * this.canvas.width;
        }
    }
}
