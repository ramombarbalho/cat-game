import { BtnOverworld } from './BtnOverworld';
import { BtnRetry } from './BtnRetry';
import { Dialog } from './Dialog';

export class StageClearDialog extends Dialog {
  constructor(gameBoard) {
    super();
    this.gameBoard = gameBoard;
    this.catThumbs = null;
    this.btnRetry = null;
    this.btnOverworld = null;
    this.initStageClearDialog();
  }

  initStageClearDialog() {
    const content = ` <h1>STAGE CLEAR</h1>
                      <h3>HP:.......??</h3>
                      <h3>BOMB:.....??</h3>
                      <h3>SHOOTS:...??</h3>
                      <h2>TOTAL:..??</h2>`;
    this.addContent(content);
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.btnRetry = new BtnRetry(this.gameBoard.game, this.el);
    this.btnOverworld = new BtnOverworld(this.gameBoard.game, this.el);
  }
}
