export class GameTransition {
  constructor(game) {
    this.game = game;
    this.overlayTransition = null;
    this.overlayTransitionOpacity = 0;
    this.overlayTransitionFrames = this.game.config.overlayTransitionFrames;
  }

  update(callbackFn) {
    if (!this.overlayTransition) {
      this.overlayTransition = document.createElement('div');
      this.overlayTransition.classList.add('overlay', 'overlay-transition');
      this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(3)}`;
      this.game.gameContainer.appendChild(this.overlayTransition);
    } else if (this.overlayTransitionFrames <= 0) {
      this.overlayTransition.remove();
      this.overlayTransition = null;
      this.overlayTransitionOpacity = 0;
      this.overlayTransitionFrames = this.game.config.overlayTransitionFrames;
    } else {
      this.overlayTransitionFrames--;
      if (this.overlayTransitionFrames > this.game.config.overlayTransitionFrames / 2) {
        this.overlayTransitionOpacity = this.overlayTransitionOpacity + 1 / (this.game.config.overlayTransitionFrames / 2);
      } else if (this.overlayTransitionFrames === this.game.config.overlayTransitionFrames / 2) {
        this.overlayTransitionOpacity = 1;
        callbackFn();
      } else if (this.overlayTransitionFrames < this.game.config.overlayTransitionFrames / 2) {
        this.overlayTransitionOpacity = this.overlayTransitionOpacity - 1 / (this.game.config.overlayTransitionFrames / 2);
      }
      this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(3)}`;
    }
  }

  loop = (callbackFn) => {
    this.update(callbackFn);
    // console.log(this.overlayTransitionFrames);
    if (!this.overlayTransition) return;
    requestAnimationFrame((_) => this.loop(callbackFn));
  };
}
