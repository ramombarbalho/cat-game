import { SpriteNew } from './SpriteNew';

export class Explosion extends SpriteNew {
  constructor(gameBoard, data) {
    super(gameBoard, {
      src: data.src,
      height: data.height,
      maxFramesX: data.maxFramesX,
      delayByFrameX: data.delayByFrameX,
      lifetimeFrames: data.maxFramesX * data.delayByFrameX
    });

    this.type = 'explosions';
    this.gameBoard = gameBoard;

    this.top = data.position.top + data.position.height / 2 - this.height / 2;
    this.left = data.position.left + data.position.width / 2 - this.width / 2;
    this.setInitialPosition();
  }

  update() {
    this.updateCurrentFrameX();
    this.updateLifetimeFrames();
  }
}
