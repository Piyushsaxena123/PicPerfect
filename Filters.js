const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");
const controls = document.querySelector(".controls");
const buttons = document.querySelector(".buttons");
const ctx = canvas.getContext("2d");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const grayscale = document.getElementById("grayscale");
const sepia = document.getElementById("sepia");
const downloadButton = document.getElementById("download");
const resetButton = document.getElementById("reset");

let img = new Image();
let originalImageData;

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

img.onload = () => {
  canvas.classList.remove("hidden");
  controls.classList.remove("hidden");
  buttons.classList.remove("hidden");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save original image data
  applyFilters();
};

function applyFilters() {
  const brightnessValue = brightness.value;
  const contrastValue = contrast.value;
  const grayscaleValue = grayscale.value;
  const sepiaValue = sepia.value;

  ctx.filter = `
    brightness(${brightnessValue}%)
    contrast(${contrastValue}%)
    grayscale(${grayscaleValue}%)
    sepia(${sepiaValue}%)
  `;
  ctx.drawImage(img, 0, 0);
}

[brightness, contrast, grayscale, sepia].forEach((input) => {
  input.addEventListener("input", applyFilters);
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
});

resetButton.addEventListener("click", () => {
  ctx.putImageData(originalImageData, 0, 0); // Restore the original image
  [brightness, contrast, grayscale, sepia].forEach((input) => (input.value = input.defaultValue)); // Reset sliders
});
