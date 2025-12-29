import { GameImg } from './GameImg';

export class Explosion {
  constructor(gameBoard, data) {
    this.type = 'explosions';
    this.gameBoard = gameBoard;
    this.frameY = 0;
    this.maxFramesY = data.maxFramesY;
    this.frameX = 0;
    this.maxFramesX = data.maxFramesX;
    this.markForDeletion = false;

    this.height = data.height;
    this.top = data.position.top + data.position.height / 2 - this.height / 2;
    this.src = data.src;

    this.el = document.createElement('div');
    this.el.classList.add('explosion');
    this.spriteSheet = new GameImg(this.gameBoard);
    this.spriteSheet.el.style.height = this.height;
    this.spriteSheet.el.src = `${this.src}`;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.el.appendChild(this.spriteSheet.el);

    this.spriteSheet.top = -this.frameY * this.height;
    this.spriteSheet.el.style.height = this.height + 'px';
    this.spriteSheet.el.style.top = this.spriteSheet.top + 'px';
    this.spriteSheet.width = Math.round(this.spriteSheet.el.getBoundingClientRect().width);
    this.spriteSheet.el.style.width = this.spriteSheet.width + 'px';

    this.width = this.spriteSheet.width / this.maxFramesX;
    this.left = data.position.left + data.position.width / 2 - this.width / 2;

    this.el.style.height = this.height + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.width = this.width + 'px';
    this.el.style.left = this.left + 'px';

    this.spriteSheet.left = -this.frameX * this.width;
    this.spriteSheet.el.style.left = this.spriteSheet.left + 'px';
  }

  update() {
    if (this.frameX <= this.maxFramesX) {
      this.spriteSheet.left = -this.frameX * this.width;
      this.spriteSheet.el.style.left = this.spriteSheet.left + 'px';
      this.frameX++;
    } else {
      this.gameBoard.deleteElement(this);
    }
  }
}
