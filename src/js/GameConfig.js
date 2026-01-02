import { GameConfigUI } from './GameConfigUI';

export class GameConfig {
  constructor(game) {
    this.game = game;
    this.ui = new GameConfigUI(this.game);
  }

  setKey(key) {
    if (!this.ui.isOverlaySetKeyOpen) return;
    const keyIndex = this.game.keys.indexOf(key);
    if (keyIndex > -1) {
      this.game.keys[keyIndex] = this.game.keys[this.ui.id];
      this.ui.el.querySelector(
        `div[data-id="${keyIndex}"]`
      ).previousElementSibling.innerHTML = this.game.keys[keyIndex];
    }
    this.game.keys[this.ui.id] = key;
    this.ui.el.querySelector(
      `div[data-id="${this.ui.id}"]`
    ).previousElementSibling.innerHTML = key;
    this.ui.overlaySetKey.labelKeyActionEl.innerHTML = '';
    this.ui.overlaySetKey.deleteOverlaySetKey();
    this.ui.isOverlaySetKeyOpen = false;
  }
}
