import { BOSS_LIST } from './BOSS_LIST';
import { Coin } from './Coin';
import { ENEMY_LIST } from './ENEMY_LIST';
import { Explosion } from './Explosion';
import { GameBoardUI } from './GameBoardUI';
import { HitBoxDebug } from './HitBoxDebug';
import { Player } from './Player';

export class GameBoard {
  constructor(game) {
    this.game = game;
    this.gameRunningArea = document.createElement('div');
    this.gameRunningArea.classList.add('game-running-area');
    this.gameRunningHeight = this.game.height / 1.2;
    this.gameRunningWidth = this.game.width;
    this.gameRunningArea.style.height = this.gameRunningHeight + 'px';
    this.gameRunningArea.style.width = this.gameRunningWidth + 'px';
    this.game.screen.appendChild(this.gameRunningArea);
    this.top = 0;
    this.left = 0;
    this.stage = { ...this.game.stages[this.game.stageId] };
    this.state = this.game.config.initStageState;
    this.gravity = this.game.config.gravity;
    this.windForceX = 0;
    this.pauseGameFrames = this.game.config.pauseGameFrames;
    this.pauseAllowed = true;
    this.debugMode = false;
    this.projectiles = [];
    this.enemies = [];
    this.explosions = [];
    this.coins = [];
    this.hitBoxElements = [];
    this.enemySpawnInterval = this.stage.enemyIntervalFrames;
    this.score = 0;
    this.boss = null;
    this.bossDefeated = false;
    this.gameRunningArea.style.backgroundImage = this.stage.backgroundImage;
    this.player = new Player(this);
    this.ui = new GameBoardUI(this);
    this.loop();
  }

  addEnemy() {
    const rng = Math.floor(Math.random() * this.stage.enemyGroup.length);
    return new ENEMY_LIST[this.stage.enemyGroup[rng]](this);
  }

  addBoss(id) {
    return new BOSS_LIST[id](this);
  }

  deleteElement(element) {
    element.markForDeletion = true;
    element.el.remove();

    if (this?.[element?.type]) {
      this[element.type] = this[element.type].filter(el => !el.markForDeletion);
    }
  }

  rectRectCollision(rectA, rectB) {
    return (
      rectA.left < rectB.left + rectB.width &&
      rectA.left + rectA.width > rectB.left &&
      rectA.top < rectB.top + rectB.height &&
      rectA.top + rectA.height > rectB.top
    );
  }

  circleCircleCollision(circA, circB) {
    const circ1X = circA.left + circA.radius;
    const circ1Y = circA.top + circA.radius;
    const circ2X = circB.left + circB.radius;
    const circ2Y = circB.top + circB.radius;
    const dx = circ1X - circ2X;
    const dy = circ1Y - circ2Y;
    const distance = Math.hypot(dx, dy);
    const sumOfRadii = circA.radius + circB.radius;
    return distance < sumOfRadii;
  }

  rectCircleCollision(rect, circ) {
    const circX = circ.left + circ.radius;
    const circY = circ.top + circ.radius;
    let offsetX = circX;
    let offsetY = circY;

    if (circX < rect.left) {
      offsetX = rect.left;
    } else if (circX > rect.left + rect.width) {
      offsetX = rect.left + rect.width;
    }
    if (circY < rect.top) {
      offsetY = rect.top;
    } else if (circY > rect.top + rect.height) {
      offsetY = rect.top + rect.height;
    }

    const dx = circX - offsetX;
    const dy = circY - offsetY;
    const distance = Math.hypot(dx, dy);

    return distance < circ.radius;
  }

  collision(hitBoxA, hitBoxB) {
    switch (`${hitBoxA.shape}_${hitBoxB.shape}`) {
      case 'RECT_RECT':
        return this.rectRectCollision(hitBoxA, hitBoxB);
      case 'CIRCLE_CIRCLE':
        return this.circleCircleCollision(hitBoxA, hitBoxB);
      case 'RECT_CIRCLE':
        return this.rectCircleCollision(hitBoxA, hitBoxB);
      case 'CIRCLE_RECT':
        return this.rectCircleCollision(hitBoxB, hitBoxA);
      default:
        return false;
    }
  }

  pauseGame() {
    this.state = this.state === 'PAUSED' ? 'GAME_RUNNING' : 'PAUSED';
    this.ui.overlayPauseGameHandler();
    this.pauseAllowed = false;
  }

  scoreUp(points) {
    if (this.stage.bossStage) return;
    this.score += points;
    this.ui.scorePoints.textContent = String(this.score).padStart(
      String(this.stage.scoreGoal).length,
      '0'
    );
    if (
      this.stage.breakPoint.score <= this.score &&
      !this.stage.breakPointActive
    ) {
      this.stage.breakPointActive = true;
      this.stage.enemyGroup = this.stage.breakPoint.enemyGroup;
      this.stage.enemyIntervalFrames =
        this.stage.breakPoint.enemyIntervalFrames;
    }
  }

