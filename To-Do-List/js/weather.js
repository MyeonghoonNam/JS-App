const API_KEY = "d1160b49527622a520ea23a5f2f612b4";

const weather = document.querySelector(".js-weather .weather__text");

function getWeather(coords) {
  const WEATHER_KEY = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`

  fetch(WEATHER_KEY)
    .then(res => res.json())
    .then(data => {
      const temperature = Math.floor(data.main.temp);
      const location = data.name;

      weather.innerHTML = `${temperature}°&nbsp&nbsp@&nbsp&nbsp${location}`;
    });

  return;
}

function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const coords = {
    lat,
    lon
  }

  localStorage.setItem("coords", JSON.stringify(coords));

  getWeather(coords);

  return;
}

function handleGeofailure() {
  console.log("no location");

  return;
}

function loadWeather() {
  const currentCoords = localStorage.getItem("coords");

  if(currentCoords !== null){
    const parseCoords = JSON.parse(currentCoords);

    getWeather(parseCoords);

  } else {
    navigator.geolocation.getCurrentPosition(
      handleGeoSuccess,
      handleGeofailure
    )
  }

  return;
}

function init() {
  loadWeather();

  return;
}

init();