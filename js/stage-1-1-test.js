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
                    this.game.player.regularShoot();
                }
                if (e.code === 'Space') {
                    e.preventDefault();
                    if (!this.game.keys.includes(e.code)) {
                        this.game.keys.push(e.code);
                        this.game.player.bombing();
                    }
                }
            });
            window.addEventListener('keyup', ({ code }) => {
                const keyPressed = this.game.keys.indexOf(code);
                if (keyPressed > -1) {
                    this.game.keys.splice(keyPressed, 1);
                }
                if (code === 'KeyH') {
                    this.game.player.chargedShoot();
                }
            });
        }
    }

    class Sprite {
        constructor(game, data) {
            this.game = game;
            this.height = data.height;
            this.top = data.top;
            this.left = data.left;
            this.el = document.createElement('img');
            this.el.src = `../img/${data.src}`;
            this.el.classList.add('sprite');
            this.el.setAttribute('draggable', 'false');
            this.el.style.height = this.height + 'px';
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
        }
    }

    class UI {
        constructor(game) {
            this.game = game;
            this.startMsg = null;
            this.stageClearMsg = null;
            this.boxMsg = null;
            this.catGameOverImg = null;
            this.btnRetry = null;
        }

        startGameMsg() {
            this.startMsg = new Sprite(this.game, {
                src: 'stage_1-1.png',
                height: 350,
            });

            this.startMsg.el.classList.add('stage-start');
            this.game.gameBoard.appendChild(this.startMsg.el);

            setTimeout(() => {
                this.startMsg.el.remove();
                this.startMsg = null;
                this.game.controlsAllowed = true;
            }, 2000);
        }

        stageClearGameMsg() {
            this.stageClearMsg = new Sprite(this.game, {
                src: 'stage-clear.png',
                height: 400,
            });

            this.stageClearMsg.el.classList.add('stage-clear');
            this.game.gameBoard.appendChild(this.stageClearMsg.el);
            this.game.stageComplete = true;

            setTimeout(() => {
                this.createBoxMsg('STAGECLEAR');
            }, 3000);

            setTimeout(() => {
                this.stageClearMsg.el.remove();
                this.stageClearMsg = null;
            }, 4000);
        }

        createBoxMsg(state) {
            this.game.player.chargedShoot();
            this.game.controlsAllowed = false;
            this.boxMsg = document.createElement('div');
            this.boxMsg.classList.add('box-msg');

            if (state === 'GAMEOVER') {
                this.boxMsg.innerHTML = `<div class="box-msg-content">
                            <h1 class="text-game-over">GAME OVER</h1>
                            <img draggable="false" src="../img/cat-game-over.png" class="cat-game-over-img" />
                            <a href="#" class="btn-retry btn-box-msg">TRY AGAIN!!</a>
                        </div>`;
                this.game.gameBoard.appendChild(this.boxMsg);
                this.catGameOverImg = document.querySelector('.cat-game-over-img');
                this.btnRetry = document.querySelector('.btn-retry');
                this.btnRetry.addEventListener('mouseover', this.catThumbsUp);
                this.btnRetry.addEventListener('mouseout', this.catSad);
            } else if (state === 'STAGECLEAR') {
                this.boxMsg.innerHTML = `<div class="box-msg-content">
                            <h1 class="text-stage-clear">STAGE CLEAR</h1>
                            <h2>HP:........1000pts</h2>
                            <h2>BOMB:......1000pts</h2>
                            <h2>SHOOTS:....1000pts</h2>
                            <h1>TOTAL:..3000pts</h1>
                            <div>
                                <a href="../stages/stage-1-2-test.html" class="btn-box-msg">NEXT STAGE</a>
                                <a href="#" class="btn-retry btn-box-msg">RETRY</a>
                            </div>
                        </div>`;
                this.game.gameBoard.appendChild(this.boxMsg);
                this.btnRetry = document.querySelector('.btn-retry');
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
            this.chargeType = data.chargeType;
            this.dmg = 2 * this.chargeType + 1;
            this.speedX = 14 + this.chargeType * 2;
            this.markForDeletion = false;
            this.game.gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
        }

        update() {
            this.left += this.speedX;
            this.el.style.left = this.left + 'px';
        }
    }

    class ChargeAnimation extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.el.style.display = 'none';
            this.game.gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
        }
    }

    class Bomb extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.width = data.width;
            this.el.style.width = this.width + 'px';
            this.game.gameBoard.appendChild(this.el);
        }
    }

    class Player extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.hp = 1;
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
            this.chargeAnimation = new ChargeAnimation(this.game, {
                src: 'charge-1.gif',
                height: this.height + this.height / 3,
                top: this.top - this.height / 8,
                left: this.left + this.height * 2 * 0.525,
            });
            this.game.gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
        }

        moviment() {
            if (!this.game.controlsAllowed) return;

            if (this.game.keys.includes('Numpad8') && this.game.keys.includes('Numpad5')) this.speedY = 0;
            else if (this.game.keys.includes('Numpad8')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('Numpad5')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            if (this.game.keys.includes('Numpad4') && this.game.keys.includes('Numpad6')) this.speedX = 0;
            else if (this.game.keys.includes('Numpad4')) this.speedX = -this.maxSpeed;
            else if (this.game.keys.includes('Numpad6')) this.speedX = this.maxSpeed;
            else this.speedX = 0;

            this.top += this.speedY;
            this.left += this.speedX;
            this.el.style.top = this.top + 'px';
            this.el.style.left = this.left + 'px';
            this.chargeAnimation.el.style.top = this.top - this.height / 8 + 'px';
            this.chargeAnimation.el.style.left = this.left + this.height * 2 * 0.525 + 'px';
        }

        shooting(type) {
            this.projectiles.push(
                new Projectile(this.game, {
                    src: `shoot-${type}.gif`,
                    height: 50 + type * 25,
                    top: this.top + this.height / 2 - (50 + type * 25) / 2,
                    left: this.left + this.height * 2 * 0.875,
                    chargeType: type,
                }),
            );
        }

        chargeBeam(deltaTime) {
            this.chargeTimer += deltaTime;
            if (this.chargeTimer >= this.chargeInterval && this.chargeTimer < this.chargeInterval * 2 && this.chargeValue === 0) {
                this.chargeValue = 1;
                this.chargeAnimation.el.style.display = 'block';
            } else if (this.chargeTimer >= this.chargeInterval * 2 && this.chargeValue === 1) {
                this.chargeValue = 2;
                this.chargeAnimation.el.src = '../img/charge-2.gif';
            }
        }

        regularShoot() {
            if (!this.game.controlsAllowed) return;

            if (this.chargeTimer < this.chargeInterval) {
                this.shooting(this.chargeValue);
                this.chargingBeam = true;
            }
        }

        chargedShoot() {
            if (!this.game.controlsAllowed) return;

            if (this.chargeTimer >= this.chargeInterval) {
                this.shooting(this.chargeValue);
                this.chargeAnimation.el.style.display = 'none';
                this.chargeAnimation.el.src = '../img/charge-1.gif';
            }

            this.chargingBeam = false;
            this.chargeTimer = 0;
            this.chargeValue = 0;
        }

        bombCooldown(deltaTime) {
            this.bombCooldownInterval -= deltaTime;
            if (this.bombCooldownInterval <= 0) {
                this.bombAvaliable = true;
                this.bombCooldownInterval = 5000;
                const noAllowed = document.querySelector('.no-allowed');
                noAllowed.style.display = 'none';
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
            if (!this.bombAvaliable || !this.game.controlsAllowed) return;

            this.bombEl = new Bomb(this.game, {
                src: 'bomb-explosion.gif',
                height: this.game.height,
                width: this.game.width,
                top: 0,
                left: 0,
            });

            this.bombAvaliable = false;
            this.bombActive = true;

            // boxBomb.style.cursor = 'not-allowed';
            // const cooldownBomb = document.querySelector('.cooldown-bomb');
            // cooldownBomb.style.animation = 'cooldown-efect 20s 1 linear';
            const noAllowed = document.querySelector('.no-allowed');
            noAllowed.style.display = 'block';
        }
    }

    class Enemy extends Sprite {
        constructor(game, data) {
            super(game, data);
            this.enemyType = data.enemyType;
            this.hp = this.enemyType * 2 + 1;
            this.speedX = 10 / (this.enemyType + 1);
            this.markForDeletion = false;
            this.game.gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
        }

        update() {
            this.left -= this.speedX;
            this.el.style.left = this.left + 'px';
        }
    }

    class Game {
        constructor() {
            document.querySelector('.loading').remove();
            document.querySelector('.game-content').classList.remove('hidden');
            this.gameBoard = document.querySelector('.game-board');
            this.gameBoard.classList.remove('hidden');
            this.width = this.gameBoard.getBoundingClientRect().width;
            this.height = this.gameBoard.getBoundingClientRect().height;
            this.ui = new UI(this);
            this.input = new InputHandler(this);
            this.player = new Player(this, {
                src: 'cat.gif',
                height: 120,
                top: (this.height - 120) / 2,
                left: 0,
            });
            this.keys = [];
            this.enemies = [];
            this.crashedEnemies = 2;
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.controlsAllowed = false;
            this.gameOver = false;
            this.stageComplete = false;
            this.state = 'STARTSTAGE';
            this.ui.startGameMsg();
        }

        addEnemy() {
            const position = Math.trunc(Math.random() * 5);
            const type = Math.trunc(Math.random() * 3);
            this.enemies.push(
                new Enemy(this, {
                    src: `planet-${type}.gif`,
                    height: 120,
                    top: position * 120 - 3,
                    left: this.width,
                    enemyType: type,
                }),
            );
        }

        clearEnemiesOffScreen() {
            this.enemies = this.enemies.filter(enemy => {
                if (enemy.left + 120 < 0) {
                    this.deletElement(enemy);
                }
                return !enemy.markForDeletion;
            });
        }

        clearShootsOffScreen() {
            this.player.projectiles = this.player.projectiles.filter(projectile => {
                if (projectile.left > this.width) {
                    this.deletElement(projectile);
                }
                return !projectile.markForDeletion;
            });
        }

        checkCollision(rect1, rect2) {
            return (
                rect1.left < rect2.left + rect2.width &&
                rect1.left + rect1.width > rect2.left &&
                rect1.top < rect2.top + rect2.height &&
                rect1.top + rect1.height > rect2.top
            );
        }

        update(deltaTime) {
            this.player.moviment();
            if (this.player.chargingBeam) this.player.chargeBeam(deltaTime);
            if (this.player.bombActive) this.player.bombAnimation(deltaTime);
            else if (!this.player.bombActive && !this.player.bombAvaliable) this.player.bombCooldown(deltaTime);
            this.player.projectiles.forEach(projectile => {
                projectile.update();
                this.clearShootsOffScreen();
            });
            this.enemies.forEach(enemy => {
                enemy.update();
                this.clearEnemiesOffScreen();
                if (this.checkCollision(this.player, enemy)) {
                    this.deletElement(enemy);
                    this.player.hp--;
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)) {
                        this.deletElement(projectile);
                        enemy.hp -= projectile.dmg;
                        if (enemy.hp <= 0) {
                            this.deletElement(enemy);
                            this.crashedEnemies++;
                        }
                    }
                });
                if (this.player.bombActive) {
                    this.deletElement(enemy);
                    this.crashedEnemies++;
                }
            });
            if (!this.gameOver && !this.stageComplete && this.controlsAllowed) {
                if (this.enemyTimer > this.enemyInterval) {
                    this.addEnemy();
                    this.enemyTimer = 0;
                } else {
                    this.enemyTimer += deltaTime;
                }
            }
            this.gameOverVerification();
        }

        deletElement(el) {
            el.markForDeletion = true;
            el.el.remove();
        }

        retry() {
            location.reload();
        }

        gameOverVerification() {
            if (this.gameOver || this.stageComplete) return;

            if (this.player.hp <= 0) {
                this.gameOver = true;
                this.ui.createBoxMsg('GAMEOVER');
            } else if (this.crashedEnemies >= 3) {
                this.stageComplete = true;
                this.ui.stageClearGameMsg();
            }
        }
    }

    const game = new Game();

    let lastTime = 0;

    function gameLoop(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        requestAnimationFrame(gameLoop);
    }

    gameLoop(0);
});
