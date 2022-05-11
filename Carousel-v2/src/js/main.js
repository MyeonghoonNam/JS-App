(() => {
  const imageUploadInput = document.querySelector("#image-upload-input");
  const carouselUl = document.querySelector(".carousel-list");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const setTranslate = () => {
    const images = document.querySelectorAll(".carousel-item");
    const size = images.length;
    const distance = 100;
    const space = 10;

    if (size === 2) {
      images[1].style.transform = `translateX(${distance + space}%)`;
    } else if (size > 2) {
      images.forEach((image, i) => {
        if (i === 0) {
          image.style.transform = `translateX(-${distance + space}%)`;
        } else {
          image.style.transform = `translateX(${
            (i - 1) * distance + (i - 1) * space
          }%)`;
        }
      });
    }
  };

  const cloneElement = () => {
    const images = document.querySelectorAll(".carousel-item");

    if (images.length === 3) {
      const cloneFirst = images[0].cloneNode(true);
      const cloneLast = images[images.length - 1].cloneNode(true);

      cloneFirst.classList.remove("now");
      carouselUl.insertBefore(cloneLast, images[0]);
      carouselUl.appendChild(cloneFirst);
    } else {
      const cloneFirst = images[1].cloneNode(true);
      cloneFirst.classList.remove("now");
      carouselUl.removeChild(images[images.length - 1]);
      carouselUl.appendChild(cloneFirst);
    }
  };

  const createImageElement = (url) => {
    const list = document.createElement("li");
    const img = document.createElement("img");

    list.classList.add("carousel-item");
    list.appendChild(img);
    img.src = url;

    const images = document.querySelectorAll(".carousel-item");
    images.forEach((image) => {
      image.classList.remove("now");
    });

    list.classList.add("now");

    return list;
  };

  const imageUpload = (e) => {
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const images = document.querySelectorAll(".carousel-item");
          const size = images.length;
          const imageUrl = e.target.result;

          if (size <= 2) {
            carouselUl.insertBefore(createImageElement(imageUrl), images[0]);
          } else {
            carouselUl.insertBefore(createImageElement(imageUrl), images[1]);
          }
        };

        reader.onloadend = () => {
          const images = document.querySelectorAll(".carousel-item");

          if (images.length > 2) {
            cloneElement();
          }

          if (!prevBtn.style.display && !nextBtn.style.display) {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
          }

          setTranslate();
        };

        reader.readAsDataURL(file);
      }
    }
  };

  imageUploadInput.addEventListener("change", imageUpload);
})();
