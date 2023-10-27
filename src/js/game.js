'use strict';

window.addEventListener('contextmenu', e => e.preventDefault());

const STAGES_LIST = [
  {
    title: '0-0',
    enemyGroup: null,
    bossStage: false,
    bossId: null,
    enemyIntervalFrames: null,
    scoreGoal: 0,
    isClear: true,
    backgroundImage: 'linear-gradient(#7f55ff, #7f55ff)'
  },
  // {
  //   title: '1-2',
  //   enemyGroup: null,
  //   bossStage: true,
  //   bossId: 0,
  //   enemyIntervalFrames: null,
  //   scoreGoal: null,
  //   isClear: false,
  //   backgroundImage: 'linear-gradient(#25b3df, #5a23a1)'
  // },
  {
    title: '1-1',
    enemyGroup: [0],
    bossStage: false,
    bossId: null,
    enemyIntervalFrames: 120,
    scoreGoal: 50,
    breakPoint: {
      score: 25,
      enemyGroup: [0],
      enemyIntervalFrames: 60
    },
    breakPointActive: false,
    isClear: false,
    backgroundImage: 'linear-gradient(#5a23a1, #25b3df)'
  },
  {
    title: '1-2',
    enemyGroup: null,
    bossStage: true,
    bossId: 0,
    enemyIntervalFrames: null,
    scoreGoal: null,
    isClear: false,
    backgroundImage: 'linear-gradient(#25b3df, #5a23a1)'
  }
];

const INIT_CONFIG = {
  gameHeight: 720,
  gameWidth: 1280,
  keys: ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyJ', 'KeyL', 'KeyK', 'Enter', 'KeyP'], // up, down, left, right, shot, skill1, skill2, pause, debug
  // keys: ['Numpad8', 'Numpad5', 'Numpad4', 'Numpad6', 'KeyH', 'KeyJ', 'KeyM', 'NumpadDivide', 'Numpad0'],
  stageId: 0,
  pauseGameFrames: 90,
  gravity: 2,
  initStageState: 'TRANSITION_IN',
  openingStageMsgFrames: 132,
  // openingStageMsgFrames: 10,
  stageClearMsgFrames: 216,
  // stageClearMsgFrames: 10,
  warningMsgFrames: 294,
  // warningMsgFrames: 10,
  coinFramesInterval: 360,
  overlayTransitionFrames: 60
};

const INIT_PLAYER_STATE = {
  height: 70,
  hp: 3,
  skills: [0, 0],
  skin: 'original',
  speed: 9,
  chargeFramesInterval: 36,
  dboostDistance: 150,
  dboostFrames: 5,
  untargetableFrames: 80
};

class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown', e => {
      if (this.game.keys.slice(0, 5).includes(e.code) && !this.game.keysActive.includes(e.code)) {
        this.game.keysActive.push(e.code);
      } else if (this.game.keys.slice(5, 7).includes(e.code)) {
        if (!this.game.keysActive.includes(e.code)) {
          this.game.keysActive.push(e.code);
          if (this.game.gameBoard.state === 'GAME_RUNNING') this.game.gameBoard.player.useSkill(this.game.keys.slice(5, 7).indexOf(e.code));
        }
      } else if (e.code === this.game.keys[7] && !this.game.keysActive.includes(e.code)) {
        this.game.keysActive.push(e.code);
        if (this.game.gameBoard.pauseAllowed && (this.game.gameBoard.state === 'GAME_RUNNING' || this.game.gameBoard.state === 'PAUSED')) this.game.gameBoard.pauseGame();
      } else if (e.code === this.game.keys[8] && !this.game.keysActive.includes(e.code)) {
        this.game.keysActive.push(e.code);
        if (this.game.gameBoard.stage) this.game.gameBoard.switchDebugMode();
      }
      if (this.game.title.ui.overlaySetKeyIsOpen) this.game.setKey(e.code);
      if (e.code === 'Space') e.preventDefault();
    });
    window.addEventListener('keyup', ({ code }) => {
      const keyIndex = this.game.keysActive.indexOf(code);
      if (keyIndex > -1) this.game.keysActive.splice(keyIndex, 1);
    });
  }
}

class HitBoxDebug {
  constructor(gameBoard, data) {
    this.gameBoard = gameBoard;
    this.height = data.height;
    this.width = data.width;
    this.top = data.top;
    this.left = data.left;
    this.el = document.createElement('div');
    this.el.classList.add('game-img', `hitbox-${data.boxType}`);
    this.el.style.height = this.height + 'px';
    this.el.style.width = this.width + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.gameBoard.gameRunningArea.appendChild(this.el);
  }
}

class GameImg {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.el = document.createElement('img');
    this.el.classList.add('game-img');
    this.el.setAttribute('draggable', 'false');
  }
}

class Sprite extends GameImg {
  constructor(gameBoard) {
    super(gameBoard);
    this.hitBoxEl = null;
  }

