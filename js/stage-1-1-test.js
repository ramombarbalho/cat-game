// Declarações iniciais

let gameBoard = document.querySelector('.game-board');
let heartStatus = document.querySelector('.heart-status');
let cat = document.querySelector('.cat');
let catPosition = 2;
let hpCat = 3;
let shadowMove = document.querySelector('.shadow-move');
let chargeValue = 0;
let shotCharging = false;
let charge1 = document.querySelector('.charge1');
let charge2 = document.querySelector('.charge2');
let txtQtShotHaduken = document.querySelector('.qt-shot-haduken');
let qtShotHaduken = 150;
txtQtShotHaduken.innerHTML = `${qtShotHaduken}`;
let bomb = true;
let qtBomb = 1;
let bombValue = 0;
let controlsAllowed = false;
let gameOver = false;
let retryMsg = document.querySelector('.retry-msg');
let imgCatGameOver = document.querySelector('.cat-game-over');
let btnRetry = document.querySelector('.button-retry');
let msgPointsFinal = document.querySelector('.points-final');
let pointHpCat = 0;
let pointQtShotHaduken = 0;
let pointQtBomb = 0;
let qtPointsFinal = 0;
let stageComplete = false;

window.addEventListener("contextmenu", (e) => {e.preventDefault()});

// Funções que fazem a movimentação do personagem com o mouse

function move(x) {

    if (controlsAllowed) {

        cat.style.animation = `move${x} 0.09s 1`;
        shadowMove.style.display = 'block';
        charge1.style.animation = `move${x}-charge 0.09s 1`;
        charge2.style.animation = `move${x}-charge 0.09s 1`;
        catPosition = x;

        setTimeout(() => {
            
            cat.style.top = `${x * 120}px`;
            charge1.style.top = `${(x * 120) - 20}px`;
            charge2.style.top = `${(x * 120) - 20}px`;

        }, 60);

        setTimeout(() => {

            shadowMove.style.top = `${x * 120}px`;
            shadowMove.style.display = `none`;

        }, 120);

    }

}

function keyboardKeyDownMove() {

    if ((catPosition === 0 && event.keyCode === 40) || (catPosition === 0 && event.keyCode === 83) || (catPosition === 0 && event.keyCode === 101)) {

        move(1);

        slideMove1_2 = setTimeout(() => {
            move(2);
        }, 200);

        slideMove2_3 = setTimeout(() => {
            move(3);
        }, 325);

        slideMove3_4 = setTimeout(() => {
            move(4);
        }, 450);

    }

    else if ((catPosition === 1 && event.keyCode === 40) || (catPosition === 1 && event.keyCode === 83) || (catPosition === 1 && event.keyCode === 101)) {

        move(2);

        slideMove2_3 = setTimeout(() => {
            move(3);
        }, 200);

        slideMove3_4 = setTimeout(() => {
            move(4);
        }, 325);

    } else if ((catPosition === 1 && event.keyCode === 38) || (catPosition === 1 && event.keyCode === 87) || (catPosition === 1 && event.keyCode === 104)) {

        move(0);

    }

    else if ((catPosition === 2 && event.keyCode === 40) || (catPosition === 2 && event.keyCode === 83) || (catPosition === 2 && event.keyCode === 101)) {

        move(3);

        slideMove3_4 = setTimeout(() => {
            move(4);
        }, 200);

    } else if ((catPosition === 2 && event.keyCode === 38) || (catPosition === 2 && event.keyCode === 87) || (catPosition === 2 && event.keyCode === 104)) {

        move(1);

        slideMove1_0 = setTimeout(() => {
            move(0);
        }, 200);

    }

    else if ((catPosition === 3 && event.keyCode === 40) || (catPosition === 3 && event.keyCode === 83) || (catPosition === 3 && event.keyCode === 101)) {

        move(4);

    } else if ((catPosition === 3 && event.keyCode === 38) || (catPosition === 3 && event.keyCode === 87) || (catPosition === 3 && event.keyCode === 104)) {

        move(2);

        slideMove2_1 = setTimeout(() => {
            move(1);
        }, 200);

        slideMove1_0 = setTimeout(() => {
            move(0);
        }, 325);

    }

    else if ((catPosition === 4 && event.keyCode === 38) || (catPosition === 4 && event.keyCode === 87) || (catPosition === 4 && event.keyCode === 104)) {

        move(3);

        slideMove3_2 = setTimeout(() => {
            move(2);
        }, 200);

        slideMove2_1 = setTimeout(() => {
            move(1);
        }, 325);

        slideMove1_0 = setTimeout(() => {
            move(0);
        }, 450);

    } else if (retryMsg.style.display === 'block' && event.keyCode === 13) {

        location.reload();

    }

}

