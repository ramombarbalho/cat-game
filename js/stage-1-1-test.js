'use strict';

window.addEventListener('contextmenu', e => {
    e.preventDefault();
});

window.addEventListener('load', () => {
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('.game-content').classList.remove('hidden');
    const gameBoard = document.querySelector('.game-board');
    gameBoard.classList.remove('hidden');
    const boxBomb = document.querySelector('.box-bomb');
    const retryMsg = document.querySelector('.retry-msg');
    const btnRetry = document.querySelector('.btn-retry');
    const imgCatGameOver = document.querySelector('.cat-game-over');
    const msgPointsFinal = document.querySelector('.points-final');

    let qtPointsFinal = 0;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', ({ code }) => {
                if ((code === 'Numpad8' || code === 'Numpad5' || code === 'Numpad4' || code === 'Numpad6') && !this.game.keys.includes(code)) {
                    this.game.keys.push(code);
                }
                if (code === 'KeyH' && !this.game.keys.includes(code)) {
                    this.game.keys.push(code);
                    this.game.player.regularShoot();
                }
                if (code === 'Space' && !this.game.keys.includes(code) && this.game.player.bombAvaliable) {
                    this.game.keys.push(code);
                    this.game.player.bombing();
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
        constructor(data) {
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

    class Projectile extends Sprite {
        constructor(data) {
            super(data);
            this.chargeType = data.chargeType;
            this.dmg = 2 * this.chargeType + 1;
            this.speedX = 14 + this.chargeType * 2;
            this.markForDeletion = false;
            gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
        }

        update() {
            this.left += this.speedX;
            this.el.style.left = this.left + 'px';
        }
    }

    class ChargeAnimation extends Sprite {
        constructor(data) {
            super(data);
            this.el.style.display = 'none';
            gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
        }
    }

    class Bomb extends Sprite {
        constructor(data) {
            super(data);
            this.width = data.width;
            this.el.style.width = this.width + 'px';
            gameBoard.appendChild(this.el);
        }
    }

    class Player extends Sprite {
        constructor(game, data) {
            super(data);
            this.game = game;
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
            this.bombCooldownInterval = 10000;
            this.chargeAnimation = new ChargeAnimation({
                src: 'charge-1.gif',
                height: this.height + this.height / 3,
                top: this.top - this.height / 8,
                left: this.left + this.height * 2 * 0.525,
            });
            this.el.classList.add('cat-entrance');
            gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
        }

        moviment() {
            if (!game.controlsAllowed) return;

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
                new Projectile({
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
            if (!game.controlsAllowed) return;

            if (this.chargeTimer < this.chargeInterval) {
                this.shooting(this.chargeValue);
                this.chargingBeam = true;
            }
        }

        chargedShoot() {
            if (!game.controlsAllowed) return;

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
                this.bombCooldownInterval = 10000;
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
            if (!this.bombAvaliable || !game.controlsAllowed) return;

            this.bombEl = new Bomb({
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
            // const noAllowed = document.querySelector('.no-allowed');
            // noAllowed.style.display = 'block';
        }
    }

    class Enemy extends Sprite {
        constructor(data) {
            super(data);
            this.enemyType = data.enemyType;
            this.hp = this.enemyType * 2 + 1;
            this.speedX = 10 / (this.enemyType + 1);
            this.markForDeletion = false;
            gameBoard.appendChild(this.el);
            this.width = this.el.getBoundingClientRect().width;
        }

        update() {
            this.left -= this.speedX;
            this.el.style.left = this.left + 'px';
        }
    }

    class Game {
        constructor() {
            this.width = gameBoard.getBoundingClientRect().width;
            this.height = gameBoard.getBoundingClientRect().height;
            this.input = new InputHandler(this);
            this.player = new Player(this, {
                src: 'cat.gif',
                height: 120,
                top: (this.height - 120) / 2,
                left: 0,
            });
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.controlsAllowed = false;
            this.gameOver = false;
            this.stageComplete = false;
        }

        addEnemy() {
            const position = Math.trunc(Math.random() * 5);
            const type = Math.trunc(Math.random() * 3);
            this.enemies.push(
                new Enemy({
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
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)) {
                        this.deletElement(projectile);
                        enemy.hp -= projectile.dmg;
                        if (enemy.hp <= 0) {
                            this.deletElement(enemy);
                        }
                    }
                });
                if (this.player.bombActive) {
                    this.deletElement(enemy);
                }
            });
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.gameOverVerification();
        }

        deletElement(el) {
            el.markForDeletion = true;
            el.el.remove();
        }

        gameOverVerification() {
            if (this.gameOver) return;

            if (this.player.hp <= 0 || this.stageComplete) {
                this.gameOver = true;
                this.player.chargeAnimation.el.style.display = 'none';
                retryMsg.classList.remove('hidden');
                this.controlsAllowed = false;
            }
        }
    }

    const game = new Game();

    const openStage = setTimeout(() => {
        const stage1_1 = document.createElement('img');
        stage1_1.src = '../img/stage_1-1.png';
        stage1_1.classList.add('stage-start');
        stage1_1.setAttribute('draggable', 'false');
        gameBoard.appendChild(stage1_1);

        setTimeout(() => {
            gameBoard.removeChild(stage1_1);
            game.controlsAllowed = true;
            gameLoop(0);
        }, 1900);
    }, 1000);

    function stageClear() {
        const missionComplete = document.createElement('img');
        missionComplete.src = '../img/stage-clear.png';
        missionComplete.classList.add('stage-clear');
        missionComplete.setAttribute('draggable', 'false');
        gameBoard.appendChild(missionComplete);

        this.player.chargeAnimation.el.style.display = 'none';
        game.stageComplete = true;
        game.controlsAllowed = false;

        setTimeout(() => {
            gameBoard.removeChild(missionComplete);
        }, 3500);

        setTimeout(() => {
            //   msgPointsFinal.innerHTML = `<h2>POINTS:</h1> <br>
            //                                 <h2>HP:.....${pointHpCat}pts</h2>
            //                                 <h2>BOMB:...${pointQtBomb}pts</h2>
            //                                 <h2>SHoOTS:..${pointQtShootHaduken}pts</h2>
            //                                 <h1>TOTAL: ${qtPointsFinal}pts</h1>
            //                                 <a draggable="false" href="../stages/stage-1-2-test.html" class="butnstage-complete">NEXT STAGE</a>
            //                                 <a draggable="false" href="#" class="butnstage-complete" onclick="retry()">RETRY</a>`;

            msgPointsFinal.classList.remove('hidden');

            if (qtPointsFinal >= 10000) {
                const perfectStage = document.createElement('img');
                perfectStage.src = '../img/cat-perfect-stage.jpg';
                perfectStage.classList.add('perfect-stage');
                perfectStage.setAttribute('draggable', 'false');
                msgPointsFinal.appendChild(perfectStage);

                const perfectStageMsg = document.createElement('div');
                perfectStageMsg.classList.add('perfect-stage-msg');
                perfectStageMsg.innerHTML = `<h2><b>YOU ARE AWESOME!!</b></h2>`;
                msgPointsFinal.appendChild(perfectStageMsg);
            }
        }, 3000);
    }

    function catThumbsUp() {
        imgCatGameOver.src = '../img/cat-thumbs-up.png';
    }

    function catSad() {
        imgCatGameOver.src = '../img/cat-game-over.png';
    }

    function retry() {
        location.reload();
    }

    boxBomb.addEventListener('click', game.player.bombing.bind(game.player));
    btnRetry.addEventListener('mouseover', catThumbsUp);
    btnRetry.addEventListener('mouseout', catSad);
    btnRetry.addEventListener('click', retry);
    document.querySelector('.retry-retry').addEventListener('click', retry);

    let lastTime = 0;

    function gameLoop(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        requestAnimationFrame(gameLoop);
    }
});
