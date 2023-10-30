import { BtnStage } from './BtnStage';

export class OverworldUI {
  constructor(overworld) {
    this.overworld = overworld;
    this.btnStages = [];
    this.btnToBeContinued = null;
    this.overworldLabel = null;
    this.initOverworldUI();
  }

  initOverworldUI() {
    this.overworldLabel = document.createElement('p');
    this.overworldLabel.classList.add('score-label');
    this.overworld.screen.appendChild(this.overworldLabel);
    this.overworldLabel.innerHTML = 'OVERWORLD LAYOUT';
    this.btnTitle = document.createElement('div');
    this.btnTitle.classList.add('btn-test');
    this.btnTitle.textContent = 'TITLE';
    this.overworld.screen.appendChild(this.btnTitle);
    this.btnTitle.addEventListener('click', () => {
      if (this.overworld.game.activeScreen !== 'OVERWORLD' || this.overworld.game.transition.overlayTransition) return;
      this.overworld.game.updateActiveScreen('TITLE');
      this.overworld.game.transitionLoop();
    });
    this.btnStages.push(new BtnStage(this.overworld, this.overworld.game.stageId + 1));
  }
}
