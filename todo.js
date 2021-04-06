const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input");

const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(e){
  const btn = e.target;
  const li = btn.parentNode;

  toDoList.removeChild(li);

  const cleanToDos = toDos.filter( el => {
    return el.id !== parseInt(li.id);
  });

  toDos = cleanToDos;
  saveToDos(cleanToDos);
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");


  let newId = 0;
  if(!toDos.length){
    newId = 1;
  } else{
    newId = toDos[toDos.length - 1].id + 1;
  }

  span.innerText = text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.id = newId;

  toDoList.appendChild(li);

  const toDoObj = {
    id : newId,
    text : text
  }

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(e){
  e.preventDefault();

  const currentValue = toDoInput.value;

  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if(loadedToDos !== null){
    const parseToDos = JSON.parse(loadedToDos);

    parseToDos.forEach( el => {
      paintToDo(el.text);
    })
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();