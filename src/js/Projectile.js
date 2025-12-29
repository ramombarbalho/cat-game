import { SpriteNew } from './SpriteNew';

function getMaxFramesX(value) {
  switch (value) {
    case 0:
      return 1;
    case 1:
      return 5;
    case 2:
      return 4;
    default:
      return 1;
  }
}

export class Projectile extends SpriteNew {
  constructor(gameBoard, player) {
    super(gameBoard, {
      src: `shoot-${player.chargeValue}-spritesheet.png`,
      height:
        player.height * (1 / 6) +
        player.chargeValue * player.height * (11 / 24),
      maxFramesX: getMaxFramesX(player.chargeValue),
      delayByFrameX: 2
    });

    this.type = 'projectiles';
    this.player = player;
    this.chargeValue = this.player.chargeValue;
    this.dmg = 2 ** (this.chargeValue + 1) - 1;
    this.speedX = 14 + this.chargeValue * 2;
    this.el.style.zIndex = '3';

    this.top =
      this.gameBoard.player.top +
      this.gameBoard.player.height / 2 -
      this.height / 2;
    this.left = this.gameBoard.player.left + this.gameBoard.player.width * 0.8;
    this.setInitialPosition();

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
      height: this.player.height * 0.375 + this.chargeValue * 15,
      src: `shot-${this.chargeValue}-explosion-spritesheet.png`,
      maxFramesX: 3,
      delayByFrameX: 2,
      position: {
        height: this.hitBox.height,
        width: this.hitBox.width,
        top: this.hitBox.top,
        left: this.hitBox.left + this.chargeValue * (this.player.height / 4)
      }
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug(this.hitBox);
  }

  update() {
    this.updateCurrentFrameX();

    this.left += this.speedX;
    this.hitBox.left = this.left + this.width / 2 - this.radius;
    this.explosion.position.left =
      this.hitBox.left + this.chargeValue * (this.player.height / 4);
    this.el.style.left = this.left + 'px';

    if (this.hitBoxEl) {
      this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
    }

    if (this.left > this.gameBoard.gameRunningWidth + this.width * 0.1) {
      this.gameBoard.deleteElement(this);
    }
  }
}
