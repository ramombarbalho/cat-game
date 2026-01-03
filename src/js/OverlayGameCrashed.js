import { BtnOverworld } from './BtnOverworld';
import { Overlay } from './Overlay';

export class OverlayGameCrashed extends Overlay {
  constructor(game) {
    super();
    this.game = game;
    this.btnOverworld = null;
    this.initOverlayGameCrashed();
  }

  initOverlayGameCrashed() {
    const content = `<p style="font-size: 20px">GAME CRASHED x_x</p>`;
    this.addContent(content);
    this.game.screen.appendChild(this.el);
    this.btnOverworld = new BtnOverworld(this.game, this.el);
  }
}