function keyboardKeyDownShot() {

    if (chargeValue === 0) {

        let shot0 = document.createElement('img');
        shot0.src = `../img/shot-${chargeValue}.png`;
        shot0.classList.add('shots');
        shot0.classList.add(`shot-${chargeValue}`);
        shot0.style.top = `${(catPosition * 120) + 35}px`;
        shot0.setAttribute('data-dmg', '1');
        shot0.setAttribute('draggable', 'false');
        gameBoard.appendChild(shot0);
        qtShotHaduken--;
        txtQtShotHaduken.innerHTML = `${qtShotHaduken}`;
        chargeInterval = setInterval(chargeBeam, 600);

    }

}

let chargeInterval;

function keyboardKeyUpShot() {

    if (chargeValue === 0) {

        clearInterval(chargeInterval);

    } else if (chargeValue === 1) {

        let shot1 = document.createElement('img');
        shot1.src = `../img/shot-${chargeValue}.gif`;
        shot1.classList.add('shots');
        shot1.classList.add(`shot-${chargeValue}`);
        shot1.style.top = `${(catPosition * 120) + 25}px`;
        shot1.setAttribute('data-dmg', '3');
        shot1.setAttribute('draggable', 'false');
        gameBoard.appendChild(shot1);
        qtShotHaduken--;
        txtQtShotHaduken.innerHTML = `${qtShotHaduken}`;
        chargeValue = 0;
        charge1.style.display = "none";
        clearInterval(chargeInterval);

    } else {

        let shot2 = document.createElement('img');
        shot2.src = `../img/shot-${chargeValue}.gif`;
        shot2.classList.add('shots');
        shot2.classList.add(`shot-${chargeValue}`);
        shot2.style.top = `${(catPosition * 120) + 10}px`;
        shot2.setAttribute('data-dmg', '5');
        shot2.setAttribute('draggable', 'false');
        gameBoard.appendChild(shot2);
        qtShotHaduken--;
        txtQtShotHaduken.innerHTML = `${qtShotHaduken}`;
        chargeValue = 0;
        charge2.style.display = "none";
        clearInterval(chargeInterval);

    }

}

function chargeBeam() {

    chargeValue++;

    if (chargeValue === 1) {

        charge1.style.display = 'block';

    } else {

        chargeValue = 2;
        charge1.style.display = 'none';
        charge2.style.display = 'block';

    }

}

