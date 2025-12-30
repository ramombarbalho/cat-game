import { Sprite } from './Sprite';

export class EnemyPlanet extends Sprite {
  constructor(gameBoard, type = Math.floor(Math.random() * 4)) {
    super(gameBoard, {
      src: `planet-${type}-spritesheet.png`,
      height: 120 + type * 80
    });

    this.type = 'enemies';
    this.hp = type * 3 + 3;
    this.speedX = -10 / (type + 1);
    this.dropRate = 0.2 + type * 0.1;
    this.points = type + 2;

    this.top = Math.floor(
      Math.random() * (this.gameBoard.gameRunningHeight - this.height + 1)
    );
    this.left = this.gameBoard.gameRunningWidth;
    this.setInitialPosition();

    this.radius = 0.5 * this.height;
    this.hitBox = {
      shape: 'CIRCLE',
      radius: this.radius,
      height: 2 * this.radius,
      width: 2 * this.radius,
      top: this.top,
      left: this.left,
      color: '#ff0000'
    };

    this.explosion = {
      height: 147,
      src: 'enemy-explosion-spritesheet.png',
      maxFramesX: 31,
      position: {
        height: this.hitBox.height,
        width: this.hitBox.width,
        top: this.hitBox.top,
        left: this.hitBox.left
      }
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug(this.hitBox);
  }

  updatePosition() {
    this.left += this.speedX;
    this.hitBox.left = this.left;
    this.explosion.position.left = this.hitBox.left;
    this.el.style.left = this.left + 'px';

    if (this.hitBoxEl) {
      this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
    }

    if (this.left + this.width * 1.1 < 0) {
      this.gameBoard.deleteElement(this);
    }
  }

  update() {
    this.updatePosition();
  }
}
