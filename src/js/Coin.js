import { SpriteNew } from './SpriteNew';

export class Coin extends SpriteNew {
  constructor(gameBoard, enemy) {
    super(gameBoard, {
      src: 'coin-spritesheet.png',
      height: 50,
      currentFrameY: 1,
      maxFramesY: 1,
      currentFrameX: 1,
      maxFramesX: 4,
      delayByFrameXCount: 1,
      delayByFrameX: 8,
      lifetimeFrames: gameBoard.game.config.coinLifetimeFrames
    });

    this.top = enemy.top + enemy.height / 2 - this.height / 2;
    this.width = this.spriteSheet.width / this.maxFramesX;
    this.left = enemy.left + enemy.width / 2 - this.width / 2;

    this.setPosition();

    this.hitBox = {
      height: this.height,
      width: this.width,
      top: this.top,
      left: this.left,
      boxType: 'rectangle-yellow'
    };

    this.type = 'coins';
    this.points = 2;

    this.markForDeletion = false;

    if (this.gameBoard.debugMode) this.addHitBoxDebug();
  }
}
