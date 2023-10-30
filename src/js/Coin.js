import { Sprite } from './Sprite';

export class Coin extends Sprite {
  constructor(gameBoard, enemy) {
    super(gameBoard);
    this.type = 'coins';
    this.gameBoard = gameBoard;
    this.height = 50;
    this.src = 'coin.gif';
    this.el.style.height = this.height + 'px';
    this.el.src = `${this.src}`;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.width = this.el.getBoundingClientRect().width;
    this.top = enemy.top + enemy.height / 2 - this.height / 2;
    this.left = enemy.left + enemy.width / 2 - this.width / 2;
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.el.style.zIndex = '2';
    this.points = 2;
    this.frames = this.gameBoard.game.config.coinFramesInterval;
    this.markForDeletion = false;

    this.hitBox = {
      height: this.height,
      width: this.width,
      top: this.top,
      left: this.left,
      boxType: 'rectangle-yellow'
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug();
  }

  timer() {
    this.frames--;
    if (this.frames <= this.gameBoard.game.config.coinFramesInterval / 3 && this.frames > 0) {
      this.el.style.visibility = this.el.style.visibility !== 'hidden' ? 'hidden' : 'visible';
    } else if (this.frames <= 0) {
      this.gameBoard.deletElement(this);
    }
  }
}
