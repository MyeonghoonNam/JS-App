const body = document.querySelector("body");

const IMG_NUMBER = 3;


function paintImage(num){
  const image = new Image();
  image.src = `img/${num}.jpg`;

  body.append(image);
  image.classList.add("bgImage");
}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER) + 1;

  return number;
}

function init(){
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();