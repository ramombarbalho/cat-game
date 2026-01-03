import { BtnOverworld } from './BtnOverworld';
import { BtnRetry } from './BtnRetry';
import { Overlay } from './Overlay';

export class OverlayGamePaused extends Overlay {
  constructor(game) {
    super();
    this.game = game;
    this.el = null;
    this.btnRetry = null;
    this.btnOverworld = null;
    this.init();
  }

  init() {
    const content = `<p style="font-size: 20px">PAUSED</p>`;
    this.el = this.createEl(content);
    this.game.screen.appendChild(this.el);
    this.btnRetry = new BtnRetry(this.game, this.el);
    this.btnOverworld = new BtnOverworld(this.game, this.el);
  }

  reset() {
    this.el.remove();
    this.el = null;
    this.btnRetry = null;
    this.btnOverworld = null;
  }
}
