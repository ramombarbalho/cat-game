'use strict';

window.addEventListener('contextmenu', e => e.preventDefault());

window.addEventListener('load', () => {
    const STAGES_LIST = [
        {
            title: '0-0',
            enemyGroup: null,
            bossStage: false,
            bossId: null,
            enemyIntervalFrames: null,
            scoreGoal: 0,
            isClear: true,
            backgroundImage: 'linear-gradient(#7f55ff, #7f55ff)',
        },
        {
            title: '1-1',
            enemyGroup: [0],
            bossStage: false,
            bossId: null,
            enemyIntervalFrames: 120,
            scoreGoal: 5,
            isClear: false,
            backgroundImage: 'linear-gradient(#5a23a1, #25b3df)',
        },
        {
            title: '1-2',
            enemyGroup: null,
            bossStage: true,
            bossId: 0,
            enemyIntervalFrames: null,
            scoreGoal: null,
            isClear: false,
            backgroundImage: 'linear-gradient(#25b3df, #5a23a1)',
        },
    ];

    const INIT_CONFIG = {
        gameHeight: 720,
        gameWidth: 1200,
        keysMain: ['Numpad8', 'Numpad5', 'Numpad4', 'Numpad6', 'KeyH'], // up, down, left, right, shot
        keysSkill: ['KeyJ', 'KeyM'], // skill1, skill2
        keyPause: 'NumpadDivide', // pause/unpause
        keyDebug: 'Numpad0', // debug
        stageId: 0,
        pauseGameFrames: 90,
        gravity: 2,
        initStageState: 'TRANSITION_IN',
        openingStageMsgFrames: 132,
        stageClearMsgFrames: 216,
        warningMsgFrames: 294,
        coinFramesInterval: 360,
        overlayTransitionFrames: 60,
    };

    const INIT_PLAYER_STATE = {
        height: 120,
        hp: 3,
        skills: [0, 0],
        skin: 'pumpkin',
        speed: 11,
        chargeFramesInterval: 36,
        dboostDistance: 150,
        dboostFrames: 5,
        untargetableFrames: 120,
    };

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if (this.game.keysMain.includes(e.code) && !this.game.keysActive.includes(e.code)) {
                    this.game.keysActive.push(e.code);
                } else if (this.game.keysSkill.includes(e.code)) {
                    if (!this.game.keysActive.includes(e.code)) {
                        this.game.keysActive.push(e.code);
                        if (this.game.state === 'GAME_RUNNING') this.game.player.useSkill(this.game.keysSkill.indexOf(e.code));
                    }
                } else if (e.code === this.game.keyPause && !this.game.keysActive.includes(e.code)) {
                    this.game.keysActive.push(e.code);
                    if (this.game.pauseAllowed) {
                        if (this.game.state === 'GAME_RUNNING') this.game.pauseGame();
                        else if (this.game.state === 'PAUSED') this.game.unPauseGame();
                    }
                } else if (e.code === this.game.keyDebug && !this.game.keysActive.includes(e.code)) {
                    this.game.keysActive.push(e.code);
                    this.game.debugMode = !this.game.debugMode;
                    this.game.switchDebugMode();
                }
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
            this.el.classList.add('sprite', `hitbox-${data.boxType}`);
            this.el.style.height = this.height + 'px';
            this.el.style.width = this.width + 'px';
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.gameBoard.gameRunningArea.appendChild(this.el);
        }
    }

    class Sprite {
        constructor(gameBoard) {
            this.gameBoard = gameBoard;
            this.el = document.createElement('img');
            this.el.classList.add('sprite');
            this.el.setAttribute('draggable', 'false');
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
            this.initTitleUI();
        }

        initTitleUI() {
            this.btnOverworld = document.createElement('div');
            this.btnOverworld.classList.add('btn-test');
            this.btnOverworld.textContent = 'OVERWORLD';
            this.title.screen.appendChild(this.btnOverworld);
            this.btnOverworld.addEventListener('click', () => {
                if (this.title.game.activeScreen !== 'TITLE' || this.title.game.ui.overlayTransition) return;
                this.title.game.activeScreen = 'OVERWORLD';
                this.title.game.gameTransitionLoop();
            });
            this.btnOptions = document.createElement('div');
            this.btnOptions.classList.add('btn-test');
            this.btnOptions.textContent = 'OPTIONS';
            this.title.screen.appendChild(this.btnOptions);
            this.btnOptions.addEventListener('click', () => {
                if (this.title.game.activeScreen !== 'TITLE' || this.title.game.ui.overlayTransition) return;
                return;
            });
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
                this.overworld.game.activeScreen = 'GAME_BOARD';
                this.overworld.game.gameTransitionLoop();
            });
        }
    }

    class OverworldUI {
        constructor(overworld) {
            this.overworld = overworld;
            this.btnStages = [];
            this.initOverworldUI();
        }

        initOverworldUI() {
            this.btnTitle = document.createElement('div');
            this.btnTitle.classList.add('btn-test');
            this.btnTitle.textContent = 'TITLE';
            this.overworld.screen.appendChild(this.btnTitle);
            this.btnTitle.addEventListener('click', () => {
                if (this.overworld.game.activeScreen !== 'OVERWORLD' || this.overworld.game.ui.overlayTransition) return;
                this.overworld.game.activeScreen = 'TITLE';
                this.overworld.game.gameTransitionLoop();
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
            this.catGameOverImg = null;
            this.btnRetry = null;
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
            this.overlayPaused.classList.add('overlay', 'overlay-paused', 'hidden');
            this.gameBoard.screen.appendChild(this.overlayPaused);
            this.overlayPaused.innerHTML = '<p style="font-size: 20px">PAUSED</p>';
        }

        clearGameBoardUI() {
            this.statusBarr.innerHTML = '';
            this.openingStageMsgFrames = this.gameBoard.game.config.openingStageMsgFrames;
            this.stageClearMsgFrames = this.gameBoard.game.config.stageClearMsgFrames;
            this.warningMsgFrames = this.gameBoard.game.config.warningMsgFrames;
            this.hpBossElValue = 0;
            this.initialBossHp = 0;
            this.overlayPaused.classList.add('hidden');
        }

        updateGameBoardUI() {
            this.clearGameBoardUI();
            if (!this.gameBoard.game.stages[this.gameBoard.game.stageId].bossStage) {
                this.scoreLabel = document.createElement('p');
                this.scoreLabel.classList.add('score-label');
                this.gameBoard.gameRunningArea.appendChild(this.scoreLabel);
                this.scoreLabel.innerHTML = 'SCORE: <span class="score-points"></span>';
                this.scorePoints = document.querySelector('.score-points');
                this.scorePoints.textContent = this.gameBoard.score;
            }
            this.heartsBox = document.createElement('div');
            this.heartsBox.classList.add('box-hearts');
            this.statusBarr.appendChild(this.heartsBox);
            for (let i = 0; i < this.gameBoard.player.hp; i++) {
                this.heartsImg[i] = document.createElement('img');
                this.heartsImg[i].classList.add('heart-icon');
                this.heartsImg[i].src = './src/assets/heart-icon.png';
                this.heartsImg[i].setAttribute('draggable', 'false');
                this.heartsBox.appendChild(this.heartsImg[i]);
            }
            for (let i = 0; i < this.gameBoard.player.skills.length; i++) {
                this.skillBoxes[i] = document.createElement('div');
                this.skillBoxes[i].classList.add('box-skill');
                this.statusBarr.appendChild(this.skillBoxes[i]);
                if (this.gameBoard.player.skills[i]) {
                    const skillEl = new Sprite(this.gameBoard);
                    skillEl.el.style.height = this.gameBoard.player.skills[i].icon.height + 'px';
                    skillEl.el.src = `./src/assets/${this.gameBoard.player.skills[i].icon.src}`;
                    skillEl.el.style.filter = 'drop-shadow(4px 4px 4px black)';
                    this.skillBoxes[i].appendChild(skillEl.el);
                }
                this.skillBoxesCooldown[i] = document.createElement('div');
                this.skillBoxesCooldown[i].classList.add('cooldown-box-skill', 'hidden');
                this.skillBoxes[i].appendChild(this.skillBoxesCooldown[i]);
                this.skillBoxesNotAllowed[i] = new Sprite(this.gameBoard);
                this.skillBoxesNotAllowed[i].el.style.height = 25 + 'px';
                this.skillBoxesNotAllowed[i].el.src = './src/assets/not-allowed.png';
                this.skillBoxesNotAllowed[i].el.classList.add('not-allowed', 'hidden');
                this.skillBoxes[i].appendChild(this.skillBoxesNotAllowed[i].el);
                this.skillCooldownFrames[i] = this.gameBoard.player.skills[i].cooldown;
            }
        }

        updateHeart() {
            for (let i = 3; i > 0; i--) {
                if (i > this.gameBoard.player.hp) {
                    if (this.heartsImg[i - 1]) {
                        this.heartsImg[i - 1].remove();
                        this.heartsImg[i - 1] = null;
                    }
                }
            }
        }

        skillCooldownHandler(i) {
            if (this.skillCooldownFrames[i] <= 0) {
                this.skillCooldownFrames[i] = this.gameBoard.player.skills[i].cooldown;
                this.skillBoxesCooldown[i].classList.add('hidden');
                this.skillBoxesNotAllowed[i].el.classList.add('hidden');
                this.skillBoxesCooldown[i].style.height = '100%';
                this.gameBoard.player.skills[i].avaliable = true;
            } else {
                this.skillCooldownFrames[i]--;
                const heightPercent = this.skillCooldownFrames[i] / this.gameBoard.player.skills[i].cooldown;
                this.skillBoxesCooldown[i].style.height = heightPercent * 100 + '%';
            }
        }

        overlayPauseGameHandler() {
            if (this.gameBoard.state === 'GAME_RUNNING') this.overlayPaused.classList.add('hidden');
            else if (this.gameBoard.state === 'PAUSED') this.overlayPaused.classList.remove('hidden');
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
                this.openingStageMsg.innerHTML = `<span class="game-text opening-stage-msg-number">${this.gameBoard.game.stages[this.gameBoard.game.stageId].title}</span>
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
                this.stageClearMsg.innerHTML = `<span class="game-text stage-clear-msg-text">s</span>
                                                <span class="game-text stage-clear-msg-text">t</span>
                                                <span class="game-text stage-clear-msg-text">a</span>
                                                <span class="game-text stage-clear-msg-text">g</span>
                                                <span class="game-text stage-clear-msg-text">e</span>
                                                <span class="game-text stage-clear-msg-text">c</span>
                                                <span class="game-text stage-clear-msg-text">l</span>
                                                <span class="game-text stage-clear-msg-text">e</span>
                                                <span class="game-text stage-clear-msg-text">a</span>
                                                <span class="game-text stage-clear-msg-text">r</span>
                                                <span class="game-text stage-clear-msg-text">!</span>`;
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
                this.warningMsg.innerHTML = `<span class="game-text warning-msg-text">w</span>
                                             <span class="game-text warning-msg-text">a</span>
                                             <span class="game-text warning-msg-text">r</span>
                                             <span class="game-text warning-msg-text">n</span>
                                             <span class="game-text warning-msg-text">i</span>
                                             <span class="game-text warning-msg-text">n</span>
                                             <span class="game-text warning-msg-text">g</span>`;
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
                this.boxMsg.innerHTML = `<div class="box-msg-content">
                                            <h1 style="color: #ff3200">GAME OVER</h1>
                                            <img draggable="false" src="./src/assets/cat-game-over.png" class="cat-game-over-img" />
                                            <div class="btn-test btn-retry">TRY AGAIN!!</div>
                                        </div>`;
                this.gameBoard.gameRunningArea.appendChild(this.boxMsg);
                this.catGameOverImg = document.querySelector('.cat-game-over-img');
                this.btnRetry = document.querySelector('.btn-retry');
                this.btnRetry.addEventListener('mouseover', this.catThumbsUp);
                this.btnRetry.addEventListener('mouseout', this.catSad);
            } else if (this.gameBoard.state === 'STAGE_CLEAR') {
                this.boxMsg.innerHTML = `<div class="box-msg-content">
                                            <h1>STAGE CLEAR</h1>
                                            <h3>HP:.......1000pts</h3>
                                            <h3>BOMB:.....1000pts</h3>
                                            <h3>SHOOTS:...1000pts</h3>
                                            <h2>TOTAL:.3000pts</h2>
                                            <div class="btn-test btn-overworld">NEXT STAGE</div>
                                            <div class="btn-test btn-retry">RETRY</div>
                                        </div>`;
                this.gameBoard.gameRunningArea.appendChild(this.boxMsg);
                this.btnOverworld = document.querySelector('.btn-overworld');
                this.btnRetry = document.querySelector('.btn-retry');
                this.btnOverworld.addEventListener('click', () => {
                    if (this.gameBoard.game.activeScreen !== 'GAME_BOARD' || this.gameBoard.game.ui.overlayTransition) return;
                    if (this.gameBoard.game.stages.length > this.gameBoard.game.stageId + 1 && !this.gameBoard.game.stages[this.gameBoard.game.stageId].isClear) {
                        this.gameBoard.game.overworld.ui.btnStages.push(new BtnStage(this.gameBoard.game.overworld, this.gameBoard.game.stageId + 1));
                    }
                    this.gameBoard.game.stages[this.gameBoard.game.stageId].isClear = true;
                    this.gameBoard.game.stageId = 0;
                    this.gameBoard.game.activeScreen = 'OVERWORLD';
                    this.gameBoard.game.gameTransitionLoop();
                });
            }
            this.btnRetry.addEventListener('click', () => {
                if (this.gameBoard.game.activeScreen !== 'GAME_BOARD' || this.gameBoard.game.ui.overlayTransition) return;
                this.gameBoard.game.gameTransitionLoop();
            });
        }

        catThumbsUp = () => {
            this.catGameOverImg.src = './src/assets/cat-thumbs-up.png';
        };

        catSad = () => {
            this.catGameOverImg.src = './src/assets/cat-game-over.png';
        };
    }

    class Explosion {
        constructor(gameBoard, data) {
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
            this.sprite = new Sprite(this.gameBoard);
            this.sprite.el.style.height = this.height;
            this.sprite.el.src = `./src/assets/${this.src}`;
            this.gameBoard.gameRunningArea.appendChild(this.el);
            this.el.appendChild(this.sprite.el);

            this.sprite.top = -this.frameY * this.height;
            this.sprite.el.style.height = this.height + 'px';
            this.sprite.el.style.top = this.sprite.top + 'px';
            this.sprite.width = Math.round(this.sprite.el.getBoundingClientRect().width);
            this.sprite.el.style.width = this.sprite.width + 'px';

            this.width = this.sprite.width / this.maxFramesX;
            this.left = data.position.left + data.position.width / 2 - this.width / 2;

            this.el.style.height = this.height + 'px';
            this.el.style.top = this.top + 'px';
            this.el.style.width = this.width + 'px';
            this.el.style.left = this.left + 'px';

            this.sprite.left = -this.frameX * this.width;
            this.sprite.el.style.left = this.sprite.left + 'px';
        }

        update(arrExplosions) {
            if (this.frameX <= this.maxFramesX) {
                this.sprite.left = -this.frameX * this.width;
                this.sprite.el.style.left = this.sprite.left + 'px';
                this.frameX++;
            } else {
                this.gameBoard.deletElement(this, arrExplosions);
            }
        }
    }

    class EnemyPlanet extends Sprite {
        constructor(gameBoard) {
            super(gameBoard);
            this.enemyType = Math.floor(Math.random() * 4);
            this.heights = [120, 200, 280, 360];
            this.sources = ['planet-0.gif', 'planet-1.gif', 'planet-2.gif', 'planet-3.gif'];
            this.height = this.heights[this.enemyType];
            this.top = Math.floor(Math.random() * (this.gameBoard.gameRunningHeight - this.height + 1));
            this.left = this.gameBoard.gameRunningWidth;
            this.el.style.height = this.height + 'px';
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.el.src = `./src/assets/${this.sources[this.enemyType]}`;
            this.hp = this.enemyType * 3 + 3;
            this.speedX = 10 / (this.enemyType + 1);
            this.dropRate = 0.2 + this.enemyType * 0.1;
            this.points = this.enemyType + 2;
            this.markForDeletion = false;
            this.gameBoard.gameRunningArea.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;

            this.explosion = {
                height: 147,
                src: 'enemy-explosion-spritesheet.png',
                maxFramesY: 1,
                maxFramesX: 31,
                position: {
                    top: this.top,
                    left: this.left,
                    height: this.height,
                    width: this.width,
                },
            };

            this.radius = 0.5 * this.height;
            this.hitBox = {
                radius: this.radius,
                y: this.top + this.radius,
                x: this.left + this.width / 2,
                height: 2 * this.radius,
                width: 2 * this.radius,
                top: this.top,
                left: this.left,
                boxType: 'circle-red',
            };

            if (this.gameBoard.debugMode) this.addHitBoxDebug();
        }

        update() {
            this.left -= this.speedX;
            this.hitBox.left = this.left;
            this.hitBox.x = this.left + this.width / 2;
            this.explosion.position.left = this.left;
            this.el.style.left = this.left + 'px';
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x - this.hitBox.radius + 'px';
        }
    }

    const ENEMY_LIST = [EnemyPlanet];

    class Projectile extends Sprite {
        constructor(gameBoard, player) {
            super(gameBoard);
            this.player = player;
            this.height = this.player.height * (1 / 6) + this.player.chargeValue * this.player.height * (11 / 24);
            this.sources = ['shoot-0.png', 'shoot-1.gif', 'shoot-2.gif'];
            this.top = this.gameBoard.player.top + this.gameBoard.player.height / 2 - this.height / 2;
            this.left = this.gameBoard.player.left + this.gameBoard.player.width * 0.8;
            this.el.style.height = this.height + 'px';
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.gameBoard.player.left + 'px';
            this.el.style.zIndex = '3';
            this.el.src = `./src/assets/${this.sources[this.player.chargeValue]}`;
            this.dmg = 2 ** (this.player.chargeValue + 1) - 1;
            this.speedX = 14 + this.player.chargeValue * 2;
            this.markForDeletion = false;
            this.gameBoard.gameRunningArea.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;

            this.radius = 0.5 * this.height;
            this.hitBox = {
                radius: this.radius,
                y: this.top + this.radius,
                x: this.left + this.width / 2,
                height: 2 * this.radius,
                width: 2 * this.radius,
                top: this.top,
                left: this.left + this.width / 2 - this.radius,
                boxType: 'circle-green',
            };

            if (this.gameBoard.debugMode) this.addHitBoxDebug();
        }

        update() {
            this.left += this.speedX;
            this.hitBox.left = this.left + this.width / 2 - this.radius;
            this.hitBox.x = this.left + this.width / 2;
            this.el.style.left = this.left + 'px';
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x - this.hitBox.radius + 'px';
        }
    }

    class SkillBomb {
        constructor(gameBoard, player) {
            this.gameBoard = gameBoard;
            this.player = player;
            this.icon = { src: 'skill-ziggs.png', height: 75 };
            this.top = this.player.top;
            this.left = this.player.left + this.player.width - this.player.width * 0.34;
            this.width = 0;
            this.speedY = -28;
            this.speedX = 15;
            this.rotate = 270;
            this.cooldown = 600;
            this.avaliable = true;
            this.active = false;
            this.lauching = false;
            this.dmg = 6;
            this.dmgFrames = 1;
            this.framesLauching = 28;
            this.framesLauchingCounter = this.framesLauching;
            this.skillAnimation = null;

            this.explosion = {
                height: this.gameBoard.gameRunningHeight,
                src: 'boss-explosion-spritesheet.png',
                maxFramesY: 1,
                maxFramesX: 90,
                position: {
                    top: this.gameBoard.top,
                    left: this.gameBoard.left,
                    height: this.gameBoard.gameRunningHeight,
                    width: this.gameBoard.gameRunningWidth,
                },
            };
        }

        activeSkill(i) {
            this.skillAnimation = new Sprite(this.gameBoard);
            this.skillAnimation.el.style.height = 75 + 'px';
            this.skillAnimation.el.src = './src/assets/skill-ziggs.png';
            this.lauching = true;
            this.top = this.player.top;
            this.left = this.player.left + this.player.width - this.player.hitBox.width;
            this.gameBoard.gameRunningArea.appendChild(this.skillAnimation.el);
            this.width = this.skillAnimation.el.getBoundingClientRect().width;
            if (this.left + this.width >= this.gameBoard.left + this.gameBoard.gameRunningWidth) this.left = this.gameBoard.left + this.gameBoard.gameRunningWidth - this.width;
            this.skillAnimation.el.style.top = this.top + 'px';
            this.skillAnimation.el.style.left = this.left + 'px';
            this.skillAnimation.el.style.rotate = this.rotate + 'deg';
            this.skillAnimation.el.zIndex = '3';
            this.gameBoard.ui.skillBoxesCooldown[i].classList.remove('hidden');
            this.gameBoard.ui.skillBoxesNotAllowed[i].el.classList.remove('hidden');
            this.avaliable = false;
        }

        dmgSkill() {
            if (this.dmgFrames <= 0) {
                this.dmgFrames = 1;
                this.active = false;
            } else {
                this.dmgFrames--;
            }
        }

        update() {
            if (this.framesLauchingCounter <= 0) {
                this.skillAnimation.el.remove();
                this.skillAnimation = null;
                this.lauching = false;
                this.framesLauchingCounter = this.framesLauching;
                this.speedY = -28;
                this.rotate = 270;
                this.gameBoard.explosions.push(new Explosion(this.gameBoard, this.explosion));
                this.active = true;
            } else {
                this.speedY += this.gameBoard.gravity;
                this.top += this.speedY;
                this.left += this.speedX;
                this.rotate += this.speedX * 1.9;
                if (this.left + this.width >= this.gameBoard.left + this.gameBoard.gameRunningWidth) this.left = this.gameBoard.left + this.gameBoard.gameRunningWidth - this.width;
                this.skillAnimation.el.style.top = this.top + 'px';
                this.skillAnimation.el.style.left = this.left + 'px';
                this.skillAnimation.el.style.rotate = this.rotate + 'deg';
                this.framesLauchingCounter--;
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
            this.el.src = `./src/assets/${this.sources[this.player.chargeValue]}`;
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
            this.src = `./src/assets/cat-${this.gameBoard.game.playerState.skin}.gif`;
            this.el.style.height = this.height + 'px';
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.el.style.zIndex = '3';
            this.el.src = this.src;
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
                velX: 0,
            };

            this.hitBox = {
                height: this.height * 0.49,
                width: this.width * 0.34,
                top: this.top + this.height * 0.255,
                left: this.left + this.width * 0.42,
                boxType: 'rectangle-white',
            };

            if (this.gameBoard.debugMode) this.addHitBoxDebug();
        }

        update() {
            this.top += this.speedY;
            this.left += this.speedX;
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
            if (this.hitBoxEl) this.hitBoxEl.el.style.top = this.hitBox.top + 'px';
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.left + 'px';
        }

        moviment() {
            if (this.gameBoard.keysActive.includes(this.gameBoard.keysMain[0]) && this.gameBoard.keysActive.includes(this.gameBoard.keysMain[1])) this.speedY = 0;
            else if (this.gameBoard.keysActive.includes(this.gameBoard.keysMain[0]) && this.top + this.height * 0.255 > this.gameBoard.top) this.speedY = -this.speed;
            else if (this.gameBoard.keysActive.includes(this.gameBoard.keysMain[1]) && this.top + this.height * 0.74 < this.gameBoard.top + this.gameBoard.gameRunningHeight)
                this.speedY = this.speed;
            else this.speedY = 0;
            if (this.gameBoard.keysActive.includes(this.gameBoard.keysMain[2]) && this.gameBoard.keysActive.includes(this.gameBoard.keysMain[3])) this.speedX = 0;
            else if (this.gameBoard.keysActive.includes(this.gameBoard.keysMain[2]) && this.left + this.width * 0.42 > this.gameBoard.left) this.speedX = -this.speed;
            else if (this.gameBoard.keysActive.includes(this.gameBoard.keysMain[3]) && this.left + this.width * 0.76 < this.gameBoard.left + this.gameBoard.gameRunningWidth)
                this.speedX = this.speed;
            else this.speedX = 0;

            if (this.speedY || this.speedX) this.update();
        }

        shooting() {
            this.gameBoard.projectiles.push(new Projectile(this.gameBoard, this));
        }

        beam() {
            if (this.gameBoard.keysActive.includes(this.gameBoard.keysMain[4])) {
                if (this.chargeFrames === 0) {
                    this.shooting();
                } else if (
                    this.chargeFrames >= this.gameBoard.game.playerState.chargeFramesInterval &&
                    this.chargeFrames < this.gameBoard.game.playerState.chargeFramesInterval * 2 &&
                    this.chargeValue === 0
                ) {
                    this.chargeValue = 1;
                    this.chargeAnimation.el.src = `./src/assets/${this.chargeAnimation.sources[this.chargeValue]}`;
                    this.chargeAnimation.el.style.display = 'block';
                } else if (this.chargeFrames >= this.gameBoard.game.playerState.chargeFramesInterval * 2 && this.chargeValue === 1) {
                    this.chargeValue = 2;
                    this.chargeAnimation.el.src = `./src/assets/${this.chargeAnimation.sources[this.chargeValue]}`;
                }
                this.chargeFrames++;
            } else if (this.chargeFrames > 0) {
                if (this.chargeValue > 0) {
                    this.shooting();
                    this.chargeValue = 0;
                    this.chargeAnimation.el.style.display = 'none';
                    this.chargeAnimation.el.src = `./src/assets/${this.chargeAnimation.sources[this.chargeValue]}`;
                }
                this.chargeFrames = 0;
            }
        }

        useSkill(i) {
            if (!this.skills[i].avaliable) return;
            this.skills[i].activeSkill(i);
        }

        dboostMove() {
            this.state = 'UNTARGETABLE';
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
            const dy = this.hitBox.top + this.hitBox.height / 2 - enemy.hitBox.y;
            const dx = this.hitBox.left + this.hitBox.width / 2 - enemy.hitBox.x;
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
            this.gameBoard = gameBoard;
            this.height = 50;
            this.src = './src/assets/coin.gif';
            this.el.style.height = this.height + 'px';
            this.el.src = this.src;
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
                boxType: 'rectangle-yellow',
            };

            if (this.gameBoard.debugMode) this.addHitBoxDebug();
        }

        timer() {
            this.frames--;
            if (this.frames <= this.gameBoard.game.config.coinFramesInterval / 3 && this.frames > 0) {
                this.el.style.visibility = this.el.style.visibility !== 'hidden' ? 'hidden' : 'visible';
            } else if (this.frames <= 0) {
                this.gameBoard.deletElement(this, this.gameBoard.coins);
            }
        }
    }

    class MoonBoss extends Sprite {
        constructor(gameBoard) {
            super(gameBoard);
            this.height = this.gameBoard.gameRunningHeight;
            this.top = this.gameBoard.top;
            this.left = this.gameBoard.gameRunningWidth;
            this.src = './src/assets/moon-boss.png';
            this.el.style.height = this.height + 'px';
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.el.src = this.src;
            this.hp = 40;
            this.speedX = 4;
            this.rotate = 0;
            this.rotateSpeed = -5;
            this.gameBoard.gameRunningArea.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
            this.dmgHitBoxEl = null;
            this.state = 'VULNERABLE';

            this.explosion = {
                height: this.height,
                src: 'boss-explosion-spritesheet.png',
                maxFramesY: 1,
                maxFramesX: 90,
                position: {
                    top: this.top,
                    left: this.left,
                    height: this.height,
                    width: this.width,
                },
            };

            this.radius = 0.5 * this.height;
            this.hitBox = {
                radius: this.radius,
                y: this.top + this.radius,
                x: this.left + this.width / 2,
                height: 2 * this.radius,
                width: 2 * this.radius,
                top: this.top,
                left: this.left,
                boxType: 'circle-red',
            };

            this.dmgRadius = 0.073 * this.height;
            this.dmgHitBox = {
                radius: this.dmgRadius,
                y: this.top + this.height / 2,
                x: this.left + this.width / 2,
                height: 2 * this.dmgRadius,
                width: 2 * this.dmgRadius,
                top: this.top + this.height / 2 - this.dmgRadius,
                left: this.left + this.width / 2 - this.dmgRadius,
                boxType: 'circle-red',
            };

            if (this.gameBoard.debugMode) this.addHitBoxDebug();
            if (this.gameBoard.debugMode) this.addDmgHitBoxDebug();
        }

        entrance() {
            this.left -= this.speedX;
            if (this.left <= this.gameBoard.gameRunningWidth - this.width) {
                this.speedX = 0;
                this.gameBoard.ui.fillHpBossEl();
            }
            this.hitBox.left = this.left;
            this.dmgHitBox.left = this.left + this.width / 2 - this.dmgRadius;
            this.hitBox.x = this.left + this.width / 2;
            this.dmgHitBox.x = this.left + this.width / 2;
            this.explosion.position.left = this.left;
            this.el.style.left = this.left + 'px';
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x - this.hitBox.radius + 'px';
            if (this.dmgHitBoxEl) this.dmgHitBoxEl.el.style.left = this.dmgHitBox.x - this.dmgHitBox.radius + 'px';
        }

        skill01() {
            this.rotate += this.rotateSpeed;
            this.el.style.rotate = this.rotate + 'deg';
        }

        update() {
            this.left -= this.speedX;
            this.hitBox.x = this.left + this.width / 2;
            this.el.style.left = this.left + 'px';
            this.explosion.position.left = this.left;
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x - this.radius + 'px';
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
            this.screen = document.createElement('div');
            this.screen.classList.add('game-title');
            this.game.gameContainer.appendChild(this.screen);
            this.ui = new TitleUI(this);
        }
    }

    class Overworld {
        constructor(game) {
            this.game = game;
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
            this.state = this.game.config.initStageState;
            this.gravity = this.game.config.gravity;
            this.keysMain = [...this.game.config.keysMain];
            this.keysSkill = [...this.game.config.keysSkill];
            this.keyPause = this.game.config.keyPause;
            this.keyDebug = this.game.config.keyDebug;
            this.pauseGameFrames = this.game.config.pauseGameFrames;
            this.pauseAllowed = true;
            this.debugMode = false;
            this.keysActive = [];
            this.projectiles = [];
            this.enemies = [];
            this.explosions = [];
            this.coins = [];
            this.hitBoxElements = [];
            this.enemyIntervalFrames = null;
            this.score = 0;
            this.scoreGoal = null;
            this.bossStage = null;
            this.boss = null;
            this.bossDefeated = false;
            this.input = new InputHandler(this);
            this.player = null;
            this.ui = new GameBoardUI(this);
        }

        clearSpriteOffScreen(sprite, arr) {
            if (sprite.left > this.gameRunningWidth + sprite.width * 0.1 || sprite.left + sprite.width * 1.1 < 0) this.deletElement(sprite, arr);
        }

        deletElement(element, arr) {
            element.markForDeletion = true;
            element.el.remove();
            if (element.constructor.name === 'Projectile') this.projectiles = arr.filter(el => !el.markForDeletion);
            if (element.constructor.name === 'EnemyPlanet') this.enemies = arr.filter(el => !el.markForDeletion);
            if (element.constructor.name === 'EnemyTest') this.enemies = arr.filter(el => !el.markForDeletion);
            if (element.constructor.name === 'Explosion') this.explosions = arr.filter(el => !el.markForDeletion);
            if (element.constructor.name === 'Coin') this.coins = arr.filter(el => !el.markForDeletion);
        }

        collisionRectangleRectangle(rect1, rect2) {
            return rect1.left < rect2.left + rect2.width && rect1.left + rect1.width > rect2.left && rect1.top < rect2.top + rect2.height && rect1.top + rect1.height > rect2.top;
        }

        collisionCircleCircle(circ1, circ2) {
            const dx = circ1.x - circ2.x;
            const dy = circ1.y - circ2.y;
            const distance = Math.hypot(dx, dy);
            const sumOfRadii = circ1.radius + circ2.radius;
            return distance < sumOfRadii;
        }

        collisionRectangleCircle(rect, circ) {
            let offsetX = circ.x;
            let offsetY = circ.y;

            if (circ.x < rect.left) {
                offsetX = rect.left;
            } else if (circ.x > rect.left + rect.width) {
                offsetX = rect.left + rect.width;
            }
            if (circ.y < rect.top) {
                offsetY = rect.top;
            } else if (circ.y > rect.top + rect.height) {
                offsetY = rect.top + rect.height;
            }

            const dx = circ.x - offsetX;
            const dy = circ.y - offsetY;
            const distance = Math.hypot(dx, dy);

            return distance < circ.radius;
        }

        pauseGame() {
            if (this.state === 'GAME_RUNNING') this.state = 'PAUSED';
            this.ui.overlayPauseGameHandler();
            this.pauseAllowed = false;
        }

        unPauseGame() {
            if (this.state === 'PAUSED') this.state = 'GAME_RUNNING';
            this.ui.overlayPauseGameHandler();
            this.pauseAllowed = false;
        }

        switchDebugMode() {
            [this.player, ...this.projectiles, ...this.enemies, ...this.coins, this.boss].forEach(sprite => {
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
            this.score += points;
            this.ui.scorePoints.textContent = this.score;
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
                        this.boss = this.game.addBoss(this.game.stages[this.game.stageId].bossId);
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
                if (skill.lauching) skill.update();
                if (skill.active) skill.dmgSkill();
            });

            this.projectiles.forEach((projectile, _, arrProjectiles) => {
                projectile.update();
                this.clearSpriteOffScreen(projectile, arrProjectiles);
                if (this.boss) {
                    if (this.boss.state === 'INVULNERABLE' && this.collisionCircleCircle(projectile.hitBox, this.boss.hitBox)) {
                        this.deletElement(projectile, arrProjectiles);
                    } else if (this.boss.state === 'VULNERABLE' && this.collisionCircleCircle(projectile.hitBox, this.boss.dmgHitBox)) {
                        this.boss.hp -= projectile.dmg;
                        this.deletElement(projectile, arrProjectiles);
                        if (this.boss.hp < 0) this.boss.hp = 0;
                        this.ui.updateBarrBoss();
                        if (this.boss.hp === 0) {
                            this.explosions.push(new Explosion(this, this.boss.explosion));
                            this.boss.el.remove();
                            this.boss = null;
                            this.bossDefeated = true;
                        }
                    }
                }
            });

            this.enemies.forEach((enemy, _, arrEnemies) => {
                enemy.update();
                this.clearSpriteOffScreen(enemy, arrEnemies);
                if (this.collisionRectangleCircle(this.player.hitBox, enemy.hitBox) && this.player.state !== 'UNTARGETABLE') {
                    if (this.state === 'GAME_RUNNING') {
                        this.player.hp--;
                        this.player.dboost.active = true;
                        this.player.calcDboost(enemy);
                        this.ui.updateHeart();
                    }
                }
                this.projectiles.forEach((projectile, _, arrProjectiles) => {
                    if (this.collisionCircleCircle(projectile.hitBox, enemy.hitBox)) {
                        enemy.hp -= projectile.dmg;
                        this.deletElement(projectile, arrProjectiles);
                        if (enemy.hp <= 0) {
                            this.scoreUp(enemy.points);
                            if (Math.random() < enemy.dropRate) this.coins.push(new Coin(this, enemy));
                            this.explosions.push(new Explosion(this, enemy.explosion));
                            this.deletElement(enemy, arrEnemies);
                        }
                    }
                });
                this.player.skills.forEach(skill => {
                    if (skill.active) {
                        enemy.hp -= skill.dmg;
                        if (enemy.hp <= 0) {
                            this.scoreUp(enemy.points);
                            if (Math.random() < enemy.dropRate) this.coins.push(new Coin(this, enemy));
                            this.explosions.push(new Explosion(this, enemy.explosion));
                            this.deletElement(enemy, arrEnemies);
                        }
                    }
                });
            });

            this.explosions.forEach((explosion, _, arrExplosions) => explosion.update(arrExplosions));

            this.coins.forEach((coin, _, arrCoins) => {
                if (this.collisionRectangleRectangle(this.player.hitBox, coin.hitBox)) {
                    this.scoreUp(coin.points);
                    this.deletElement(coin, arrCoins);
                }
                if (!coin.markForDeletion) coin.timer();
            });

            if (this.boss) {
                if (this.boss.state !== 'UNTARGETABLE' && this.collisionRectangleCircle(this.player.hitBox, this.boss.hitBox) && this.player.state !== 'UNTARGETABLE') {
                    if (this.state === 'GAME_RUNNING') {
                        this.player.hp--;
                        this.player.dboost.active = true;
                        this.player.calcDboost(this.boss);
                        this.ui.updateHeart();
                    }
                }
            }

            if (this.state === 'GAME_RUNNING' && this.score < this.scoreGoal && !this.bossStage) {
                if (this.enemyIntervalFrames <= 0) {
                    this.enemies.push(this.game.addEnemy());
                    this.enemyIntervalFrames = this.game.stages[this.game.stageId].enemyIntervalFrames;
                } else {
                    this.enemyIntervalFrames--;
                }
            }
        }

        stateHandler() {
            if (this.state === 'TRANSITION_IN') {
                if (!this.game.ui.overlayTransition) {
                    this.state = 'OPENING_STAGE';
                }
            } else if (this.state === 'OPENING_STAGE') {
                if (!this.ui.openingStageMsg) {
                    if (this.bossStage) this.state = 'WARNING';
                    else this.state = 'GAME_RUNNING';
                }
            } else if (this.state === 'GAME_RUNNING') {
                if (this.player.hp <= 0) {
                    this.state = 'GAME_OVER';
                    this.ui.createBoxMsg();
                } else if (this.bossStage) {
                    if (this.bossDefeated && this.enemies.length === 0 && this.explosions.length === 0) this.state = 'STAGE_CLEAR';
                } else {
                    if (this.score >= this.scoreGoal && this.enemies.length === 0 && this.explosions.length === 0) this.state = 'STAGE_CLEAR';
                }
            } else if (this.state === 'STAGE_CLEAR') {
                if (!this.ui.stageClearMsg) {
                    this.ui.createBoxMsg();
                    this.state = 'GAME_OVER';
                }
            } else if (this.state === 'WARNING') {
                if (this.ui.hpBossElValue === 100) {
                    this.state = 'GAME_RUNNING';
                }
            }
        }
    }

    class GameUI {
        constructor(game) {
            this.game = game;
            this.overlayTransition = null;
            this.overlayTransitionOpacity = 0;
            this.overlayTransitionFrames = this.game.config.overlayTransitionFrames;
        }

        update() {
            if (!this.overlayTransition) {
                this.overlayTransition = document.createElement('div');
                this.overlayTransition.classList.add('overlay', 'overlay-transition');
                this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(3)}`;
                this.game.gameContainer.appendChild(this.overlayTransition);
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
                    this.game.switchScreens();
                } else if (this.overlayTransitionFrames < this.game.config.overlayTransitionFrames / 2) {
                    this.overlayTransitionOpacity = this.overlayTransitionOpacity - 1 / (this.game.config.overlayTransitionFrames / 2);
                }
                this.overlayTransition.style.opacity = `${this.overlayTransitionOpacity.toFixed(3)}`;
            }
        }
    }

    class Game {
        constructor() {
            this.config = INIT_CONFIG;
            this.height = this.config.gameHeight;
            this.width = this.config.gameWidth;
            this.gameContainer = document.querySelector('.game-container');
            this.gameContainer.style.height = this.height + 'px';
            this.gameContainer.style.width = this.width + 'px';
            this.activeScreen = 'TITLE';
            this.stages = [...STAGES_LIST];
            this.stageId = this.config.stageId;
            this.playerState = INIT_PLAYER_STATE;
            document.querySelector('.game-loading').remove();
            this.title = new Title(this);
            this.overworld = new Overworld(this);
            this.gameBoard = new GameBoard(this);
            this.ui = new GameUI(this);
        }

        switchScreens() {
            [this.title, this.overworld, this.gameBoard].forEach(view => {
                view.screen.style.display = 'none';
                // view.screen.style.outline = 'none';
                view.screen.style.zIndex = '-1';
            });
            if (this.activeScreen === 'TITLE') {
                this.title.screen.style.display = 'flex';
                // this.title.screen.style.outline = '5px solid white';
                this.title.screen.style.zIndex = '0';
            } else if (this.activeScreen === 'OVERWORLD') {
                this.overworld.screen.style.display = 'flex';
                // this.overworld.screen.style.outline = '5px solid white';
                this.overworld.screen.style.zIndex = '0';
                this.resetStateGameRunningArea();
                this.gameBoard.ui.clearGameBoardUI();
            } else if (this.activeScreen === 'GAME_BOARD') {
                this.gameBoard.screen.style.display = 'block';
                // this.gameBoard.screen.style.outline = '5px solid white';
                this.gameBoard.screen.style.zIndex = '0';
                this.updateGameBoard();
                this.gameBoardLoop();
            }
        }

        addPlayerSkills(id) {
            return new SKILL_LIST[id](this.gameBoard, this.gameBoard.player);
        }

        addEnemy() {
            const rng = Math.floor(Math.random() * this.stages[this.stageId].enemyGroup.length);
            return new ENEMY_LIST[this.stages[this.stageId].enemyGroup[rng]](this.gameBoard);
        }

        addBoss(id) {
            return new BOSS_LIST[id](this.gameBoard);
        }

        resetStateGameRunningArea() {
            this.gameBoard.gameRunningArea.innerHTML = '';
            this.gameBoard.projectiles.length = 0;
            this.gameBoard.enemies.length = 0;
            this.gameBoard.explosions.length = 0;
            this.gameBoard.coins.length = 0;
            this.gameBoard.hitBoxElements.length = 0;
            this.gameBoard.score = 0;
            this.gameBoard.boss = null;
            this.gameBoard.bossDefeated = false;
            this.gameBoard.pauseGameFrames = this.config.pauseGameFrames;
            this.gameBoard.pauseAllowed = true;
            this.gameBoard.gameRunningArea.style.backgroundImage = '';
        }

        updateGameBoardContext() {
            this.gameBoard.enemyIntervalFrames = this.stages[this.stageId].enemyIntervalFrames;
            this.gameBoard.scoreGoal = this.stages[this.stageId].scoreGoal;
            this.gameBoard.bossStage = this.stages[this.stageId].bossStage;
            this.gameBoard.state = this.config.initStageState;
            this.gameBoard.gameRunningArea.style.backgroundImage = this.stages[this.stageId].backgroundImage;
        }

        updateGameBoardPlayer() {
            this.gameBoard.player = new Player(this.gameBoard);
            this.gameBoard.player.top = (this.gameBoard.gameRunningHeight - this.gameBoard.player.height) / 2;
            this.gameBoard.player.left = this.gameBoard.left;
            this.gameBoard.player.hp = this.playerState.hp;
            this.gameBoard.player.skills.length = 0;
            this.gameBoard.player.skills.push(this.addPlayerSkills(this.playerState.skills[0]), this.addPlayerSkills(this.playerState.skills[1]));
            this.gameBoard.player.update();
        }

        updateGameBoard() {
            this.resetStateGameRunningArea();
            this.updateGameBoardContext();
            this.updateGameBoardPlayer();
            this.gameBoard.ui.updateGameBoardUI();
        }

        gameBoardLoop = () => {
            this.gameBoard.update();
            this.gameBoard.stateHandler();
            // console.log(this.gameBoard.state);
            if (this.gameBoard.state === 'GAME_OVER') return;
            requestAnimationFrame(this.gameBoardLoop);
        };

        gameTransitionLoop = () => {
            this.ui.update();
            // console.log(this.ui.overlayTransitionFrames);
            if (!this.ui.overlayTransition) return;
            requestAnimationFrame(this.gameTransitionLoop);
        };
    }

    const game = new Game();
});
