const weather = document.querySelector(".js-weather");

const API_KEY = "d1160b49527622a520ea23a5f2f612b4";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(res => {
    return res.json();
  })
  .then(json => {
    const temperature = json.main.temp;
    const place = json.name;

    weather.innerText = `${temperature} at ${place}`
  })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude
  }

  saveCoords(coordsObj);
  getWeather(latitude, longitude)
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function init(){
  const loadedCoords = localStorage.getItem(COORDS);

  if(loadedCoords === null){
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);

    getWeather(parseCoords.latitude, parseCoords.longitude)

  }
}

init();