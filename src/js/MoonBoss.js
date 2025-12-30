import { HitBoxDebug } from './HitBoxDebug';
import { Explosion } from './Explosion';
import { MoonBossProjectile } from './MoonBossProjectile';
import { SpriteNew } from './SpriteNew';

export class MoonBoss extends SpriteNew {
  constructor(gameBoard) {
    super(gameBoard, {
      src: 'moon-boss.png',
      height: gameBoard.gameRunningHeight,

    });

    this.hp = 80;
    this.balanceTop = 7;
    this.balanceBottom = 7;
    this.speedX = -8;
    this.speedXVariant = 12;
    this.rotate = 0;
    this.rotateSpeed = 5;
    this.rotateDirection = -1;
    this.dmgHitBoxEl = null;
    this.state = 'INVULNERABLE';
    this.dmgVulnerability = true;
    this.dmgVulnerabilityFrames = 70;
    this.skill00SpawnInterval = 480;
    this.skill00SpawnIntervalVariant = 480;
    this.projectileSpawnInterval = 80;
    this.projectileSpawnIntervalVariant = 80;
    this.rage = 0;
    this.rageMode = false;
    this.skill01RotateQuantity = 5;
    this.skill01RotateQuantityVariant = 5;
    this.skill03State = 's1';
    this.skill03DirectionRng = 1;
    this.windForceXVariant = 4;
    this.maxSpeedMeteorVariant = 3;

    this.top = this.gameBoard.top;
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

    this.dmgRadius = 0.073 * this.height;
    this.dmgHitBox = {
      shape: 'CIRCLE',
      radius: this.dmgRadius,
      height: 2 * this.dmgRadius,
      width: 2 * this.dmgRadius,
      top: this.top + this.height / 2 - this.dmgRadius,
      left: this.left + this.width / 2 - this.dmgRadius,
      color: '#ff0000'
    };

    this.explosion = {
      height: this.height,
      src: 'boss-explosion-spritesheet.png',
      maxFramesX: 90,
      delayByFrameX: 1,
      position: {
        height: this.hitBox.height,
        width: this.hitBox.width,
        top: this.hitBox.top,
        left: this.hitBox.left
      }
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug(this.hitBox);
    if (this.gameBoard.debugMode) this.addDmgHitBoxDebug();
  }

  update() {
    this.left += this.speedX;
    this.hitBox.left = this.left;
    this.dmgHitBox.left = this.left + this.width / 2 - this.dmgRadius;
    this.explosion.position.left = this.left;
    this.el.style.left = this.left + 'px';
    if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
    if (this.dmgHitBoxEl) this.dmgHitBoxEl.el.style.left = this.dmgHitBox.left + 'px';
  }

  entrance() {
    if (this.left + this.width < this.gameBoard.gameRunningWidth) {
      this.gameBoard.ui.fillHpBossEl();
      return (this.speedX = 0);
    }
    this.update();
  }

  stopSkill() {
    this.state = 'INVULNERABLE';
    if (this.hp <= 48 && this.hp > 24) {
      this.speedXVariant = 16;
      this.rotateSpeed = 8;
      this.projectileSpawnInterval = 70;
      this.skill00SpawnIntervalVariant = 360;
      this.projectileSpawnIntervalVariant = 60;
      this.skill01RotateQuantityVariant = 7;
      this.windForceXVariant = 5;
      this.maxSpeedMeteorVariant = 6;
    } else if (this.hp <= 24) {
      this.speedXVariant = 24;
      this.rotateSpeed = 12;
      this.projectileSpawnInterval = 60;
      this.skill00SpawnIntervalVariant = 240;
      this.projectileSpawnIntervalVariant = 40;
      this.skill01RotateQuantityVariant = 10;
      this.windForceXVariant = 7;
      this.maxSpeedMeteorVariant = 11;
    }
    this.balanceTop = 7;
    this.balanceBottom = 7;
    this.speedX = 0;
    this.skill00SpawnInterval = this.skill00SpawnIntervalVariant;
    this.skill01RotateQuantity = this.skill01RotateQuantityVariant;
    this.rage = 0;
  }

  rotating() {
    this.rotate += this.rotateDirection * this.rotateSpeed;
    this.el.style.rotate = this.rotate + 'deg';
  }

  stopRotating() {
    this.rotate = 0;
    this.el.style.rotate = this.rotate + 'deg';
  }

  throwRandomMeteor(rotation = Math.round(Math.random()) * 2 - 1) {
    this.gameBoard.enemies.push(
      new MoonBossProjectile(this.gameBoard, {
        top: rotation === 1 ? this.gameBoard.gameRunningHeight : -200,
        left: Math.floor(Math.random() * this.gameBoard.gameRunningWidth + 200 * 0.9),
        topStart: rotation,
        rotate: 45 + 45 * rotation,
        speed: Math.random() * (this.maxSpeedMeteorVariant - 2 + 1) + 2
      })
    );
    this.projectileSpawnInterval = this.projectileSpawnIntervalVariant;
  }

  throwTargetMeteor() {
    this.gameBoard.enemies.push(
      new MoonBossProjectile(this.gameBoard, {
        top: this.rotateDirection === 1 ? this.gameBoard.gameRunningHeight : -200,
        left:
          this.rotateDirection === -1
            ? this.gameBoard.player.top + this.gameBoard.player.left + 200 * 0.8
            : this.gameBoard.gameRunningHeight - this.gameBoard.player.top - this.gameBoard.player.height + this.gameBoard.player.left + 200 * 0.8,
        topStart: this.rotateDirection,
        rotate: 45 + 45 * this.rotateDirection,
        speed: Math.random() * (this.maxSpeedMeteorVariant - 2 + 1) + 2
      })
    );
  }

  skill00() {
    if (!this.speedX) this.speedX = -this.speedXVariant;
    if (this.left <= 0) this.speedX = this.speedXVariant;
    this.update();
    if (this.left + this.width > this.gameBoard.gameRunningWidth) {
      this.speedX = -this.speedXVariant;
      this.update();
      this.stopSkill();
    }
  }

  skill01() {
    this.rotating();
    if (this.rotate % 360 === 0 || this.rotate === this.rotateDirection * this.rotateSpeed) {
      this.throwTargetMeteor();
      this.skill01RotateQuantity--;
      if (this.skill01RotateQuantity <= 0) {
        this.stopRotating();
        this.stopSkill();
      }
    }
  }

  skill02() {
    this.rotating();
    if (this.rotate % 360 === 0 || this.rotate === this.rotateDirection * this.rotateSpeed) this.throwRandomMeteor(this.rotateDirection);
    if (!this.speedX) this.speedX = -this.speedXVariant;
    if (this.left <= 0) this.speedX = this.speedXVariant;
    this.update();
    if (this.left + this.width > this.gameBoard.gameRunningWidth) {
      this.speedX = -this.speedXVariant;
      this.update();
      this.speedX = this.speedXVariant;
      if (this.rotate % 360 === 0) {
        this.stopRotating();
        this.stopSkill();
      }
    }
  }

  skill03() {
    this.rotating();
    if (this.rotate % 360 === 0 || this.rotate === this.rotateDirection * this.rotateSpeed) this.throwTargetMeteor();
    switch (this.skill03State) {
      case 's1':
        this.speedX = 8;
        this.update();
        if (this.left - 600 > this.gameBoard.left + this.gameBoard.gameRunningWidth) {
          this.skill03State = 's2';
          this.speedX = this.skill03DirectionRng * this.speedXVariant * 4;
          if (this.skill03DirectionRng === 1) this.left = -(this.width + 400);
        }
        break;
      case 's2':
        this.update();
        if (this.el.style.filter !== 'blur(2px)') {
          this.el.style.filter = 'blur(2px)';
          this.el.style.scale = 2;
          this.el.style.zIndex = '3';
        }
        if (this.left + this.width + 600 < this.gameBoard.left || this.left - 600 > this.gameBoard.left + this.gameBoard.gameRunningWidth) {
          this.skill03State = 's3';
          this.left = this.gameBoard.gameRunningWidth * 1.5;
          this.speedX = -8;
          this.gameBoard.windForceX = this.skill03DirectionRng * this.windForceXVariant;
        }
        break;
      case 's3':
        this.update();
        if (this.el.style.filter === 'blur(2px)') {
          this.el.style.filter = 'none';
          this.el.style.scale = 1;
          this.el.style.zIndex = '1';
        }
        if (this.left + this.width + 8 < this.gameBoard.gameRunningWidth) {
          this.speedX = 8;
          this.update();
          this.speedX = -8;
          if (this.rotate % 360 === 0) {
            this.skill03State = 's1';
            this.gameBoard.windForceX = 0;
            this.stopRotating();
            this.stopSkill();
          }
        }
        break;
    }
  }

  collisionBalance(position) {
    const rng = Math.floor(Math.random() * 3 + 1);
    this.rotateDirection = position;
    this.state = `SKILL0${rng}`;
    if (rng === 3) this.skill03DirectionRng = Math.round(Math.random()) * 2 - 1;
  }

  collision() {
    if (this.gameBoard.collision(this.gameBoard.player.hitBox, this.hitBox) && this.gameBoard.player.state !== 'UNTARGETABLE' && this.skill03State !== 's2') {
      // ##fix remover a responsabilidade de colisão com o player daqui
      this.gameBoard.player.hp--;
      this.gameBoard.player.dboost.active = true;
      this.gameBoard.player.calcDboost(this);
      this.gameBoard.ui.updateHeart();
    }
    this.gameBoard.projectiles.forEach(projectile => {
      if (this.state === 'INVULNERABLE' && this.gameBoard.collision(projectile.hitBox, this.hitBox)) {
        if (projectile.hitBox.top + projectile.hitBox.height / 2 <= this.hitBox.top + this.hitBox.height * 0.1) {
          this.balanceTop -= projectile.dmg;
          if (this.balanceTop <= 0) this.collisionBalance(1);
        } else if (projectile.hitBox.top + projectile.hitBox.height / 2 >= this.hitBox.top + this.hitBox.height * 0.9) {
          this.balanceBottom -= projectile.dmg;
          if (this.balanceBottom <= 0) this.collisionBalance(-1);
        } else {
          this.rage += projectile.dmg;
          if (this.rage >= 10) this.state = 'SKILL00';
        }
        this.gameBoard.explosions.push(new Explosion(this.gameBoard, projectile.explosion));
        this.gameBoard.deleteElement(projectile);
      } else if (this.state === 'SKILL00' && this.gameBoard.collision(projectile.hitBox, this.hitBox)) {
        this.gameBoard.explosions.push(new Explosion(this.gameBoard, projectile.explosion));
        this.gameBoard.deleteElement(projectile);
      } else if (
        (this.state === 'SKILL01' || this.state === 'SKILL02' || (this.state === 'SKILL03' && this.skill03State !== 's2')) &&
        this.dmgVulnerability &&
        this.gameBoard.collision(projectile.hitBox, this.dmgHitBox)
      ) {
        this.hp -= projectile.dmg;
        this.dmgVulnerability = false;
        this.gameBoard.explosions.push(new Explosion(this.gameBoard, projectile.explosion));
        this.gameBoard.deleteElement(projectile);
        if (this.hp <= 48 && this.hp > 24) this.setSrc('moon-boss-1.png');
        if (this.hp <= 24) this.setSrc('moon-boss-2.png');
        if (this.hp < 0) this.hp = 0;
        this.gameBoard.ui.updateBarrBoss();
        if (this.hp === 0) {
          this.gameBoard.explosions.push(new Explosion(this.gameBoard, this.explosion));
          this.el.remove();
          this.gameBoard.windForceX = 0;
          this.gameBoard.boss = null;
          this.gameBoard.bossDefeated = true;
          this.gameBoard.enemies.forEach((enemy, _, arrEnemies) => {
            this.gameBoard.explosions.push(new Explosion(this.gameBoard, enemy.explosion));
            this.gameBoard.deleteElement(enemy, arrEnemies);
          });
          return;
        }
      }
    });
  }

  dmgInvulnerabilityMode() {
    if (this.dmgVulnerabilityFrames > 0) {
      this.dmgVulnerabilityFrames--;
      this.el.style.filter = this.el.style.filter !== 'brightness(0) invert(1)' ? 'brightness(0) invert(1)' : 'none';
    } else {
      this.el.style.filter = 'none';
      this.dmgVulnerability = true;
      this.dmgVulnerabilityFrames = 70;
    }
  }

  stateHandler() {
    if (!this.dmgVulnerability) this.dmgInvulnerabilityMode();
    if (this.state === 'INVULNERABLE' || this.state === 'SKILL00') this.projectileSpawnInterval--;
    if (this.projectileSpawnInterval <= 0) this.throwRandomMeteor();
    if (this.state === 'INVULNERABLE') {
      this.skill00SpawnInterval--;
      if (this.skill00SpawnInterval <= 0) this.state = 'SKILL00';
      return;
    }
    this[`${this.state}`.toLowerCase()]();
  }

  addDmgHitBoxDebug = () => {
    this.dmgHitBoxEl = new HitBoxDebug(this.gameBoard, this.dmgHitBox);
    this.gameBoard.hitBoxElements.push(this.dmgHitBoxEl.el);
  };

  removeDmgBoxDebug = () => {
    if (this.dmgHitBoxEl) {
      this.gameBoard.hitBoxElements.forEach(el => el.remove());
      this.gameBoard.hitBoxElements.length = 0;
      this.dmgHitBoxEl = null;
    }
  };
}
