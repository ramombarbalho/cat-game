import { BtnOverworld } from './BtnOverworld';
import { BtnRetry } from './BtnRetry';
import { Dialog } from './Dialog';

export class GameOverDialog extends Dialog {
  constructor(gameBoard) {
    super();
    this.gameBoard = gameBoard;
    this.catThumbs = null;
    this.btnRetry = null;
    this.btnOverworld = null;
    this.initGameOverDialog();
  }

  initGameOverDialog() {
    const content = ` <h1 style="color: #ff3200">GAME OVER</h1>
                      <div class="dialog-img-game-over">
                        <img draggable="false" src="cat-game-over.png" class="cat-game-over-img" />
                        <img draggable="false" src="cat-game-over-thumbs.png" class="cat-game-over-img thumbs-down" id="thumbs" />
                      </div>`;
    this.addContent(content);
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.catThumbs = document.querySelector('#thumbs');
    this.btnRetry = new BtnRetry(this.gameBoard.game, this.el);
    this.btnRetry.el.addEventListener('mouseover', this.catThumbsUp);
    this.btnRetry.el.addEventListener('mouseout', this.catThumbsDown);
    this.btnOverworld = new BtnOverworld(this.gameBoard.game, this.el);
  }

  catThumbsUp = () => {
    this.catThumbs.classList.remove('thumbs-down');
  };

  catThumbsDown = () => {
    this.catThumbs.classList.add('thumbs-down');
  };
}