  update() {
    if (this.state === 'OPENING_STAGE') this.ui.openingStage();

    if (this.state === 'PAUSED' || this.state === 'GAME_RUNNING') {
      if (this.pauseGameFrames <= 0) {
        this.pauseGameFrames = this.game.config.pauseGameFrames;
        this.pauseAllowed = true;
      } else if (!this.pauseAllowed) {
        this.pauseGameFrames--;
      }
    }

    if (
      this.state === 'GAME_RUNNING' &&
      !document.hasFocus() &&
      this.pauseAllowed
    )
      this.pauseGame();

    if (this.state === 'STAGE_CLEAR') this.ui.stageClear();

    if (this.state === 'WARNING') {
      if (!this.boss) this.ui.warning();
      if (!this.ui.warningMsg) {
        if (!this.boss) {
          this.boss = this.addBoss(this.stage.bossId);
          this.ui.initialBossHp = this.boss.hp;
        } else this.boss.entrance();
      }
    }

    if (this.state !== 'GAME_RUNNING' && this.state !== 'STAGE_CLEAR') return;

    this.projectiles.forEach(projectile => projectile.update());
    this.explosions.forEach(explosion => explosion.update());
    this.coins.forEach(coin => coin.update());
    this.player.update();

    this.enemies.forEach(enemy => {
      enemy.update();

      if (
        this.collision(this.player.hitBox, enemy.hitBox) &&
        this.player.state !== 'UNTARGETABLE'
      ) {
        if (this.state === 'GAME_RUNNING') {
          this.player.takeDamage(enemy);
          this.ui.updateHeart();
        }
      }

      this.projectiles.forEach(projectile => {
        if (this.collision(projectile.hitBox, enemy.hitBox)) {
          enemy.hp -= projectile.dmg;
          this.explosions.push(new Explosion(this, projectile.explosion));
          this.deleteElement(projectile);
          if (enemy.hp <= 0) {
            this.scoreUp(enemy.points);
            if (Math.random() < enemy.dropRate) {
              this.coins.push(new Coin(this, enemy));
            }
            this.explosions.push(new Explosion(this, enemy.explosion));
            this.deleteElement(enemy);
          }
        }
      });

      this.player.skills.forEach(skill => {
        if (skill.active && this.collision(skill.hitBox, enemy.hitBox)) {
          enemy.hp -= skill.dmg;
          if (enemy.hp <= 0) {
            this.scoreUp(enemy.points);
            if (Math.random() < enemy.dropRate) {
              this.coins.push(new Coin(this, enemy));
            }
            this.explosions.push(new Explosion(this, enemy.explosion));
            this.deleteElement(enemy);
          }
        }
      });
    });

    this.coins.forEach(coin => {
      if (this.collision(this.player.hitBox, coin.hitBox)) {
        this.scoreUp(coin.points);
        this.deleteElement(coin);
      }
    });

    if (this.boss && this.state === 'GAME_RUNNING') this.boss.collision();

    if (
      this.state === 'GAME_RUNNING' &&
      this.score < this.stage.scoreGoal &&
      !this.stage.bossStage
    ) {
      if (this.enemySpawnInterval <= 0) {
        this.enemies.push(this.addEnemy());
        this.enemySpawnInterval = this.stage.enemyIntervalFrames;
      } else {
        this.enemySpawnInterval--;
      }
    }
  }

  stateHandler() {
    switch (this.state) {
      case 'TRANSITION_IN':
        if (!this.game.transition.overlayTransition)
          this.state = 'OPENING_STAGE';
        break;
      case 'OPENING_STAGE':
        if (this.ui.openingStageMsg) return;
        if (this.stage.bossStage) this.state = 'WARNING';
        else this.state = 'GAME_RUNNING';
        break;
      case 'GAME_RUNNING':
        if (this.player.hp <= 0) {
          this.state = 'GAME_OVER';
          this.ui.createBoxMsg();
        } else if (this.stage.bossStage) {
          if (this.boss) this.boss.stateHandler();
          if (
            this.bossDefeated &&
            this.enemies.length === 0 &&
            this.explosions.length === 0
          )
            this.state = 'STAGE_CLEAR';
        } else {
          if (
            this.score >= this.stage.scoreGoal &&
            this.enemies.length === 0 &&
            this.explosions.length === 0
          )
            this.state = 'STAGE_CLEAR';
        }
        break;
      case 'STAGE_CLEAR':
        if (this.ui.stageClearMsg) return;
        this.game.stages[this.game.stageId].isClear = true;
        this.ui.createBoxMsg();
        this.state = 'GAME_OVER';
        break;
      case 'WARNING':
        if (this.ui.hpBossElValue === 100) this.state = 'GAME_RUNNING';
        break;
    }
  }

  createHitBoxEl = sprite => {
    if (sprite.hitBox && !sprite.hitBoxEl) {
      sprite.hitBoxEl = new HitBoxDebug(this, sprite);
      this.hitBoxElements.push(sprite.hitBoxEl);
    }
  };

  deleteHitBoxEl = sprite => {
    sprite.hitBoxEl.el.remove();
    sprite.hitBoxEl = null;
  };

  switchDebugMode() {
    this.debugMode = !this.debugMode;

    if (this.debugMode) {
      [
        this.player,
        ...this.projectiles,
        ...this.enemies,
        ...this.coins,
        this.boss,
        this.boss?.dmgSprite,
        ...this.player.skills
      ].forEach(sprite => {
        if (sprite) {
          this.createHitBoxEl(sprite);
        }
      });
    } else {
      this.hitBoxElements.forEach(hitBoxEl => {
        if (hitBoxEl.sprite) this.deleteHitBoxEl(hitBoxEl.sprite);
      });
      this.hitBoxElements.length = 0;
    }
  }

  loop = async time => {
    // if (time > 15027.4) {
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    // }
    // console.log(time);

    // if (this.debugMode) {
    //   return;
    // }

    // ##fix corrigir quando clico no botão retry, roda outro loop
    this.update();
    this.stateHandler();
    // console.log(this.state);
    if (this.state === 'GAME_OVER' || this.game.activeScreen !== 'GAME_BOARD')
      return;
    requestAnimationFrame(this.loop);
  };
}