function bombing() {

    if (bomb && controlsAllowed) {

        bombValue = 1;

        let explosionBomb = document.createElement('img');
        explosionBomb.src = '../img/bomb-explosion.gif';
        explosionBomb.classList.add('bomb-explosion');
        explosionBomb.setAttribute('draggable', 'false');
        gameBoard.appendChild(explosionBomb);
        bomb = false;
        let boxBomb = document.querySelector('.box-bomb');
        boxBomb.style.cursor = 'not-allowed';
        let cooldownBomb = document.querySelector('.cooldown-bomb');
        cooldownBomb.style.animation = 'cooldown-efect 20s 1 linear';
        let noAllowed = document.querySelector('.no-allowed');
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

let keyShot = false;
let keyBomb = false;
let keyMoveDown = false;
let keyMoveUp = false;

window.addEventListener('keydown', () => {

    /* if (event.keyCode === 27) {

        pauseGame();

    } */

    if (event.keyCode === 13) {

        keyboardKeyDownMove();

    }

    if (!controlsAllowed) return;

    if (event.keyCode === 72) {

        if (keyShot) return;

        keyShot = true;

        keyboardKeyDownShot();

    }

    if (event.keyCode === 32) {

        if(keyBomb) return;

        keyBomb = true;

        bombing();

    }

    if (event.keyCode === 40 || event.keyCode === 83 || event.keyCode === 101) {

        if (keyMoveDown) return;

        keyMoveDown = true;

        keyboardKeyDownMove();

    } else if (event.keyCode === 38 || event.keyCode === 87 || event.keyCode === 104) {

        if (keyMoveUp) return;

        keyMoveUp = true;

        keyboardKeyDownMove();

    }

});

let slideMove0_1;
let slideMove1_2;
let slideMove2_3;
let slideMove3_4;
let slideMove4_3;
let slideMove3_2;
let slideMove2_1;
let slideMove1_0;

window.addEventListener('keyup', () => {

    if (!controlsAllowed) return;

    if (event.keyCode === 72) {

        keyboardKeyUpShot();

        keyShot = false;

    }

    if (event.keyCode === 32) {

        keyBomb = false;

    }

    if (event.keyCode === 40 || event.keyCode === 83 || event.keyCode === 101) {

        keyMoveDown = false;

        if (catPosition === 1) {

            clearTimeout(slideMove1_2);
            clearTimeout(slideMove2_3);
            clearTimeout(slideMove3_4);

        } else if (catPosition === 2) {

            clearTimeout(slideMove2_3);
            clearTimeout(slideMove3_4);

        } else if (catPosition === 3) {

            clearTimeout(slideMove3_4);

        }

    } else if (event.keyCode === 38 || event.keyCode === 87 || event.keyCode === 104) {

        keyMoveUp = false;

        if (catPosition === 3) {

            clearTimeout(slideMove3_2);
            clearTimeout(slideMove2_1);
            clearTimeout(slideMove1_0);

        } else if (catPosition === 2) {

            clearTimeout(slideMove2_1);
            clearTimeout(slideMove1_0);

        } else if (catPosition === 1) {

            clearTimeout(slideMove1_0);

        }

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

    let planetEnemy = document.createElement('img');
    planetEnemy.src = `../img/planet-${t}.gif`;
    planetEnemy.classList.add('planets');
    planetEnemy.style.top = `${(p * 120) - 3}px`;
    planetEnemy.style.animation = `move-planet ${(t * 2) + 3 - v}s 1 linear`;
    planetEnemy.setAttribute('data-hp', `${(t * 2) + 1}`);
    planetEnemy.setAttribute('draggable', 'false');
    gameBoard.appendChild(planetEnemy);
    planetsLaunched++;

}

const randomNumbers = setInterval(() => {

    planetPosition = Math.trunc(Math.random() * 5);
    planetType = Math.trunc(Math.random() * 3);
    
}, 250);


function generatePlanets() {

    generatePlanetsInterval = setInterval(() => {

    if (!gameOver && !stageComplete) {

        planetGenerator(planetType, planetPosition, 0);

    }

    }, intervalPlanets);

}

let shots = [];
let planetsTotal = [];
let heartCat;
let planetsTotalTurn;

function colisionShots() {

    shots = document.querySelectorAll('.shots');
    planetsTotal = document.querySelectorAll('.planets');
    heartCat = document.querySelectorAll('.heart-active');

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

            if (planetsTotalTurn.length === 0 && crashedPlanets >= 35) {

                pointHpCat = hpCat * 1500;
                pointQtBomb = qtBomb * 4000;
                pointQtShotHaduken = qtShotHaduken * 100;
                qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken;

                setTimeout(() => {

                    if (!gameOver) {

                        stageClear();

                    };

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

                if ((shots[i].classList.contains('shot-0') && (shots[i].offsetLeft <= (planetsTotal[j].offsetLeft + 70)) && (shots[i].offsetLeft + 5) >= planetsTotal[j].offsetLeft) && (shots[i].offsetTop <= (planetsTotal[j].offsetTop + 98) && ((shots[i].offsetTop + 22) >= planetsTotal[j].offsetTop))) {

                    planetColision(i, j);

                } else if ((shots[i].classList.contains('shot-1') && (shots[i].offsetLeft <= (planetsTotal[j].offsetLeft + 70)) && (shots[i].offsetLeft + 75) >= planetsTotal[j].offsetLeft) && (shots[i].offsetTop <= (planetsTotal[j].offsetTop + 98) && ((shots[i].offsetTop + 44) >= planetsTotal[j].offsetTop))) {

                    planetColision(i, j);

                } else if ((shots[i].classList.contains('shot-2') && (shots[i].offsetLeft <= (planetsTotal[j].offsetLeft + 70)) && (shots[i].offsetLeft + 75) >= planetsTotal[j].offsetLeft) && (shots[i].offsetTop <= (planetsTotal[j].offsetTop + 98) && ((shots[i].offsetTop + 72) >= planetsTotal[j].offsetTop))) {

                    planetColision(i, j);

                }

            }

        }

    }

}

function gameLoop() {

    colisionShots();
    colisionBomb();
    gameOverVerification();
    requestAnimationFrame(gameLoop);

}

function planetColision(a, b) {

    planetsTotal[b].setAttribute('data-hp', `${String(Number(planetsTotal[b].dataset.hp) - (Number(shots[a].dataset.dmg)))}`);
    shots[a].remove();

    if ((Number(planetsTotal[b].dataset.hp)) <= 0) {

        /* let planetDead = document.createElement('img');
        planetDead.src = planetsTotal[b].src;
        planetDead.classList.add('planet-dead');
        planetDead.style.top = `${planetsTotal[b].offsetTop}px`;
        planetDead.style.left = `${planetsTotal[b].offsetLeft}px`;
        gameBoard.appendChild(planetDead); */

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

                };

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
            
            if (crashedPlanets >= 35 && planetsTotalTurn.length === 0) {

                pointHpCat = hpCat * 1500;
                pointQtBomb = qtBomb * 4000;
                pointQtShotHaduken = qtShotHaduken * 100;
                qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken;

                setTimeout(() => {

                    if (!gameOver) {

                        stageClear();

                    };

                }, 2000);

            }

        }

    }

}

function stageClear() {

    let missionComplete = document.createElement('img');
    missionComplete.src = '../img/stage-clear.png';
    missionComplete.classList.add('stage-clear');
    missionComplete.setAttribute('draggable', 'false');
    gameBoard.appendChild(missionComplete);
    
    keyboardKeyUpShot();
    stageComplete = true;
    controlsAllowed = false;

    setTimeout(() => {

        gameBoard.removeChild(missionComplete);

    }, 3500);

    setTimeout(() => {

        msgPointsFinal.innerHTML = `<h2>POINTS:</h1> <br>
                                    <h2>HP:.....${pointHpCat}pts</h2>
                                    <h2>BOMB:...${pointQtBomb}pts</h2>
                                    <h2>SHOTS:..${pointQtShotHaduken}pts</h2>
                                    <h1>TOTAL: ${qtPointsFinal}pts</h1>
                                    <a draggable="false" href="../stages/stage-1-2-test.html" class="button-stage-complete">NEXT STAGE</a>
                                    <a draggable="false" href="#" class="button-stage-complete" onclick="retry()">RETRY</a>`;

        msgPointsFinal.style.display = 'block';

        if (qtPointsFinal >= 10000) {

            let perfectStage = document.createElement('img');
            perfectStage.src = '../img/cat-perfect-stage.jpg';
            perfectStage.classList.add('perfect-stage');
            perfectStage.setAttribute('draggable', 'false');
            msgPointsFinal.appendChild(perfectStage);

            let perfectStageMsg = document.createElement('div');
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

        for (let j = 0; j < planetsTotal.length; j++) planetsTotal[j].style.animationPlayState = 'paused';
        
        if (gameOver && hpCat <= 0) {
            
            for (let i = 0; i < shots.length; i++) shots[i].style.animationPlayState = 'paused';

            charge1.style.display = 'none';
            charge2.style.display = 'none';
            clearInterval(chargeInterval);
            retryMsg.style.display = 'block';
            controlsAllowed = false;

        }

    }

}

function retry() {

    location.reload();

}

//
//
//
//
// Console Auxiliar

let texto = document.querySelector('.texto');

setInterval(() => {

    texto.innerHTML = (`hpCat:...........${hpCat} <br>
                        planetsLive:.....${planetsTotal.length} <br>
                        shotsLive:.......${shots.length} <br>
                        crashedPlanets:..${crashedPlanets} <br>
                        planetsLaunched:.${planetsLaunched} <br>`);

}, 500);

// Console Auxiliar
//
//
//
//