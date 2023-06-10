'use strict';

window.addEventListener('contextmenu', e => {
    e.preventDefault();
});

window.addEventListener('load', () => {
    // Declarações iniciais

    const loadingGame = document.querySelector('.loading');
    loadingGame.classList.add('hidden');
    const gameBoard = document.querySelector('.game-board');
    gameBoard.classList.remove('hidden');
    const gameStatus = document.querySelector('.game-status');
    gameStatus.classList.remove('hidden');
    const heartStatus = document.querySelector('.heart-status');
    const boxBomb = document.querySelector('.box-bomb');
    const cat = document.querySelector('.cat');
    // const shadowMove = document.querySelector('.shadow-move');
    const chargeAnimations = [
        document.querySelector('.charge1'),
        document.querySelector('.charge2'),
    ];
    const txtQtShotHaduken = document.querySelector('.qt-shot-haduken');
    const retryMsg = document.querySelector('.retry-msg');
    const btnRetry = document.querySelector('.button-retry');
    const imgCatGameOver = document.querySelector('.cat-game-over');
    const msgPointsFinal = document.querySelector('.points-final');

    let hpCat = 3;
    let chargeValue = 0;
    let chargeInterval;
    let qtShotHaduken = 150;
    txtQtShotHaduken.innerHTML = `${qtShotHaduken}`;
    let bomb = true;
    let qtBomb = 1;
    let bombValue = 0;
    let controlsAllowed = false;
    let gameOver = false;
    let pointHpCat = 0;
    let pointQtShotHaduken = 0;
    let pointQtBomb = 0;
    let qtPointsFinal = 0;
    let stageComplete = false;

    // Funções que fazem a movimentação do personagem com o mouse

    function shooting() {
        const shot = document.createElement('img');
        shot.src = `../img/shot-${chargeValue}.gif`;
        shot.classList.add('shots');
        shot.classList.add(`shot-${chargeValue}`);
        shot.style.top = `${
            parseInt(cat.style.top, 10) + (40 - chargeValue * 15)
        }px`;
        shot.style.left = `${parseInt(cat.style.left, 10) + 200}px`;
        shot.setAttribute('data-dmg', `${2 * chargeValue + 1}`);
        shot.setAttribute('draggable', 'false');
        gameBoard.appendChild(shot);
        qtShotHaduken--;
        txtQtShotHaduken.innerHTML = `${qtShotHaduken}`;
    }

    function normalShot() {
        if (chargeValue === 0) {
            shooting(chargeValue);
            chargeInterval = setInterval(chargingBeam, 600);
        }
    }

    function chargeShot() {
        if (chargeValue === 0) {
            clearInterval(chargeInterval);
        } else {
            shooting(chargeValue);
            chargeAnimations[chargeValue - 1].style.display = 'none';
            chargeValue = 0;
            clearInterval(chargeInterval);
        }
    }

    function chargingBeam() {
        chargeValue++;
        if (chargeValue === 1) {
            chargeAnimations[0].style.display = 'block';
        } else {
            chargeValue = 2;
            chargeAnimations[0].style.display = 'none';
            chargeAnimations[1].style.display = 'block';
        }
    }

    function bombing() {
        if (!bomb || !controlsAllowed) return;

        bombValue = 1;
        const explosionBomb = document.createElement('img');
        explosionBomb.src = '../img/bomb-explosion.gif';
        explosionBomb.classList.add('bomb-explosion');
        explosionBomb.setAttribute('draggable', 'false');
        gameBoard.appendChild(explosionBomb);
        bomb = false;
        boxBomb.style.cursor = 'not-allowed';
        const cooldownBomb = document.querySelector('.cooldown-bomb');
        cooldownBomb.style.animation = 'cooldown-efect 20s 1 linear';
        const noAllowed = document.querySelector('.no-allowed');
        noAllowed.style.display = 'block';

        setTimeout(() => {
            bombValue = 0;
            gameBoard.removeChild(explosionBomb);
        }, 350);

        setTimeout(() => {
            boxBomb.style.cursor = 'pointer';
            cooldownBomb.style.animation = 'none';
            noAllowed.style.display = 'none';
            bomb = true;
        }, 20000);
    }

    /* let gameRunning = true;

function pauseGame() {

    if (gameRunning) {

        for (let i = 0; i < shots.length; i++) shots[i].style.animationPlayState = 'paused';
        for (let j = 0; j < planetsTotal.length; j++) planetsTotal[j].style.animationPlayState = 'paused';
        if (moonBoss) moonBoss.animationPlayState = 'paused';
        controlsAllowed = false;
        gameRunning = false;

    } else {

        for (let i = 0; i < shots.length; i++) shots[i].style.animationPlayState = 'running';
        for (let j = 0; j < planetsTotal.length; j++) planetsTotal[j].style.animationPlayState = 'running';
        if (moonBoss) moonBoss.animationPlayState = 'running';
        controlsAllowed = true;
        gameRunning = true;

    }

} */

    const keys = [];
    const speedCat = 12;

    const movingCat = () => {
        if (!controlsAllowed) return;

        if (keys.includes('Numpad8')) {
            cat.style.top = parseInt(cat.style.top, 10) - speedCat + 'px';
            chargeAnimations[0].style.top =
                parseInt(cat.style.top, 10) - 20 + 'px';
            chargeAnimations[1].style.top =
                parseInt(cat.style.top, 10) - 20 + 'px';
        }
        if (keys.includes('Numpad5')) {
            cat.style.top = parseInt(cat.style.top, 10) + speedCat + 'px';
            chargeAnimations[0].style.top =
                parseInt(cat.style.top, 10) - 20 + 'px';
            chargeAnimations[1].style.top =
                parseInt(cat.style.top, 10) - 20 + 'px';
        }
        if (keys.includes('Numpad4')) {
            cat.style.left = parseInt(cat.style.left, 10) - speedCat + 'px';
            chargeAnimations[0].style.left =
                parseInt(cat.style.left, 10) + 130 + 'px';
            chargeAnimations[1].style.left =
                parseInt(cat.style.left, 10) + 130 + 'px';
        }
        if (keys.includes('Numpad6')) {
            cat.style.left = parseInt(cat.style.left, 10) + speedCat + 'px';
            chargeAnimations[0].style.left =
                parseInt(cat.style.left, 10) + 130 + 'px';
            chargeAnimations[1].style.left =
                parseInt(cat.style.left, 10) + 130 + 'px';
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
            normalShot();
        }
        if (code === 'Space' && !keys.includes(code) && bomb) {
            keys.push(code);
            bombing();
        }
        // if (code === 'Enter' && retryMsg.style.display === 'block') {
        //     location.reload();
        // }
    });

    window.addEventListener('keyup', ({ code }) => {
        if (!controlsAllowed) return;

        const keyPressed = keys.indexOf(code);
        if (keyPressed > -1) {
            keys.splice(keyPressed, 1);
        }
        if (code === 'KeyH') {
            chargeShot();
        }
    });

    // Padrão Stage 1-1

    const openStage = setTimeout(() => {
        const stage1_1 = document.createElement('img');
        stage1_1.src = '../img/stage_1-1.png';
        stage1_1.classList.add('stage-start');
        stage1_1.setAttribute('draggable', 'false');
        gameBoard.appendChild(stage1_1);

        setTimeout(() => {
            gameBoard.removeChild(stage1_1);
            controlsAllowed = true;
            gameLoop();
            generatePlanets();
        }, 1900);
    }, 1000);

    // Declarações dos sprites

    let planetPosition;
    let planetType;
    let crashedPlanets = 0;
    let intervalPlanets = 2000;
    let generatePlanetsInterval;
    let planetsLaunched = 0;

    function planetGenerator(t, p, v) {
        const planetEnemy = document.createElement('img');
        planetEnemy.src = `../img/planet-${t}.gif`;
        planetEnemy.classList.add('planets');
        planetEnemy.style.top = `${p * 120 - 3}px`;
        planetEnemy.style.animation = `move-planet ${t * 2 + 3 - v}s 1 linear`;
        planetEnemy.setAttribute('data-hp', `${t * 2 + 1}`);
        planetEnemy.setAttribute('draggable', 'false');
        gameBoard.appendChild(planetEnemy);
        planetsLaunched++;
    }

    function generatePlanets() {
        if (gameOver || stageComplete) return;

        generatePlanetsInterval = setInterval(() => {
            planetPosition = Math.trunc(Math.random() * 5);
            planetType = Math.trunc(Math.random() * 3);
            planetGenerator(planetType, planetPosition, 0);
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
                hpCat--;
                planetsTotalTurn = document.querySelectorAll('.planets');

                if (hpCat === 2) {
                    heartStatus.innerHTML = `<img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active"> <img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active">`;
                } else if (hpCat === 1) {
                    heartStatus.innerHTML = `<img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active">`;
                } else if (hpCat <= 0) {
                    heartStatus.innerHTML = '';
                }

                if (planetsTotalTurn.length === 0 && crashedPlanets >= 2) {
                    pointHpCat = hpCat * 1500;
                    pointQtBomb = qtBomb * 4000;
                    pointQtShotHaduken = qtShotHaduken * 100;
                    qtPointsFinal =
                        pointHpCat + pointQtBomb + pointQtShotHaduken;

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
                        shots[i].offsetLeft <=
                            planetsTotal[j].offsetLeft + 70 &&
                        shots[i].offsetLeft + 5 >= planetsTotal[j].offsetLeft &&
                        shots[i].offsetTop <= planetsTotal[j].offsetTop + 98 &&
                        shots[i].offsetTop + 22 >= planetsTotal[j].offsetTop
                    ) {
                        planetColision(i, j);
                    } else if (
                        shots[i].classList.contains('shot-1') &&
                        shots[i].offsetLeft <=
                            planetsTotal[j].offsetLeft + 70 &&
                        shots[i].offsetLeft + 75 >=
                            planetsTotal[j].offsetLeft &&
                        shots[i].offsetTop <= planetsTotal[j].offsetTop + 98 &&
                        shots[i].offsetTop + 44 >= planetsTotal[j].offsetTop
                    ) {
                        planetColision(i, j);
                    } else if (
                        shots[i].classList.contains('shot-2') &&
                        shots[i].offsetLeft <=
                            planetsTotal[j].offsetLeft + 70 &&
                        shots[i].offsetLeft + 75 >=
                            planetsTotal[j].offsetLeft &&
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
            `${String(
                Number(planetsTotal[b].dataset.hp) -
                    Number(shots[a].dataset.dmg),
            )}`,
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
                pointHpCat = hpCat * 1500;
                pointQtBomb = qtBomb * 4000;
                pointQtShotHaduken = qtShotHaduken * 100;
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
        if (bombValue === 1) {
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
                    pointHpCat = hpCat * 1500;
                    pointQtBomb = qtBomb * 4000;
                    pointQtShotHaduken = qtShotHaduken * 100;
                    qtPointsFinal =
                        pointHpCat + pointQtBomb + pointQtShotHaduken;

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

        chargeShot();
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
            //                                 <a draggable="false" href="../stages/stage-1-2-test.html" class="button-stage-complete">NEXT STAGE</a>
            //                                 <a draggable="false" href="#" class="button-stage-complete" onclick="retry()">RETRY</a>`;

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

    // Verificação Game Over

    function catThumbsUp() {
        imgCatGameOver.src = '../img/cat-thumbs-up.png';
    }

    function catSad() {
        imgCatGameOver.src = '../img/cat-game-over.png';
    }

    function gameOverVerification() {
        if (gameOver) return;

        if (hpCat <= 0 || stageComplete) {
            gameOver = true;

            for (let j = 0; j < planetsTotal.length; j++)
                planetsTotal[j].style.animationPlayState = 'paused';

            if (gameOver && hpCat <= 0) {
                for (let i = 0; i < shots.length; i++)
                    shots[i].style.animationPlayState = 'paused';

                chargeAnimations[0].style.display = 'none';
                chargeAnimations[1].style.display = 'none';
                clearInterval(chargeInterval);
                retryMsg.classList.remove('hidden');
                controlsAllowed = false;
            }
        }
    }

    function retry() {
        location.reload();
    }

    boxBomb.addEventListener('click', bombing);
    btnRetry.addEventListener('click', retry);
    btnRetry.addEventListener('mouseover', catThumbsUp);
    btnRetry.addEventListener('mouseout', catSad);
    document.querySelector('.retry-retry').addEventListener('click', retry);

    function gameLoop() {
        colisionShots();
        colisionBomb();
        gameOverVerification();
        movingCat();
        requestAnimationFrame(gameLoop);
    }

    //
    //
    //
    //
    // Console Auxiliar

    // const texto = document.querySelector('.texto');

    // setInterval(() => {
    //   texto.innerHTML = `hpCat:...........${hpCat} <br>
    //                       planetsLive:.....${planetsTotal.length} <br>
    //                       shotsLive:.......${shots.length} <br>
    //                       crashedPlanets:..${crashedPlanets} <br>
    //                       planetsLaunched:.${planetsLaunched} <br>`;
    // }, 500);

    // Console Auxiliar
    //
    //
    //
    //
});
