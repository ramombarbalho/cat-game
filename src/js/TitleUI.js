import { BtnConfig } from './BtnConfig';
import { BtnOverworld } from './BtnOverworld';

export class TitleUI {
  constructor(game) {
    this.game = game;
    this.titleLabel = null;
    this.initTitleUI();
  }

  initTitleUI() {
    this.titleLabel = document.createElement('p');
    this.titleLabel.classList.add('score-label');
    this.game.screen.appendChild(this.titleLabel);
    this.titleLabel.innerHTML = 'TITLE LAYOUT';

    this.btnOverworld = new BtnOverworld(this.game, this.game.screen);
    this.btnConfig = new BtnConfig(this.game, this.game.screen);
  }
}
