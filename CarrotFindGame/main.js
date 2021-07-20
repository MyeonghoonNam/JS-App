'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }

  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
}

function stopGame() {}

function showStopButton() {
  const icon = document.querySelector('.fa-play');

  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

// 게임 초기화 설정
function initGame() {
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;

  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

// 필드에 당근과 벌레들을 추가
function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;

  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');

    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    field.appendChild(item);
  }
}

// 랜덤좌표생성
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
