export class BtnStage {
  constructor(overworld, id) {
    this.overworld = overworld;
    this.id = id;
    this.btn = document.createElement('div');
    this.btn.classList.add('btn-test');
    this.btn.textContent = `STAGE${this.id}`;
    this.overworld.screen.appendChild(this.btn);
    this.btn.addEventListener('click', () => {
      if (this.overworld.game.activeScreen !== 'OVERWORLD' || this.overworld.game.transition.overlayTransition || !this.overworld.game.stages[this.id - 1].isClear) return;
      this.overworld.game.stageId = this.id;
      this.overworld.game.updateActiveScreen('GAME_BOARD');
      this.overworld.game.transitionLoop();
    });
  }
}
