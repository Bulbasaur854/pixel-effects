export class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 3.5;
        this.size = Math.random() * 1.5 + 1;
    }

    update() {
        this.y += this.velocity;

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
