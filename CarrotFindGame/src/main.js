'use strict';

import Game from './game.js';
import PopUp from './popUp.js';

const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameBanner = new PopUp();
const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);
game.setGameStateListener((res) => {
  let message;

  switch (res) {
    case 'stop':
      message = 'REPLAY ❓';
      break;
    case 'win':
      message = 'You Won 🎉';
      break;
    case 'lose':
      message = 'You Lost 😂';
      break;
    default:
      throw new Error('not valid reason');
  }

  gameBanner.showWithText(message);
});

gameBanner.setClickListener(() => {
  game.start();
  game.showGameButton();
});
