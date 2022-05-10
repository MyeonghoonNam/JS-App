(() => {
  const imageUploadInput = document.querySelector("#image-upload-input");
  const carouselUl = document.querySelector(".carousel-list");

  const createImageElement = (url) => {
    const list = document.createElement("li");
    const img = document.createElement("img");

    list.classList.add("carousel-item");
    list.appendChild(img);
    img.src = url;

    return list;
  };

  const imageUpload = (e) => {
    const files = e.target.files;

    if (files) {
      const images = document.querySelectorAll(".carousel-item");

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const imageUrl = e.target.result;
          carouselUl.insertBefore(createImageElement(imageUrl), images[0]);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  imageUploadInput.addEventListener("change", imageUpload);
})();
