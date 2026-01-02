import { BtnStage } from './BtnStage';
import { BtnTitle } from './BtnTitle';
import { BtnToBeContinued } from './BtnToBeContinued';

export class OverworldUI {
  constructor(game) {
    this.game = game;
    this.btnStages = [];
    this.btnToBeContinued = null;
    this.overworldLabel = null;
    this.initOverworldUI();
  }

  initOverworldUI() {
    this.overworldLabel = document.createElement('p');
    this.overworldLabel.classList.add('score-label');
    this.game.screen.appendChild(this.overworldLabel);
    this.overworldLabel.innerHTML = 'OVERWORLD LAYOUT';

    this.btnTitle = new BtnTitle(this.game, this.game.screen);
    for (const stage of this.game.stageList) {
      this.btnStages.push(new BtnStage(this.game, this.game.screen, stage.id));
      if (!stage.isClear) break;
    }
    if (this.game.stageList.every(stage => stage.isClear)) {
      this.btnToBeContinued = new BtnToBeContinued(this.game, this.game.screen);
    }
  }
}
