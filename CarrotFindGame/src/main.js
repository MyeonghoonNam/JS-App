'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popUp.js';

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
      message = 'REPLAY ❓';
      break;
    case Reason.win:
      message = 'You Won 🎉';
      break;
    case Reason.lose:
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
