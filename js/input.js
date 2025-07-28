const pixel_number_slider = document.getElementById("pixel-number-slider");
const pixel_number_text = document.getElementById("pixel-number-text");
const pixel_speed_slider = document.getElementById("pixel-speed-slider");
const pixel_speed_text = document.getElementById("pixel-speed-text");
const image_selector = document.getElementById("image-selector");
const image_input = document.getElementById("image-upload");
const image_input_name = document.getElementById("file-name");

let uploaded_image_b64 = "";

pixel_number_text.innerHTML = pixel_number_slider.value;
pixel_speed_text.innerHTML = pixel_speed_slider.value;

pixel_number_slider.oninput = () => {
    pixel_number_text.innerHTML = pixel_number_slider.value;
}
pixel_speed_slider.oninput = () => {
    pixel_speed_text.innerHTML = pixel_speed_slider.value;
}

image_input.addEventListener("change", (e) => {
    const file = image_input.files[0];
    if (file) {
        image_input_name.textContent = `- ${image_input.files[0].name}`;
        const reader = new FileReader();
        reader.onload = (e) => {
            uploaded_image_b64 = reader.result;
        }
        reader.readAsDataURL(file);
    }
    else {
        image_input_name.textContent = "No file selected";
    }    
})

export function populate_image_options(images_list_b64) {
    let images_names = [];
    for (const key in images_list_b64) {
        images_names.push(key);
    }
    images_names.sort();
    for (const name of images_names) {
        const option = document.createElement("option");
        option.classList.add("select-option");
        option.value = name;
        option.textContent = name.charAt(0).toUpperCase() + name.slice(1); // capitalize name for display
        image_selector.appendChild(option);
    }
}

export function get_selected_image(images_list_b64) {
    return images_list_b64[image_selector.value];
}

export function get_uploaded_image() {
    return uploaded_image_b64 ? uploaded_image_b64 : null;
}

export function remove_uploaded_image() {
    image_input.value = "";
    image_input_name.textContent = "- No file selected";
    uploaded_image_b64 = null;
}

export function get_controls_values() {
    return { 
        pixel_num:  pixel_number_slider.value,
        pixel_speed: pixel_speed_slider.value
    }
}
