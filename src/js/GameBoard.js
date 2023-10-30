import { Coin } from './Coin';
import { Explosion } from './Explosion';
import { GameBoardUI } from './GameBoardUI';

export class GameBoard {
  constructor(game) {
    this.game = game;
    this.id = 'GAME_BOARD';
    this.screen = document.createElement('div');
    this.screen.classList.add('game-board');
    this.screen.style.display = 'none';
    this.game.gameContainer.appendChild(this.screen);
    this.gameRunningArea = document.createElement('div');
    this.gameRunningArea.classList.add('game-running-area');
    this.gameRunningHeight = this.game.height / 1.2;
    this.gameRunningWidth = this.game.width;
    this.gameRunningArea.style.height = this.gameRunningHeight + 'px';
    this.gameRunningArea.style.width = this.gameRunningWidth + 'px';
    this.screen.appendChild(this.gameRunningArea);
    this.top = 0;
    this.left = 0;
    this.stage = null;
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
    this.enemySpawnInterval = null;
    this.score = 0;
    this.boss = null;
    this.bossDefeated = false;
    this.player = null;
    this.ui = new GameBoardUI(this);
  }

  deletElement(element) {
    element.markForDeletion = true;
    element.el.remove();
    this[element.type] = this[element.type].filter(el => !el.markForDeletion);
  }

  collisionRectangleRectangle(rect1, rect2) {
    return rect1.left < rect2.left + rect2.width && rect1.left + rect1.width > rect2.left && rect1.top < rect2.top + rect2.height && rect1.top + rect1.height > rect2.top;
  }

  collisionCircleCircle(circ1, circ2) {
    const circ1X = circ1.left + circ1.radius;
    const circ1Y = circ1.top + circ1.radius;
    const circ2X = circ2.left + circ2.radius;
    const circ2Y = circ2.top + circ2.radius;
    const dx = circ1X - circ2X;
    const dy = circ1Y - circ2Y;
    const distance = Math.hypot(dx, dy);
    const sumOfRadii = circ1.radius + circ2.radius;
    return distance < sumOfRadii;
  }

  collisionRectangleCircle(rect, circ) {
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

  pauseGame() {
    this.state = this.state === 'PAUSED' ? 'GAME_RUNNING' : 'PAUSED';
    this.ui.overlayPauseGameHandler();
    this.pauseAllowed = false;
  }

  switchDebugMode() {
    this.debugMode = !this.debugMode;
    [this.player, ...this.projectiles, ...this.enemies, ...this.coins, this.boss, ...this.player.skills].forEach(sprite => {
      if (sprite) {
        if (this.debugMode) {
          sprite.addHitBoxDebug();
          if (sprite.dmgHitBox) sprite.addDmgHitBoxDebug();
        } else {
          sprite.removeHitBoxDebug();
          if (sprite.dmgHitBox) sprite.removeDmgBoxDebug();
        }
      }
    });
  }

  scoreUp(points) {
    if (this.stage.bossStage) return;
    this.score += points;
    this.ui.scorePoints.textContent = String(this.score).padStart(String(this.stage.scoreGoal).length, '0');
    if (this.stage.breakPoint.score <= this.score && !this.stage.breakPointActive) {
      this.stage.breakPointActive = true;
      this.stage.enemyGroup = this.stage.breakPoint.enemyGroup;
      this.stage.enemyIntervalFrames = this.stage.breakPoint.enemyIntervalFrames;
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

    if (this.state === 'GAME_RUNNING' && !document.hasFocus() && this.pauseAllowed) this.pauseGame();

    if (this.state === 'STAGE_CLEAR') this.ui.stageClear();

    if (this.state === 'WARNING') {
      if (!this.boss) this.ui.warning();
      if (!this.ui.warningMsg) {
        if (!this.boss) {
          this.boss = this.game.addBoss(this.stage.bossId);
          this.ui.initialBossHp = this.boss.hp;
        } else this.boss.entrance();
      }
    }

    if (this.state !== 'GAME_RUNNING' && this.state !== 'STAGE_CLEAR') return;

    if (!this.player.dboost.active) {
      this.player.moviment();
      this.player.beam();
    } else {
      this.player.dboostMove();
    }

    if (this.player.state === 'UNTARGETABLE') this.player.untargetableMode();

    this.player.skills.forEach((skill, i) => {
      if (!skill.avaliable) this.ui.skillCooldownHandler(i);
      if (skill.skillAnimation) skill.update();
      if (skill.active) skill.dmgAreaTimer();
    });

    this.projectiles.forEach(projectile => projectile.update());

    this.enemies.forEach(enemy => {
      enemy.update();
      if (this.collisionRectangleCircle(this.player.hitBox, enemy.hitBox) && this.player.state !== 'UNTARGETABLE') {
        if (this.state === 'GAME_RUNNING') {
          this.player.hp--;
          this.player.dboost.active = true;
          this.player.calcDboost(enemy);
          this.ui.updateHeart();
        }
      }
      this.projectiles.forEach(projectile => {
        if (this.collisionCircleCircle(projectile.hitBox, enemy.hitBox)) {
          enemy.hp -= projectile.dmg;
          this.explosions.push(new Explosion(this, projectile.explosion));
          this.deletElement(projectile);
          if (enemy.hp <= 0) {
            this.scoreUp(enemy.points);
            if (Math.random() < enemy.dropRate) this.coins.push(new Coin(this, enemy));
            this.explosions.push(new Explosion(this, enemy.explosion));
            this.deletElement(enemy);
          }
        }
      });
      this.player.skills.forEach(skill => {
        if (skill.active) skill.collision(enemy);
      });
    });

    this.explosions.forEach(explosion => explosion.update());

    this.coins.forEach(coin => {
      if (this.collisionRectangleRectangle(this.player.hitBox, coin.hitBox)) {
        this.scoreUp(coin.points);
        this.deletElement(coin);
      }
      if (!coin.markForDeletion) coin.timer();
    });

    if (this.boss && this.state === 'GAME_RUNNING') this.boss.collision();

    if (this.state === 'GAME_RUNNING' && this.score < this.stage.scoreGoal && !this.stage.bossStage) {
      if (this.enemySpawnInterval <= 0) {
        this.enemies.push(this.game.addEnemy());
        this.enemySpawnInterval = this.stage.enemyIntervalFrames;
      } else {
        this.enemySpawnInterval--;
      }
    }
  }

  stateHandler() {
    switch (this.state) {
      case 'TRANSITION_IN':
        if (!this.game.transition.overlayTransition) this.state = 'OPENING_STAGE';
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
          if (this.bossDefeated && this.enemies.length === 0 && this.explosions.length === 0) this.state = 'STAGE_CLEAR';
        } else {
          if (this.score >= this.stage.scoreGoal && this.enemies.length === 0 && this.explosions.length === 0) this.state = 'STAGE_CLEAR';
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

  loop = () => {
    this.update();
    this.stateHandler();
    // console.log(this.state);
    if (this.state === 'GAME_OVER' || this.game.activeScreen !== 'GAME_BOARD') return;
    requestAnimationFrame(this.loop);
  };
}
