import { OverlaySetKey } from './OverlaySetKey';

export class GameConfigUI {
  constructor(game) {
    this.game = game;
    this.el = null;
    this.overlaySetKey = null;
    this.isOverlaySetKeyOpen = false;
    this.id = null;
  }

  createGameConfigUI() {
    // ##fix criar class para box-msg
    this.el = document.createElement('div');
    this.el.classList.add('box-msg');
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
    this.el.innerHTML = ` <h1>CONFIG</h1>
                          <div class="options-key-set">
                            <div class="options-row">
                              <h2>ACTION</h2> <h2>KEY</h2>
                            </div>
                            ${keyActions}
                          </div>
                          <div class="btn-test btn-save">SAVE</div>
                        `;
    this.game.screen.appendChild(this.el);
    document
      .querySelector('.btn-save')
      .addEventListener('click', () => this.deleteGameConfigUI());

    this.overlaySetKey = new OverlaySetKey(this.game);

    this.el
      .querySelector('.options-key-set')
      .addEventListener('click', ({ target }) => {
        if (target.classList.contains('btn-set-key')) {
          this.overlaySetKey.createOverlaySetKey();
          this.overlaySetKey.labelKeyActionEl.innerHTML =
            target.closest('.options-row').firstElementChild.innerHTML;
          this.isOverlaySetKeyOpen = true;
          this.id = +target.dataset.id;
        }
      });
  }

  deleteGameConfigUI() {
    this.el.remove();
    this.el = null;
    if (this.overlaySetKey?.el) {
      this.overlaySetKey.deleteOverlaySetKey();
    }
    this.overlaySetKey = null;
    this.isOverlaySetKeyOpen = false;
    this.id = null;
  }
}
