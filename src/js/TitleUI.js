export class TitleUI {
  constructor(title) {
    this.title = title;
    this.boxOptions = null;
    this.overlaySetKey = null;
    this.overlaySetKeyIsOpen = false;
    this.id = null;
    this.labelKeyOverlayOptions = null;
    this.titleLabel = null;
    this.initTitleUI();
  }

  initTitleUI() {
    this.titleLabel = document.createElement('p');
    this.titleLabel.classList.add('score-label');
    this.title.game.screen.appendChild(this.titleLabel);
    this.titleLabel.innerHTML = 'TITLE LAYOUT';
    this.overlaySetKey = document.createElement('div');
    this.overlaySetKey.classList.add('overlay', 'overlay-set-key');
    this.overlaySetKey.innerHTML = `<p style="font-size: 20px">PRESS A KEY TO SET "<span class="label-key-overlay-options"></span>"</p>`;
    this.title.game.screen.appendChild(this.overlaySetKey);
    this.labelKeyOverlayOptions = document.querySelector(
      '.label-key-overlay-options'
    );
    this.overlaySetKey.style.display = 'none';
    this.boxOptions = document.createElement('div');
    this.boxOptions.classList.add('box-options');
    this.boxOptions.style.display = 'none';
    const optionsActions = [
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
          `<div class="options-row"><h3>${action}</h3> <h3 class="label-key">${this.title.game.keys[i]}</h3> <div class="btn-set-key" data-id="${i}">SET</div></div>`
      )
      .join('');
    this.boxOptions.innerHTML = ` <h1>OPTIONS</h1>
                                  <div class="options-key-set">
                                    <div class="options-row">
                                      <h2>ACTION</h2> <h2>KEY</h2>
                                    </div>
                                    ${optionsActions}
                                  </div>
                                  <div class="btn-test btn-save">SAVE</div>`;
    this.title.game.screen.appendChild(this.boxOptions);
    document
      .querySelector('.btn-save')
      .addEventListener(
        'click',
        () => (this.boxOptions.style.display = 'none')
      );
    this.boxOptions
      .querySelector('.options-key-set')
      .addEventListener('click', ({ target }) => {
        if (target.classList.contains('btn-set-key')) {
          this.labelKeyOverlayOptions.innerHTML =
            target.closest('.options-row').firstElementChild.innerHTML;
          this.overlaySetKey.style.display = 'flex';
          this.overlaySetKeyIsOpen = true;
          this.id = +target.dataset.id;
        }
      });
    this.btnOverworld = document.createElement('div');
    this.btnOverworld.classList.add('btn-test');
    this.btnOverworld.textContent = 'OVERWORLD';
    this.title.game.screen.appendChild(this.btnOverworld);
    this.btnOverworld.addEventListener('click', () => {
      if (
        this.title.game.activeScreen !== 'TITLE' ||
        this.title.game.transition.overlayTransition
      )
        return;
      this.title.game.switchScreens('OVERWORLD');
    });
    this.btnOptions = document.createElement('div');
    this.btnOptions.classList.add('btn-test');
    this.btnOptions.textContent = 'OPTIONS';
    this.title.game.screen.appendChild(this.btnOptions);
    this.btnOptions.addEventListener('click', () => {
      if (
        this.title.game.activeScreen !== 'TITLE' ||
        this.title.game.transition.overlayTransition
      )
        return;
      this.boxOptions.style.display = 'flex';
    });
  }
}
