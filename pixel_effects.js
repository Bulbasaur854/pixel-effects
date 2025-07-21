// This project is based on the guide of 'freeCodeCamp.org' YouTube channel
// https://www.youtube.com/watch?v=UoTxOVEecbI&list=WL&index=1&t=2600s&ab_channel=freeCodeCamp.org
import { Particle } from "./particle.js";

const NUM_OF_PARTICLES = 5000;
const CANVAS_WIDTH = 512;

const canvas = document.getElementById("effects-canvas");
const ctx = canvas.getContext("2d");
const image = new Image();

let particles = [];
let canvas_grid = [];

image.src = "./bulbasaur.png";
image.addEventListener("load", () => {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_WIDTH;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const scanned_image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    image_to_gray_scale(scanned_image);
    image_particles_overlay(scanned_image);
});

function image_to_gray_scale(scanned_image) {
    const scanned_data = scanned_image.data;

    for (let i = 0; i < scanned_data.length; i += 4) {
        const total = scanned_data[i] + scanned_data[i + 1] + scanned_data[i + 2]; // total = red + green + blue
        const average_color_value = total / 3;
        scanned_data[i] = average_color_value;
        scanned_data[i + 1] = average_color_value;
        scanned_data[i + 2] = average_color_value;
    }

    const gray_image = new ImageData(scanned_data, canvas.width, canvas.height);
    ctx.putImageData(gray_image, 0, 0);
}

function image_particles_overlay(scanned_image) {
    create_particles();
    animate_particles();

    // map the scanned image data to an array of cells,
    // each cell holds its brightness and can be accessed by
    // using its x and y position as indexes
    for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for (let x = 0; x < canvas.width; x++) {}
    }
}

function create_particles() {
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(canvas, ctx));
    }
}

function animate_particles() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate_particles);
}
