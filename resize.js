const uploadBox = document.querySelector(".upload-box");
const previewImg = uploadBox.querySelector("img");
const fileInput = uploadBox.querySelector("input");
const widthInput = document.querySelector(".width input");
const heightInput = document.querySelector(".height input");
const ratioInput = document.querySelector("#ratio");
const qualityInput = document.querySelector("#quality");
const downloadBtn = document.querySelector(".download-btn");

let originalAspectRatio;

// Handle file upload
const loadFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  previewImg.src = URL.createObjectURL(file);
  previewImg.onload = () => {
    // Set default values for width and height
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    originalAspectRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");
  };
};

// Adjust height based on width
widthInput.addEventListener("input", () => {
  if (ratioInput.checked) {
    heightInput.value = Math.floor(widthInput.value / originalAspectRatio);
  }
});

// Adjust width based on height
heightInput.addEventListener("input", () => {
  if (ratioInput.checked) {
    widthInput.value = Math.floor(heightInput.value * originalAspectRatio);
  }
});

// Resize and download the image
const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const imgQuality = qualityInput.checked ? 0.5 : 1.0;

  canvas.width = parseInt(widthInput.value, 10);
  canvas.height = parseInt(heightInput.value, 10);

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = "resized-image.jpg";
  a.click();
};

// Attach event listeners
uploadBox.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", loadFile);
downloadBtn.addEventListener("click", resizeAndDownload);
