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

// hpMoonBoss

let hpMoonBoss = 40;
let bossVunerable = false;
let bossRage = 0;
let hpMoonBossFixed = hpMoonBoss;
let boxBarrHpBoss = document.querySelector('.box-barr-hp-boss');
let barrHpBoss = document.querySelector('.barr-hp-boss');
let valueBarrHpBoss = 100;
let hpRotateTop = 5;
let hpRotateBottom = 5;

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

        slideMove3_1 = setTimeout(() => {
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
        gameBoard.appendChild(shot0);
        qtShotHaduken--;
        txtQtShotHaduken.innerHTML = `${qtShotHaduken}`;
        chargeInterval = setInterval(chargeBeam, 600);

    }

}

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

            clearTimeout(slideMove3_1);
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
    gameBoard.appendChild(stage1_1);

    setTimeout(() => {

        gameBoard.removeChild(stage1_1);
        controlsAllowed = true;
        gameLoop();
        generatePlanets();

        setTimeout(() => {
            
            clearInterval(generatePlanetsInterval);

        }, 5500);

    }, 1900);

}, 1000);

// Declarações dos sprites

let planetPosition;
let planetType;
let crashedPlanets = 0;
let intervalPlanets = 2700;
let generatePlanetsInterval;
let planetsLaunched = 0;

function planetGenerator(t, p, v) {

    let planetEnemy = document.createElement('img');
    planetEnemy.src = `../img/planet-${t}.gif`;
    planetEnemy.classList.add('planets');
    planetEnemy.classList.add(`planet-${t}`);
    planetEnemy.style.top = `${(p * 120) - 3}px`;
    planetEnemy.style.animation = `move-planet ${(t * 2) + 3 - v}s 1 linear`;
    planetEnemy.setAttribute('data-hp', `${(t * 2) + 1}`);
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

            let numbers = [];

            let r, n, p;

            r = 3;

            for (let i = 0; i < r; i++) {

                do {

                    n = Math.trunc(Math.random() * 5);
                    p = numbers.includes(n);

                    if (!p) {

                        numbers.push(n);

                    }
                    
                }

                while (p);

            }

            planetType = Math.trunc(Math.random() * 3);
            planetGenerator(planetType, numbers[0], 0);
            planetType = Math.trunc(Math.random() * 3);
            planetGenerator(planetType, numbers[1], 0);
            planetType = Math.trunc(Math.random() * 3);
            planetGenerator(planetType, numbers[2], 0);

        }

    }, intervalPlanets);

}

let shots = [];
let planetsTotal = [];
let heartCat;
let moonBoss;
let planetsTotalTurn;

