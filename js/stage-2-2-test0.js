window.addEventListener("contextmenu", (e) => {e.preventDefault()});

const gameBoard = document.querySelector('.game-board');
const heartStatus = document.querySelector('.heart-status');
const cat = document.querySelector('.cat');
const shadowMove = document.querySelector('.shadow-move');
const charge1 = document.querySelector('.charge1');
const charge2 = document.querySelector('.charge2');
const txtQtShotHaduken = document.querySelector('.qt-shot-haduken');
const retryMsg = document.querySelector('.retry-msg');
const imgCatGameOver = document.querySelector('.cat-game-over');
const btnRetry = document.querySelector('.button-retry');
const msgPointsFinal = document.querySelector('.points-final');

let catPosition = 2;
let hpCat = 3;
let chargeValue = 0;
let qtShotHaduken = 40;
txtQtShotHaduken.innerHTML = `${qtShotHaduken}/40`;
let bomb = true;
let qtBomb = 1;
let bombActive = false;
let pointHpCat = 0;
let pointQtShotHaduken = 0;
let pointQtBomb = 0;
let qtPointsFinal = 0;
let gameOver = false;
let controlsAllowed = false;
let stageComplete = false;

let hpGundamBoss = 1000;
let gundamVunerable = true;
let hpMoonBossFixed = hpGundamBoss;
let boxBarrHpBoss = document.querySelector('.box-barr-hp-boss');
let barrHpBoss = document.querySelector('.barr-hp-boss');
let valueBarrHpBoss = 100;
let valueSkill = 0;

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
        }, 165);

        slideMove2_3 = setTimeout(() => {
            move(3);
        }, 290);

        slideMove3_4 = setTimeout(() => {
            move(4);
        }, 415);

    }

    else if ((catPosition === 1 && event.keyCode === 40) || (catPosition === 1 && event.keyCode === 83) || (catPosition === 1 && event.keyCode === 101)) {

        move(2);

        slideMove2_3 = setTimeout(() => {
            move(3);
        }, 165);

        slideMove3_4 = setTimeout(() => {
            move(4);
        }, 290);

    } else if ((catPosition === 1 && event.keyCode === 38) || (catPosition === 1 && event.keyCode === 87) || (catPosition === 1 && event.keyCode === 104)) {

        move(0);

    }

    else if ((catPosition === 2 && event.keyCode === 40) || (catPosition === 2 && event.keyCode === 83) || (catPosition === 2 && event.keyCode === 101)) {

        move(3);

        slideMove3_4 = setTimeout(() => {
            move(4);
        }, 165);

    } else if ((catPosition === 2 && event.keyCode === 38) || (catPosition === 2 && event.keyCode === 87) || (catPosition === 2 && event.keyCode === 104)) {

        move(1);

        slideMove1_0 = setTimeout(() => {
            move(0);
        }, 165);

    }

    else if ((catPosition === 3 && event.keyCode === 40) || (catPosition === 3 && event.keyCode === 83) || (catPosition === 3 && event.keyCode === 101)) {

        move(4);

    } else if ((catPosition === 3 && event.keyCode === 38) || (catPosition === 3 && event.keyCode === 87) || (catPosition === 3 && event.keyCode === 104)) {

        move(2);

        slideMove2_1 = setTimeout(() => {
            move(1);
        }, 165);

        slideMove1_0 = setTimeout(() => {
            move(0);
        }, 290);

    }

    else if ((catPosition === 4 && event.keyCode === 38) || (catPosition === 4 && event.keyCode === 87) || (catPosition === 4 && event.keyCode === 104)) {

        move(3);

        slideMove3_2 = setTimeout(() => {
            move(2);
        }, 165);

        slideMove2_1 = setTimeout(() => {
            move(1);
        }, 290);

        slideMove1_0 = setTimeout(() => {
            move(0);
        }, 415);

    } else if (retryMsg.style.display === 'block' && event.keyCode === 13) {

        location.reload();

    }

}

let chargeInterval;

function shotting(n) {

    let shot = document.createElement('img');
    shot.src = `../img/shot-${chargeValue}.gif`;
    shot.classList.add('shots');
    shot.classList.add(`shot-${chargeValue}`);
    shot.style.top = `${n}px`;
    shot.setAttribute('data-dmg', `${(chargeValue * 2) + 1}`);
    shot.setAttribute('draggable', 'false');
    gameBoard.appendChild(shot);

}

