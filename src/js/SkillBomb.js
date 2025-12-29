import { Explosion } from './Explosion';
import { SpriteNew } from './SpriteNew';

export class SkillBomb extends SpriteNew {
  constructor(gameBoard, player) {
    super(gameBoard, {
      src: 'skill-ziggs.png',
      height: 75
    });

    this.player = player;
    this.el.style.zIndex = '3';

    this.icon = { src: 'skill-ziggs.png', height: this.height };
    this.cooldown = 480;
    this.avaliable = true;
    this.active = false;
    this.dmg = 6;
    this.isLauching = false;
    this.framesActiveDmg = 1;
    this.framesLauching = 28;
    this.framesLauchingCounter = this.framesLauching;
    this.rotateAnimation = 270;
    this.speedAnimationY = -28;
    this.speedAnimationX = 15;

    this.radius = this.height * 2;
    this.hitBox = null;

    this.explosion = {
      height: 2 * this.radius * (4 / 3),
      src: 'boss-explosion-spritesheet.png',
      maxFramesX: 90,
      delayByFrameX: 1,
      position: {
        height: 2 * this.radius * (4 / 3),
        width: 2 * this.radius * (4 / 3),
        top: this.top - this.height * 1.5 - this.radius * (2 / 3),
        left: this.left - this.height - this.radius * (1 / 3)
      }
    };

    this.gameBoard.deleteElement(this);
  }

  activeSkill(i) {
    this.createSprite();
    this.isLauching = true;
    this.top = this.player.top;
    this.left = this.player.left + this.player.width - this.player.width * 0.34;
    this.setInitialPosition();
    this.avoidBombOutOfView();
    this.gameBoard.ui.skillBoxesCooldown[i].style.display = 'block';
    this.gameBoard.ui.skillBoxesNotAllowed[i].el.style.display = 'block';
    this.avaliable = false;
  }

  dmgAreaTimer() {
    if (this.framesActiveDmg <= 0) {
      this.framesActiveDmg = 1;
      this.active = false;
      this.hitBox = null;
    } else {
      this.framesActiveDmg--;
    }
  }

  collision(enemy) {
    return this.gameBoard.collisionCircleCircle(this.hitBox, enemy.hitBox);
  }

  avoidBombOutOfView() {
    if (
      this.left + this.width >=
      this.gameBoard.left + this.gameBoard.gameRunningWidth
    ) {
      this.left =
        this.gameBoard.left + this.gameBoard.gameRunningWidth - this.width;
    }
  }

  update() {
    if (this.framesLauchingCounter <= 0) {
      this.framesLauchingCounter = this.framesLauching;
      this.speedAnimationY = -28;
      this.rotateAnimation = 270;

      this.hitBox = {
        radius: this.radius,
        height: 2 * this.radius,
        width: 2 * this.radius,
        top: this.top - this.height * 1.5,
        left: this.left - this.height,
        boxType: 'circle-orange'
      };

      this.explosion.position.top =
        this.top - this.height * 1.5 - this.radius * (2 / 3);
      this.explosion.position.left =
        this.left - this.height - this.radius * (1 / 3);

      this.gameBoard.explosions.push(
        new Explosion(this.gameBoard, this.explosion)
      );
      this.gameBoard.deleteElement(this);

      this.active = true;
      this.isLauching = false;

      if (this.gameBoard.debugMode) this.addHitBoxDebug(this.hitBox);

      if (this.hitBoxEl) {
        this.hitBoxEl.el.style.top = this.hitBox.top + 'px';
        this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
      }
    } else {
      this.speedAnimationY += this.gameBoard.gravity;
      this.top += this.speedAnimationY;
      this.left += this.speedAnimationX;
      this.rotateAnimation += this.speedAnimationX * 1.9;
      this.avoidBombOutOfView();
      this.el.style.top = this.top + 'px';
      this.el.style.left = this.left + 'px';
      this.el.style.rotate = this.rotateAnimation + 'deg';
      this.framesLauchingCounter--;
    }
  }
}
