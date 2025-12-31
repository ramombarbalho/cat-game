import { Sprite } from './Sprite';

export class Explosion extends Sprite {
  constructor(gameBoard, data) {
    const delayX = data?.delayByFrameX ?? 1;

    super(gameBoard, {
      src: data.src,
      height: data.height,
      maxFramesX: data.maxFramesX,
      delayByFrameX: delayX,
      lifetimeFrames: data.maxFramesX * delayX
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
