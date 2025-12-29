import { HitBoxDebug } from './HitBoxDebug';
import { GameImg } from './GameImg';

export class SpriteNew {
  constructor(
    gameBoard,
    {
      src = 'not-allowed.png',
      height = 25,
      currentFrameY = 1,
      maxFramesY = 1,
      currentFrameX = 1,
      maxFramesX = 1,
      delayByFrameXCount = 1,
      delayByFrameX = 1,
      lifetimeFrames = -1
    }
  ) {
    this.gameBoard = gameBoard;
    this.src = src;
    this.height = height;
    this.currentFrameY = currentFrameY;
    this.maxFramesY = maxFramesY;
    this.currentFrameX = currentFrameX;
    this.maxFramesX = maxFramesX;
    this.delayByFrameXCount = delayByFrameXCount;
    this.delayByFrameX = delayByFrameX;
    this.lifetimeFramesCount = lifetimeFrames;
    this.lifetimeFrames = lifetimeFrames;

    this.el = null;
    this.markForDeletion = false;
    this.hitBoxEl = null;

    this.createSprite();
  }

  createSprite() {
    this.el = document.createElement('div');
    this.el.classList.add('wrapper-spritesheet');
    this.spriteSheet = new GameImg(this.gameBoard);
    this.spriteSheet.el.style.height = this.height;
    this.spriteSheet.el.src = `${this.src}`;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.el.appendChild(this.spriteSheet.el);
    this.spriteSheet.top = this.height * (1 - this.currentFrameY);
    this.spriteSheet.el.style.height = this.height + 'px';
    this.spriteSheet.el.style.top = this.spriteSheet.top + 'px';
    this.spriteSheet.width = Math.round(
      this.spriteSheet.el.getBoundingClientRect().width
    );
    this.spriteSheet.el.style.width = this.spriteSheet.width + 'px';
    this.width = this.spriteSheet.width / this.maxFramesX;
  }

  setPosition() {
    this.el.style.height = this.height + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.width = this.width + 'px';
    this.el.style.left = this.left + 'px';

    this.spriteSheet.left = this.width * (1 - this.currentFrameX);
    this.spriteSheet.el.style.left = this.spriteSheet.left + 'px';
  }

  updateCurrentFrameX() {
    if (this.delayByFrameXCount < this.delayByFrameX) {
      this.delayByFrameXCount++;
      return;
    }

    if (this.currentFrameX < this.maxFramesX) {
      this.currentFrameX++;
    } else {
      this.currentFrameX = 1;
    }

    this.delayByFrameXCount = 1;

    const value = this.width * (1 - this.currentFrameX);
    this.spriteSheet.el.style.transform = `translateX(${value}px)`;
  }

  updateLifetimeFrames() {
    this.lifetimeFramesCount--;
    if (
      this.lifetimeFramesCount <= this.lifetimeFrames / 3 &&
      this.lifetimeFramesCount > 0
    ) {
      this.el.style.visibility =
        this.el.style.visibility !== 'hidden' ? 'hidden' : 'visible';
    } else if (this.lifetimeFramesCount <= 0) {
      this.gameBoard.deletElement(this);
    }
  }

  addHitBoxDebug = hitBox => {
    console.log(hitBox)
    this.hitBoxEl = new HitBoxDebug(this.gameBoard, hitBox);
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
