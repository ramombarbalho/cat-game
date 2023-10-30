import { OverworldUI } from './OverworldUI';

export class Overworld {
  constructor(game) {
    this.game = game;
    this.id = 'OVERWORLD';
    this.screen = document.createElement('div');
    this.screen.classList.add('game-overworld');
    this.screen.style.display = 'none';
    this.game.gameContainer.appendChild(this.screen);
    this.ui = new OverworldUI(this);
  }
}