  addHitBoxDebug = () => {
    this.hitBoxEl = new HitBoxDebug(this.gameBoard, this.hitBox);
    this.gameBoard.hitBoxElements.push(this.hitBoxEl.el);
  };

  removeHitBoxDebug = () => {
    if (this.hitBoxEl) {
      this.gameBoard.hitBoxElements.forEach(el => el.remove());
      this.gameBoard.hitBoxElements.length = 0;
      this.hitBoxEl = null;
    }
  };
}

class TitleUI {
  constructor(title) {
    this.title = title;
    this.boxOptions = null;
    this.overlaySetKey = null;
    this.overlaySetKeyIsOpen = false;
    this.id = null;
    this.labelKeyOverlayOptions = null;
    this.titleLabel = null;
    this.initTitleUI();
  }

  initTitleUI() {
    this.titleLabel = document.createElement('p');
    this.titleLabel.classList.add('score-label');
    this.title.screen.appendChild(this.titleLabel);
    this.titleLabel.innerHTML = 'TITLE LAYOUT';
    this.overlaySetKey = document.createElement('div');
    this.overlaySetKey.classList.add('overlay', 'overlay-set-key');
    this.overlaySetKey.innerHTML = `<p style="font-size: 20px">PRESS A KEY TO SET "<span class="label-key-overlay-options"></span>"</p>`;
    this.title.screen.appendChild(this.overlaySetKey);
    this.labelKeyOverlayOptions = document.querySelector('.label-key-overlay-options');
    this.overlaySetKey.style.display = 'none';
    this.boxOptions = document.createElement('div');
    this.boxOptions.classList.add('box-options');
    this.boxOptions.style.display = 'none';
    const optionsActions = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'SHOT', 'SKILL 1', 'SKILL 2', 'PAUSE', 'DEBUG']
      .map(
        (action, i) => `<div class="options-row"><h3>${action}</h3> <h3 class="label-key">${this.title.game.keys[i]}</h3> <div class="btn-set-key" data-id="${i}">SET</div></div>`
      )
      .join('');
    this.boxOptions.innerHTML = ` <h1>OPTIONS</h1>
                                  <div class="options-key-set">
                                    <div class="options-row">
                                      <h2>ACTION</h2> <h2>KEY</h2>
                                    </div>
                                    ${optionsActions}
                                  </div>
                                  <div class="btn-test btn-save">SAVE</div>`;
    this.title.screen.appendChild(this.boxOptions);
    document.querySelector('.btn-save').addEventListener('click', () => (this.boxOptions.style.display = 'none'));
    this.boxOptions.querySelector('.options-key-set').addEventListener('click', ({ target }) => {
      if (target.classList.contains('btn-set-key')) {
        this.labelKeyOverlayOptions.innerHTML = target.closest('.options-row').firstElementChild.innerHTML;
        this.overlaySetKey.style.display = 'flex';
        this.overlaySetKeyIsOpen = true;
        this.id = +target.dataset.id;
      }
    });
    this.btnOverworld = document.createElement('div');
    this.btnOverworld.classList.add('btn-test');
    this.btnOverworld.textContent = 'OVERWORLD';
    this.title.screen.appendChild(this.btnOverworld);
    this.btnOverworld.addEventListener('click', () => {
      if (this.title.game.activeScreen !== 'TITLE' || this.title.game.ui.overlayTransition) return;
      this.title.game.updateActiveScreen('OVERWORLD');
      this.title.game.transitionLoop();
    });
    this.btnOptions = document.createElement('div');
    this.btnOptions.classList.add('btn-test');
    this.btnOptions.textContent = 'OPTIONS';
    this.title.screen.appendChild(this.btnOptions);
    this.btnOptions.addEventListener('click', () => {
      if (this.title.game.activeScreen !== 'TITLE' || this.title.game.ui.overlayTransition) return;
      this.boxOptions.style.display = 'flex';
    });
  }
}

class BtnToBeContinued {
  constructor(overworld) {
    this.overworld = overworld;
    this.btn = document.createElement('div');
    this.btn.classList.add('btn-test');
    this.btn.textContent = `UNDER DEVELOPMENT`;
    this.overworld.screen.appendChild(this.btn);
  }
}

class BtnStage {
  constructor(overworld, id) {
    this.overworld = overworld;
    this.id = id;
    this.btn = document.createElement('div');
    this.btn.classList.add('btn-test');
    this.btn.textContent = `STAGE${this.id}`;
    this.overworld.screen.appendChild(this.btn);
    this.btn.addEventListener('click', () => {
      if (this.overworld.game.activeScreen !== 'OVERWORLD' || this.overworld.game.ui.overlayTransition || !this.overworld.game.stages[this.id - 1].isClear) return;
      this.overworld.game.stageId = this.id;
      this.overworld.game.updateActiveScreen('GAME_BOARD');
      this.overworld.game.transitionLoop();
    });
  }
}

class OverworldUI {
  constructor(overworld) {
    this.overworld = overworld;
    this.btnStages = [];
    this.btnToBeContinued = null;
    this.initOverworldUI();
    this.overworldLabel = null;
  }

