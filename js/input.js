const pixel_number_container = document.getElementById("pixel-number-slider");
const global_alpha_container = document.getElementById("global-alpha-slider");
const pixel_speed_container = document.getElementById("pixel-speed-slider");

pixel_number_container.children[1].innerHTML = pixel_number_container.children[0].value;
global_alpha_container.children[1].innerHTML = global_alpha_container.children[0].value;
pixel_speed_container.children[1].innerHTML = pixel_speed_container.children[0].value;

pixel_number_container.children[0].oninput = () => {
    pixel_number_container.children[1].innerHTML = pixel_number_container.children[0].value;
}
global_alpha_container.children[0].oninput = () => {
    global_alpha_container.children[1].innerHTML = global_alpha_container.children[0].value;
}
pixel_speed_container.children[0].oninput = () => {
    pixel_speed_container.children[1].innerHTML = pixel_speed_container.children[0].value;
}
