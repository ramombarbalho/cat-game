import { GameTransition } from './GameTransition';
import { Title } from './Title';
import { Overworld } from './Overworld';
import { GameBoard } from './GameBoard';
import { InputHandler } from './InputHandler';
import { GameConfig } from './GameConfig';

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
  constructor(config, stageList, playerState) {
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
    this.stageList = [...stageList];
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
    this.updateCurrentView('TITLE');
    this.gameConfig = new GameConfig(this);
    this.transition = new GameTransition(this);
    this.input = new InputHandler(this);
    document.querySelector('.game-loading').remove();
  }

  clearScreen() {
    this.screen.innerHTML = '';
  }

  setStageIsClear(stageId, value = true) {
    this.stageList.find(stage => stage.id === stageId).isClear = value;
  }

  updateActiveScreen = screen => (this.activeScreen = screen);

  updateCurrentView(view) {
    this.updateActiveScreen(view);
    const newView = camelCase('_' + this.activeScreen);
    this.clearScreen();
    this.currentView = new this.views[newView](this);
  }

  switchScreens(view) {
    this.transition.loop(() => this.updateCurrentView(view));
  }
}
