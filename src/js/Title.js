import { TitleUI } from './TitleUI';

export class Title {
  constructor(game) {
    this.game = game;
    this.id = 'TITLE';
    this.screen = document.createElement('div');
    this.screen.classList.add('game-title');
    this.game.gameContainer.appendChild(this.screen);
    this.ui = new TitleUI(this);
  }
}