function keyboardKeyDownShot() {

    if (chargeValue === 0) {

        shotting((catPosition * 120) + 35);

    }

}

function keyboardKeyUpShot() {

    if (chargeValue === 0) {

        clearInterval(chargeInterval);

    } else if (chargeValue === 1) {

        shotting((catPosition * 120) + 25);
        chargeValue = 0;
        charge1.style.display = "none";
        clearInterval(chargeInterval);

    } else {

        shotting((catPosition * 120) + 10);
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

        bombActive = true;

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
        let noAllowedB = document.querySelector('.no-allowed-b');
        noAllowedB.style.display = 'block';

        setTimeout(() => {

            bombActive = false;
            gameBoard.removeChild(explosionBomb);

        }, 350);

        setTimeout(() => {

            boxBomb.style.cursor = 'pointer';
            cooldownBomb.style.animation = 'none';
            noAllowedB.style.display = 'none';
            bomb = true;

        }, 20000);

    }

}

/* let gameRunning = true;

function pauseGame() {

    if (gameRunning) {

        for (let i = 0; i < shots.length; i++) shots[i].style.animationPlayState = 'paused';
        for (let j = 0; j < planets.length; j++) planets[j].style.animationPlayState = 'paused';
        if (moonBoss) moonBoss.animationPlayState = 'paused';
        controlsAllowed = false;
        gameRunning = false;

    } else {

        for (let i = 0; i < shots.length; i++) shots[i].style.animationPlayState = 'running';
        for (let j = 0; j < planets.length; j++) planets[j].style.animationPlayState = 'running';
        if (moonBoss) moonBoss.animationPlayState = 'running';
        controlsAllowed = true;
        gameRunning = true;

    }

} */

let keyShotCharge = false;
let keyShotMultiple = false;
let keyBomb = false;
let keyMoveDown = false;
let keyMoveUp = false;
let consecutivesShots;

