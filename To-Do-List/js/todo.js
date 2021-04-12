const list = document.querySelector(".js-list");
  form = document.querySelector(".js-to-do");
  input = document.querySelector(".js-add-to-do");

let toDos = [];

function resetToDos() {
  const strToDo = JSON.stringify(toDos);

  localStorage.setItem("toDos", strToDo);

  return;
}

function saveToDo(text) {
  let newid = 0;
  if(!toDos.length){
    newid = 1;
  } else {
    newid = toDos[toDos.length - 1].id + 1;
  }

  let toDoObj = {
    id : newid,
    value : text
  }

  toDos.push(toDoObj);
  
  resetToDos();

  return;
}

function handleDelete(e) {
  const li = e.target.parentElement;
  const ul = li.parentElement;

  ul.removeChild(li);

  toDos = toDos.filter( el => {
    return el.id !== parseInt(li.id);
  });


  resetToDos();

  return;
}

function addToDo(text){
  const li = document.createElement("li");
  li.className = "toDo";

  if(!toDos.length){
    li.id = 1;
  } else {
    li.id = toDos[toDos.length - 1].id + 1;
  }

  const label = document.createElement("label");
  label.innerText = text;
  label.className = "toDo__label";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "toDo__button";
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", handleDelete);

  li.appendChild(label);
  li.appendChild(deleteBtn);

  list.appendChild(li);

  saveToDo(text);

  return;
}

function handleSubmit(e) {
  e.preventDefault();

  const text = input.value;

  input.value = "";
  addToDo(text);

  return;
}

function loadToDos(){
  const loadedToDos = localStorage.getItem("toDos");

  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);

    parsedToDos.forEach( el => {
      addToDo(el.value);
    });
  } 

  form.addEventListener("submit", handleSubmit);

  return;
}

function init(){
  loadToDos();

}

init();