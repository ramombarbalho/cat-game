import { Overlay } from './Overlay';

export class OverlaySetKey extends Overlay {
  constructor(game) {
    super();
    this.game = game;
    this.el = null;
    this.labelKeyActionEl = null;
    this.init();
  }

  init() {
    const content = `<p style="font-size: 20px">PRESS A KEY TO SET "<span id="label-key-action"></span>"</p>`;
    this.el = this.createEl(content);
    this.game.screen.appendChild(this.el);
    this.labelKeyActionEl = this.el.querySelector('#label-key-action');
  }

  reset() {
    this.el.remove();
    this.el = null;
    this.labelKeyActionEl = null;
  }
}