window.addEventListener('keydown', () => {

    /* if (event.keyCode === 27) {

        pauseGame();

    } */

    if (event.keyCode === 13) {

        keyboardKeyDownMove();

    }

    if (!controlsAllowed) return;

    if (event.keyCode === 72) {

        if (keyShotCharge) return;
        if (keyShotMultiple) return;

        keyShotCharge = true;

        keyboardKeyDownShot();

        chargeInterval = setInterval(chargeBeam, 600);

    }

    if (event.keyCode === 74) {

        if (keyShotCharge) return;
        if (keyShotMultiple) return;

        keyShotMultiple = true;

        if (qtShotHaduken > 0) {

            keyboardKeyDownShot();
            qtShotHaduken--;
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}/40`;

            consecutivesShots = setInterval(() => {

                if (qtShotHaduken <= 0) {

                    clearInterval(consecutivesShots);
                    let boxM = document.querySelector('.box-shot');

                    if (boxM.style.cursor !== 'not-allowed') {

                        setTimeout(() => {

                            boxM.style.cursor = 'auto';
                            cooldownM.style.animation = 'none';
                            noAllowedM.style.display = 'none';
                            qtShotHaduken = 40;
                            txtQtShotHaduken.innerHTML = `${qtShotHaduken}/40`;

                        }, 20000);

                    }

                    boxM.style.cursor = 'not-allowed';
                    let cooldownM = document.querySelector('.cooldown-m');
                    cooldownM.style.animation = 'cooldown-efect 20s 1 linear';
                    let noAllowedM = document.querySelector('.no-allowed-m');
                    noAllowedM.style.display = 'block';

                }

                if (qtShotHaduken <= 0) return;

                keyboardKeyDownShot();
                qtShotHaduken--;
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}/40`;

            }, 125);

        }

    }

    if (event.keyCode === 32) {

        if (keyBomb) return;

        keyBomb = true;

        bombing();

    }

    if (event.keyCode === 40 || event.keyCode === 83 || event.keyCode === 101) {

        if (keyMoveDown) return;
        if (keyMoveUp) return;

        keyMoveDown = true;

        keyboardKeyDownMove();

    } else if (event.keyCode === 38 || event.keyCode === 87 || event.keyCode === 104) {

        if (keyMoveUp) return;
        if (keyMoveDown) return;

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

        if (keyShotMultiple) return;

        keyboardKeyUpShot();

        keyShotCharge = false;

    }

    if (event.keyCode === 74) {

        if (keyShotCharge) return;

        clearInterval(consecutivesShots);

        if (qtShotHaduken <= 0) {

            let boxM = document.querySelector('.box-shot');

            if (boxM.style.cursor !== 'not-allowed') {

                setTimeout(() => {

                    boxM.style.cursor = 'auto';
                    cooldownM.style.animation = 'none';
                    noAllowedM.style.display = 'none';
                    qtShotHaduken = 40;
                    txtQtShotHaduken.innerHTML = `${qtShotHaduken}/40`;

                }, 5000);
                
            }
            
            boxM.style.cursor = 'not-allowed';
            let cooldownM = document.querySelector('.cooldown-m');
            cooldownM.style.animation = 'cooldown-efect 20s 1 linear';
            let noAllowedM = document.querySelector('.no-allowed-m');
            noAllowedM.style.display = 'block';

        }

        keyShotMultiple = false;

    }

    if (event.keyCode === 32) {

        keyBomb = false;

    }

    if (event.keyCode === 40 || event.keyCode === 83 || event.keyCode === 101) {

        if (keyMoveUp) return;

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

        if (keyMoveDown) return;

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

let planetPosition;
let planetType;
let missile2Movement;
let missile3Movement;
let crashedPlanets = 0;
let intervalPlanets = 2000;
let generatePlanetsInterval;
let planetsLaunched = 0;
let planetEnemy;

function planetGenerator(t, p, v, m2, m3) {

    planetEnemy = document.createElement('img');
    planetEnemy.src = `../img/planet-${t}.gif`;
    planetEnemy.classList.add('planets');
    planetEnemy.style.top = `${(p * 120) - 3}px`;
    planetEnemy.setAttribute('data-hp', `${(t * 2) + 1}`);
    planetEnemy.setAttribute('data-id', `${planetsLaunched}`);
    planetEnemy.setAttribute('draggable', 'false');
    if (t === 0) missileType1(t, v);
    if (t === 1) missileType2(t, v, m2, m3);
    if (t === 2) missileType3(t, p, v, m3);
    if (t === 3) missileType1Boss(t, v);
    if (t === 4) missileType2Boss(t, v);
    planetsLaunched++;

}

function missileType1(t, v) {

    let planetEnemy0 = planetEnemy;
    planetEnemy0.setAttribute('data-hp', `999`);
    planetEnemy0.style.filter = 'grayscale(100%)';
    planetEnemy0.style.animation = `move-planet-00 ${(t * 2) + 5 - v}s 1 ease-out forwards, move-planet-01 ${(t * 2) + 2 - v}s ${(t * 2) + 5 - v}s 1 ease-in-out forwards`;
    setTimeout(() => {
        planetEnemy0.setAttribute('data-hp', `2`);
    }, 5000);
    gameBoard.appendChild(planetEnemy0);

}

function missileType2(t, v, m2, m3) {

    let planetEnemy1 = planetEnemy;
    planetEnemy1.style.animation = `move-planet ${(t * 2) + 3 - v}s 1 linear, direction-${m2} 0.8s ${m3 + 0.7}s 1 ease-in-out forwards`;
    gameBoard.appendChild(planetEnemy1);

}

function missileType3(t, p, v, m3) {

    let planetEnemy2 = planetEnemy;
    planetEnemy2.setAttribute('data-position', `${p}`);
    planetEnemy2.style.animation = `move-planet ${(t * 2) + 3 - v}s 1 linear`;

    if (Number(planetEnemy2.dataset.position) === 0) {

        planetEnemy2.classList.add(`m0`);

    } else if (Number(planetEnemy2.dataset.position) === 4) {

        planetEnemy2.classList.add(`m1`);

    } else {

        planetEnemy2.classList.add(`m${m3}`);

    }

    gameBoard.appendChild(planetEnemy2);

}

function missileType1Boss(t, v) {

    let planetEnemy0 = planetEnemy;
    planetEnemy0.src = `../img/planet-${0}.gif`;
    planetEnemy0.style.left = `${gundamBoss.offsetLeft + 200}px`;
    planetEnemy0.style.animation = `move-planet-01-boss ${2}s 1 ease-in-out forwards`;
    planetEnemy0.setAttribute('data-hp', `2`);
    gameBoard.appendChild(planetEnemy0);

}

let direction = 0;

function missileType2Boss(t, v) {

    let planetEnemy0 = planetEnemy;
    planetEnemy0.src = `../img/planet-${0}.gif`;
    planetEnemy0.style.top = `${gundamBoss.offsetTop - 3}px`;
    planetEnemy0.style.left = `${gundamBoss.offsetLeft + 200}px`;
    planetEnemy0.setAttribute('data-hp', `999`);
    planetEnemy0.style.filter = 'grayscale(100%)';
    planetEnemy0.style.animation = `move-planet-02-boss 2s 1 ease-out forwards, move-planet-03-boss 2s ${3 + (0.5 * v)}s 1 ease-in-out forwards, direction-${direction} 0.8s ${0.5}s 1 ease-in-out forwards`;
    direction++;
    setTimeout(() => {
        planetEnemy0.setAttribute('data-hp', `2`);
    }, 3000 + (v * 500));
    gameBoard.appendChild(planetEnemy0);

}

function generatePlanets() {

    /* generatePlanetsInterval = setInterval(() => {

        planetType = Math.trunc(Math.random() * 3);
        planetPosition = Math.trunc(Math.random() * 5);
        missile2Movement = Math.trunc(Math.random() * 5);
        missile3Movement = Math.trunc(Math.random() * 2);

        while (missile2Movement === planetPosition) {

            missile2Movement = Math.trunc(Math.random() * 5);

        }

        if (!gameOver && !stageComplete) {

            planetGenerator(planetType, planetPosition, 0, missile2Movement, missile3Movement);

        }

    }, intervalPlanets); */

}

let shots = [];
let planets = [];
let heartCat;
let planetsTurn;

function colisionShots() {

    shots = document.querySelectorAll('.shots');
    planets = document.querySelectorAll('.planets');
    gundamBoss = document.querySelector('.gundam-boss');
    heartCat = document.querySelectorAll('.heart-active');

    for (let b = 0; b < planets.length; b++) {

        if (planets[b].offsetLeft < -55) {
            planets[b].remove();
            hpCat--;
            planetsTurn = document.querySelectorAll('.planets');

            if (hpCat === 2) {

                heartStatus.innerHTML = `<img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active"> <img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active">`;

            } else if (hpCat === 1) {

                heartStatus.innerHTML = `<img draggable="false" src="../img/heart-active.png" alt="heart" class="heart-active">`;

            } else if (hpCat <= 0) {

                heartStatus.innerHTML = '';

            }

            if (planetsTurn.length === 0 && crashedPlanets >= 35) {

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

        for (let j = 0; j < planets.length; j++) {

            if (shots[i] && planets[j] && !gameOver) {

                if (planets[j].getAttribute('src') === '../img/planet-2.gif' && ((shots[i].offsetLeft <= (planets[j].offsetLeft + 120)) && (shots[i].offsetLeft + 14) >= planets[j].offsetLeft - 120) && (shots[i].offsetTop <= (planets[j].offsetTop + 120) && ((shots[i].offsetTop + 14) >= planets[j].offsetTop))) {

                    if (Number(planets[j].dataset.position < 4) && planets[j].classList.contains('m0')) {

                        planets[j].setAttribute('data-position', `${String(Number(planets[j].dataset.position) + 1)}`);

                        let shadowP = document.createElement('img');
                        shadowP.src = '../img/planet-2.gif';
                        shadowP.classList.add('planets-shadow');
                        shadowP.style.left = planets[j].offsetLeft + 'px';
                        shadowP.style.top = planets[j].offsetTop + 'px';
                        shadowP.style.opacity = 0.3;
                        shadowP.setAttribute('draggable', 'false');
                        gameBoard.appendChild(shadowP);
                        planets[j].style.top = planets[j].offsetTop + 120 + 'px';

                        setTimeout(() => {

                            shadowP.remove();

                        }, 120);

                    }

                    if (Number(planets[j].dataset.position > 0) && planets[j].classList.contains('m1')) {

                        planets[j].setAttribute('data-position', `${String(Number(planets[j].dataset.position) - 1)}`);

                        let shadowP = document.createElement('img');
                        shadowP.src = '../img/planet-2.gif';
                        shadowP.classList.add('planets-shadow');
                        shadowP.style.left = planets[j].offsetLeft + 'px';
                        shadowP.style.top = planets[j].offsetTop + 'px';
                        shadowP.style.opacity = 0.3;
                        shadowP.setAttribute('draggable', 'false');
                        gameBoard.appendChild(shadowP);
                        planets[j].style.top = planets[j].offsetTop - 120 + 'px';

                        setTimeout(() => {

                            shadowP.remove();

                        }, 120);

                    }

                }

                if ((shots[i].classList.contains('shot-0') && (shots[i].offsetLeft <= (planets[j].offsetLeft + 70)) && (shots[i].offsetLeft + 5) >= planets[j].offsetLeft) && (shots[i].offsetTop <= (planets[j].offsetTop + 98) && ((shots[i].offsetTop + 22) >= planets[j].offsetTop))) {

                    planetColision(i, j);

                } else if ((shots[i].classList.contains('shot-1') && (shots[i].offsetLeft <= (planets[j].offsetLeft + 70)) && (shots[i].offsetLeft + 75) >= planets[j].offsetLeft) && (shots[i].offsetTop <= (planets[j].offsetTop + 98) && ((shots[i].offsetTop + 44) >= planets[j].offsetTop))) {

                    planetColision(i, j);

                } else if ((shots[i].classList.contains('shot-2') && (shots[i].offsetLeft <= (planets[j].offsetLeft + 70)) && (shots[i].offsetLeft + 65) >= planets[j].offsetLeft) && (shots[i].offsetTop <= (planets[j].offsetTop + 98) && ((shots[i].offsetTop + 72) >= planets[j].offsetTop))) {

                    planetColision(i, j);

                }

            }

        }

        if (shots[i] && gundamBoss && !gameOver) {

            if (((shots[i].classList.contains('shot-0') &&  shots[i].offsetLeft <= (gundamBoss.offsetLeft + 205)) && (shots[i].offsetLeft + 14) >= gundamBoss.offsetLeft + 130) && (shots[i].offsetTop <= (gundamBoss.offsetTop + 240) && ((shots[i].offsetTop + 22) >= gundamBoss.offsetTop)) && gundamVunerable) {

                bossColision(i);
            
            } else if (((shots[i].classList.contains('shot-1') &&  shots[i].offsetLeft <= (gundamBoss.offsetLeft + 205)) && (shots[i].offsetLeft + 84) >= gundamBoss.offsetLeft + 130) && (shots[i].offsetTop <= (gundamBoss.offsetTop + 240) && ((shots[i].offsetTop + 44) >= gundamBoss.offsetTop)) && gundamVunerable) {

                bossColision(i);
                

            } else if (((shots[i].classList.contains('shot-2') &&  shots[i].offsetLeft <= (gundamBoss.offsetLeft + 205)) && (shots[i].offsetLeft + 74) >= gundamBoss.offsetLeft + 130) && (shots[i].offsetTop <= (gundamBoss.offsetTop + 240) && ((shots[i].offsetTop + 72) >= gundamBoss.offsetTop)) && gundamVunerable) {

                bossColision(i);

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

    planets[b].setAttribute('data-hp', `${String(Number(planets[b].dataset.hp) - (Number(shots[a].dataset.dmg)))}`);
    shots[a].remove();

    if ((Number(planets[b].dataset.hp)) <= 0) {

        /* let planetDead = document.createElement('img');
        planetDead.src = planets[b].src;
        planetDead.classList.add('planet-dead');
        planetDead.style.top = `${planets[b].offsetTop}px`;
        planetDead.style.left = `${planets[b].offsetLeft}px`;
        gameBoard.appendChild(planetDead); */

        planets[b].remove();
        crashedPlanets++;
        planetsTurn = document.querySelectorAll('.planets');

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
        
        if (crashedPlanets >= 35 && planetsTurn.length === 0) {

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

    if (bombActive) {

        for (let j = 0; j < planets.length; j++) {

            if ((Number(planets[j].dataset.hp)) < 10) {

                planets[j].remove();
                crashedPlanets++;
                planetsTurn = document.querySelectorAll('.planets');

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

                if (crashedPlanets >= 35 && planetsTurn.length === 0) {

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

}

setTimeout(() => {

    warningBoss();
    
}, 5000);

function warningBoss() {

    controlsAllowed = false;
    clearInterval(chargeInterval);
    clearInterval(consecutivesShots);
    keyShotCharge = false;
    keyShotMultiple = false;
    keyBomb = false;
    keyMoveDown = false;
    keyMoveUp = false;

    const warning = document.createElement('img');
    warning.src = '../img/warning.png';
    warning.classList.add('warning');
    gameBoard.appendChild(warning);

    setTimeout(() => {

        gundamAppears();
        boxBarrHpBoss.style.display = 'block';
        gameBoard.removeChild(warning);

        setTimeout(() => {

            barrHpBoss.style.width = '100%';

            setTimeout(() => {

                controlsAllowed = true;

            }, 2000);

        }, 3000);

    }, 3000);

}

let gundamBoss;
let intervalGundamPattern01

function gundamAppears() {

    let gundamBossEntrance = document.createElement('img');
    gundamBossEntrance.src = '../img/gundam-boss.gif';
    gundamBossEntrance.classList.add('gundam-boss');
    gameBoard.appendChild(gundamBossEntrance);

    setTimeout(() => {

        intervalGundamPattern01 = setInterval(() => {
        
            gundamPattern02();
            
        }, 4000);

    }, 3000);

}

function bossColision(a) {

    hpGundamBoss -= Number(shots[a].dataset.dmg);
    valueBarrHpBoss = valueBarrHpBoss - (Number(shots[a].dataset.dmg) * (100 / (hpMoonBossFixed)));
    barrHpBoss.style.width = `${valueBarrHpBoss}%`;
    shots[a].remove();

    if (valueBarrHpBoss <= 0) {

        barrHpBoss.style.width = '0%';
        
    }

    if (hpGundamBoss <= 0) {

        for (let j = 0; j < planets.length; j++) planets[j].remove();

        clearTimeout(generatePlanetsInterval);

        pointHpCat = hpCat * 1500;
        pointQtBomb = qtBomb * 4000;
        pointQtShotHaduken = qtShotHaduken * 100;
        qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken;

        let explosionMoonBoos = document.createElement('img');
        explosionMoonBoos.src = '../img/boss-explosion.gif';
        explosionMoonBoos.classList.add('boss-explosion');
        explosionMoonBoos.style.top = `${gundamBoss.offsetTop - 85}px`;
        explosionMoonBoos.style.left = `${gundamBoss.offsetLeft + 25}px`;
        explosionMoonBoos.style.width = '325px';
        explosionMoonBoos.style.height = '360px';
        gameBoard.appendChild(explosionMoonBoos);

        gameBoard.removeChild(gundamBoss);
        gundamBoss = false;

        setTimeout(() => {

            gameBoard.removeChild(explosionMoonBoos);

        }, 1700);

        setTimeout(() => {

            if (!gameOver) {

                stageClear();

            };

        }, 3000);

    }

}

function gundamPattern01() {

    let gundamPosition = Math.floor(Math.random() * 4);

    let numbers = [];

    let r, n, p;

    r = 2;

    for (let i = 0; i < r; i++) {

        do {

            n = Math.floor(Math.random() * 2);
            p = numbers.includes(n);

            if (!p) {

                numbers.push(n);

            }
            
        }

        while (p);

    }

    gundamBoss.style.animation = 'move-gundam 0.5s';
    gundamVunerable = false;
    
    setTimeout(() => {
        
        gundamBoss.style.animation = 'transition-gundam 0.2s';
        gundamBoss.style.top = `${gundamPosition * 120}px`;

        planetGenerator(3, gundamPosition + numbers[0], 0);

        setTimeout(() => {

            planetGenerator(3, (gundamPosition + numbers[1]), 0);
            gundamVunerable = true;

        }, 200);

    }, 480);

}

function gundamPattern02() {

    let gundamPosition = Math.floor(Math.random() * 4);

    let numbers = [];

    let r, n, p;

    r = 5;

    for (let i = 0; i < r; i++) {

        do {

            n = Math.floor(Math.random() * 5);
            p = numbers.includes(n);

            if (!p) {

                numbers.push(n);

            }
            
        }

        while (p);

    }

    gundamBoss.style.animation = 'move-gundam 0.5s';
    gundamVunerable = false;
    
    setTimeout(() => {
        
        gundamBoss.style.animation = 'transition-gundam 0.2s';
        gundamBoss.style.top = `${gundamPosition * 120}px`;

        planetGenerator(4, 0, numbers[0]);
        planetGenerator(4, 1, numbers[1]);
        planetGenerator(4, 2, numbers[2]);
        planetGenerator(4, 3, numbers[3]);
        planetGenerator(4, 4, numbers[4]);

        direction = 0;
        gundamVunerable = true;
        /* clearInterval(intervalGundamPattern01); */

    }, 480);

}

function stageClear() {

    const missionComplete = document.createElement('img');
    missionComplete.src = '../img/stage-clear.png';
    missionComplete.classList.add('stage-clear');
    missionComplete.setAttribute('draggable', 'false');
    gameBoard.appendChild(missionComplete);

    keyboardKeyUpShot();
    clearInterval(consecutivesShots);
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

function gameOverVerification() {

    if (gameOver) return;

    if (hpCat <= 0 || stageComplete) {

        gameOver = true;

        for (let j = 0; j < planets.length; j++) planets[j].style.animationPlayState = 'paused';

        if (gameOver && hpCat <= 0) {

            for (let i = 0; i < shots.length; i++) shots[i].style.animationPlayState = 'paused';

            charge1.style.display = 'none';
            charge2.style.display = 'none';
            clearInterval(chargeInterval);
            clearInterval(consecutivesShots);
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
                        planetsLive:.....${planets.length} <br>
                        shotsLive:.......${shots.length} <br>
                        crashedPlanets:..${crashedPlanets} <br>
                        planetsLaunched:.${planetsLaunched} <br>`);

}, 500);

// Console Auxiliar
//
//
//
//

/* let colunm;

const colisaoColunm = setInterval(() => {
    
    colunm = document.querySelector('.colunm');

    if (shot01Left >= 140 && colunmLeft >= 140) {

        if (shot01Left >= colunmLeft) {

            let shot01Left = document.querySelector('.shot-position-1')
            gameBoard.removeChild(shot01Left)

        }

    }

}, 10);

const bombColunm = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(colunm);

    }

}, 100);
 */
// Padrão 1

//
//
//
//
    
    /* const moveGundam_01 = setInterval(() => {

        if (hpGundamBoss > 0 && valueSkill < 5) {

            valueSkill++
            gundamPosition = Math.floor(Math.random() * 4) + 1
            
            if (gundamPosition == 1) {
                
                gundamBoss.style.animation = "move-gundam 0.5s"

                setTimeout(() => {

                    gundamBoss.style.animation = "transition-gundam 0.2s"
                    gundamBoss.style.top = "0px"
                    
                }, 480);

                setTimeout(() => {

                    if (valueSkill < 5) {

                        gameBoard.appendChild(planet01Y1)
                        gameBoard.appendChild(planet01Y2)

                    }
                    
                }, 2000);

            }

            if (gundamPosition == 2) {

                gundamBoss.style.animation = "move-gundam 0.5s"
                
                setTimeout(() => {
                    
                    gundamBoss.style.animation = "transition-gundam 0.2s"
                    gundamBoss.style.top = "120px"
                    
                }, 480);

                setTimeout(() => {

                    if (valueSkill < 5) {

                        gameBoard.appendChild(planet01Y3)
                        gameBoard.appendChild(planet01Y2)

                    }
                    
                }, 2000);
                
            }

            if (gundamPosition == 3) {

                gundamBoss.style.animation = "move-gundam 0.5s"
                
                setTimeout(() => {

                    gundamBoss.style.animation = "transition-gundam 0.2s"
                    gundamBoss.style.top = "240px"
                    
                }, 480);

                setTimeout(() => {

                    if (valueSkill < 5) {

                        gameBoard.appendChild(planet01Y3)
                        gameBoard.appendChild(planet01Y4)

                    }
                    
                }, 2000);
                
            }

            if (gundamPosition == 4) {
                
                gundamBoss.style.animation = "move-gundam 0.5s"
                
                setTimeout(() => {

                    gundamBoss.style.animation = "transition-gundam 0.2s"
                    gundamBoss.style.top = "360px"
                    
                }, 480);
                
                setTimeout(() => {

                    if (valueSkill < 5) {

                        gameBoard.appendChild(planet01Y5)
                        gameBoard.appendChild(planet01Y4)

                    }
                    
                }, 2000);

            }

            if (valueSkill == 5) {

                gundamSkill()
        
            }

        }
    
    }, 2000);
    
}

function gundamSkill() {

    gundamBoss.style.animation = "move-gundam 0.5s";
            
    setTimeout(() => {
        
        gundamBoss.style.animation = "transition-gundam 0.2s"
        gundamBoss.src = '../img/gundamm.gif';
        
    }, 480);

    setTimeout(() => {

        gameBoard.appendChild(colunm)
        gundamBoss.src = '../img/gundam-boss.gif'
        
    }, 2500);

    setTimeout(() => {

        gundamVunerable = true;
        
    }, 3500);

} */