export class BtnOverworld {
  constructor(game, parentEl) {
    this.game = game;
    this.parentEl = parentEl;
    this.el = document.createElement('div');
    this.el.classList.add('btn-test');
    this.el.textContent = 'OVERWORLD';
    this.parentEl.appendChild(this.el);

    this.el.addEventListener('click', () => {
      if (
        this.game.activeScreen !== 'OVERWORLD' &&
        !this.game.transition.isOverlayTransitionRunning
      ) {
        this.game.stageId = 'tutorial';
        this.game.switchScreens('OVERWORLD');
      }
    });
  }
}
