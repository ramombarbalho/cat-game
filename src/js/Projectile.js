import { Sprite } from './Sprite';

export class Projectile extends Sprite {
  constructor(gameBoard, player) {
    super(gameBoard);
    this.type = 'projectiles';
    this.player = player;
    this.value = this.player.chargeValue;
    this.height = this.player.height * (1 / 6) + this.value * this.player.height * (11 / 24);
    this.sources = ['shoot-0.png', 'shoot-1.gif', 'shoot-2.gif'];
    this.top = this.gameBoard.player.top + this.gameBoard.player.height / 2 - this.height / 2;
    this.left = this.gameBoard.player.left + this.gameBoard.player.width * 0.8;
    this.el.style.height = this.height + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.gameBoard.player.left + 'px';
    this.el.style.zIndex = '3';
    this.el.src = `${this.sources[this.value]}`;
    this.dmg = 2 ** (this.value + 1) - 1;
    this.speedX = 14 + this.value * 2;
    this.markForDeletion = false;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.width = this.el.getBoundingClientRect().width;

    this.radius = 0.5 * this.height;
    this.hitBox = {
      radius: this.radius,
      height: 2 * this.radius,
      width: 2 * this.radius,
      top: this.top,
      left: this.left + this.width / 2 - this.radius,
      boxType: 'circle-green'
    };

    this.explosion = {
      height: this.player.height * 0.375 + this.value * 15,
      src: `shot-${this.value}-explosion-spritesheet.png`,
      maxFramesY: 1,
      maxFramesX: 6,
      position: {
        height: this.hitBox.height,
        width: this.hitBox.width,
        top: this.hitBox.top,
        left: this.hitBox.left + this.value * (this.player.height / 4)
      }
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug();
  }

  update() {
    this.left += this.speedX;
    this.hitBox.left = this.left + this.width / 2 - this.radius;
    this.explosion.position.left = this.hitBox.left + this.value * (this.player.height / 4);
    this.el.style.left = this.left + 'px';
    if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
    if (this.left > this.gameBoard.gameRunningWidth + this.width * 0.1) {
      this.gameBoard.deletElement(this);
    }
  }
}
