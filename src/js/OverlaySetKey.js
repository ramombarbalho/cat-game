export class OverlaySetKey {
  constructor(game) {
    this.game = game;
    this.el = null;
    this.labelKeyActionEl = null;
  }

  createOverlaySetKey() {
    if (this.el) {
      this.deleteOverlaySetKey();
    }

    this.el = document.createElement('div');
    this.el.classList.add('overlay', 'overlay-set-key');
    this.el.innerHTML = `<p style="font-size: 20px">PRESS A KEY TO SET "<span id="label-key-action"></span>"</p>`;
    this.game.screen.appendChild(this.el);
    this.labelKeyActionEl = document.querySelector('#label-key-action');
  }

  deleteOverlaySetKey() {
    this.el.remove();
    this.el = null;
    this.labelKeyActionEl = null;
  }
}
