import { Explosion } from './Explosion';
import { Sprite } from './Sprite';

export class MoonBossProjectile extends Sprite {
  constructor(gameBoard, data) {
    super(gameBoard, {
      src: 'meteor-spritesheet.png',
      // ##fix melhorar logica do height para colisão com o gameboard
      height: 200,
      maxFramesX: 4,
      delayByFrameX: 4
    });

    this.type = 'enemies';
    this.topStart = data.topStart;
    this.hp = 3;
    this.dmg = 1;
    this.points = 0;
    this.speed = data.speed;
    this.speedY = -this.speed * this.topStart;
    this.speedX = -this.speed;
    this.rotate = data.rotate;
    this.el.style.rotate = this.rotate + 'deg';

    this.top = data.top;
    this.left = data.left;
    this.setInitialPosition();

    this.radius = 0.26 * this.height;
    this.hitBox = {
      shape: 'CIRCLE',
      radius: this.radius,
      height: 2 * this.radius,
      width: 2 * this.radius,
      top:
        this.topStart === -1
          ? this.top + this.height - 2 * this.radius
          : this.top,
      left: this.left,
      color: '#ff0000'
    };

    this.explosion = {
      height: 120,
      src: 'enemy-explosion-spritesheet.png',
      maxFramesX: 31,
      position: {
        height: this.hitBox.height,
        width: this.hitBox.width,
        top: this.hitBox.top,
        left: this.hitBox.left
      }
    };

    if (this.gameBoard.debugMode) this.gameBoard.createHitBoxEl(this);
  }

  takeDamage(dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.destroy();
    }
  }

  destroy() {
    this.gameBoard.explosions.push(
      new Explosion(this.gameBoard, this.explosion)
    );
    this.gameBoard.deleteElement(this);
  }

  deleteIfOutOfBounds() {
    if (
      this.left + this.width * 1.1 < 0 ||
      this.top + this.height * 1.1 < 0 ||
      this.top - this.height * 0.1 > this.gameBoard.gameRunningHeight
    ) {
      this.gameBoard.deleteElement(this);
    }
  }

  updatePosition() {
    this.top += this.speedY;
    this.left += this.speedX;
    this.hitBox.top =
      this.topStart === -1
        ? this.top + this.height - 2 * this.radius
        : this.top;
    this.hitBox.left = this.left;
    this.explosion.position.top = this.hitBox.top;
    this.explosion.position.left = this.hitBox.left;
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.hitBoxEl?.updatePosition();
    this.deleteIfOutOfBounds();
  }

  update() {
    this.updateCurrentFrameX();
    this.updatePosition();
  }
}