  initOverworldUI() {
    this.overworldLabel = document.createElement('p');
    this.overworldLabel.classList.add('score-label');
    this.overworld.screen.appendChild(this.overworldLabel);
    this.overworldLabel.innerHTML = 'OVERWORLD LAYOUT';
    this.btnTitle = document.createElement('div');
    this.btnTitle.classList.add('btn-test');
    this.btnTitle.textContent = 'TITLE';
    this.overworld.screen.appendChild(this.btnTitle);
    this.btnTitle.addEventListener('click', () => {
      if (this.overworld.game.activeScreen !== 'OVERWORLD' || this.overworld.game.ui.overlayTransition) return;
      this.overworld.game.updateActiveScreen('TITLE');
      this.overworld.game.transitionLoop();
    });
    this.btnStages.push(new BtnStage(this.overworld, this.overworld.game.stageId + 1));
  }
}

class GameBoardUI {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.openingStageMsg = null;
    this.openingStageMsgFrames = this.gameBoard.game.config.openingStageMsgFrames;
    this.stageClearMsg = null;
    this.stageClearMsgFrames = this.gameBoard.game.config.stageClearMsgFrames;
    this.warningMsg = null;
    this.warningMsgFrames = this.gameBoard.game.config.warningMsgFrames;
    this.statusBarr = null;
    this.statusBarrHeight = this.gameBoard.game.height / 6;
    this.statusBarrWidth = this.gameBoard.game.width;
    this.heartsBox = null;
    this.heartsImg = [];
    this.skillBoxes = [];
    this.skillBoxesCooldown = [];
    this.skillBoxesNotAllowed = [];
    this.skillCooldownFrames = [];
    this.boxMsg = null;
    this.catThumbs = null;
    this.btnRetry = null;
    this.btnOverworld = null;
    this.initialBossHp = 0;
    this.hpBossBarr = null;
    this.hpBossEl = null;
    this.hpBossElValue = 0;
    this.scoreLabel = null;
    this.scorePoints = null;
    this.overlayPaused = null;
    this.initGameBoardUI();
  }

  initGameBoardUI() {
    this.statusBarr = document.createElement('div');
    this.statusBarr.classList.add('game-status-barr');
    this.statusBarr.style.height = this.statusBarrHeight + 'px';
    this.statusBarr.style.width = this.statusBarrWidth + 'px';
    this.gameBoard.screen.appendChild(this.statusBarr);
    this.overlayPaused = document.createElement('div');
    this.overlayPaused.classList.add('overlay', 'overlay-paused');
    this.overlayPaused.style.display = 'none';
    this.gameBoard.screen.appendChild(this.overlayPaused);
  }

  clearGameBoardUI() {
    this.statusBarr.innerHTML = '';
    this.overlayPaused.innerHTML = '';
    this.openingStageMsgFrames = this.gameBoard.game.config.openingStageMsgFrames;
    this.stageClearMsgFrames = this.gameBoard.game.config.stageClearMsgFrames;
    this.warningMsgFrames = this.gameBoard.game.config.warningMsgFrames;
    this.hpBossElValue = 0;
    this.initialBossHp = 0;
    this.overlayPaused.style.display = 'none';
  }

  updateGameBoardUI() {
    this.clearGameBoardUI();
    if (!this.gameBoard.stage.bossStage) {
      this.scoreLabel = document.createElement('p');
      this.scoreLabel.classList.add('score-label');
      this.gameBoard.gameRunningArea.appendChild(this.scoreLabel);
      this.scoreLabel.innerHTML = `SCORE: <span class="score-points"></span>/${this.gameBoard.stage.scoreGoal}`;
      this.scorePoints = document.querySelector('.score-points');
      this.scorePoints.textContent = String(this.gameBoard.score).padStart(String(this.gameBoard.stage.scoreGoal).length, '0');
    }
    this.overlayPaused.innerHTML = `<p style="font-size: 20px">PAUSED</p>
                                    <div class="btn-test btn-retry">RETRY</div>
                                    <div class="btn-test btn-overworld">RETURN OVERWORLD</div>`;
    this.btnRetry = document.querySelector('.btn-retry');
    this.btnRetry.addEventListener('click', () => {
      if (this.gameBoard.game.activeScreen !== 'GAME_BOARD' || this.gameBoard.game.ui.overlayTransition) return;
      this.gameBoard.game.transitionLoop();
    });
    this.btnOverworld = document.querySelector('.btn-overworld');
    this.btnOverworld.addEventListener('click', () => {
      if (this.gameBoard.game.activeScreen !== 'GAME_BOARD' || this.gameBoard.game.ui.overlayTransition) return;
      this.gameBoard.game.stageId = 0;
      this.gameBoard.game.updateActiveScreen('OVERWORLD');
      this.gameBoard.game.transitionLoop();
    });
    this.heartsBox = document.createElement('div');
    this.heartsBox.classList.add('box-hearts');
    this.statusBarr.appendChild(this.heartsBox);
    this.renderHeartsBox();
    this.renderSkillBoxes();
  }

  updateHeart() {
    this.heartsBox.innerHTML = '';
    this.renderHeartsBox();
  }

  renderHeartsBox() {
    for (let i = 0; i < this.gameBoard.player.hp; i++) {
      this.heartsImg[i] = document.createElement('img');
      this.heartsImg[i].classList.add('heart-icon');
      this.heartsImg[i].src = 'heart-icon.png';
      this.heartsImg[i].setAttribute('draggable', 'false');
      this.heartsBox.appendChild(this.heartsImg[i]);
    }
  }

  renderSkillBoxes() {
    for (let i = 0; i < this.gameBoard.player.skills.length; i++) {
      this.skillBoxes[i] = document.createElement('div');
      this.skillBoxes[i].classList.add('box-skill');
      this.statusBarr.appendChild(this.skillBoxes[i]);
      if (this.gameBoard.player.skills[i]) {
        const skillEl = new GameImg(this.gameBoard);
        skillEl.el.style.height = this.gameBoard.player.skills[i].icon.height + 'px';
        skillEl.el.src = `${this.gameBoard.player.skills[i].icon.src}`;
        skillEl.el.style.filter = 'drop-shadow(4px 4px 4px black)';
        this.skillBoxes[i].appendChild(skillEl.el);
      }
      this.skillBoxesCooldown[i] = document.createElement('div');
      this.skillBoxesCooldown[i].classList.add('cooldown-box-skill');
      this.skillBoxesCooldown[i].style.display = 'none';
      this.skillBoxes[i].appendChild(this.skillBoxesCooldown[i]);
      this.skillBoxesNotAllowed[i] = new GameImg(this.gameBoard);
      this.skillBoxesNotAllowed[i].el.style.height = 25 + 'px';
      this.skillBoxesNotAllowed[i].el.src = 'not-allowed.png';
      this.skillBoxesNotAllowed[i].el.classList.add('not-allowed');
      this.skillBoxesNotAllowed[i].el.style.display = 'none';
      this.skillBoxes[i].appendChild(this.skillBoxesNotAllowed[i].el);
      this.skillCooldownFrames[i] = this.gameBoard.player.skills[i].cooldown;
    }
  }

  skillCooldownHandler(i) {
    if (this.skillCooldownFrames[i] <= 0) {
      this.skillCooldownFrames[i] = this.gameBoard.player.skills[i].cooldown;
      this.skillBoxesCooldown[i].style.display = 'none';
      this.skillBoxesNotAllowed[i].el.style.display = 'none';
      this.skillBoxesCooldown[i].style.height = '100%';
      this.gameBoard.player.skills[i].avaliable = true;
    } else {
      this.skillCooldownFrames[i]--;
      const heightPercent = this.skillCooldownFrames[i] / this.gameBoard.player.skills[i].cooldown;
      this.skillBoxesCooldown[i].style.height = heightPercent * 100 + '%';
    }
  }

  overlayPauseGameHandler() {
    if (this.gameBoard.state === 'GAME_RUNNING') this.overlayPaused.style.display = 'none';
    else if (this.gameBoard.state === 'PAUSED') this.overlayPaused.style.display = 'flex';
  }

  addHpBossBarr() {
    this.hpBossBarr = document.createElement('div');
    this.hpBossBarr.classList.add('hp-boss-barr');
    this.statusBarr.appendChild(this.hpBossBarr);
    this.hpBossEl = document.createElement('div');
    this.hpBossEl.classList.add('hp-boss-el');
    this.hpBossBarr.appendChild(this.hpBossEl);
  }

  fillHpBossEl() {
    if (this.hpBossElValue < 100) {
      this.hpBossElValue += 1;
      // this.hpBossElValue += 50;
      this.hpBossEl.style.width = this.hpBossElValue + '%';
    }
  }

  updateBarrBoss() {
    this.hpBossEl.style.width = (this.hpBossElValue * this.gameBoard.boss.hp) / this.initialBossHp + '%';
  }

  openingStage() {
    if (!this.openingStageMsg) {
      this.openingStageMsg = document.createElement('div');
      this.openingStageMsg.classList.add('opening-stage-msg');
      this.openingStageMsg.innerHTML = `<span class="game-text opening-stage-msg-number">${this.gameBoard.stage.title}</span>
                                        <span class="game-text opening-stage-msg-text">start!</span>`;
      this.gameBoard.gameRunningArea.appendChild(this.openingStageMsg);
    } else if (this.openingStageMsgFrames <= 0) {
      this.openingStageMsg.remove();
      this.openingStageMsg = null;
    } else {
      this.openingStageMsgFrames--;
    }
  }

  stageClear() {
    if (!this.stageClearMsg) {
      this.stageClearMsg = document.createElement('div');
      this.stageClearMsg.classList.add('stage-clear-msg');
      this.stageClearMsg.innerHTML = 'stageclear!'
        .split('')
        .map(c => `<span class="game-text stage-clear-msg-text">${c}</span>`)
        .join('');
      this.gameBoard.gameRunningArea.appendChild(this.stageClearMsg);
    } else if (this.stageClearMsgFrames <= 0) {
      this.stageClearMsg.remove();
      this.stageClearMsg = null;
    } else {
      this.stageClearMsgFrames--;
    }
  }

  warning() {
    if (!this.warningMsg) {
      this.warningMsg = document.createElement('div');
      this.warningMsg.classList.add('warning-msg');
      this.warningMsg.innerHTML = 'warning'
        .split('')
        .map(c => `<span class="game-text warning-msg-text">${c}</span>`)
        .join('');
      this.gameBoard.gameRunningArea.appendChild(this.warningMsg);
      this.addHpBossBarr();
    } else if (this.warningMsgFrames <= 0) {
      this.warningMsg.remove();
      this.warningMsg = null;
    } else {
      this.warningMsgFrames--;
    }
  }

  createBoxMsg() {
    this.boxMsg = document.createElement('div');
    this.boxMsg.classList.add('box-msg');

    if (this.gameBoard.state === 'GAME_OVER') {
      this.boxMsg.innerHTML = ` <div class="box-msg-content">
                                  <h1 style="color: #ff3200">GAME OVER</h1>
                                  <div class="box-img-game-over">
                                    <img draggable="false" src="cat-game-over.png" class="cat-game-over-img" />
                                    <img draggable="false" src="cat-game-over-thumbs.png" class="cat-game-over-img thumbs-down" id="thumbs" />
                                  </div>
                                  <div class="btn-test btn-retry">TRY AGAIN!!</div>
                                  <div class="btn-test btn-overworld">RETURN OVERWORLD</div>
                                </div>`;
      this.gameBoard.gameRunningArea.appendChild(this.boxMsg);
      this.catThumbs = document.querySelector('#thumbs');
      this.btnRetry = document.querySelector('.btn-retry');
      this.btnRetry.addEventListener('mouseover', this.catThumbsUp);
      this.btnRetry.addEventListener('mouseout', this.catThumbsDown);
    } else if (this.gameBoard.state === 'STAGE_CLEAR') {
      if (
        this.gameBoard.game.stages.length > this.gameBoard.game.stageId + 1 &&
        this.gameBoard.game.stages[this.gameBoard.game.stageId].isClear &&
        !this.gameBoard.game.overworld.ui.btnStages[this.gameBoard.game.stageId]
      ) {
        this.gameBoard.game.overworld.ui.btnStages.push(new BtnStage(this.gameBoard.game.overworld, this.gameBoard.game.stageId + 1));
      } else if (
        this.gameBoard.game.stages.length === this.gameBoard.game.stageId + 1 &&
        this.gameBoard.game.stages[this.gameBoard.game.stageId].isClear &&
        !this.gameBoard.game.overworld.ui.btnToBeContinued
      ) {
        this.gameBoard.game.overworld.ui.btnToBeContinued = new BtnToBeContinued(this.gameBoard.game.overworld);
      }
      this.boxMsg.innerHTML = ` <div class="box-msg-content">
                                  <h1>STAGE CLEAR</h1>
                                  <h3>HP:.......??</h3>
                                  <h3>BOMB:.....??</h3>
                                  <h3>SHOOTS:...??</h3>
                                  <h2>TOTAL:..??</h2>
                                  <div class="btn-test btn-retry">RETRY</div>
                                  <div class="btn-test btn-overworld">NEXT STAGE</div>
                                </div>`;
      this.gameBoard.gameRunningArea.appendChild(this.boxMsg);
      this.btnRetry = document.querySelector('.btn-retry');
    }
    this.btnOverworld = document.querySelector('.btn-overworld');
    this.btnOverworld.addEventListener('click', () => {
      if (this.gameBoard.game.activeScreen !== 'GAME_BOARD' || this.gameBoard.game.ui.overlayTransition) return;
      this.gameBoard.game.stageId = 0;
      this.gameBoard.game.updateActiveScreen('OVERWORLD');
      this.gameBoard.game.transitionLoop();
    });
    this.btnRetry.addEventListener('click', () => {
      if (this.gameBoard.game.activeScreen !== 'GAME_BOARD' || this.gameBoard.game.ui.overlayTransition) return;
      this.gameBoard.game.transitionLoop();
    });
  }

  catThumbsUp = () => {
    this.catThumbs.classList.remove('thumbs-down');
  };

  catThumbsDown = () => {
    this.catThumbs.classList.add('thumbs-down');
  };
}

