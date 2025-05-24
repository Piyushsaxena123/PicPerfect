const uploadInput = document.getElementById("uploadInput");
const bgColorPicker = document.getElementById("bgColorPicker");
const customText = document.getElementById("customText");
const generateCollage = document.getElementById("generateCollage");
const downloadCollage = document.getElementById("downloadCollage");
const collageCanvas = document.getElementById("collageCanvas");
const ctx = collageCanvas.getContext("2d");

collageCanvas.width = 800;
collageCanvas.height = 600;

let images = [];

// Load uploaded images
uploadInput.addEventListener("change", (e) => {
  const files = e.target.files;
  images = []; // Clear previous images
  Array.from(files).forEach((file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => images.push(img);
  });
});

// Generate collage
generateCollage.addEventListener("click", () => {
  ctx.fillStyle = bgColorPicker.value;
  ctx.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

  if (images.length === 0) {
    alert("Please upload at least one image!");
    return;
  }

  const gridCols = Math.ceil(Math.sqrt(images.length));
  const gridRows = Math.ceil(images.length / gridCols);
  const cellWidth = collageCanvas.width / gridCols;
  const cellHeight = collageCanvas.height / gridRows;

  images.forEach((img, index) => {
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);
    ctx.drawImage(
      img,
      col * cellWidth,
      row * cellHeight,
      cellWidth - 10,
      cellHeight - 10
    );
  });

  if (customText.value) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(customText.value, collageCanvas.width / 2, collageCanvas.height - 20);
  }
});

// Download collage
downloadCollage.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "collage.png";
  link.href = collageCanvas.toDataURL("image/png");
  link.click();
});
