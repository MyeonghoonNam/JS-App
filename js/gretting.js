const nameContainer = document.querySelector(".js-name");
const toDoContainer = document.querySelector(".js-to-do-container");

function paintName(name){
  nameContainer.innerHTML = "";

  const span = document.createElement("span");

  span.className = "name__text";
  span.innerText = name;

  nameContainer.appendChild(span);
  toDoContainer.classList.remove("none");

  return;
}

function handleSubmit(e){
  e.preventDefault();

  const name = e.target.querySelector("input").value;

  localStorage.setItem("username", name);

  paintName(`Hello ${name}`);

  return;
}

function paintInput(){
  const input = document.createElement("input");

  input.placeholder = "Type your name here";
  input.type = "text";
  input.className = "name__input";

  const form = document.createElement("form");

  form.addEventListener("submit", handleSubmit);
  form.appendChild(input);

  nameContainer.appendChild(form);
}

function loadName(){
  const name = localStorage.getItem("username");

  if(name === null){
    paintInput();
  } else {
    paintName(name);
  }
}

function init(){
  loadName();
}

init();