class Explosion {
  constructor(gameBoard, data) {
    this.type = 'explosions';
    this.gameBoard = gameBoard;
    this.frameY = 0;
    this.maxFramesY = data.maxFramesY;
    this.frameX = 0;
    this.maxFramesX = data.maxFramesX;
    this.markForDeletion = false;

    this.height = data.height;
    this.top = data.position.top + data.position.height / 2 - this.height / 2;
    this.src = data.src;

    this.el = document.createElement('div');
    this.el.classList.add('explosion');
    this.spriteSheet = new GameImg(this.gameBoard);
    this.spriteSheet.el.style.height = this.height;
    this.spriteSheet.el.src = `${this.src}`;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.el.appendChild(this.spriteSheet.el);

    this.spriteSheet.top = -this.frameY * this.height;
    this.spriteSheet.el.style.height = this.height + 'px';
    this.spriteSheet.el.style.top = this.spriteSheet.top + 'px';
    this.spriteSheet.width = Math.round(this.spriteSheet.el.getBoundingClientRect().width);
    this.spriteSheet.el.style.width = this.spriteSheet.width + 'px';

    this.width = this.spriteSheet.width / this.maxFramesX;
    this.left = data.position.left + data.position.width / 2 - this.width / 2;

    this.el.style.height = this.height + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.width = this.width + 'px';
    this.el.style.left = this.left + 'px';

    this.spriteSheet.left = -this.frameX * this.width;
    this.spriteSheet.el.style.left = this.spriteSheet.left + 'px';
  }

