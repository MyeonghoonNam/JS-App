'use strict';

const inputBtn = document.querySelector(".js-button"),
  presenter = document.querySelector(".js-presenter"),
  input = document.querySelector(".js-input"),
  result = document.querySelector(".js-result"),
  history = document.querySelector(".js-history");

inputBtn.addEventListener("click", () => {
  const word = presenter.innerText;
  const inputWord = input.value;

  if(word[word.length - 1] === inputWord[0]){
    
    result.querySelector("span").innerText = "정답입니다.";
    presenter.innerText = inputWord;
    input.value = "";
    input.focus();
    
    const historyElement = document.createElement("div");
    historyElement.innerText = inputWord;
    history.append(historyElement);
  } else {
    result.querySelector("span").innerText = "오답입니다.";
    input.value = "";
    input.focus();
  }
})

function handleInputOnKeyUp(){
  if(window.event.keyCode == 13){
    inputBtn.click();
  }
}

