import { Sprite } from './Sprite';

export class MoonBossProjectile extends Sprite {
  constructor(gameBoard, data) {
    super(gameBoard);
    this.type = 'enemies';
    this.topStart = data.topStart;
    this.height = 200;
    this.top = data.top;
    this.left = data.left;
    this.src = 'boss-meteor.gif';
    this.hp = 3;
    this.points = 0;
    this.speed = data.speed;
    this.speedY = -this.speed * this.topStart;
    this.speedX = -this.speed;
    this.rotate = data.rotate;
    this.markForDeletion = false;
    this.el.style.height = this.height + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.el.style.rotate = this.rotate + 'deg';
    this.el.src = `${this.src}`;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.width = this.el.getBoundingClientRect().width;

    this.radius = 0.26 * this.height;
    this.hitBox = {
      radius: this.radius,
      height: 2 * this.radius,
      width: 2 * this.radius,
      top: this.topStart === -1 ? this.top + this.height - 2 * this.radius : this.top,
      left: this.left,
      boxType: 'circle-red'
    };

    this.explosion = {
      height: 120,
      src: 'enemy-explosion-spritesheet.png',
      maxFramesY: 1,
      maxFramesX: 31,
      position: {
        height: this.hitBox.height,
        width: this.hitBox.width,
        top: this.hitBox.top,
        left: this.hitBox.left
      }
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug();
  }

  update() {
    this.top += this.speedY;
    this.left += this.speedX;
    this.hitBox.top = this.topStart === -1 ? this.top + this.height - 2 * this.radius : this.top;
    this.hitBox.left = this.left;
    this.explosion.position.top = this.hitBox.top;
    this.explosion.position.left = this.hitBox.left;
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    if (this.hitBoxEl) {
      this.hitBoxEl.el.style.top = this.hitBox.top + 'px';
      this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
    }
    if (this.left + this.width * 1.1 < 0 || this.top + this.height * 1.1 < 0 || this.top - this.height * 0.1 > this.gameBoard.gameRunningHeight) {
      this.gameBoard.deletElement(this);
    }
  }
}
