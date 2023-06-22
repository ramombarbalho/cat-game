'use strict';

window.addEventListener('contextmenu', e => {
    e.preventDefault();
});

window.addEventListener('load', () => {
    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((e.code === 'Numpad8' || e.code === 'Numpad5' || e.code === 'Numpad4' || e.code === 'Numpad6' || e.code === 'KeyH') && !this.game.keys.includes(e.code)) {
                    this.game.keys.push(e.code);
                } else if (this.game.player.skillsKeys.includes(e.code)) {
                    e.preventDefault();
                    if (!this.game.keys.includes(e.code)) {
                        this.game.keys.push(e.code);
                        if (this.game.state === 'GAMERUNNING') this.game.player.useSkill(this.game.player.skillsKeys.indexOf(e.code));
                    }
                } else if (e.code === 'NumpadDivide' && !this.game.keys.includes(e.code)) {
                    this.game.keys.push(e.code);
                    if (this.game.pauseAllowed) {
                        if (this.game.state === 'GAMERUNNING') this.game.pauseGame();
                        else if (this.game.state === 'PAUSED') this.game.unPauseGame();
                    }
                } else if (e.code === 'Numpad0' && !this.game.keys.includes(e.code)) {
                    this.game.keys.push(e.code);
                    this.game.debugMode = !this.game.debugMode;
                    this.game.switchDebugMode();
                }
            });
            window.addEventListener('keyup', ({ code }) => {
                const keyIndex = this.game.keys.indexOf(code);
                if (keyIndex > -1) this.game.keys.splice(keyIndex, 1);
            });
        }
    }

    class HitBoxDebug {
        constructor(game, data) {
            this.game = game;
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
            this.game.gameBoard.appendChild(this.el);
        }
    }

    class Sprite {
        constructor(game, data) {
            this.game = game;
            this.heights = data.heights;
            this.sources = data.sources;
            this.el = document.createElement('img');
            this.el.classList.add('sprite');
            this.el.style.height = this.heights[0] + 'px';
            this.el.src = `../assets/${this.sources[0]}`;
            this.el.setAttribute('draggable', 'false');
            this.hitBoxEl = null;
        }

        addHitBoxDebug = () => {
            this.hitBoxEl = new HitBoxDebug(this.game, this.hitBoxDebugData);
            this.game.hitBoxElements.push(this.hitBoxEl.el);
        };

        removeHitBoxDebug = () => {
            if (this.hitBoxEl) {
                this.game.hitBoxElements.forEach(el => el.remove());
                this.game.hitBoxElements.lenght = 0;
                this.hitBoxEl = null;
            }
        };
    }

    class UI {
        constructor(game) {
            this.game = game;
            this.openingStageMsg = null;
            this.openingStageMsgCountdown = 2200;
            this.stageClearMsg = null;
            this.stageClearMsgCountdown = 3600;
            this.boxMsg = null;
            this.catGameOverImg = null;
            this.btnRetry = null;
            this.statusBarr = null;
            this.heartsBox = null;
            this.heartsImg = [null, null, null];
            this.skillBoxes = this.game.player.skills.map(_ => null);
            this.skillBoxesCooldown = [...this.skillBoxes];
            this.skillBoxesNotAllowed = [...this.skillBoxes];
            this.skillCooldownTimer = this.game.player.skills.map(skill => skill.cooldown);
            this.overlayPaused = null;
            this.initGameUi();
        }

        initGameUi() {
            this.statusBarr = document.createElement('div');
            this.statusBarr.classList.add('game-status-barr');
            this.game.gameContent.appendChild(this.statusBarr);
            this.heartsBox = document.createElement('div');
            this.heartsBox.classList.add('box-hearts');
            this.statusBarr.appendChild(this.heartsBox);
            this.overlayPaused = document.createElement('div');
            this.overlayPaused.classList.add('overlay-paused', 'hidden');
            this.game.gameBoard.appendChild(this.overlayPaused);
            this.overlayPaused.innerHTML = '<p style="font-size: 20px">PAUSED</p>';
            for (let i = 0; i < this.game.player.hp; i++) {
                this.heartsImg[i] = document.createElement('img');
                this.heartsImg[i].classList.add('heart-icon');
                this.heartsImg[i].src = '../assets/heart-icon.png';
                this.heartsImg[i].setAttribute('draggable', 'false');
                this.heartsBox.appendChild(this.heartsImg[i]);
            }
            for (let i = 0; i < this.game.player.skills.length; i++) {
                this.skillBoxes[i] = document.createElement('div');
                this.skillBoxes[i].classList.add('box-skill');
                this.statusBarr.appendChild(this.skillBoxes[i]);
                if (this.game.player.skills[i]) {
                    const skillEl = new Sprite(this.game, this.game.player.skills[i].icon);
                    this.skillBoxes[i].appendChild(skillEl.el);
                }
                this.skillBoxesCooldown[i] = document.createElement('div');
                this.skillBoxesCooldown[i].classList.add('cooldown-bomb', 'hidden');
                this.skillBoxes[i].appendChild(this.skillBoxesCooldown[i]);
                this.skillBoxesNotAllowed[i] = new Sprite(this.game, {
                    sources: ['not-allowed.png'],
                    heights: [25],
                });
                this.skillBoxesNotAllowed[i].el.classList.add('not-allowed', 'hidden');
                this.skillBoxes[i].appendChild(this.skillBoxesNotAllowed[i].el);
            }
        }

        updateHeart() {
            for (let i = 3; i > 0; i--) {
                if (i > this.game.player.hp) {
                    if (this.heartsImg[i - 1]) {
                        this.heartsImg[i - 1].remove();
                        this.heartsImg[i - 1] = null;
                    }
                }
            }
        }

        skillCooldownHandler(deltaTime, i) {
            if (this.skillCooldownTimer[i] <= 0) {
                this.skillCooldownTimer[i] = this.game.player.skills[i].cooldown;
                this.skillBoxesCooldown[i].classList.add('hidden');
                this.skillBoxesNotAllowed[i].el.classList.add('hidden');
                this.skillBoxesCooldown[i].style.height = '100%';
                this.game.player.skills[i].avaliable = true;
            } else {
                this.skillCooldownTimer[i] -= deltaTime;
                const heightPercent = this.skillCooldownTimer[i] / this.game.player.skills[i].cooldown;
                this.skillBoxesCooldown[i].style.height = heightPercent * 100 + '%';
            }
        }

        overlayPauseGameHandler() {
            if (this.game.state === 'GAMERUNNING') this.overlayPaused.classList.add('hidden');
            else if (this.game.state === 'PAUSED') this.overlayPaused.classList.remove('hidden');
        }

        openingStage(deltaTime) {
            if (!this.openingStageMsg) {
                this.openingStageMsg = new Sprite(this.game, {
                    sources: ['stage_1-1.png'],
                    heights: [350],
                });
                this.openingStageMsg.el.classList.add('stage-start');
                this.game.gameBoard.appendChild(this.openingStageMsg.el);
            } else if (this.openingStageMsgCountdown <= 0) {
                this.openingStageMsg.el.remove();
                this.openingStageMsg = null;
            } else {
                this.openingStageMsgCountdown -= deltaTime;
            }
        }

        stageClear(deltaTime) {
            if (!this.stageClearMsg) {
                this.stageClearMsg = new Sprite(this.game, {
                    sources: ['stage-clear.png'],
                    heights: [400],
                });

                this.stageClearMsg.el.classList.add('stage-clear');
                this.game.gameBoard.appendChild(this.stageClearMsg.el);
            } else if (this.stageClearMsgCountdown <= 0) {
                this.stageClearMsg.el.remove();
                this.stageClearMsg = null;
            } else {
                this.stageClearMsgCountdown -= deltaTime;
            }
        }

        createBoxMsg() {
            this.boxMsg = document.createElement('div');
            this.boxMsg.classList.add('box-msg');

            if (this.game.state === 'GAMEOVER') {
                this.boxMsg.innerHTML = `<div class="box-msg-content">
                                            <h1 style="color: #ff3200">GAME OVER</h1>
                                            <img draggable="false" src="../assets/cat-game-over.png" class="cat-game-over-img" />
                                            <a draggable="false" href="#" class="btn-retry btn-box-msg">TRY AGAIN!!</a>
                                        </div>`;
                this.game.gameBoard.appendChild(this.boxMsg);
                this.catGameOverImg = document.querySelector('.cat-game-over-img');
                this.btnRetry = document.querySelector('.btn-retry');
                this.btnRetry.addEventListener('mouseover', this.catThumbsUp);
                this.btnRetry.addEventListener('mouseout', this.catSad);
            } else if (this.game.state === 'STAGECLEAR') {
                this.boxMsg.innerHTML = `<div class="box-msg-content">
                                            <h1 class="text-stage-clear">STAGE CLEAR</h1>
                                            <h3>HP:.......1000pts</h3>
                                            <h3>BOMB:.....1000pts</h3>
                                            <h3>SHOOTS:...1000pts</h3>
                                            <h2>TOTAL:.3000pts</h2>
                                            <a draggable="false" href="../stages/stage-1-2-test.html" class="btn-box-msg">NEXT STAGE</a>
                                            <a draggable="false" href="#" class="btn-retry btn-box-msg">RETRY</a>
                                        </div>`;
                this.game.gameBoard.appendChild(this.boxMsg);
                this.btnRetry = document.querySelector('.btn-retry');
            }
            this.btnRetry.addEventListener('click', this.game.retry);
        }

        catThumbsUp = () => {
            this.catGameOverImg.src = '../assets/cat-thumbs-up.png';
        };

        catSad = () => {
            this.catGameOverImg.src = '../assets/cat-game-over.png';
        };
    }

    class Explosion {
        constructor(game, data) {
            this.game = game;
            this.frameY = 0;
            this.maxFramesY = data.maxFramesY;
            this.frameX = 0;
            this.maxFramesX = data.maxFramesX;
            this.markForDeletion = false;

            this.height = data.height;
            this.top = data.position.top + data.position.height / 2 - this.height / 2;

            this.el = document.createElement('div');
            this.el.classList.add('explosion');
            this.sprite = new Sprite(this.game, { sources: [data.src], heights: [this.height] });
            this.game.gameBoard.appendChild(this.el);
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
                this.game.deletElement(this, arrExplosions);
            }
        }
    }

    class EnemyPlanet extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.enemyType = Math.floor(Math.random() * 4);
            this.height = this.heights[this.enemyType];
            this.top = Math.floor(Math.random() * (this.game.height - this.height + 1));
            this.left = this.game.width;
            this.src = this.sources[this.enemyType];
            this.el.style.height = this.height + 'px';
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.el.src = `../assets/${this.src}`;
            this.hp = this.enemyType * 3 + 3;
            this.speedX = 10 / (this.enemyType + 1);
            this.markForDeletion = false;
            this.game.gameBoard.appendChild(this.el);
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
            };

            this.hitBoxDebugData = {
                height: 2 * this.hitBox.radius,
                width: 2 * this.hitBox.radius,
                top: this.hitBox.y - this.hitBox.radius,
                left: this.hitBox.x - this.hitBox.radius,
                boxType: 'circle-red',
            };

            if (this.game.debugMode) this.addHitBoxDebug(this.hitBoxDebugData);
        }

        update() {
            this.left -= this.speedX;
            this.hitBox.x = this.left + this.width / 2;
            this.el.style.left = this.left + 'px';
            this.explosion.position.left = this.left;
            this.hitBoxDebugData.top = this.hitBox.y - this.hitBox.radius;
            this.hitBoxDebugData.left = this.hitBox.x - this.hitBox.radius;
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x - this.radius + 'px';
        }
    }

    class Projectile extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.chargeType = this.game.player.chargeValue;
            this.height = this.heights[0];
            this.top = this.game.player.top + this.game.player.height / 2 - this.height / 2;
            this.left = this.game.player.left + this.game.player.width * 0.8;
            this.src = this.sources[this.chargeType];
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.game.player.left + 'px';
            this.el.src = `../assets/${this.src}`;
            this.dmg = 2 ** (this.chargeType + 1) - 1;
            this.speedX = 14 + this.chargeType * 2;
            this.markForDeletion = false;
            this.game.gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;

            this.radius = 0.5 * this.height;
            this.hitBox = {
                radius: this.radius,
                y: this.top + this.radius,
                x: this.left + this.width / 2,
            };

            this.hitBoxDebugData = {
                height: 2 * this.hitBox.radius,
                width: 2 * this.hitBox.radius,
                top: this.hitBox.y - this.hitBox.radius,
                left: this.hitBox.x - this.hitBox.radius,
                boxType: 'circle-green',
            };

            if (this.game.debugMode) this.addHitBoxDebug(this.hitBoxDebugData);
        }

        update() {
            this.left += this.speedX;
            this.hitBox.x = this.left + this.width / 2;
            this.el.style.left = this.left + 'px';
            this.hitBoxDebugData.top = this.hitBox.y - this.hitBox.radius;
            this.hitBoxDebugData.left = this.hitBox.x - this.hitBox.radius;
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x - this.radius + 'px';
        }
    }

    class SkillBomb {
        constructor(game, key) {
            this.game = game;
            this.icon = { sources: ['bomb.webp'], heights: [90] };
            this.key = key;
            this.cooldown = 5000;
            this.avaliable = true;

            this.explosion = {
                height: this.game.height,
                src: 'bomb-spritesheet.png',
                maxFramesY: 1,
                maxFramesX: 7,
                position: {
                    top: this.game.top,
                    left: this.game.left,
                    height: this.game.height,
                    width: this.game.width,
                },
            };
        }

        active(i) {
            this.game.explosions.push(new Explosion(this.game, this.explosion));
            this.game.ui.skillBoxesCooldown[i].classList.remove('hidden');
            this.game.ui.skillBoxesNotAllowed[i].el.classList.remove('hidden');
            this.avaliable = false;
        }
    }

    class Player extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.height = this.heights[0];
            this.top = (this.game.height - this.height) / 2;
            this.left = this.game.left;
            this.src = this.sources[0];
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.el.style.zIndex = '2';
            this.el.src = `../assets/${this.src}`;
            this.hp = 3;
            this.speedY = 0;
            this.speedX = 0;
            this.maxSpeed = 11;
            this.projectiles = [];
            this.chargeValue = 0;
            this.chargeTimer = 0;
            this.chargeInterval = 600;
            this.dboosting = false;
            this.dboostDistance = 150;
            this.dboostDistanceY = 0;
            this.dboostDistanceX = 0;
            this.dboostFrames = 5;
            this.dboostFramesCounter = this.dboostFrames;
            this.dboostVelY = 0;
            this.dboostVelX = 0;
            this.invencible = false;
            this.invencibleTimer = 2000;
            this.skills = [new SkillBomb(this.game, 'Space')];
            this.skillsKeys = this.skills.map(skill => skill.key);
            this.game.gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;

            this.hitBox = {
                height: this.height * 0.49,
                width: this.width * 0.34,
                y: this.top + this.height * 0.255,
                x: this.left + this.width * 0.42,
            };

            this.hitBoxDebugData = {
                height: this.hitBox.height,
                width: this.hitBox.width,
                top: this.hitBox.y,
                left: this.hitBox.x,
                boxType: 'rectangle-white',
            };

            this.chargeAnimation = new Sprite(this.game, {
                sources: ['charge-1.gif', 'charge-2.gif'],
                heights: [this.height + this.height / 3],
            });
            this.chargeAnimation.el.style.display = 'none';
            this.chargeAnimation.el.style.top = this.top - this.height * 0.125 + 'px';
            this.chargeAnimation.el.style.left = this.left + this.width * 0.31 + 'px';
            this.chargeAnimation.el.style.zIndex = '2';
            this.game.gameBoard.appendChild(this.chargeAnimation.el);

            if (this.game.debugMode) this.addHitBoxDebug(this.hitBoxDebugData);
        }

        update() {
            this.top += this.speedY;
            this.left += this.speedX;
            if (this.top + this.height * 0.255 < this.game.top) this.top = this.game.top - this.height * 0.255;
            if (this.top - this.height * 0.255 + this.height > this.game.top + this.game.height) this.top = this.game.top + this.game.height - this.height + this.height * 0.255;
            if (this.left + this.width * 0.42 < this.game.left) this.left = this.game.left - this.width * 0.42;
            if (this.left + this.width * 0.755 > this.game.left + this.game.width) this.left = this.game.left + this.game.width - this.width * 0.755;
            this.hitBox.y = this.top + this.height * 0.255;
            this.hitBox.x = this.left + this.width * 0.42;
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.hitBoxDebugData.top = this.hitBox.y;
            this.hitBoxDebugData.left = this.hitBox.x;
            this.chargeAnimation.el.style.top = this.top - this.height * 0.125 + 'px';
            this.chargeAnimation.el.style.left = this.left + this.width * 0.31 + 'px';
            if (this.hitBoxEl) this.hitBoxEl.el.style.top = this.hitBox.y + 'px';
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x + 'px';
        }

        moviment() {
            if (this.game.keys.includes('Numpad8') && this.game.keys.includes('Numpad5')) this.speedY = 0;
            else if (this.game.keys.includes('Numpad8') && this.top + this.height * 0.255 > this.game.top) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('Numpad5') && this.top - this.height * 0.255 + this.height < this.game.top + this.game.height) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            if (this.game.keys.includes('Numpad4') && this.game.keys.includes('Numpad6')) this.speedX = 0;
            else if (this.game.keys.includes('Numpad4') && this.left + this.width * 0.42 > this.game.left) this.speedX = -this.maxSpeed;
            else if (this.game.keys.includes('Numpad6') && this.left + this.width * 0.755 < this.game.left + this.game.width) this.speedX = this.maxSpeed;
            else this.speedX = 0;

            if (this.speedY || this.speedX) this.update();
        }

        shooting() {
            this.projectiles.push(
                new Projectile(this.game, {
                    sources: ['shoot-0.gif', 'shoot-1.gif', 'shoot-2.gif'],
                    heights: [this.height * (1 / 6) + this.chargeValue * this.height * (11 / 24)],
                }),
            );
        }

        beam(deltaTime) {
            if (this.game.keys.includes('KeyH')) {
                if (this.chargeTimer === 0) {
                    this.shooting();
                } else if (this.chargeTimer >= this.chargeInterval && this.chargeTimer < this.chargeInterval * 2 && this.chargeValue === 0) {
                    this.chargeAnimation.el.src = `../assets/${this.chargeAnimation.sources[this.chargeValue]}`;
                    this.chargeAnimation.el.style.display = 'block';
                    this.chargeValue = 1;
                } else if (this.chargeTimer >= this.chargeInterval * 2 && this.chargeValue === 1) {
                    this.chargeAnimation.el.src = `../assets/${this.chargeAnimation.sources[this.chargeValue]}`;
                    this.chargeValue = 2;
                }
                this.chargeTimer += deltaTime;
            } else if (this.chargeTimer > 0) {
                if (this.chargeValue > 0) {
                    this.shooting();
                    this.chargeValue = 0;
                    this.chargeAnimation.el.style.display = 'none';
                    this.chargeAnimation.el.src = '../assets/__blank.png';
                }
                this.chargeTimer = 0;
            }
        }

        useSkill(i) {
            if (!this.skills[i].avaliable) return;
            this.skills[i].active(i);
        }

        dboost() {
            this.invencible = true;

            if (this.dboostFramesCounter <= 0) {
                this.dboosting = false;
                this.dboostFramesCounter = this.dboostFrames;
            } else {
                this.top += this.dboostVelY;
                this.left += this.dboostVelX;
                this.speedY = 0;
                this.speedX = 0;
                this.update();
                this.dboostFramesCounter--;
            }
        }

        calcDboost(enemy) {
            const dy = this.hitBox.y + this.hitBox.height / 2 - enemy.hitBox.y;
            const dx = this.hitBox.x + this.hitBox.width / 2 - enemy.hitBox.x;
            const dSum = Math.abs(dy) + Math.abs(dx);
            const ry = dy / dSum;
            const rx = dx / dSum;
            this.dboostDistanceY = ry * this.dboostDistance;
            this.dboostDistanceX = rx * this.dboostDistance;
            this.dboostVelY = this.dboostDistanceY / this.dboostFrames;
            this.dboostVelX = this.dboostDistanceX / this.dboostFrames;
        }

        invencibleMode(deltaTime) {
            if (this.invencibleTimer > 0) {
                this.invencibleTimer -= deltaTime;
                if (this.el.style.opacity === '0') this.el.style.opacity = '1';
                else this.el.style.opacity = '0';
            } else {
                this.el.style.opacity = '1';
                this.invencible = false;
                this.invencibleTimer = 2000;
            }
        }
    }

    class Game {
        constructor() {
            document.querySelector('.loading').remove();
            this.gameContent = document.querySelector('.game-content');
            this.gameContent.classList.remove('hidden');
            this.gameBoard = document.createElement('div');
            this.gameBoard.classList.add('game-board');
            this.gameContent.appendChild(this.gameBoard);
            this.height = this.gameBoard.getBoundingClientRect().height;
            this.width = this.gameBoard.getBoundingClientRect().width;
            this.top = 0;
            this.left = 0;
            this.keys = [];
            this.enemies = [];
            this.explosions = [];
            this.crashedEnemies = 0;
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.enemyGoal = 6;
            this.pauseGameCooldown = 1000;
            this.pauseGameTimer = this.pauseGameCooldown;
            this.pauseAllowed = true;
            this.debugMode = false;
            this.hitBoxElements = [];
            this.input = new InputHandler(this);
            this.player = new Player(this, {
                sources: ['cat-golden.gif'],
                heights: [120],
            });
            this.ui = new UI(this);
            this.state = 'OPENINGSTAGE';
        }

        addEnemy() {
            this.enemies.push(
                new EnemyPlanet(this, {
                    sources: ['planet-0.gif', 'planet-1.gif', 'planet-2.gif', 'planet-3.gif'],
                    heights: [120, 200, 280, 360],
                }),
            );
        }

        clearSpriteOffScreen(sprite, arr) {
            if (sprite.left > this.width + sprite.width * 0.1 || sprite.left + sprite.width * 1.1 < 0) this.deletElement(sprite, arr);
        }

        deletElement(element, arr) {
            element.markForDeletion = true;
            element.el.remove();
            if (element.constructor.name === 'Projectile') this.player.projectiles = arr.filter(el => !el.markForDeletion);
            if (element.constructor.name === 'EnemyPlanet') this.enemies = arr.filter(el => !el.markForDeletion);
            if (element.constructor.name === 'Explosion') this.explosions = arr.filter(el => !el.markForDeletion);
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

            if (circ.x < rect.x) {
                offsetX = rect.x;
            } else if (circ.x > rect.x + rect.width) {
                offsetX = rect.x + rect.width;
            }
            if (circ.y < rect.y) {
                offsetY = rect.y;
            } else if (circ.y > rect.y + rect.height) {
                offsetY = rect.y + rect.height;
            }

            const dx = circ.x - offsetX;
            const dy = circ.y - offsetY;
            const distance = Math.hypot(dx, dy);

            return distance < circ.radius;
        }

        pauseGame() {
            if (this.state === 'GAMERUNNING') this.state = 'PAUSED';
            this.ui.overlayPauseGameHandler();
            this.pauseAllowed = false;
        }

        unPauseGame() {
            if (this.state === 'PAUSED') this.state = 'GAMERUNNING';
            this.ui.overlayPauseGameHandler();
            this.pauseAllowed = false;
        }

        switchDebugMode() {
            [this.player, ...this.player.projectiles, ...this.enemies].forEach(sprite => {
                if (sprite) {
                    if (this.debugMode) sprite.addHitBoxDebug();
                    else sprite.removeHitBoxDebug();
                }
            });
        }

        update(deltaTime) {
            if (this.state === 'OPENINGSTAGE') this.ui.openingStage(deltaTime);

            if (this.state === 'PAUSED' || this.state === 'GAMERUNNING') {
                if (this.pauseGameTimer <= 0) {
                    this.pauseGameTimer = this.pauseGameCooldown;
                    this.pauseAllowed = true;
                } else if (!this.pauseAllowed) {
                    this.pauseGameTimer -= deltaTime;
                }
            }

            if (this.state === 'GAMERUNNING' && !document.hasFocus() && this.pauseAllowed) this.pauseGame();

            if (this.state === 'STAGECLEAR') this.ui.stageClear(deltaTime);

            if (this.state === 'GAMEOVER' || this.state === 'PAUSED' || this.state === 'OPENINGSTAGE') return;

            if (!this.player.dboosting) {
                this.player.moviment();
                this.player.beam(deltaTime);
            } else {
                this.player.dboost();
            }

            if (this.player.invencible) this.player.invencibleMode(deltaTime);

            this.player.skills.forEach((skill, i) => {
                if (!skill.avaliable) this.ui.skillCooldownHandler(deltaTime, i);
            });

            this.player.projectiles.forEach((projectile, _, arrProjectiles) => {
                projectile.update();
                this.clearSpriteOffScreen(projectile, arrProjectiles);
            });

            this.enemies.forEach((enemy, _, arrEnemies) => {
                enemy.update();
                this.clearSpriteOffScreen(enemy, arrEnemies);
                if (this.collisionRectangleCircle(this.player.hitBox, enemy.hitBox) && !this.player.invencible) {
                    this.explosions.push(new Explosion(this, enemy.explosion));
                    this.player.calcDboost(enemy);
                    this.deletElement(enemy, arrEnemies);
                    if (this.state === 'GAMERUNNING') {
                        this.player.hp--;
                        this.player.dboosting = true;
                        this.ui.updateHeart();
                    }
                }
                this.player.projectiles.forEach((projectile, _, arrProjectiles) => {
                    if (this.collisionCircleCircle(projectile.hitBox, enemy.hitBox)) {
                        enemy.hp -= projectile.dmg;
                        this.deletElement(projectile, arrProjectiles);
                        if (enemy.hp <= 0) {
                            this.explosions.push(new Explosion(this, enemy.explosion));
                            this.deletElement(enemy, arrEnemies);
                            this.crashedEnemies++;
                        }
                    }
                });
                if (this.explosions.some(explosion => explosion.sprite.el.getAttribute('src') === '../assets/bomb-spritesheet.png')) {
                    this.explosions.push(new Explosion(this, enemy.explosion));
                    this.deletElement(enemy, arrEnemies);
                    this.crashedEnemies++;
                }
            });

            this.explosions.forEach((explosion, _, arrExplosions) => explosion.update(arrExplosions));

            if (this.state === 'GAMERUNNING' && this.crashedEnemies < this.enemyGoal) {
                if (this.enemyTimer > this.enemyInterval) {
                    this.addEnemy();
                    this.enemyTimer = 0;
                } else {
                    this.enemyTimer += deltaTime;
                }
            }
        }

        retry() {
            location.reload();
        }

        gameStateHandler() {
            if (this.state === 'OPENINGSTAGE') {
                if (this.ui.openingStageMsgCountdown <= 0) {
                    this.state = 'GAMERUNNING';
                }
            } else if (this.state === 'GAMERUNNING') {
                if (this.player.hp <= 0) {
                    this.state = 'GAMEOVER';
                    this.ui.createBoxMsg();
                } else if (this.crashedEnemies >= this.enemyGoal && this.enemies.length === 0) {
                    this.state = 'STAGECLEAR';
                }
            } else if (this.state === 'STAGECLEAR') {
                if (this.ui.stageClearMsgCountdown <= 0) {
                    this.ui.createBoxMsg();
                    this.state = 'GAMEOVER';
                }
            }
        }
    }

    const game = new Game();

    let lastTime = 0;

    function gameLoop(timeStamp) {
        // console.log(game.state);
        if (game.state === 'GAMEOVER') return;
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.gameStateHandler();
        requestAnimationFrame(gameLoop);
    }

    gameLoop(0);
});
