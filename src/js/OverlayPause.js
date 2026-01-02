import { BtnOverworld } from './BtnOverworld';
import { BtnRetry } from './BtnRetry';

export class OverlayPause {
  constructor(game) {
    this.game = game;
    this.el = null;
    this.btnRetry = null;
    this.btnOverworld = null;
  }

  createOverlayPause() {
    if (this.el) {
      this.deleteOverlayPause();
    }

    this.el = document.createElement('div');
    this.el.classList.add('overlay', 'overlay-pause');
    this.game.screen.appendChild(this.el);
    this.el.innerHTML = `<p style="font-size: 20px">PAUSED</p>`;
    this.el.querySelector('.tteesstt').addEventListener('click', () => {
      this.createOverlayPause();
    });
    this.btnRetry = new BtnRetry(this.game, this.el);
    this.btnOverworld = new BtnOverworld(this.game, this.el);
  }

  deleteOverlayPause() {
    this.el.remove();
    this.el = null;
    this.btnRetry = null;
    this.btnOverworld = null;
  }

  switchDisplay(state) {
    switch (state) {
      case 'GAME_RUNNING':
        this.deleteOverlayPause();
        return;
      case 'PAUSED':
        this.createOverlayPause();
        return;
    }
  }
}
