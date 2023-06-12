'use strict';

window.addEventListener('contextmenu', e => {
    e.preventDefault();
});

window.addEventListener('load', () => {
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('.game-content').classList.remove('hidden');
    const gameBoard = document.querySelector('.game-board');
    gameBoard.classList.remove('hidden');
    const heartStatus = document.querySelector('.heart-status');
    const boxBomb = document.querySelector('.box-bomb');
    const retryMsg = document.querySelector('.retry-msg');
    const btnRetry = document.querySelector('.btn-retry');
    console.log(btnRetry);
    const imgCatGameOver = document.querySelector('.cat-game-over');
    const msgPointsFinal = document.querySelector('.points-final');

    let shotsLaunched = 0;
    let bombLaunched = 1;
    let controlsAllowed = false;
    let gameOver = false;
    let pointHpCat = 0;
    let pointQtShotHaduken = 0;
    let pointQtBomb = 0;
    let qtPointsFinal = 0;
    let stageComplete = false;

    class Sprite {
        constructor(data) {
            this.height = data.height;
            this.top = data.top;
            this.left = data.left;
            this.el = document.createElement('img');
            this.el.src = `../img/${data.src}`;
            this.el.classList.add('sprite');
            this.el.setAttribute('draggable', 'false');
            this.el.style.height = data.height + 'px';
            this.el.style.top = data.top + 'px';
            this.el.style.left = data.left + 'px';
        }
    }

    class Shot extends Sprite {
        constructor(data) {
            super(data);
            this.chargeValue = data.chargeValue;
            this.el.classList.add('shots');
            this.el.classList.add(`shot-${this.chargeValue}`);
            this.el.setAttribute('data-dmg', `${2 * this.chargeValue + 1}`);
            gameBoard.appendChild(this.el);
        }
    }

    class ChargeAnimation extends Sprite {
        constructor(data) {
            super(data);
            this.el.style.display = 'none';
            gameBoard.appendChild(this.el);
        }
    }

    class Bomb extends Sprite {
        constructor(data) {
            super(data);
            this.el.style.width = data.width + 'px';
            gameBoard.appendChild(this.el);
        }
    }

    class Player extends Sprite {
        constructor(data) {
            super(data);
            this.hp = 3;
            this.chargeValue = 0;
            this.chargeInterval;
            this.bombAvaliable = true;
            this.bombActive = false;
            this.chargeAnimation = new ChargeAnimation({
                src: 'charge-1.gif',
                height: this.height + this.height / 3,
                top: this.top - this.height / 8,
                left: this.left + this.height * 2 * 0.525,
            });
            this.el.classList.add('cat-entrance');
            gameBoard.appendChild(this.el);
        }

        shooting() {
            new Shot({
                src: `shot-${this.chargeValue}.gif`,
                height: 50 + this.chargeValue * 25,
                top: this.top + this.height / 2 - (50 + this.chargeValue * 25) / 2,
                left: this.left + this.height * 2 * 0.875,
                chargeValue: this.chargeValue,
            });
            shotsLaunched++;
        }

        chargingBeam() {
            this.chargeValue++;
            if (this.chargeValue === 1) {
                this.chargeAnimation.el.style.display = 'block';
            } else {
                this.chargeAnimation.el.src = '../img/charge-2.gif';
                this.chargeValue = 2;
            }
        }

        normalShot() {
            if (this.chargeValue === 0) {
                this.shooting(this.chargeValue);
                this.chargeInterval = setInterval(() => this.chargingBeam(), 600);
            }
        }

        chargedShot() {
            if (this.chargeValue === 0) {
                clearInterval(this.chargeInterval);
            } else {
                this.shooting(this.chargeValue);
                this.chargeAnimation.el.style.display = 'none';
                this.chargeAnimation.el.src = '../img/charge-1.gif';
                this.chargeValue = 0;
                clearInterval(this.chargeInterval);
            }
        }

        bombing() {
            if (!this.bombAvaliable || !controlsAllowed) return;

            const bomb = new Bomb({
                src: 'bomb-explosion.gif',
                height: 600,
                width: 1200,
                top: 0,
                left: 0,
            });

            this.bombAvaliable = false;
            this.bombActive = true;
            boxBomb.style.cursor = 'not-allowed';
            const cooldownBomb = document.querySelector('.cooldown-bomb');
            cooldownBomb.style.animation = 'cooldown-efect 20s 1 linear';
            const noAllowed = document.querySelector('.no-allowed');
            noAllowed.style.display = 'block';

            setTimeout(() => {
                this.bombActive = false;
                gameBoard.removeChild(bomb.el);
            }, 350);

            setTimeout(() => {
                this.bombAvaliable = true;
                boxBomb.style.cursor = 'pointer';
                cooldownBomb.style.animation = 'none';
                noAllowed.style.display = 'none';
            }, 20000);
        }
    }

    const cat = new Player({
        src: 'cat.gif',
        height: 120,
        top: (parseInt(gameBoard.style.height) - 120) / 2,
        left: 0,
    });

    const keys = [];
    const speedCat = 11;

    const movingCat = () => {
        if (!controlsAllowed) return;

        if (keys.includes('Numpad8')) {
            cat.top = cat.top - speedCat;
            cat.el.style.top = cat.top + 'px';
            cat.chargeAnimation.el.style.top = cat.top - cat.height / 8 + 'px';
        }
        if (keys.includes('Numpad5')) {
            cat.top = cat.top + speedCat;
            cat.el.style.top = cat.top + 'px';
            cat.chargeAnimation.el.style.top = cat.top - cat.height / 8 + 'px';
        }
        if (keys.includes('Numpad4')) {
            cat.left = cat.left - speedCat;
            cat.el.style.left = cat.left + 'px';
            cat.chargeAnimation.el.style.left = cat.left + cat.height * 2 * 0.525 + 'px';
        }
        if (keys.includes('Numpad6')) {
            cat.left = cat.left + speedCat;
            cat.el.style.left = cat.left + 'px';
            cat.chargeAnimation.el.style.left = cat.left + cat.height * 2 * 0.525 + 'px';
        }
    };

    window.addEventListener('keydown', ({ code }) => {
        if (!controlsAllowed) return;

        if (
            (code === 'Numpad8' ||
                code === 'Numpad5' ||
                code === 'Numpad4' ||
                code === 'Numpad6') &&
            !keys.includes(code)
        ) {
            keys.push(code);
        }
        if (code === 'KeyH' && !keys.includes(code)) {
            keys.push(code);
            cat.normalShot();
        }
        if (code === 'Space' && !keys.includes(code) && cat.bombAvaliable) {
            keys.push(code);
            cat.bombing();
        }
    });

    window.addEventListener('keyup', ({ code }) => {
        if (!controlsAllowed) return;

        const keyPressed = keys.indexOf(code);
        if (keyPressed > -1) {
            keys.splice(keyPressed, 1);
        }
        if (code === 'KeyH') {
            cat.chargedShot();
        }
    });

    const openStage = setTimeout(() => {
        const stage1_1 = document.createElement('img');
        stage1_1.src = '../img/stage_1-1.png';
        stage1_1.classList.add('stage-start');
        stage1_1.setAttribute('draggable', 'false');
        gameBoard.appendChild(stage1_1);

        setTimeout(() => {
            gameBoard.removeChild(stage1_1);
            controlsAllowed = true;
            gameLoop(/* 0 */);
            generatePlanets();
        }, 1900);
    }, 1000);

    let crashedPlanets = 0;
    let intervalPlanets = 2000;
    let generatePlanetsInterval;
    let planetsLaunched = 0;

    class Enemy extends Sprite {
        constructor(data) {
            super(data);
            this.el.classList.add('planets');
            this.el.style.animation = `move-planet ${
                +this.el.getAttribute('src').slice(14, 15) * 2 + 3 /* v */
            }s 1 linear`;
            this.el.setAttribute(
                'data-hp',
                `${+this.el.getAttribute('src').slice(14, 15) * 2 + 1}`,
            );
            gameBoard.appendChild(this.el);
        }
    }

    function generatePlanets() {
        if (gameOver || stageComplete) return;

        generatePlanetsInterval = setInterval(() => {
            const position = Math.trunc(Math.random() * 5);
            const type = Math.trunc(Math.random() * 3);
            new Enemy({
                src: `planet-${type}.gif`,
                height: 120,
                top: position * 120 - 3,
                left: 1200,
            });
            planetsLaunched++;
        }, intervalPlanets);
    }

    let shots;
    let planetsTotal;
    let planetsTotalTurn;

    function colisionShots() {
        shots = document.querySelectorAll('.shots');
        planetsTotal = document.querySelectorAll('.planets');

        for (let b = 0; b < planetsTotal.length; b++) {
            if (planetsTotal[b].offsetLeft < -55) {
                planetsTotal[b].remove();
                cat.hp--;
                planetsTotalTurn = document.querySelectorAll('.planets');

                if (cat.hp === 2) {
                    heartStatus.innerHTML = `<img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active"> <img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active">`;
                } else if (cat.hp === 1) {
                    heartStatus.innerHTML = `<img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active">`;
                } else if (cat.hp <= 0) {
                    heartStatus.innerHTML = '';
                }

                if (planetsTotalTurn.length === 0 && crashedPlanets >= 2) {
                    pointHpCat = cat.hp * 1500;
                    pointQtBomb = bombLaunched * 4000;
                    pointQtShotHaduken = shotsLaunched * 100;
                    qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken;

                    setTimeout(() => {
                        if (!gameOver) {
                            stageClear();
                        }
                    }, 2000);
                }
            }
        }

        for (let i = 0; i < shots.length; i++) {
            if (shots[i].offsetLeft > 1200) {
                shots[i].remove();
            }

            for (let j = 0; j < planetsTotal.length; j++) {
                if (shots[i] && planetsTotal[j] && !gameOver) {
                    if (
                        shots[i].classList.contains('shot-0') &&
                        shots[i].offsetLeft <= planetsTotal[j].offsetLeft + 70 &&
                        shots[i].offsetLeft + 5 >= planetsTotal[j].offsetLeft &&
                        shots[i].offsetTop <= planetsTotal[j].offsetTop + 98 &&
                        shots[i].offsetTop + 22 >= planetsTotal[j].offsetTop
                    ) {
                        planetColision(i, j);
                    } else if (
                        shots[i].classList.contains('shot-1') &&
                        shots[i].offsetLeft <= planetsTotal[j].offsetLeft + 70 &&
                        shots[i].offsetLeft + 75 >= planetsTotal[j].offsetLeft &&
                        shots[i].offsetTop <= planetsTotal[j].offsetTop + 98 &&
                        shots[i].offsetTop + 44 >= planetsTotal[j].offsetTop
                    ) {
                        planetColision(i, j);
                    } else if (
                        shots[i].classList.contains('shot-2') &&
                        shots[i].offsetLeft <= planetsTotal[j].offsetLeft + 70 &&
                        shots[i].offsetLeft + 75 >= planetsTotal[j].offsetLeft &&
                        shots[i].offsetTop <= planetsTotal[j].offsetTop + 98 &&
                        shots[i].offsetTop + 72 >= planetsTotal[j].offsetTop
                    ) {
                        planetColision(i, j);
                    }
                }
            }
        }
    }

    function planetColision(a, b) {
        planetsTotal[b].setAttribute(
            'data-hp',
            `${String(Number(planetsTotal[b].dataset.hp) - Number(shots[a].dataset.dmg))}`,
        );
        shots[a].remove();

        if (Number(planetsTotal[b].dataset.hp) <= 0) {
            planetsTotal[b].remove();
            crashedPlanets++;
            planetsTotalTurn = document.querySelectorAll('.planets');

            if (crashedPlanets === 10) {
                clearInterval(generatePlanetsInterval);
                intervalPlanets = 1500;
                generatePlanets();
            } else if (crashedPlanets === 20) {
                clearInterval(generatePlanetsInterval);
                intervalPlanets = 1000;
                generatePlanets();
            } else if (crashedPlanets === 35) {
                clearInterval(generatePlanetsInterval);
            }

            if (crashedPlanets >= 35 && planetsTotalTurn.length === 0) {
                pointHpCat = cat.hp * 1500;
                pointQtBomb = bombLaunched * 4000;
                pointQtShotHaduken = shotsLaunched * 100;
                qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken;

                setTimeout(() => {
                    if (!gameOver) {
                        stageClear();
                    }
                }, 2000);
            }
        }
    }

    function colisionBomb() {
        if (cat.bombActive) {
            for (let j = 0; j < planetsTotal.length; j++) {
                planetsTotal[j].remove();
                crashedPlanets++;
                planetsTotalTurn = document.querySelectorAll('.planets');

                if (crashedPlanets === 10) {
                    clearInterval(generatePlanetsInterval);
                    intervalPlanets = 1500;
                    generatePlanets();
                } else if (crashedPlanets === 20) {
                    clearInterval(generatePlanetsInterval);
                    intervalPlanets = 1000;
                    generatePlanets();
                } else if (crashedPlanets === 35) {
                    clearInterval(generatePlanetsInterval);
                }

                if (crashedPlanets >= 2 && planetsTotalTurn.length === 0) {
                    pointHpCat = cat.hp * 1500;
                    pointQtBomb = bombLaunched * 4000;
                    pointQtShotHaduken = shotsLaunched * 100;
                    qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken;

                    setTimeout(() => {
                        if (!gameOver) {
                            stageClear();
                        }
                    }, 2000);
                }
            }
        }
    }

    function stageClear() {
        const missionComplete = document.createElement('img');
        missionComplete.src = '../img/stage-clear.png';
        missionComplete.classList.add('stage-clear');
        missionComplete.setAttribute('draggable', 'false');
        gameBoard.appendChild(missionComplete);

        cat.chargedShot();
        stageComplete = true;
        controlsAllowed = false;

        setTimeout(() => {
            gameBoard.removeChild(missionComplete);
        }, 3500);

        setTimeout(() => {
            //   msgPointsFinal.innerHTML = `<h2>POINTS:</h1> <br>
            //                                 <h2>HP:.....${pointHpCat}pts</h2>
            //                                 <h2>BOMB:...${pointQtBomb}pts</h2>
            //                                 <h2>SHOTS:..${pointQtShotHaduken}pts</h2>
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

    function gameOverVerification() {
        if (gameOver) return;

        if (cat.hp <= 0 || stageComplete) {
            clearInterval(generatePlanetsInterval);
            gameOver = true;

            for (let j = 0; j < planetsTotal.length; j++)
                planetsTotal[j].style.animationPlayState = 'paused';

            if (gameOver && cat.hp <= 0) {
                for (let i = 0; i < shots.length; i++) shots[i].style.animationPlayState = 'paused';

                cat.chargeAnimation.el.style.display = 'none';
                clearInterval(cat.chargeInterval);
                retryMsg.classList.remove('hidden');
                controlsAllowed = false;
            }
        }
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

    boxBomb.addEventListener('click', cat.bombing.bind(cat));
    btnRetry.addEventListener('mouseover', catThumbsUp);
    btnRetry.addEventListener('mouseout', catSad);
    btnRetry.addEventListener('click', retry);
    document.querySelector('.retry-retry').addEventListener('click', retry);

    class Game {
        constructor() {}
    }

    // let lastTime;

    function gameLoop(/* timeStamp */) {
        // const deltaTime = timeStamp - lastTime;
        // lastTime = timeStamp;
        colisionShots();
        colisionBomb();
        gameOverVerification();
        movingCat();
        requestAnimationFrame(gameLoop);
    }
});
