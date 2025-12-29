import { GameImg } from './GameImg';
import { Sprite } from './Sprite';
import { Explosion } from './Explosion';
import { Coin } from './Coin';

export class SkillBomb extends Sprite {
  constructor(gameBoard, player) {
    super(gameBoard);
    this.player = player;
    this.height = 75;
    this.icon = { src: 'skill-ziggs.png', height: this.height };
    this.top = this.player.top;
    this.left = this.player.left + this.player.width - this.player.width * 0.34;
    this.width = 0;
    this.cooldown = 480;
    this.avaliable = true;
    this.active = false;
    this.dmg = 6;
    this.framesActive = 1;
    this.framesLauching = 28;
    this.framesLauchingCounter = this.framesLauching;
    this.rotateAnimation = 270;
    this.speedAnimationY = -28;
    this.speedAnimationX = 15;
    this.skillAnimation = null;

    this.radius = this.height * 2;
    this.hitBox = {
      radius: this.radius,
      height: 2 * this.radius,
      width: 2 * this.radius,
      top: -2.5 * this.radius,
      left: -2.5 * this.radius,
      boxType: 'circle-orange'
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug();

    this.explosion = {
      height: this.hitBox.height * (4 / 3),
      src: 'boss-explosion-spritesheet.png',
      maxFramesY: 1,
      maxFramesX: 90,
      position: {
        height: this.hitBox.height * (4 / 3),
        width: this.hitBox.width * (4 / 3),
        top: this.hitBox.top + this.hitBox.height - this.hitBox.height * (4 / 3),
        left: this.hitBox.left + this.hitBox.width - this.hitBox.width * (3.5 / 3)
      }
    };
  }

  activeSkill(i) {
    this.skillAnimation = new GameImg(this.gameBoard);
    this.skillAnimation.el.style.height = this.height + 'px';
    this.skillAnimation.el.src = 'skill-ziggs.png';
    this.top = this.player.top;
    this.left = this.player.left + this.player.width - this.player.hitBox.width;
    this.gameBoard.gameRunningArea.appendChild(this.skillAnimation.el);
    this.width = this.skillAnimation.el.getBoundingClientRect().width;
    if (this.left + this.width >= this.gameBoard.left + this.gameBoard.gameRunningWidth) this.left = this.gameBoard.left + this.gameBoard.gameRunningWidth - this.width;
    this.skillAnimation.el.style.top = this.top + 'px';
    this.skillAnimation.el.style.left = this.left + 'px';
    this.skillAnimation.el.style.rotate = this.rotateAnimation + 'deg';
    this.skillAnimation.el.zIndex = '3';
    this.gameBoard.ui.skillBoxesCooldown[i].style.display = 'block';
    this.gameBoard.ui.skillBoxesNotAllowed[i].el.style.display = 'block';
    this.avaliable = false;
  }

  dmgAreaTimer() {
    if (this.framesActive <= 0) {
      this.framesActive = 1;
      this.active = false;
      this.hitBox.top = -2.5 * this.radius;
      this.hitBox.left = -2.5 * this.radius;
    } else {
      this.framesActive--;
    }
  }

  update() {
    if (this.framesLauchingCounter <= 0) {
      this.skillAnimation.el.remove();
      this.skillAnimation = null;
      this.framesLauchingCounter = this.framesLauching;
      this.speedAnimationY = -28;
      this.rotateAnimation = 270;
      this.gameBoard.explosions.push(new Explosion(this.gameBoard, this.explosion));
      this.active = true;
      this.hitBox.top = this.top - this.height * 1.5;
      this.hitBox.left = this.left - this.height;
      if (this.hitBoxEl) {
        this.hitBoxEl.el.style.top = this.hitBox.top + 'px';
        this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
      }
    } else {
      this.speedAnimationY += this.gameBoard.gravity;
      this.top += this.speedAnimationY;
      this.left += this.speedAnimationX;
      this.rotateAnimation += this.speedAnimationX * 1.9;
      if (this.left + this.width >= this.gameBoard.left + this.gameBoard.gameRunningWidth) this.left = this.gameBoard.left + this.gameBoard.gameRunningWidth - this.width;
      this.skillAnimation.el.style.top = this.top + 'px';
      this.skillAnimation.el.style.left = this.left + 'px';
      this.skillAnimation.el.style.rotate = this.rotateAnimation + 'deg';
      this.explosion.position.top = this.top - this.height * 1.5 - this.radius * (2 / 3);
      this.explosion.position.left = this.left - this.height - this.radius * (1 / 3);
      this.framesLauchingCounter--;
    }
  }

  collision(enemy) {
    if (this.gameBoard.collisionCircleCircle(this.hitBox, enemy.hitBox)) {
      enemy.hp -= this.dmg;
      if (enemy.hp <= 0) {
        this.gameBoard.scoreUp(enemy.points);
        if (Math.random() < enemy.dropRate) this.gameBoard.coins.push(new Coin(this.gameBoard, enemy));
        this.gameBoard.explosions.push(new Explosion(this.gameBoard, enemy.explosion));
        this.gameBoard.deleteElement(enemy);
      }
    }
  }
}
