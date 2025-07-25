// This project is based on the guide of 'freeCodeCamp.org' YouTube channel
// https://www.youtube.com/watch?v=UoTxOVEecbI&list=WL&index=1&t=2600s&ab_channel=freeCodeCamp.org
//
// PNG images are taken from - https://www.stickpng.com/

import { Particle } from "./particle.js";
import { get_controls_values } from "./input.js";
import * as ImagesB64 from "./images_b64.js";

const canvas = document.getElementById("effects-canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = ImagesB64.sunflower;
image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
}

let particles = [];
let canvas_grid = [];
let is_running = true;
let animation_id;

document.getElementById("stop-button").onclick = () => {
    stop_animation();
};
document.getElementById("run-button").onclick = () => {
    stop_animation();
    start_animation();
};

function start_animation() {
    is_running = true;
    const { pixel_num, pixel_speed } = get_controls_values();
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const scanned_image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    create_particles(pixel_num, pixel_speed);

    image_particles_overlay(scanned_image);

    animate_particles();
}

function create_particles(pixel_num, pixel_speed) {
    for (let i = 0; i < pixel_num; i++) {
        particles.push(new Particle(canvas, ctx, pixel_speed));
    }
}

// map the scanned image data to an array of cells,
// each cell holds its brightness and can be accessed by
// using its x and y position as indexes
function image_particles_overlay(scanned_image) {
    for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for (let x = 0; x < canvas.width; x++) {
            const red = scanned_image.data[y * 4 * scanned_image.width + x * 4];
            const green =
                scanned_image.data[y * 4 * scanned_image.width + x * 4 + 1];
            const blue =
                scanned_image.data[y * 4 * scanned_image.width + x * 4 + 2];
            const brightness = get_relative_brightness(red, green, blue);
            const rgb = `rgb(${red}, ${green}, ${blue})`;
            const cell = [brightness, rgb];
            row.push(cell);
        }
        canvas_grid.push(row);
    }
}

function get_relative_brightness(red, green, blue) {
    return (
        Math.sqrt(
            red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
        ) / 100
    );
}

function animate_particles() {
    if (!is_running) { return; }
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas_grid);
        ctx.globalAlpha = particles[i].speed * 0.5;
        particles[i].draw(canvas_grid);
    }
    animation_id = requestAnimationFrame(animate_particles);
}

function stop_animation() {
    if (animation_id) { cancelAnimationFrame(animation_id); }
    is_running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = [];
}

// function image_to_gray_scale(scanned_image) {
//     const scanned_data = scanned_image.data;

//     for (let i = 0; i < scanned_data.length; i += 4) {
//         const total =
//             scanned_data[i] + scanned_data[i + 1] + scanned_data[i + 2]; // total = red + green + blue
//         const average_color_value = total / 3;
//         scanned_data[i] = average_color_value;
//         scanned_data[i + 1] = average_color_value;
//         scanned_data[i + 2] = average_color_value;
//     }

//     const gray_image = new ImageData(scanned_data, canvas.width, canvas.height);
//     ctx.putImageData(gray_image, 0, 0);
// }
