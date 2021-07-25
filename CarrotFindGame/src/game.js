'use strict';

import Field from './field.js';
import * as sound from './sound.js';

// freeze : Immutable한 안전성 있는 객체 생성
export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  stop: 'stop',
});

// 빌더 패턴(Builder Pattern) : “객체의 표현과 생성과정을 분리”
export class GameBuilder {
  setGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  setCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  setBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}
class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.stop);
      } else {
        this.start();
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gamefield = new Field(carrotCount, bugCount);
    this.gamefield.setClickListener((e) => this.onItemClick(e));
  }

  onItemClick(item) {
    if (!this.started) return;

    if (item === 'carrot') {
      this.score++;
      this.updateScoreBoard();

      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === 'bug') {
      this.stop(Reason.lose);
    }
  }

  setGameStateListener(onGameState) {
    this.onGameState = onGameState;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(res) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameState && this.onGameState(res);
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector('.fas');

    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  showGameButton() {
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;

    this.updateGameTimer(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);

        return;
      }

      this.updateGameTimer(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateGameTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }

  // 게임 초기화 설정
  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gamefield.init();
  }
}
