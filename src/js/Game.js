import { GameTransition } from './GameTransition';
import { Title } from './Title';
import { Overworld } from './Overworld';
import { GameBoard } from './GameBoard';
import { InputHandler } from './InputHandler';

function camelCase(string) {
  return string
    .split('_')
    .map(function (word, index) {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

export class Game {
  constructor(config, stages, playerState) {
    this.config = config;
    this.height = this.config.gameHeight;
    this.width = this.config.gameWidth;
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container');
    this.gameContainer.style.height = this.height + 'px';
    this.gameContainer.style.width = this.width + 'px';
    document.body.appendChild(this.gameContainer);
    this.screen = document.createElement('div');
    this.screen.classList.add('game-screen');
    this.gameContainer.appendChild(this.screen);
    this.activeScreen = 'TITLE';
    this.stages = [...stages];
    this.stageId = this.config.stageId;
    this.playerState = playerState;
    this.keys = [...this.config.keys];
    this.keysActive = [];
    this.views = {
      Title,
      Overworld,
      GameBoard
    };
    this.currentView = null;
    this.switchScreens();
    this.transition = new GameTransition(this);
    this.input = new InputHandler(this);
    document.querySelector('.game-loading').remove();
  }

  updateActiveScreen = screen => (this.activeScreen = screen);

  switchScreens() {
    const view = camelCase('_' + this.activeScreen);
    this.screen.innerHTML = '';
    this.currentView = new this.views[view](this);
  }
}
