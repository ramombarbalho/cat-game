export class BtnConfig {
  constructor(game, parentEl) {
    this.game = game;
    this.parentEl = parentEl;
    this.el = document.createElement('div');
    this.el.classList.add('btn-test');
    this.el.textContent = 'CONFIG';
    this.parentEl.appendChild(this.el);

    this.el.addEventListener('click', () => {
      if (
        this.game.activeScreen === 'TITLE' &&
        !this.game.transition.isOverlayTransitionRunning
      ) {
        this.game.gameConfig.ui.createGameConfigUI();
      }
    });
  }
}