  update() {
    if (this.frameX <= this.maxFramesX) {
      this.spriteSheet.left = -this.frameX * this.width;
      this.spriteSheet.el.style.left = this.spriteSheet.left + 'px';
      this.frameX++;
    } else {
      this.gameBoard.deletElement(this);
    }
  }
}

class EnemyPlanet extends Sprite {
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
    this.left += this.speedX;
    this.hitBox.left = this.left;
    this.explosion.position.left = this.hitBox.left;
    this.el.style.left = this.left + 'px';
    if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
    if (this.left + this.width * 1.1 < 0) {
      this.gameBoard.deletElement(this);
    }
  }
}

const ENEMY_LIST = [EnemyPlanet];

class Projectile extends Sprite {
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

class SkillBomb extends Sprite {
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
        this.gameBoard.deletElement(enemy);
      }
    }
  }
}

const SKILL_LIST = [SkillBomb];

class ChargeAnimation extends Sprite {
  constructor(gameBoard, player) {
    super(gameBoard);
    this.player = player;
    this.height = this.player.height + this.player.height / 3;
    this.sources = ['__blank.png', 'charge-1.gif', 'charge-2.gif'];
    this.el.style.height = this.height + 'px';
    this.el.src = `${this.sources[this.player.chargeValue]}`;
    this.el.style.display = 'none';
    this.el.style.top = this.top - this.height * 0.125 + 'px';
    this.el.style.left = this.left + this.width * 0.31 + 'px';
    this.el.style.zIndex = '3';
    this.gameBoard.gameRunningArea.appendChild(this.el);
  }
}

