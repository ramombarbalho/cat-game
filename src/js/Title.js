import { TitleUI } from './TitleUI';

export class Title {
  constructor(game) {
    this.game = game;
    this.ui = new TitleUI(this);
  }

  setKey(key) {
    if (!this.ui.overlaySetKeyIsOpen) return;
    const keyIndex = this.game.keys.indexOf(key);
    if (keyIndex > -1) {
      this.game.keys[keyIndex] = this.game.keys[this.ui.id];
      this.ui.boxOptions.querySelector(`div[data-id="${keyIndex}"]`).previousElementSibling.innerHTML = this.game.keys[keyIndex];
    }
    this.game.keys[this.ui.id] = key;
    this.ui.boxOptions.querySelector(`div[data-id="${this.ui.id}"]`).previousElementSibling.innerHTML = key;
    this.ui.labelKeyOverlayOptions.innerHTML = '';
    this.ui.overlaySetKey.style.display = 'none';
    this.ui.overlaySetKeyIsOpen = false;
  }
}
