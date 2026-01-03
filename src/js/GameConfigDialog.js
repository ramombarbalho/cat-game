import { Dialog } from './Dialog';
import { OverlaySetKey } from './OverlaySetKey';

export class GameConfigDialog extends Dialog {
  constructor(game) {
    super();
    this.game = game;
    this.overlaySetKey = null;
    this.isOverlaySetKeyOpen = false;
    this.id = null;
    this.initGameConfigDialog();
  }

  initGameConfigDialog() {
    const keyActions = [
      'UP',
      'DOWN',
      'LEFT',
      'RIGHT',
      'SHOT',
      'SKILL 1',
      'SKILL 2',
      'PAUSE',
      'DEBUG'
    ]
      .map(
        (action, i) =>
          `<div class="options-row"><h3>${action}</h3> <h3 class="label-key">${this.game.keys[i]}</h3> <div class="btn-set-key" data-id="${i}">SET</div></div>`
      )
      .join('');

    const content = ` <h1>CONFIG</h1>
                      <div class="options-key-set">
                        <div class="options-row">
                          <h2>ACTION</h2> <h2>KEY</h2>
                        </div>
                        ${keyActions}
                      </div>
                      <div class="btn-test btn-save">SAVE</div>`;
    this.addContent(content);
    this.game.screen.appendChild(this.el);
    this.el
      .querySelector('.btn-save')
      .addEventListener('click', () => this.game.gameConfig.deleteDialog());

    this.el
      .querySelector('.options-key-set')
      .addEventListener('click', ({ target }) => {
        if (target.classList.contains('btn-set-key')) {
          this.createOverlaySetKey();
          this.overlaySetKey.labelKeyActionEl.innerHTML =
            target.closest('.options-row').firstElementChild.innerHTML;
          this.isOverlaySetKeyOpen = true;
          this.id = +target.dataset.id;
        }
      });
  }

  createOverlaySetKey() {
    if (this.overlaySetKey) this.deleteOverlaySetKey();
    this.overlaySetKey = new OverlaySetKey(this.game);
  }

  deleteOverlaySetKey() {
    this.overlaySetKey.reset();
    this.overlaySetKey = null;
  }
}
