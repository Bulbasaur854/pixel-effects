const pixel_number_container = document.getElementById("pixel-number-slider");
const pixel_speed_container = document.getElementById("pixel-speed-slider");

pixel_number_container.children[1].innerHTML = pixel_number_container.children[0].value;
pixel_speed_container.children[1].innerHTML = pixel_speed_container.children[0].value;

pixel_number_container.children[0].oninput = () => {
    pixel_number_container.children[1].innerHTML = pixel_number_container.children[0].value;
}
pixel_speed_container.children[0].oninput = () => {
    pixel_speed_container.children[1].innerHTML = pixel_speed_container.children[0].value;
}

export function get_controls_values() {
    return { 
        pixel_num:  pixel_number_container.children[0].value,
        pixel_speed: pixel_speed_container.children[0].value
    }
}
