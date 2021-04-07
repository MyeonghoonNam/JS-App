
const UNSPLASH_API_KEY = "DBJPIHZb04B7tirJh7HDS3d3FdKQ8xvbPQR9JIAGwqc";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body"),
  locationContainer = document.querySelector(".js-location span");

function loadBackground(){
  const savedImage = localStorage.getItem("bg");

  if(savedImage === null){
    getBackground();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();

    if(today > parsedImage.expiresOn){
      getBackground();
    } else {

      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${
        parsedImage.url
      })`;

      if(parsedImage.location !== null){
        locationContainer.innerHTML = `${parsedImage.location}`;
      }
    }
  }

  return;
}

function saveBackground(imageUrl, name){
  const savedImage = localStorage.getItem("bg");

  if(savedImage !== null){
    localStorage.removeItem("bg");
  }

  const expirationDate = new Date();

  expirationDate.setDate(expirationDate.getDate() + 1);

  const imgObj = {
    url:imageUrl,
    expiresOn:expirationDate,
    location:name
  }

  localStorage.setItem("bg", JSON.stringify(imgObj));

  loadBackground();

  return;
}

function getBackground(){
  fetch(UNSPLASH_URL)
    .then(res => res.json())
    .then(data => {
      const image = data;

      if(image.urls && image.urls.full && image.location){
        const url = image.urls.full;
        const location = image.location;
        const name = location.name;

        saveBackground(url, name);
      } else {
        getBackground();
      }
    });
  
  return;
}

function init(){
  loadBackground();

  return;
}

init();