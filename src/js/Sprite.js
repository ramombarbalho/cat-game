import { HitBoxDebug } from './HitBoxDebug';
import { GameImg } from './GameImg';

export class Sprite extends GameImg {
  constructor(gameBoard) {
    super(gameBoard);
    this.hitBoxEl = null;
  }

  addHitBoxDebug = () => {
    this.hitBoxEl = new HitBoxDebug(this.gameBoard, this.hitBox);
    this.gameBoard.hitBoxElements.push(this.hitBoxEl.el);
  };

  removeHitBoxDebug = () => {
    if (this.hitBoxEl) {
      this.gameBoard.hitBoxElements.forEach(el => el.remove());
      this.gameBoard.hitBoxElements.length = 0;
      this.hitBoxEl = null;
    }
  };
}
