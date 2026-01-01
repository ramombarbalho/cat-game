import { BtnStage } from './BtnStage';
import { BtnToBeContinued } from './BtnToBeContinued';

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
    this.overworld.game.screen.appendChild(this.overworldLabel);
    this.overworldLabel.innerHTML = 'OVERWORLD LAYOUT';
    this.btnTitle = document.createElement('div');
    this.btnTitle.classList.add('btn-test');
    this.btnTitle.textContent = 'TITLE';
    this.overworld.game.screen.appendChild(this.btnTitle);
    this.btnTitle.addEventListener('click', () => {
      if (this.overworld.game.activeScreen !== 'OVERWORLD' || this.overworld.game.transition.overlayTransition) return;
      this.overworld.game.switchScreens('TITLE');
    });
    for (let i = 0; i < this.overworld.game.stages.length; i++) {
      this.btnStages.push(new BtnStage(this.overworld, i));
      if (!this.overworld.game.stages[i].isClear) break;
    }
    if (this.overworld.game.stages.every(stage => stage.isClear)) this.btnToBeContinued = new BtnToBeContinued(this.overworld);
  }
}
