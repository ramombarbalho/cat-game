export class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown', e => {
      if (this.game.activeScreen === 'GAME_BOARD') {
        if (
          this.game.keys.slice(0, 5).includes(e.code) &&
          !this.game.keysActive.includes(e.code)
        ) {
          this.game.keysActive.push(e.code);
        } else if (this.game.keys.slice(5, 7).includes(e.code)) {
          if (!this.game.keysActive.includes(e.code)) {
            this.game.keysActive.push(e.code);
            if (this.game.currentView.state === 'GAME_RUNNING') {
              this.game.currentView.player.useSkill(
                this.game.keys.slice(5, 7).indexOf(e.code)
              );
            }
          }
        } else if (
          e.code === this.game.keys[7] &&
          !this.game.keysActive.includes(e.code)
        ) {
          this.game.keysActive.push(e.code);
          if (
            this.game.currentView.pauseAllowed &&
            (this.game.currentView.state === 'GAME_RUNNING' ||
              this.game.currentView.state === 'PAUSED')
          ) {
            this.game.currentView.pauseGame();
          }
        } else if (
          e.code === this.game.keys[8] &&
          !this.game.keysActive.includes(e.code)
        ) {
          this.game.keysActive.push(e.code);
          if (this.game.currentView.stage) {
            this.game.currentView.switchDebugMode();
          }
        }
      } else if (this.game.activeScreen === 'TITLE') {
        this.game.gameConfig.setKey(e.code);
      }
      if (e.code === 'Space') {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', ({ code }) => {
      const keyIndex = this.game.keysActive.indexOf(code);
      if (keyIndex > -1) {
        this.game.keysActive.splice(keyIndex, 1);
      }
    });
  }
}
