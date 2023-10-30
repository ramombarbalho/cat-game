import { Sprite } from './Sprite';
import { Projectile } from './Projectile';
import { ChargeAnimation } from './ChargeAnimation';

export class Player extends Sprite {
  constructor(gameBoard) {
    super(gameBoard);
    this.height = this.gameBoard.game.playerState.height;
    this.top = (this.gameBoard.gameRunningHeight - this.height) / 2;
    this.left = this.gameBoard.left;
    this.src = `cat-${this.gameBoard.game.playerState.skin}.gif`;
    this.el.style.height = this.height + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.el.style.zIndex = '3';
    this.el.src = `${this.src}`;
    this.hp = this.gameBoard.game.playerState.hp;
    this.speedY = 0;
    this.speedX = 0;
    this.speed = this.gameBoard.game.playerState.speed;
    this.skills = [];
    this.chargeValue = 0;
    this.chargeFrames = 0;
    this.untargetableFrames = this.gameBoard.game.playerState.untargetableFrames;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.width = this.el.getBoundingClientRect().width;
    this.chargeAnimation = new ChargeAnimation(this.gameBoard, this);
    this.state = 'JUST_HANGING_AROUND';

    this.dboost = {
      active: false,
      distance: this.gameBoard.game.playerState.dboostDistance,
      distanceY: 0,
      distanceX: 0,
      frames: this.gameBoard.game.playerState.dboostFrames,
      velY: 0,
      velX: 0
    };

    this.hitBox = {
      height: this.height * 0.49,
      width: this.width * 0.34,
      top: this.top + this.height * 0.255,
      left: this.left + this.width * 0.42,
      boxType: 'rectangle-white'
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug();
  }

  update() {
    this.top += this.speedY;
    this.left += this.speedX + this.gameBoard.windForceX;
    if (this.top + this.height * 0.255 < this.gameBoard.top) this.top = this.gameBoard.top - this.height * 0.255;
    if (this.top + this.height * 0.74 > this.gameBoard.top + this.gameBoard.gameRunningHeight)
      this.top = this.gameBoard.top + this.gameBoard.gameRunningHeight - this.height * 0.74;
    if (this.left + this.width * 0.42 < this.gameBoard.left) this.left = this.gameBoard.left - this.width * 0.42;
    if (this.left + this.width * 0.76 > this.gameBoard.left + this.gameBoard.gameRunningWidth)
      this.left = this.gameBoard.left + this.gameBoard.gameRunningWidth - this.width * 0.76;
    this.hitBox.top = this.top + this.height * 0.255;
    this.hitBox.left = this.left + this.width * 0.42;
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.chargeAnimation.el.style.top = this.top - this.height * 0.125 + 'px';
    this.chargeAnimation.el.style.left = this.left + this.width * 0.31 + 'px';
    if (this.hitBoxEl) {
      this.hitBoxEl.el.style.top = this.hitBox.top + 'px';
      this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
    }
  }

  moviment() {
    if (this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[0]) && this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[1])) this.speedY = 0;
    else if (this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[0]) && this.top + this.height * 0.255 > this.gameBoard.top) this.speedY = -this.speed;
    else if (this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[1]) && this.top + this.height * 0.74 < this.gameBoard.top + this.gameBoard.gameRunningHeight)
      this.speedY = this.speed;
    else this.speedY = 0;
    if (this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[2]) && this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[3])) this.speedX = 0;
    else if (this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[2]) && this.left + this.width * 0.42 > this.gameBoard.left) this.speedX = -this.speed;
    else if (this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[3]) && this.left + this.width * 0.76 < this.gameBoard.left + this.gameBoard.gameRunningWidth)
      this.speedX = this.speed;
    else this.speedX = 0;

    if (this.speedY || this.speedX || this.gameBoard.windForceX) this.update();
  }

  shooting() {
    this.gameBoard.projectiles.push(new Projectile(this.gameBoard, this));
  }

  beam() {
    if (this.gameBoard.game.keysActive.includes(this.gameBoard.game.keys[4])) {
      if (this.chargeFrames === 0) {
        this.shooting();
      } else if (
        this.chargeFrames >= this.gameBoard.game.playerState.chargeFramesInterval &&
        this.chargeFrames < this.gameBoard.game.playerState.chargeFramesInterval * 2 &&
        this.chargeValue === 0
      ) {
        this.chargeValue = 1;
        this.chargeAnimation.el.src = `${this.chargeAnimation.sources[this.chargeValue]}`;
        this.chargeAnimation.el.style.display = 'block';
      } else if (this.chargeFrames >= this.gameBoard.game.playerState.chargeFramesInterval * 2 && this.chargeValue === 1) {
        this.chargeValue = 2;
        this.chargeAnimation.el.src = `${this.chargeAnimation.sources[this.chargeValue]}`;
      }
      this.chargeFrames++;
    } else if (this.chargeFrames > 0) {
      if (this.chargeValue > 0) {
        this.shooting();
        this.chargeValue = 0;
        this.chargeAnimation.el.style.display = 'none';
        this.chargeAnimation.el.src = `${this.chargeAnimation.sources[this.chargeValue]}`;
      }
      this.chargeFrames = 0;
    }
  }

  useSkill(i) {
    if (!this.skills[i].avaliable) return;
    this.skills[i].activeSkill(i);
  }

  dboostMove() {
    if (this.dboost.frames <= 0) {
      this.dboost.active = false;
      this.dboost.frames = this.gameBoard.game.playerState.dboostFrames;
    } else {
      this.top += this.dboost.velY;
      this.left += this.dboost.velX;
      this.speedY = 0;
      this.speedX = 0;
      this.update();
      this.dboost.frames--;
    }
  }

  calcDboost(enemy) {
    this.state = 'UNTARGETABLE';
    const dy = this.hitBox.top + this.hitBox.height / 2 - (enemy.hitBox.top + enemy.hitBox.radius);
    const dx = this.hitBox.left + this.hitBox.width / 2 - (enemy.hitBox.left + enemy.hitBox.radius);
    const dSum = Math.abs(dy) + Math.abs(dx);
    const ry = dy / dSum;
    const rx = dx / dSum;
    this.dboost.distanceY = ry * this.dboost.distance;
    this.dboost.distanceX = rx * this.dboost.distance;
    this.dboost.velY = this.dboost.distanceY / this.gameBoard.game.playerState.dboostFrames;
    this.dboost.velX = this.dboost.distanceX / this.gameBoard.game.playerState.dboostFrames;
  }

  untargetableMode() {
    if (this.untargetableFrames > 0) {
      this.untargetableFrames--;
      this.el.style.visibility = this.el.style.visibility !== 'hidden' ? 'hidden' : 'visible';
    } else {
      this.el.style.visibility = 'visible';
      this.state = 'JUST_HANGING_AROUND';
      this.untargetableFrames = this.gameBoard.game.playerState.untargetableFrames;
    }
  }
}
