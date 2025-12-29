import { Sprite } from './Sprite';

export class EnemyPlanet extends Sprite {
  constructor(gameBoard) {
    super(gameBoard);
    this.type = 'enemies';
    this.enemyType = Math.floor(Math.random() * 4);
    this.heights = [120, 200, 280, 360];
    this.sources = ['planet-0.gif', 'planet-1.gif', 'planet-2.gif', 'planet-3.gif'];
    this.height = this.heights[this.enemyType];
    this.top = Math.floor(Math.random() * (this.gameBoard.gameRunningHeight - this.height + 1));
    this.left = this.gameBoard.gameRunningWidth;
    this.el.style.height = this.height + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.el.src = `${this.sources[this.enemyType]}`;
    this.hp = this.enemyType * 3 + 3;
    this.speedX = -10 / (this.enemyType + 1);
    this.dropRate = 0.2 + this.enemyType * 0.1;
    this.points = this.enemyType + 2;
    this.markForDeletion = false;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.width = this.el.getBoundingClientRect().width;

    this.radius = 0.5 * this.height;
    this.hitBox = {
      radius: this.radius,
      height: 2 * this.radius,
      width: 2 * this.radius,
      top: this.top,
      left: this.left,
      boxType: 'circle-red'
    };

    this.explosion = {
      height: 147,
      src: 'enemy-explosion-spritesheet.png',
      maxFramesX: 31,
      delayByFrameX: 1,
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
    this.left += this.speedX;
    this.hitBox.left = this.left;
    this.explosion.position.left = this.hitBox.left;
    this.el.style.left = this.left + 'px';
    if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
    if (this.left + this.width * 1.1 < 0) {
      this.gameBoard.deleteElement(this);
    }
  }
}
