import { GameConfigDialog } from './GameConfigDialog';

export class GameConfig {
  constructor(game) {
    this.game = game;
    this.dialog = null;
  }

  createDialog() {
    this.dialog = new GameConfigDialog(this.game);
  }

  deleteDialog() {
    if (this.dialog?.overlaySetKey?.el) {
      this.dialog.overlaySetKey.deleteOverlaySetKey();
    }
    this.dialog.overlaySetKey = null;
    this.dialog.isOverlaySetKeyOpen = false;
    this.dialog.id = null;
    this.dialog.deleteDialog();
    this.dialog = null;
  }

  setKey(key) {
    if (!this.dialog?.isOverlaySetKeyOpen) return;
    const keyIndex = this.game.keys.indexOf(key);
    if (keyIndex > -1) {
      this.game.keys[keyIndex] = this.game.keys[this.dialog.id];
      this.dialog.el.querySelector(
        `div[data-id="${keyIndex}"]`
      ).previousElementSibling.innerHTML = this.game.keys[keyIndex];
    }
    this.game.keys[this.dialog.id] = key;
    this.dialog.el.querySelector(
      `div[data-id="${this.dialog.id}"]`
    ).previousElementSibling.innerHTML = key;
    this.dialog.overlaySetKey.labelKeyActionEl.innerHTML = '';
    this.dialog.overlaySetKey.deleteOverlaySetKey();
    this.dialog.isOverlaySetKeyOpen = false;
  }
}
