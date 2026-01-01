export class BtnStage {
  constructor(overworld, id) {
    this.overworld = overworld;
    this.id = id;
    this.btn = document.createElement('div');
    this.btn.classList.add('btn-test');
    this.btn.textContent = `STAGE${this.id + 1}`;
    this.overworld.game.screen.appendChild(this.btn);
    this.btn.addEventListener('click', () => {
      if (
        this.overworld.game.activeScreen !== 'OVERWORLD' ||
        this.overworld.game.transition.overlayTransition
      )
        return;
      this.overworld.game.stageId = this.id;
      this.overworld.game.switchScreens('GAME_BOARD');
    });
  }
}
