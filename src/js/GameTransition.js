export class GameTransition {
  constructor(game) {
    this.game = game;
    this.overlayTransition = null;
    this.overlayTransitionOpacity = 0;
    this.overlayTransitionFrames = this.game.config.overlayTransitionFrames;
  }

  switchScreens() {
    [this.game.title, this.game.overworld, this.game.gameBoard].forEach(view => {
      if (this.game.activeScreen === view.id) {
        view.screen.style.display = 'flex';
        view.screen.style.outline = '5px solid white';
        view.screen.style.zIndex = '0';
        switch (view.id) {
          case 'OVERWORLD':
            this.game.resetStateGameRunningArea();
            this.game.gameBoard.ui.clearGameBoardUI();
            break;
          case 'GAME_BOARD':
            this.game.updateGameBoard();
            this.game.gameBoard.loop();
            break;
        }
      } else {
        view.screen.style.display = 'none';
        view.screen.style.outline = 'none';
        view.screen.style.zIndex = '-1';
      }
    });
  }

  update() {
    if (!this.overlayTransition) {
      this.overlayTransition = document.createElement('div');
      this.overlayTransition.classList.add('overlay', 'overlay-transition');
      this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(3)}`;
      this.game.gameContainer.appendChild(this.overlayTransition);
      this.game.gameBoard.state = 'GAME_OVER';
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
        this.switchScreens();
      } else if (this.overlayTransitionFrames < this.game.config.overlayTransitionFrames / 2) {
        this.overlayTransitionOpacity = this.overlayTransitionOpacity - 1 / (this.game.config.overlayTransitionFrames / 2);
      }
      this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(3)}`;
    }
  }
}
