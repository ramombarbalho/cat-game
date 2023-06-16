'use strict';

window.addEventListener('contextmenu', e => {
    e.preventDefault();
});

window.addEventListener('load', () => {
    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((e.code === 'Numpad8' || e.code === 'Numpad5' || e.code === 'Numpad4' || e.code === 'Numpad6') && !this.game.keys.includes(e.code)) {
                    this.game.keys.push(e.code);
                }
                if (e.code === 'KeyH' && !this.game.keys.includes(e.code)) {
                    this.game.keys.push(e.code);
                    this.game.player.chargingBeam = true;
                    if (this.game.controlsAllowed) this.game.player.regularShoot();
                }
                if (e.code === 'Space') {
                    e.preventDefault();
                    if (!this.game.keys.includes(e.code)) {
                        this.game.keys.push(e.code);
                        if (this.game.controlsAllowed) this.game.player.bombing();
                    }
                }
                if (e.code === 'Numpad0' && !this.game.keys.includes(e.code)) {
                    this.game.keys.push(e.code);
                    this.game.debugMode = !this.game.debugMode;
                    this.game.switchDebugMode();
                }
                if (e.code === 'NumpadDivide' && !this.game.keys.includes(e.code)) {
                    this.game.keys.push(e.code);
                    if (this.game.state === 'GAMERUNNING' || this.game.state === 'PAUSED') this.game.ui.pauseGame();
                }
            });
            window.addEventListener('keyup', ({ code }) => {
                const keyPressed = this.game.keys.indexOf(code);
                if (keyPressed > -1) {
                    this.game.keys.splice(keyPressed, 1);
                }
                if (code === 'KeyH') {
                    this.game.player.chargingBeam = false;
                }
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
            this.height = data.height;
            this.el = document.createElement('img');
            this.el.src = `../img/${data.src[0]}`;
            this.el.classList.add('sprite');
            this.el.style.height = this.height + 'px';
            this.el.setAttribute('draggable', 'false');
            this.hitBoxEl = null;
        }

        createHitBoxDebug = () => {
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
            this.startMsg = null;
            this.overlayPaused = null;
            this.stageClearMsg = null;
            this.boxMsg = null;
            this.catGameOverImg = null;
            this.btnRetry = null;
            this.statusBarr = null;
            this.heartsBox = null;
            this.heartsImg = [null, null, null];
            this.skillBoxes = [null, null];
            this.initGameUi();
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
                this.heartsImg[i].src = '../img/heart-icon.png';
                this.heartsImg[i].setAttribute('draggable', 'false');
                this.heartsBox.appendChild(this.heartsImg[i]);
            }
            for (let i = 0; i < 2; i++) {
                this.skillBoxes[i] = document.createElement('div');
                this.skillBoxes[i].classList.add('box-skill');
                this.statusBarr.appendChild(this.skillBoxes[i]);
            }
        }

        pauseGame() {
            if (this.game.state === 'GAMERUNNING') {
                this.game.state = 'PAUSED';
                this.game.controlsAllowed = false;
                this.overlayPaused.classList.remove('hidden');
            } else if (this.game.state === 'PAUSED') {
                this.game.state = 'GAMERUNNING';
                this.game.controlsAllowed = true;
                this.overlayPaused.classList.add('hidden');
            }
        }

        startGameMsg() {
            this.startMsg = new Sprite(this.game, {
                src: ['stage_1-1.png'],
                height: 350,
            });

            this.startMsg.el.classList.add('stage-start');
            this.game.gameBoard.appendChild(this.startMsg.el);
            this.game.state = 'OPENINGSTAGE';

            setTimeout(() => {
                this.startMsg.el.remove();
                this.startMsg = null;
                this.game.controlsAllowed = true;
                this.game.state = 'GAMERUNNING';
            }, 2000);
        }

        stageClearGameMsg() {
            this.stageClearMsg = new Sprite(this.game, {
                src: ['stage-clear.png'],
                height: 400,
            });

            this.stageClearMsg.el.classList.add('stage-clear');
            this.game.gameBoard.appendChild(this.stageClearMsg.el);

            setTimeout(() => {
                this.createBoxMsg();
            }, 3000);

            setTimeout(() => {
                this.stageClearMsg.el.remove();
                this.stageClearMsg = null;
            }, 4000);
        }

        createBoxMsg() {
            this.game.controlsAllowed = false;
            this.boxMsg = document.createElement('div');
            this.boxMsg.classList.add('box-msg');

            if (this.game.state === 'GAMEOVER') {
                this.boxMsg.innerHTML = `<div class="box-msg-content">
                                            <h1 style="color: #ff3200">GAME OVER</h1>
                                            <img draggable="false" src="../img/cat-game-over.png" class="cat-game-over-img" />
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
                                            <div>
                                                <a draggable="false" href="../stages/stage-1-2-test.html" class="btn-box-msg">NEXT STAGE</a>
                                                <a draggable="false" href="#" class="btn-retry btn-box-msg">RETRY</a>
                                            </div>
                                        </div>`;
                this.game.gameBoard.appendChild(this.boxMsg);
                this.btnRetry = document.querySelector('.btn-retry');
                this.game.state = 'GAMEOVER';
            }
            this.btnRetry.addEventListener('click', this.game.retry);
        }

        catThumbsUp = () => {
            this.catGameOverImg.src = '../img/cat-thumbs-up.png';
        };

        catSad = () => {
            this.catGameOverImg.src = '../img/cat-game-over.png';
        };
    }

    class Projectile extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.player = this.game.player;
            this.top =
                this.player.top +
                this.player.height / 2 -
                (this.player.height / 5.2 + (this.player.chargeValue * this.player.height) / 4.8 + (this.player.height / 4.8) * this.player.chargeValue) / 2;
            this.left = this.player.left + this.player.height * 2 * 0.875;
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.player.left + 'px';
            this.chargeType = this.player.chargeValue;
            this.el.src = `../img/${data.src[this.chargeType]}`;
            this.dmg = 2 * this.chargeType + 1;
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

            if (this.game.debugMode) this.createHitBoxDebug(this.hitBoxDebugData);
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

    class ChargeAnimation extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.game.gameBoard.appendChild(this.el);
            this.el.style.display = 'none';
        }
    }

    class Bomb extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.top = 0;
            this.left = 0;
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.game.gameBoard.appendChild(this.el);
            this.width = this.game.width;
            this.el.style.width = this.width + 'px';
        }
    }

    class Enemy extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.enemyType = Math.floor(Math.random() * 3);
            this.height = this.height + this.height * this.enemyType * 0.7;
            this.el.style.height = this.height + 'px';
            this.top = Math.floor(Math.random() * (this.game.height - this.height + 1));
            this.left = this.game.width;
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.el.src = `../img/${data.src[this.enemyType]}`;
            this.hp = this.enemyType * 2 + 3;
            this.speedX = 10 / (this.enemyType + 1);
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
                boxType: 'circle-red',
            };

            if (this.game.debugMode) this.createHitBoxDebug(this.hitBoxDebugData);
        }

        update() {
            this.left -= this.speedX;
            this.hitBox.x = this.left + this.width / 2;
            this.el.style.left = this.left + 'px';
            this.hitBoxDebugData.top = this.hitBox.y - this.hitBox.radius;
            this.hitBoxDebugData.left = this.hitBox.x - this.hitBox.radius;
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x - this.radius + 'px';
        }
    }

    class Player extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.top = (this.game.height - this.height) / 2;
            this.left = 0;
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.el.src = `../img/${data.src[0]}`;
            this.hp = 3;
            this.speedY = 0;
            this.speedX = 0;
            this.maxSpeed = 11;
            this.projectiles = [];
            this.chargingBeam = false;
            this.chargeValue = 0;
            this.chargeTimer = 0;
            this.chargeInterval = 600;
            this.bombEl = null;
            this.bombAvaliable = true;
            this.bombActive = false;
            this.bombTimer = 0;
            this.bombInterval = 350;
            this.bombCooldownInterval = 5000;
            this.game.gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;

            this.radius = 0.3 * this.height;
            this.hitBox = {
                radius: this.radius,
                y: this.top + 1.6 * this.radius,
                x: this.left + 5.0 * this.radius,
            };

            this.hitBoxDebugData = {
                height: 2 * this.hitBox.radius,
                width: 2 * this.hitBox.radius,
                top: this.hitBox.y - this.hitBox.radius,
                left: this.hitBox.x - this.hitBox.radius,
                boxType: 'circle-white',
            };

            this.chargeAnimation = new ChargeAnimation(this.game, {
                src: ['charge-1.gif', 'charge-2'],
                height: this.height + this.height / 3,
            });
            this.chargeAnimation.el.style.top = this.top - this.height / 8 + 'px';
            this.chargeAnimation.el.style.left = this.left + this.height * 2 * 0.525 + 'px';

            if (this.game.debugMode) this.createHitBoxDebug(this.hitBoxDebugData);
        }

        moviment() {
            if (this.game.keys.includes('Numpad8') && this.game.keys.includes('Numpad5')) this.speedY = 0;
            else if (this.game.keys.includes('Numpad8') && this.top > -(this.height / 8)) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('Numpad5') && this.top < this.game.height - this.height + this.height / 8) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            if (this.game.keys.includes('Numpad4') && this.game.keys.includes('Numpad6')) this.speedX = 0;
            else if (this.game.keys.includes('Numpad4') && this.left > -this.height) this.speedX = -this.maxSpeed;
            else if (this.game.keys.includes('Numpad6') && this.left < this.game.width - this.width - this.height / 12) this.speedX = this.maxSpeed;
            else this.speedX = 0;

            this.top += this.speedY;
            this.left += this.speedX;
            this.hitBox.y = this.top + 1.6 * this.radius;
            this.hitBox.x = this.left + 5.0 * this.radius;
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.hitBoxDebugData.top = this.hitBox.y - this.hitBox.radius;
            this.hitBoxDebugData.left = this.hitBox.x - this.hitBox.radius;
            if (this.hitBoxEl) this.hitBoxEl.el.style.top = this.hitBox.y - this.radius + 'px';
            if (this.hitBoxEl) this.hitBoxEl.el.style.left = this.hitBox.x - this.radius + 'px';
            this.chargeAnimation.el.style.top = this.top - this.height / 8 + 'px';
            this.chargeAnimation.el.style.left = this.left + this.height * 2 * 0.525 + 'px';
            // this.chargeAnimation.hitBox.el.el.style.top = this.top - this.height / 8 + 'px';
            // this.chargeAnimation.hitBox.el.el.style.left = this.left + this.height * 2 * 0.525 + 'px';
        }

        shooting() {
            this.projectiles.push(
                new Projectile(this.game, {
                    src: ['shoot-0.gif', 'shoot-1.gif', 'shoot-2.gif'],
                    height: this.height / 5.2 + (this.chargeValue * this.height) / 4.8 + (this.height / 4.8) * this.chargeValue,
                }),
            );
        }

        chargeBeam(deltaTime) {
            if (this.chargingBeam) {
                this.chargeTimer += deltaTime;
                if (this.chargeTimer >= this.chargeInterval && this.chargeTimer < this.chargeInterval * 2 && this.chargeValue === 0) {
                    this.chargeValue = 1;
                    this.chargeAnimation.el.style.display = 'block';
                } else if (this.chargeTimer >= this.chargeInterval * 2 && this.chargeValue === 1) {
                    this.chargeValue = 2;
                    this.chargeAnimation.el.src = '../img/charge-2.gif';
                }
            } else if (this.chargeTimer > 0) {
                this.chargedShoot();
            }
        }

        regularShoot() {
            if (this.chargeTimer < this.chargeInterval) {
                this.shooting(this.chargeValue);
                this.chargingBeam = true;
            }
        }

        chargedShoot() {
            if (this.chargeTimer >= this.chargeInterval) {
                this.shooting(this.chargeValue);
                this.chargeAnimation.el.style.display = 'none';
                this.chargeAnimation.el.src = '../img/charge-1.gif';
            }
            this.chargeTimer = 0;
            this.chargeValue = 0;
        }

        bombCooldown(deltaTime) {
            this.bombCooldownInterval -= deltaTime;
            if (this.bombCooldownInterval <= 0) {
                this.bombAvaliable = true;
                this.bombCooldownInterval = 5000;
                // const noAllowed = document.querySelector('.not-allowed');
                // noAllowed.style.display = 'none';
            }
        }

        bombAnimation(deltaTime) {
            this.bombTimer += deltaTime;
            if (this.bombTimer >= this.bombInterval) {
                this.bombActive = false;
                this.bombEl.el.remove();
                this.bombEl = null;
                this.bombTimer = 0;
            }
        }

        bombing() {
            if (!this.bombAvaliable) return;

            this.bombEl = new Bomb(this.game, {
                src: ['bomb-explosion.gif'],
                height: this.game.height,
            });

            this.bombAvaliable = false;
            this.bombActive = true;

            // boxBomb.style.cursor = 'not-allowed';
            // const cooldownBomb = document.querySelector('.cooldown-bomb');
            // cooldownBomb.style.animation = 'cooldown-efect 20s 1 linear';
            // const noAllowed = document.querySelector('.not-allowed');
            // noAllowed.style.display = 'block';
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
            this.width = this.gameBoard.getBoundingClientRect().width;
            this.height = this.gameBoard.getBoundingClientRect().height;
            this.keys = [];
            this.enemies = [];
            this.crashedEnemies = 0;
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.controlsAllowed = false;
            this.debugMode = false;
            this.hitBoxElements = [];
            this.input = new InputHandler(this);
            this.player = new Player(this, {
                src: ['cat.gif'],
                height: 120,
            });
            this.ui = new UI(this);
            this.state = '';
            this.ui.startGameMsg();
        }

        addEnemy() {
            this.enemies.push(
                new Enemy(this, {
                    src: ['planet-0.gif', 'planet-1.gif', 'planet-2.gif'],
                    height: 120,
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
            if (element.constructor.name === 'Enemy') this.enemies = arr.filter(el => !el.markForDeletion);
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

        switchDebugMode() {
            // [this.player, this.player.chargeAnimation, this.player.bombEl, ...this.player.projectiles, ...this.enemies, this.ui.startMsg, this.ui.stageClearMsg]
            [this.player, ...this.player.projectiles, ...this.enemies].forEach(sprite => {
                if (sprite) {
                    if (this.debugMode) sprite.createHitBoxDebug();
                    else sprite.removeHitBoxDebug();
                }
            });
        }

        update(deltaTime) {
            if (this.state === 'GAMEOVER' || this.state === 'PAUSED') return;

            if (this.controlsAllowed) this.player.moviment();
            if (this.controlsAllowed) this.player.chargeBeam(deltaTime);
            if (this.player.bombActive) this.player.bombAnimation(deltaTime);
            else if (!this.player.bombActive && !this.player.bombAvaliable) this.player.bombCooldown(deltaTime);
            this.player.projectiles.forEach((projectile, _, arrProjectiles) => {
                projectile.update();
                this.clearSpriteOffScreen(projectile, arrProjectiles);
            });
            this.enemies.forEach((enemy, _, arrEnemies) => {
                enemy.update();
                this.clearSpriteOffScreen(enemy, arrEnemies);
                if (this.collisionCircleCircle(this.player.hitBox, enemy.hitBox)) {
                    this.deletElement(enemy, arrEnemies);
                    if (this.state === 'GAMERUNNING') {
                        this.player.hp--;
                        this.ui.updateHeart();
                    }
                }
                this.player.projectiles.forEach((projectile, _, arrProjectiles) => {
                    if (this.collisionCircleCircle(projectile.hitBox, enemy.hitBox)) {
                        this.deletElement(projectile, arrProjectiles);
                        enemy.hp -= projectile.dmg;
                        if (enemy.hp <= 0) {
                            this.deletElement(enemy, arrEnemies);
                            this.crashedEnemies++;
                        }
                    }
                });
                if (this.player.bombActive) {
                    this.deletElement(enemy, arrEnemies);
                    this.crashedEnemies++;
                }
            });
            if (this.state === 'GAMERUNNING') {
                if (this.enemyTimer > this.enemyInterval) {
                    this.addEnemy();
                    this.enemyTimer = 0;
                } else {
                    this.enemyTimer += deltaTime;
                }
            }
            this.gameOverVerification();
        }

        retry() {
            location.reload();
        }

        gameOverVerification() {
            if (this.state !== 'GAMERUNNING') return;

            if (this.player.hp <= 0) {
                this.state = 'GAMEOVER';
                this.ui.createBoxMsg();
            } else if (this.crashedEnemies >= 10) {
                this.state = 'STAGECLEAR';
                this.ui.stageClearGameMsg();
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
        requestAnimationFrame(gameLoop);
    }

    gameLoop(0);
});
