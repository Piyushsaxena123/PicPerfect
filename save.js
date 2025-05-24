const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const gallery = document.getElementById("gallery");

// Load saved photos from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedPhotos = JSON.parse(localStorage.getItem("photos")) || [];
  savedPhotos.forEach((photo) => addPhotoToGallery(photo));
});

// Add photo to gallery and local storage
function addPhotoToGallery(photo) {
  const galleryItem = document.createElement("div");
  galleryItem.className = "gallery-item";

  galleryItem.innerHTML = `
    <img src="${photo}" alt="Uploaded Photo" />
    <button class="delete-btn">Delete</button>
  `;

  gallery.appendChild(galleryItem);

  // Add delete functionality
  galleryItem.querySelector(".delete-btn").addEventListener("click", () => {
    galleryItem.remove();
    deletePhotoFromStorage(photo);
  });
}

// Handle photo upload
uploadButton.addEventListener("click", () => {
  const files = fileInput.files;
  if (files.length === 0) {
    alert("Please select at least one photo to upload.");
    return;
  }

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const photo = event.target.result;
      addPhotoToGallery(photo);
      savePhotoToStorage(photo);
    };
    reader.readAsDataURL(file);
  });

  fileInput.value = ""; // Reset file input
});

// Save photo to local storage
function savePhotoToStorage(photo) {
  const savedPhotos = JSON.parse(localStorage.getItem("photos")) || [];
  savedPhotos.push(photo);
  localStorage.setItem("photos", JSON.stringify(savedPhotos));
}

// Delete photo from local storage
function deletePhotoFromStorage(photo) {
  let savedPhotos = JSON.parse(localStorage.getItem("photos")) || [];
  savedPhotos = savedPhotos.filter((savedPhoto) => savedPhoto !== photo);
  localStorage.setItem("photos", JSON.stringify(savedPhotos));
}
