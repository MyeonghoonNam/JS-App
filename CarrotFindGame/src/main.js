'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popUp.js';
import * as sound from './sound.js';

const gameBanner = new PopUp();
const game = new GameBuilder()
  .setGameDuration(20)
  .setCarrotCount(20)
  .setBugCount(20)
  .build();

game.setGameStateListener((res) => {
  let message;

  switch (res) {
    case Reason.stop:
      sound.playAlert();
      sound.stopBackground();
      message = 'REPLAY ❓';
      break;
    case Reason.win:
      sound.playWin();
      message = 'You Won 🎉';
      break;
    case Reason.lose:
      sound.playBug();
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
