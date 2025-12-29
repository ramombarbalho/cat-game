import { SpriteNew } from './SpriteNew';

export class Coin extends SpriteNew {
  constructor(gameBoard, enemy) {
    super(gameBoard, {
      src: 'coin-spritesheet.png',
      height: 50,
      maxFramesX: 4,
      delayByFrameX: 8,
      lifetimeFrames: 360,
      willBlink: true
    });

    this.type = 'coins';
    this.points = 2;

    this.top = enemy.top + enemy.height / 2 - this.height / 2;
    this.left = enemy.left + enemy.width / 2 - this.width / 2;
    this.setInitialPosition();

    this.hitBox = {
      height: this.height,
      width: this.width,
      top: this.top,
      left: this.left,
      boxType: 'rectangle-yellow'
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug(this.hitBox);
  }

  update() {
    this.updateCurrentFrameX();
    this.updateLifetimeFrames();
  }
}
