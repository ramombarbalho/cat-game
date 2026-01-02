export class BtnRetry {
  constructor(game, parentEl) {
    this.game = game;
    this.parentEl = parentEl;
    this.el = document.createElement('div');
    this.el.classList.add('btn-test');
    this.el.textContent = 'RETRY';
    this.parentEl.appendChild(this.el);

    this.el.addEventListener('click', () => {
      if (
        this.game.activeScreen === 'GAME_BOARD' &&
        !this.game.transition.isOverlayTransitionRunning
      ) {
        this.game.transition.loop(() => this.game.currentView.initGameboard());
      }
    });
  }
}