class Player extends Sprite {
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

class Coin extends Sprite {
  constructor(gameBoard, enemy) {
    super(gameBoard);
    this.type = 'coins';
    this.gameBoard = gameBoard;
    this.height = 50;
    this.src = 'coin.gif';
    this.el.style.height = this.height + 'px';
    this.el.src = `${this.src}`;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.width = this.el.getBoundingClientRect().width;
    this.top = enemy.top + enemy.height / 2 - this.height / 2;
    this.left = enemy.left + enemy.width / 2 - this.width / 2;
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.el.style.zIndex = '2';
    this.points = 2;
    this.frames = this.gameBoard.game.config.coinFramesInterval;
    this.markForDeletion = false;

    this.hitBox = {
      height: this.height,
      width: this.width,
      top: this.top,
      left: this.left,
      boxType: 'rectangle-yellow'
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug();
  }

  timer() {
    this.frames--;
    if (this.frames <= this.gameBoard.game.config.coinFramesInterval / 3 && this.frames > 0) {
      this.el.style.visibility = this.el.style.visibility !== 'hidden' ? 'hidden' : 'visible';
    } else if (this.frames <= 0) {
      this.gameBoard.deletElement(this);
    }
  }
}

class MoonBossProjectile extends Sprite {
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

class MoonBoss extends Sprite {
  constructor(gameBoard) {
    super(gameBoard);
    this.height = this.gameBoard.gameRunningHeight;
    this.top = this.gameBoard.top;
    this.left = this.gameBoard.gameRunningWidth;
    this.src = 'moon-boss.png';
    this.el.style.height = this.height + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.el.src = `${this.src}`;
    this.hp = 80;
    this.balanceTop = 7;
    this.balanceBottom = 7;
    this.speedX = -8;
    this.speedXVariant = 12;
    this.rotate = 0;
    this.rotateSpeed = 5;
    this.rotateDirection = -1;
    this.gameBoard.gameRunningArea.appendChild(this.el);
    this.width = this.el.getBoundingClientRect().width;
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

    this.radius = 0.5 * this.height;
    this.hitBox = {
      radius: this.radius,
      height: 2 * this.radius,
      width: 2 * this.radius,
      top: this.top,
      left: this.left,
      boxType: 'circle-red'
    };

    this.dmgRadius = 0.073 * this.height;
    this.dmgHitBox = {
      radius: this.dmgRadius,
      height: 2 * this.dmgRadius,
      width: 2 * this.dmgRadius,
      top: this.top + this.height / 2 - this.dmgRadius,
      left: this.left + this.width / 2 - this.dmgRadius,
      boxType: 'circle-red'
    };

    this.explosion = {
      height: this.height,
      src: 'boss-explosion-spritesheet.png',
      maxFramesY: 1,
      maxFramesX: 90,
      position: {
        height: this.hitBox.height,
        width: this.hitBox.width,
        top: this.hitBox.top,
        left: this.hitBox.left
      }
    };

    if (this.gameBoard.debugMode) this.addHitBoxDebug();
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
    if (this.gameBoard.collisionRectangleCircle(this.gameBoard.player.hitBox, this.hitBox) && this.gameBoard.player.state !== 'UNTARGETABLE' && this.skill03State !== 's2') {
      this.gameBoard.player.hp--;
      this.gameBoard.player.dboost.active = true;
      this.gameBoard.player.calcDboost(this);
      this.gameBoard.ui.updateHeart();
    }
    this.gameBoard.projectiles.forEach(projectile => {
      if (this.state === 'INVULNERABLE' && this.gameBoard.collisionCircleCircle(projectile.hitBox, this.hitBox)) {
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
        this.gameBoard.deletElement(projectile);
      } else if (this.state === 'SKILL00' && this.gameBoard.collisionCircleCircle(projectile.hitBox, this.hitBox)) {
        this.gameBoard.explosions.push(new Explosion(this.gameBoard, projectile.explosion));
        this.gameBoard.deletElement(projectile);
      } else if (
        (this.state === 'SKILL01' || this.state === 'SKILL02' || (this.state === 'SKILL03' && this.skill03State !== 's2')) &&
        this.dmgVulnerability &&
        this.gameBoard.collisionCircleCircle(projectile.hitBox, this.dmgHitBox)
      ) {
        this.hp -= projectile.dmg;
        this.dmgVulnerability = false;
        this.gameBoard.explosions.push(new Explosion(this.gameBoard, projectile.explosion));
        this.gameBoard.deletElement(projectile);
        if (this.hp <= 48 && this.hp > 24) this.el.src = 'moon-boss-1.png';
        if (this.hp <= 24) this.el.src = 'moon-boss-2.png';
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
            this.gameBoard.deletElement(enemy, arrEnemies);
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

const BOSS_LIST = [MoonBoss];

class Title {
  constructor(game) {
    this.game = game;
    this.id = 'TITLE';
    this.screen = document.createElement('div');
    this.screen.classList.add('game-title');
    this.game.gameContainer.appendChild(this.screen);
    this.ui = new TitleUI(this);
  }
}

class Overworld {
  constructor(game) {
    this.game = game;
    this.id = 'OVERWORLD';
    this.screen = document.createElement('div');
    this.screen.classList.add('game-overworld');
    this.screen.style.display = 'none';
    this.game.gameContainer.appendChild(this.screen);
    this.ui = new OverworldUI(this);
  }
}

class GameBoard {
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
        if (!this.game.ui.overlayTransition) this.state = 'OPENING_STAGE';
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

class GameUI {
  constructor(game) {
    this.game = game;
    this.overlayTransition = null;
    this.overlayTransitionOpacity = 0;
    this.overlayTransitionFrames = this.game.config.overlayTransitionFrames;
  }

  switchScreens() {
    [this.game.title, this.game.overworld, this.game.gameBoard].forEach(view => {
      if (this.game.activeScreen === view.id) {
        view.screen.style.display = 'flex';
        view.screen.style.outline = '5px solid white';
        view.screen.style.zIndex = '0';
        switch (view.id) {
          case 'OVERWORLD':
            this.game.resetStateGameRunningArea();
            this.game.gameBoard.ui.clearGameBoardUI();
            break;
          case 'GAME_BOARD':
            this.game.updateGameBoard();
            this.game.gameBoard.loop();
            break;
        }
      } else {
        view.screen.style.display = 'none';
        view.screen.style.outline = 'none';
        view.screen.style.zIndex = '-1';
      }
    });
  }

  update() {
    if (!this.overlayTransition) {
      this.overlayTransition = document.createElement('div');
      this.overlayTransition.classList.add('overlay', 'overlay-transition');
      this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(3)}`;
      this.game.gameContainer.appendChild(this.overlayTransition);
      this.game.gameBoard.state = 'GAME_OVER';
    } else if (this.overlayTransitionFrames <= 0) {
      this.overlayTransition.remove();
      this.overlayTransition = null;
      this.overlayTransitionOpacity = 0;
      this.overlayTransitionFrames = this.game.config.overlayTransitionFrames;
    } else {
      this.overlayTransitionFrames--;
      if (this.overlayTransitionFrames > this.game.config.overlayTransitionFrames / 2) {
        this.overlayTransitionOpacity = this.overlayTransitionOpacity + 1 / (this.game.config.overlayTransitionFrames / 2);
      } else if (this.overlayTransitionFrames === this.game.config.overlayTransitionFrames / 2) {
        this.overlayTransitionOpacity = 1;
        this.switchScreens();
      } else if (this.overlayTransitionFrames < this.game.config.overlayTransitionFrames / 2) {
        this.overlayTransitionOpacity = this.overlayTransitionOpacity - 1 / (this.game.config.overlayTransitionFrames / 2);
      }
      this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(3)}`;
    }
  }
}

class Game {
  constructor(config) {
    this.config = config;
    this.height = this.config.gameHeight;
    this.width = this.config.gameWidth;
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container');
    this.gameContainer.style.height = this.height + 'px';
    this.gameContainer.style.width = this.width + 'px';
    document.body.appendChild(this.gameContainer);
    this.activeScreen = 'TITLE';
    this.stages = [...STAGES_LIST];
    this.stageId = this.config.stageId;
    this.playerState = INIT_PLAYER_STATE;
    this.keys = [...this.config.keys];
    this.keysActive = [];
    this.title = new Title(this);
    this.overworld = new Overworld(this);
    this.gameBoard = new GameBoard(this);
    this.ui = new GameUI(this);
    this.input = new InputHandler(this);
    document.querySelector('.game-loading').remove();
  }

  updateActiveScreen = screen => (this.activeScreen = screen);

  setKey(key) {
    const keyIndex = this.keys.indexOf(key);
    if (keyIndex > -1) {
      this.keys[keyIndex] = this.keys[this.title.ui.id];
      this.title.ui.boxOptions.querySelector(`div[data-id="${keyIndex}"]`).previousElementSibling.innerHTML = this.keys[keyIndex];
    }
    this.keys[this.title.ui.id] = key;
    this.title.ui.boxOptions.querySelector(`div[data-id="${this.title.ui.id}"]`).previousElementSibling.innerHTML = key;
    this.title.ui.labelKeyOverlayOptions.innerHTML = '';
    this.title.ui.overlaySetKey.style.display = 'none';
    this.title.ui.overlaySetKeyIsOpen = false;
  }

  addPlayerSkills(id) {
    return new SKILL_LIST[id](this.gameBoard, this.gameBoard.player);
  }

  addEnemy() {
    const rng = Math.floor(Math.random() * this.gameBoard.stage.enemyGroup.length);
    return new ENEMY_LIST[this.gameBoard.stage.enemyGroup[rng]](this.gameBoard);
  }

  addBoss(id) {
    return new BOSS_LIST[id](this.gameBoard);
  }

  resetStateGameRunningArea() {
    this.gameBoard.gameRunningArea.innerHTML = '';
    this.gameBoard.stage = null;
    this.gameBoard.state = this.config.initStageState;
    this.gameBoard.windForceX = 0;
    this.gameBoard.pauseGameFrames = this.config.pauseGameFrames;
    this.gameBoard.pauseAllowed = true;
    this.gameBoard.projectiles.length = 0;
    this.gameBoard.enemies.length = 0;
    this.gameBoard.explosions.length = 0;
    this.gameBoard.coins.length = 0;
    this.gameBoard.hitBoxElements.length = 0;
    this.gameBoard.score = 0;
    this.gameBoard.boss = null;
    this.gameBoard.bossDefeated = false;
    this.gameBoard.gameRunningArea.style.backgroundImage = '';
  }

  updateGameBoardContext() {
    this.gameBoard.stage = { ...this.stages[this.stageId] };
    this.gameBoard.enemySpawnInterval = this.gameBoard.stage.enemyIntervalFrames;
    this.gameBoard.gameRunningArea.style.backgroundImage = this.gameBoard.stage.backgroundImage;
  }

  updateGameBoardPlayer() {
    this.gameBoard.player = new Player(this.gameBoard);
    this.gameBoard.player.top = (this.gameBoard.gameRunningHeight - this.gameBoard.player.height) / 2;
    this.gameBoard.player.left = this.gameBoard.left;
    this.gameBoard.player.hp = this.playerState.hp;
    this.gameBoard.player.skills.length = 0;
    this.gameBoard.player.skills = [this.addPlayerSkills(this.playerState.skills[0]), this.addPlayerSkills(this.playerState.skills[1])];
    this.gameBoard.player.update();
  }

  updateGameBoard() {
    this.resetStateGameRunningArea();
    this.updateGameBoardContext();
    this.updateGameBoardPlayer();
    this.gameBoard.ui.updateGameBoardUI();
  }

  transitionLoop = () => {
    this.ui.update();
    // console.log(this.ui.overlayTransitionFrames);
    if (!this.ui.overlayTransition) return;
    requestAnimationFrame(this.transitionLoop);
  };
}

if ('ontouchstart' in document.documentElement)
  document.querySelector('.game-loading').innerHTML = `<p style="font-size: 20px">THIS GAME DOESN'T WORK ON TOUCH SCREEN DEVICES =/</p>`;
else window.addEventListener('load', () => new Game(INIT_CONFIG));