function colisionShots() {

    shots = document.querySelectorAll('.shots');
    planetsTotal = document.querySelectorAll('.planets');
    moonBoss = document.querySelector('.moon-boss');
    heartCat = document.querySelectorAll('.heart-active');

    for (let b = 0; b < planetsTotal.length; b++) {

        if (planetsTotal[b].offsetLeft < -55) {
            planetsTotal[b].remove();
            hpCat--;
            planetsTotalTurn = document.querySelectorAll('.planets');

            if (hpCat === 2) {

                heartStatus.innerHTML = `<img src="../img/heart-active.png" alt="heart" class="heart-active"> <img src="../img/heart-active.png" alt="heart" class="heart-active">`;

            } else if (hpCat === 1) {

                heartStatus.innerHTML = `<img src="../img/heart-active.png" alt="heart" class="heart-active">`;

            } else if (hpCat <= 0) {

                heartStatus.innerHTML = '';

            }

            if (planetsTotalTurn.length === 0 && !moonBoss && planetsLaunched >= 6) {

                setTimeout(() => {

                    warningBoss();

                }, 2000);

            }

        }

    }

    if (moonBoss && moonBoss.offsetLeft < -600) {

        hpCat = 0;
        heartStatus.innerHTML = '';

    }

    for (let i = 0; i < shots.length; i++) {

        if (shots[i].offsetLeft > 1200) {

            shots[i].remove();

        }

        for (let j = 0; j < planetsTotal.length; j++) {

            if (shots[i] && planetsTotal[j] && !gameOver) {

                if (((shots[i].offsetLeft <= (planetsTotal[j].offsetLeft + 120)) && (shots[i].offsetLeft + 14) >= planetsTotal[j].offsetLeft) && (shots[i].offsetTop <= (planetsTotal[j].offsetTop + 120) && ((shots[i].offsetTop + 14) >= planetsTotal[j].offsetTop))) {

                    for (let m = 0; m < 3; m++) {

                        if (shots[i].classList.contains(`shot-${m}`)) {

                            for (let n = 0; n < 3; n++) {

                                if (planetsTotal[j].classList.contains(`planet-${n}`)) {

                                    planetColision(i, j);

                                }

                            }

                        }

                    }

                }

            }

        }

        if (shots[i] && moonBoss && !gameOver) {

            if (((shots[i].offsetLeft <= (moonBoss.offsetLeft + 592)) && (shots[i].offsetLeft + 14) >= moonBoss.offsetLeft + 80) && (shots[i].offsetTop <= (moonBoss.offsetTop + 472) && ((shots[i].offsetTop + 14) >= moonBoss.offsetTop + 120)) && !bossVunerable) {

                shots[i].remove();

            } else if (((shots[i].offsetLeft <= (moonBoss.offsetLeft + 340)) && (shots[i].offsetLeft + 14) >= moonBoss.offsetLeft + 120) && ((shots[i].offsetTop + 14) < moonBoss.offsetTop + 120) && !bossVunerable) {

                if (hpRotateTop > 0) {

                    hpRotateTop -= Number(shots[i].dataset.dmg);
                    shots[i].remove();

                }

                if (hpRotateTop <= 0) {

                    shots[i].remove();
                    moonBossSkill(0, bossRage);

                }

            } else if (((shots[i].offsetLeft <= (moonBoss.offsetLeft + 340)) && (shots[i].offsetLeft + 14) >= moonBoss.offsetLeft + 120) && (shots[i].offsetTop > (moonBoss.offsetTop + 472)) && !bossVunerable) {

                if (hpRotateBottom > 0) {

                    hpRotateBottom -= Number(shots[i].dataset.dmg);
                    shots[i].remove();

                }

                if (hpRotateBottom <= 0) {

                    shots[i].remove();
                    moonBossSkill(1, bossRage);

                }

            } else if (((shots[i].offsetLeft <= (moonBoss.offsetLeft + 340)) && (shots[i].offsetLeft + 14) >= moonBoss.offsetLeft + 230) && (shots[i].offsetTop <= (moonBoss.offsetTop + 352) && ((shots[i].offsetTop + 14) >= moonBoss.offsetTop + 240)) && bossVunerable) {

                for (let m = 0; m < 3; m++) {

                    if (shots[i].classList.contains(`shot-${m}`)) {

                        bossColision(i);

                    }

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

        planetsTotal[b].remove();
        crashedPlanets++;
        planetsTotalTurn = document.querySelectorAll('.planets');

        if (planetsTotalTurn.length === 0 && !moonBoss && planetsLaunched >= 6) {

            setTimeout(() => {

                warningBoss();

            }, 2000);

        }

    }

}

function colisionBomb() {

    if (bombValue === 1) {

        for (let j = 0; j < planetsTotal.length; j++) {

            planetsTotal[j].remove();
            
        }

    }

}

// Padrão Warning

function warningBoss() {

    const warning = document.createElement('img');
    warning.src = '../img/warning.png';
    warning.classList.add('warning');
    gameBoard.appendChild(warning);

    clearInterval(randomNumbers);

    setTimeout(() => {

        boxBarrHpBoss.style.display = 'block';

        setTimeout(() => {

            barrHpBoss.style.width = "100%";

        }, 1900);

    }, 1500);

    setTimeout(() => {

        gameBoard.removeChild(warning);

    }, 2900);

    setTimeout(() => {

        moonBossAppears();

    }, 4000);


}

// Padrão Boss e colisão shot/boss

function moonBossAppears() {

    let moonBossEntrance = document.createElement('img');
    moonBossEntrance.src = '../img/moon-boss.png';
    moonBossEntrance.classList.add('moon-boss');
    gameBoard.appendChild(moonBossEntrance);

    let numbers = [];

    let r, n, p;

    r = 3;

    for (let i = 0; i < r; i++) {

        do {

            n = Math.trunc(Math.random() * 5);
            p = numbers.includes(n);

            if (!p) {

                numbers.push(n);

            }
            
        }

        while (p);

    }

    planetType = Math.trunc(Math.random() * 3);
    planetGenerator(planetType, numbers[0], 0);
    planetType = Math.trunc(Math.random() * 3);
    planetGenerator(planetType, numbers[1], 0);
    planetType = Math.trunc(Math.random() * 3);
    planetGenerator(planetType, numbers[2], 0);

}

function bossColision(a) {

    hpMoonBoss -= Number(shots[a].dataset.dmg);
    valueBarrHpBoss = valueBarrHpBoss - (Number(shots[a].dataset.dmg) * (100 / (hpMoonBossFixed)));
    barrHpBoss.style.width = `${valueBarrHpBoss}%`;
    shots[a].remove();

    if (valueBarrHpBoss <= 0) {

        barrHpBoss.style.width = '0%';
        
    }

    if (hpMoonBoss <= 30 && bossRage === 0) {

        moonBoss.src = `../img/moon-boss-10.png`;
        bossRage = 1;
        clearTimeout(moveAnimationBoss);
        moonBoss.style.animation = `move-boss ${28 - (bossRage * 2)}s 1 linear`;
        bossVunerable = false;

    } else if (hpMoonBoss <= 20 && bossRage === 1) {

        moonBoss.src = `../img/moon-boss-20.png`;
        bossRage = 2;
        clearTimeout(moveAnimationBoss);
        moonBoss.style.animation = `move-boss ${28 - (bossRage * 2)}s 1 linear`;
        bossVunerable = false;

    } else if (hpMoonBoss <= 10 && bossRage === 2) {

        moonBoss.src = `../img/moon-boss-30.png`;
        bossRage = 3;
        clearTimeout(moveAnimationBoss);
        moonBoss.style.animation = `move-boss ${28 - (bossRage * 2)}s 1 linear`;
        bossVunerable = false;

    } else if (hpMoonBoss <= 0  && bossRage === 3) {

        for (let j = 0; j < planetsTotal.length; j++) planetsTotal[j].remove();
        gameOver = true;

        clearTimeout(moveAnimationBoss);

        pointHpCat = hpCat * 1500;
        pointQtBomb = qtBomb * 4000;
        pointQtShotHaduken = qtShotHaduken * 100;
        qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken;

        let explosionMoonBoos = document.createElement('img');
        explosionMoonBoos.src = '../img/boss-explosion.gif';
        explosionMoonBoos.classList.add('boss-explosion');
        explosionMoonBoos.style.top = `0`;
        explosionMoonBoos.style.left = `${moonBoss.offsetLeft}px`;
        gameBoard.appendChild(explosionMoonBoos);

        gameBoard.removeChild(moonBoss);
        moonBoss = false;

        setTimeout(() => {

            gameBoard.removeChild(explosionMoonBoos);

        }, 1700);

        setTimeout(() => {

            stageClear();

        }, 3000);

    }

}

let moveAnimationBoss;

function moonBossSkill(x, rage) {

    bossVunerable = true;
    hpRotateTop = 5;
    hpRotateBottom = 5;
    moonBoss.style.left = `${moonBoss.offsetLeft}px`;
    moonBoss.style.animation = `rotate-center-${x} ${0.5 - (rage * 0.1)}s linear 15`;

    let numbers = [];

    let r, n, p;

    r = 3;

    for (let i = 0; i < r; i++) {

        do {

            n = Math.trunc(Math.random() * 5);
            p = numbers.includes(n);

            if (!p) {

                numbers.push(n);

            }
            
        }

        while (p);

    }

    planetType = Math.trunc(Math.random() * 3);
    planetGenerator(planetType, numbers[0], (rage * 0.4) + 0.1);
    planetType = Math.trunc(Math.random() * 3);
    planetGenerator(planetType, numbers[1], (rage * 0.4) + 0.1);
    planetType = Math.trunc(Math.random() * 3);
    planetGenerator(planetType, numbers[2], (rage * 0.4) + 0.1);

    moveAnimationBoss = setTimeout(() => {

        moonBoss.style.animation = `move-boss ${28 - (rage * 2)}s 1 linear`;
        bossVunerable = false;

    }, (7500 - (rage * 1500)));

}

function stageClear() {

    let missionComplete = document.createElement('img');
    missionComplete.src = '../img/stage-clear.png';
    missionComplete.classList.add('stage-clear');
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
                                    <a href="../map/map.html" class="button-stage-complete">NEXT STAGE</a>
                                    <a href="#" class="button-stage-complete" onclick="retry()">RETRY</a>`;

        msgPointsFinal.style.display = 'block';

        if (qtPointsFinal >= 10000) {

            let perfectStage = document.createElement('img');
            perfectStage.src = '../img/cat-perfect-stage.jpg';
            perfectStage.classList.add('perfect-stage');
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

        clearTimeout(moveAnimationBoss);
        if (moonBoss) moonBoss.style.animationPlayState = 'paused';

        if (gameOver && hpCat <= 0) {

            for (let i = 0; i < shots.length; i++) shots[i].style.animationPlayState = 'paused';

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
                        boss:............${Boolean(moonBoss)} <br>
                        hpBoss:..........${hpMoonBoss} <br>
                        crashedPlanets:..${crashedPlanets} <br>
                        planetsLaunched:.${planetsLaunched} <br>`);

}, 500);

// Console Auxiliar
//
//
//
//