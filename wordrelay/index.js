'use strict';

const inputBtn = document.querySelector(".js-button"),
  presenter = document.querySelector(".js-presenter"),
  input = document.querySelector(".js-input"),
  result = document.querySelector(".js-result"),
  history = document.querySelector(".js-history");

const historyWord = [];

inputBtn.addEventListener("click", () => {
  const word = presenter.innerText;
  const inputWord = input.value;

  if(word[word.length - 1] === inputWord[0] && !historyWord.includes(inputWord)){
    
    handleAnswer("정답입니다.", inputWord);
    showHistory(inputWord);
    
  } else if(historyWord.includes(inputWord)){

    handleAnswer("중복된 답이 존재합니다.");
    
  } else {

    handleAnswer("오답입니다.");

  }
})

function handleAnswer(text, word=null){
  result.querySelector("span").innerText = text;

  if(word){
    historyWord.push(word);
    presenter.innerText = word;
  }

  input.value = "";
  input.focus();

}

function showHistory(word){
  history.classList.remove("hidden");

  const historyElement = document.createElement("div");

  historyElement.innerText = word;
  history.append(historyElement);
}

function handleInputOnKeyUp(){
  if(window.event.keyCode == 13){
    inputBtn.click();
  }
}

