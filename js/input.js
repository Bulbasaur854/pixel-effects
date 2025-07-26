const pixel_number_slider = document.getElementById("pixel-number-slider");
const pixel_number_text = document.getElementById("pixel-number-text");
const pixel_speed_slider = document.getElementById("pixel-speed-slider");
const pixel_speed_text = document.getElementById("pixel-speed-text");
const image_selector = document.getElementById("image-selector");

pixel_number_text.innerHTML = pixel_number_slider.value;
pixel_speed_text.innerHTML = pixel_speed_slider.value;

pixel_number_slider.oninput = () => {
    pixel_number_text.innerHTML = pixel_number_slider.value;
}
pixel_speed_slider.oninput = () => {
    pixel_speed_text.innerHTML = pixel_speed_slider.value;
}

export function populate_image_options(images_list_b64) {
    for (const key in images_list_b64) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key.charAt(0).toUpperCase() + key.slice(1); // capitalize name for display
        image_selector.appendChild(option);
    }
}

export function get_selected_image(images_list_b64) {
    return images_list_b64[image_selector.value];
}

export function get_controls_values() {
    return { 
        pixel_num:  pixel_number_slider.value,
        pixel_speed: pixel_speed_slider.value
    }
}
