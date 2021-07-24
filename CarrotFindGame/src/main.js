'use strict';

import PopUp from './popUp.js';
import Field from './field.js';

const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

const gameBanner = new PopUp();
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

const gamefield = new Field(CARROT_COUNT, BUG_COUNT);
gamefield.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) return;

  if (item === 'carrot') {
    score++;
    updateScoreBoard();

    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === 'bug') {
    finishGame(false);
  }
}

gameBanner.setClickListener(() => {
  startGame();
  showGameButton();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameBanner.showWithText('REPLAY ❓');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();

  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }

  stopGameTimer();
  gameBanner.showWithText(win ? 'You Won 🎉' : 'You Lost 😂');
}

function showStopButton() {
  const icon = document.querySelector('.fas');

  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function showGameButton() {
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;

  updateGameTimer(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);

      return;
    }

    updateGameTimer(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateGameTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  gameTimer.innerText = `${minutes}:${seconds}`;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.volume = 0.1;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

// 게임 초기화 설정
function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gamefield.init();
}
