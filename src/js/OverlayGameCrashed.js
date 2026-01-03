import { BtnOverworld } from './BtnOverworld';
import { Overlay } from './Overlay';

export class OverlayGameCrashed extends Overlay {
  constructor(game) {
    super();
    this.game = game;
    this.el = null;
    this.btnOverworld = null;
    this.init();
  }

  init() {
    const content = `<p style="font-size: 20px">GAME CRASHED x_x</p>`;
    this.el = this.createEl(content);
    this.game.screen.appendChild(this.el);
    this.btnOverworld = new BtnOverworld(this.game, this.el);
  }

  reset() {
    this.el.remove();
    this.el = null;
    this.btnOverworld = null;
  }
}
