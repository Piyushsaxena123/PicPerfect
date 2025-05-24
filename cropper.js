const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const imagePreview = document.getElementById("imagePreview");

const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const rotateLeftBtn = document.getElementById("rotateLeftBtn");
const rotateRightBtn = document.getElementById("rotateRightBtn");
const flipHorizontalBtn = document.getElementById("flipHorizontalBtn");
const flipVerticalBtn = document.getElementById("flipVerticalBtn");
const resetBtn = document.getElementById("resetBtn");
const cropBtn = document.getElementById("cropBtn");

let cropper;
let isFlippedHorizontally = false;
let isFlippedVertically = false;

// Load file into cropper
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.src = reader.result;
    if (cropper) {
      cropper.destroy();
    }
    cropper = new Cropper(imagePreview, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 0.8,
    });

    enableControls();
  };
  reader.readAsDataURL(file);
});

// Attach event listeners
uploadBtn.addEventListener("click", () => fileInput.click());

zoomInBtn.addEventListener("click", () => cropper.zoom(0.1));
zoomOutBtn.addEventListener("click", () => cropper.zoom(-0.1));

rotateLeftBtn.addEventListener("click", () => cropper.rotate(-15));
rotateRightBtn.addEventListener("click", () => cropper.rotate(15));

flipHorizontalBtn.addEventListener("click", () => {
  isFlippedHorizontally = !isFlippedHorizontally;
  cropper.scaleX(isFlippedHorizontally ? -1 : 1);
});

flipVerticalBtn.addEventListener("click", () => {
  isFlippedVertically = !isFlippedVertically;
  cropper.scaleY(isFlippedVertically ? -1 : 1);
});

resetBtn.addEventListener("click", () => {
  cropper.reset();
  isFlippedHorizontally = false;
  isFlippedVertically = false;
});

cropBtn.addEventListener("click", () => {
  const canvas = cropper.getCroppedCanvas();
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "cropped-image.png";
  link.click();
});

// Enable controls when cropper is initialized
function enableControls() {
  zoomInBtn.disabled = false;
  zoomOutBtn.disabled = false;
  rotateLeftBtn.disabled = false;
  rotateRightBtn.disabled = false;
  flipHorizontalBtn.disabled = false;
  flipVerticalBtn.disabled = false;
  resetBtn.disabled = false;
  cropBtn.disabled = false;
}

// Disable controls by default
function disableControls() {
  zoomInBtn.disabled = true;
  zoomOutBtn.disabled = true;
  rotateLeftBtn.disabled = true;
  rotateRightBtn.disabled = true;
  flipHorizontalBtn.disabled = true;
  flipVerticalBtn.disabled = true;
  resetBtn.disabled = true;
  cropBtn.disabled = true;
}

// Initialize controls as disabled
disableControls();
