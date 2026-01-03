export class GameTransition {
  constructor(game) {
    this.game = game;
    // ##fix trocar nome overlay para el ou gameTransitionEl
    this.overlayTransition = null;
    this.overlayTransitionOpacity = 0;
    this.overlayTransitionFrames = this.game.config.overlayTransitionFrames;
    this.isOverlayTransitionRunning = false;
  }

  update(callbackFn) {
    if (!this.overlayTransition) {
      this.isOverlayTransitionRunning = true;
      this.overlayTransition = document.createElement('div');
      this.overlayTransition.classList.add('overlay', 'overlay-transition');
      this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(
        3
      )}`;
      this.game.gameContainer.appendChild(this.overlayTransition);
    } else if (this.overlayTransitionFrames <= 0) {
      this.overlayTransition.remove();
      this.overlayTransition = null;
      this.overlayTransitionOpacity = 0;
      this.overlayTransitionFrames = this.game.config.overlayTransitionFrames;
      this.isOverlayTransitionRunning = false;
    } else {
      this.overlayTransitionFrames--;
      if (
        this.overlayTransitionFrames >
        this.game.config.overlayTransitionFrames / 2
      ) {
        this.overlayTransitionOpacity =
          this.overlayTransitionOpacity +
          1 / (this.game.config.overlayTransitionFrames / 2);
      } else if (
        this.overlayTransitionFrames ===
        this.game.config.overlayTransitionFrames / 2
      ) {
        this.overlayTransitionOpacity = 1;
        callbackFn();
      } else if (
        this.overlayTransitionFrames <
        this.game.config.overlayTransitionFrames / 2
      ) {
        this.overlayTransitionOpacity =
          this.overlayTransitionOpacity -
          1 / (this.game.config.overlayTransitionFrames / 2);
      }
      this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(
        3
      )}`;
    }
  }

  loop = callbackFn => {
    this.update(callbackFn);
    if (!this.overlayTransition) return;
    requestAnimationFrame(_ => this.loop(callbackFn));
  };
}
