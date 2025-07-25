const pixel_number_slider = document.getElementById("pixel-number-slider");
const pixel_number_text = document.getElementById("pixel-number-text");
const pixel_speed_slider = document.getElementById("pixel-speed-slider");
const pixel_speed_text = document.getElementById("pixel-speed-text");

pixel_number_text.innerHTML = pixel_number_slider.value;
pixel_speed_text.innerHTML = pixel_speed_slider.value;

pixel_number_slider.oninput = () => {
    pixel_number_text.innerHTML = pixel_number_slider.value;
}
pixel_speed_slider.oninput = () => {
    pixel_speed_text.innerHTML = pixel_speed_slider.value;
}

export function get_controls_values() {
    return { 
        pixel_num:  pixel_number_slider.value,
        pixel_speed: pixel_speed_slider.value
    }
}
