// Declarações iniciais

var gameBoard = document.querySelector('.game-board')
var heartStatus = document.querySelector('.heart-status')
var heartCat = document.querySelector('.heart-active')
var cat = document.querySelector('.cat')
var hpCat = 3
var shotPosition = 3
var shotHadukenDMG = 1
var txtQtShotHaduken = document.querySelector('.qt-shot-haduken')
var qtShotHaduken = 150
txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
var qtBomb = 1
var bombValue = 0
var gameOver = false
var retryMsg = document.querySelector('.retry-msg')
var imgCatGameOver = document.querySelector('.cat-game-over')
var btnRetry = document.querySelector('.button-retry')
var pointHpCat = 0
var pointQtShotHaduken = 0
var pointQtBomb = 0
var qtPointsFinal = 0
var stageComplete = false
var tacBoss = document.querySelector('.tac-boss')
var shield = document.querySelector('.shield')
/* var txtQtBomb = document.querySelector('.qt-bomb')
txtQtBomb.innerHTML = `x ${qtBomb}` */

/* chargePower = 0 */

var texto = document.querySelector('.texto')

// hpPlanet01

var hpPlanet01Y1 = 1

// hpMoonBoss

var hpMoonBoss = 40
var hpMoonBossFixed = hpMoonBoss
var boxBarrHpBoss = document.querySelector('.box-barr-hp-boss')
var barrHpBoss = document.querySelector('.barr-hp-boss')
var valueBarrHpBoss = 100


// Funções que fazem a movimentação do personagem com o click

function move1() {

    cat.style.animation = "move1 0.08s 1"
    tacBoss.style.animation = "move1 0.08s 1"
    shield.style.animation = "move1 0.08s 1"
    shotPosition = 1

    setTimeout(() => {

        cat.style.top = "0px"
        tacBoss.style.top = "0px"
        shield.style.top = "0px"
        
    }, 65);

}

function move2() {

    cat.style.animation = "move2 0.08s 1"
    tacBoss.style.animation = "move2 0.08s 1"
    shield.style.animation = "move2 0.08s 1"
    shotPosition = 2

    setTimeout(() => {

        cat.style.top = "120px"
        tacBoss.style.top = "120px"
        shield.style.top = "120px"
        
    }, 65);

}

function move3() {

    cat.style.animation = "move3 0.08s 1"
    tacBoss.style.animation = "move3 0.08s 1"
    shield.style.animation = "move3 0.08s 1"
    shotPosition = 3

    setTimeout(() => {

        cat.style.top = "240px"
        tacBoss.style.top = "240px"
        shield.style.top = "240px"
        
    }, 65);

}

function move4() {

    cat.style.animation = "move4 0.08s 1"
    tacBoss.style.animation = "move4 0.08s 1"
    shield.style.animation = "move4 0.08s 1"
    shotPosition = 4

    setTimeout(() => {

        cat.style.top = "360px"
        tacBoss.style.top = "360px"
        shield.style.top = "360px"
        
    }, 65);

}

function move5() {

    cat.style.animation = "move5 0.08s 1"
    tacBoss.style.animation = "move5 0.08s 1"
    shield.style.animation = "move5 0.08s 1"
    shotPosition = 5

    setTimeout(() => {

        cat.style.top = "480px"
        tacBoss.style.top = "480px"
        shield.style.top = "480px"
        
    }, 65);

}

function bombing() {

    if (qtBomb > 0) {

        bombValue = 1

        var explosionBomb = document.createElement('img')
        explosionBomb.src = '../img/bomb-explosion.gif'
        explosionBomb.classList.add('bomb-explosion')
        gameBoard.appendChild(explosionBomb)
        qtBomb--
        var boxBomb = document.querySelector('.box-bomb')
        boxBomb.style.cursor = 'not-allowed'
        var noAllowed = document.querySelector('.no-allowed')
        noAllowed.style.display = 'block'
        /* txtQtBomb.innerHTML = `x ${qtBomb}` */

        setTimeout(() => {

            bombValue = 2

        }, 300);

        setTimeout(() => {

            gameBoard.removeChild(explosionBomb)

        }, 350);

    }

}

// Função de movimentação com o teclado

onkeydown = function keyboardControls() {

    var keyboardKey = event.keyCode

    if ((shotPosition == 1 && keyboardKey == 40) || (shotPosition == 1 && keyboardKey == 83)) {
            
        move2()

    }
        
    else if ((shotPosition == 2 && keyboardKey == 40) || (shotPosition == 2 && keyboardKey == 83)) {

        move3()

    } else if ((shotPosition == 2 && keyboardKey == 38) || (shotPosition == 2 && keyboardKey == 87)) {

        move1()

    }    
    
    else if ((shotPosition == 3 && keyboardKey == 40) || (shotPosition == 3 && keyboardKey == 83)) {

        move4()

    } else if ((shotPosition == 3 && keyboardKey == 38) || (shotPosition == 3 && keyboardKey == 87)) {

        move2()

    }
    
    else if ((shotPosition == 4 && keyboardKey == 40) || (shotPosition == 4 && keyboardKey == 83)) {

        move5()

    } else if ((shotPosition == 4 && keyboardKey == 38) || (shotPosition == 4 && keyboardKey == 87)) {

        move3()

    }
    
    else if ((shotPosition == 5 && keyboardKey == 38) || (shotPosition == 5 && keyboardKey == 87)) {

        move4()

    }

    if (keyboardKey == 32) {

        bombing()

    }

    if (retryMsg.style.display == "block" && keyboardKey == 13) {

        location.reload()

    }

    if (qtShotHaduken > 0) {
        
        if (shotPosition == 1 && keyboardKey == 75) {
            
            var shot1 = document.createElement('img')
            shot1.src = '../img/shot.gif'
            shot1.classList.add('shot-position-1')
            gameBoard.appendChild(shot1)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot1)
            }
            , 2000)

            /* const chargingShot = setInterval(() => {

                chargePower++

                if (chargePower == 1) {

                    shot1.src = "../img/bug.gif"

                }

            }, 1000); */
            
        }
        
        if (shotPosition == 2 && keyboardKey == 75) {

            var shot2 = document.createElement('img')
            shot2.src = '../img/shot.gif'
            shot2.classList.add('shot-position-2')
            gameBoard.appendChild(shot2)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot2)
            }
            , 2000)
            
        }
        
        if (shotPosition == 3 && keyboardKey == 75) {
            
            var shot3 = document.createElement('img')
            shot3.src = '../img/shot.gif'
            shot3.classList.add('shot-position-3')
            gameBoard.appendChild(shot3)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot3)
            }
            , 2000)
            
        }
        
        if (shotPosition == 4 && keyboardKey == 75) {
            
            var shot4 = document.createElement('img')
            shot4.src = '../img/shot.gif'
            shot4.classList.add('shot-position-4')
            gameBoard.appendChild(shot4)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot4)
            }
            , 2000)
            
        }
        
        if (shotPosition == 5 && keyboardKey == 75) {
            
            var shot5 = document.createElement('img')
            shot5.src = '../img/shot.gif'
            shot5.classList.add('shot-position-5')
            gameBoard.appendChild(shot5)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot5)
            }
            , 2000)

        }

    }

}

/* onkeyup = function cancelCharge() {

    if (chargePower == 1) {

        shot1.src = '../img/bug.gif'

    } else if (chargePower > 1) {

        shot1.src = '../img/planet04.gif'

    }

    shot1.src = '../img/shot.gif'
    clearInterval(chargingShot)

}
 */

// Padrão 1

const sprite001 = setTimeout(() => {

    var cannon1 = document.createElement('img')
    var cannon2 = document.createElement('img')
    var cannon3 = document.createElement('img')
    var cannon4 = document.createElement('img')
    var cannon5 = document.createElement('img')
    cannon1.src = '../img/cannon.png'
    cannon2.src = '../img/cannon.png'
    cannon3.src = '../img/cannon.png'
    cannon4.src = '../img/cannon.png'
    cannon5.src = '../img/cannon.png'
    cannon1.classList.add('cannon1')
    cannon2.classList.add('cannon2')
    cannon3.classList.add('cannon3')
    cannon4.classList.add('cannon4')
    cannon5.classList.add('cannon5')
    gameBoard.appendChild(cannon1)
    gameBoard.appendChild(cannon2)
    gameBoard.appendChild(cannon3)
    gameBoard.appendChild(cannon4)
    gameBoard.appendChild(cannon5)

    tacBoss.style.display = 'block'
    shield.style.display = 'block'
        
}, 1000);

const sprite002 = setTimeout(() => {

    var circleShot01 = document.createElement('img')
    circleShot01.src = '../img/circle-shot.gif'
    circleShot01.classList.add('circle-shot-01')
    gameBoard.appendChild(circleShot01)
        
}, 1000);

const sprite003 = setTimeout(() => {

    var circleShot02 = document.createElement('img')
    circleShot02.src = '../img/circle-shot.gif'
    circleShot02.classList.add('circle-shot-02')
    gameBoard.appendChild(circleShot02)
        
}, 2000);

const sprite004 = setTimeout(() => {

    var circleShot05 = document.createElement('img')
    circleShot05.src = '../img/circle-shot.gif'
    circleShot05.classList.add('circle-shot-05')
    gameBoard.appendChild(circleShot05)
    
}, 3000);

const colisaoCircleShot01 = setInterval(() => {
    
    circleShot01 = document.querySelector('.circle-shot-01')
    var circleShot01Left = Number(circleShot01.offsetLeft)

    if (circleShot01Left <= 295 && circleShot01Left >= 150 && shotPosition == 1) {

        gameBoard.removeChild(circleShot01)

    }

}, 100);

const colisaoCircleShot02 = setInterval(() => {
    
    circleShot02 = document.querySelector('.circle-shot-02')
    var circleShot02Left = Number(circleShot02.offsetLeft)

    if (circleShot02Left <= 295 && circleShot02Left >= 150 && shotPosition == 2) {

        gameBoard.removeChild(circleShot02)

    }

}, 100);

const colisaoCircleShot05 = setInterval(() => {
    
    circleShot05 = document.querySelector('.circle-shot-05')
    var circleShot05Left = Number(circleShot05.offsetLeft)

    texto.innerHTML = `${circleShot05Left}`

    if (circleShot05Left <= 295 && circleShot05Left >= 150 && shotPosition == 5) {

        gameBoard.removeChild(circleShot05)

    }

}, 100);

// Warning

const sprite054 = setTimeout(() => {

    var warning = document.createElement('img')
    warning.src = '../img/warning.png'
    warning.classList.add('warning')
    gameBoard.appendChild(warning)

    setTimeout(() => {

        boxBarrHpBoss.style.display = 'block'
        barrHpBoss.style.animation = "full-boss-hp 2s 1"
        
        setTimeout(() => {
        
            barrHpBoss.style.width = "100%"
                
        }, 1900);

    }, 1500);

    setTimeout(() => {

        gameBoard.removeChild(warning)
        
    }, 2900);

    clearTimeout(sprite000)
    clearTimeout(sprite001)

    clearInterval(colisaoP01Y1)

    clearInterval(bombP01Y1)

    clearInterval(heartP01Y1)
    

}, 68000);

// Padrão 8 e colisão shot/boss

const sprite055 = setTimeout(() => {

    var moonBoss = document.createElement('img')
    moonBoss.src = '../img/moon-boss.png'
    moonBoss.classList.add('moon-boss')
    gameBoard.appendChild(moonBoss)

    const colisaoBossY1 = setInterval(() => {


        var shot01Left = document.querySelector('.shot-position-1')
        shot01Left = Number(shot01Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot01Left >= 140 && moonBossLeft >= 100) {

            if (shot01Left >= (moonBossLeft + 100)) {

                var shot01Left = document.querySelector('.shot-position-1')
                gameBoard.removeChild(shot01Left)

            }

        }

    }, 10);

    const colisaoBossY2 = setInterval(() => {

        var shot02Left = document.querySelector('.shot-position-2')
        shot02Left = Number(shot02Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot02Left >= 140 && moonBossLeft >= 140) {

            if (shot02Left >= moonBossLeft) {

                var shot02Left = document.querySelector('.shot-position-2')
                gameBoard.removeChild(shot02Left)

            }

        }

    }, 10);

    const colisaoBossY3 = setInterval(() => {

        var shot03Left = document.querySelector('.shot-position-3')
        shot03Left = Number(shot03Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot03Left >= 140 && moonBossLeft >= 140) {

            if (shot03Left >= moonBossLeft) {

                var shot03Left = document.querySelector('.shot-position-3')
                hpMoonBoss = hpMoonBoss - shotHadukenDMG
                gameBoard.removeChild(shot03Left)

                if (hpMoonBoss == 30) {

                    moonBoss.src = '../img/moon-boss-30.png'

                }

                if (hpMoonBoss == 20) {

                    moonBoss.src = '../img/moon-boss-20.png'
                
                }

                if (hpMoonBoss == 10) {

                    moonBoss.src = '../img/moon-boss-10.png'
                
                }

                if (hpMoonBoss == 0) {

                    gameBoard.removeChild(moonBoss)
                    hpMoonBoss = 40

                    pointHpCat = hpCat * 1500
                    pointQtBomb = qtBomb * 4000
                    pointQtShotHaduken = qtShotHaduken * 100
                    qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken

                    var explosionMoonBoos = document.createElement('img')
                    explosionMoonBoos.src = '../img/boss-explosion.gif'
                    explosionMoonBoos.classList.add('boss-explosion')
                    explosionMoonBoos.style.top = `0`
                    explosionMoonBoos.style.left = `${moonBossLeft}px`
                    gameBoard.appendChild(explosionMoonBoos)

                    setTimeout(() => {
                        
                        gameBoard.removeChild(explosionMoonBoos)
                        
                    }, 1790);

                    setTimeout(() => {

                        var missionComplete = document.createElement('img')
                        missionComplete.src = '../img/mission-complete.gif'
                        missionComplete.classList.add('mission-complete')
                        gameBoard.appendChild(missionComplete)

                        setTimeout(() => {

                            gameBoard.removeChild(missionComplete)
                            
                        }, 5000);
 
                    }, 2000);

                    setTimeout(() => {

                        var msgPointsFinal = document.createElement('div')
                        msgPointsFinal.classList.add('points-final')
                        msgPointsFinal.innerHTML = `<h2>POINTS:</h1> <br>
                                                    <h2>HP:.....${pointHpCat}pts</h2>
                                                    <h2>BOMB:...${pointQtBomb}pts</h2>
                                                    <h2>SHOTS:..${pointQtShotHaduken}pts</h2>
                                                    <h1>TOTAL: ${qtPointsFinal}pts</h1>
                                                    <a href="../map/map.html" class="button-stage-complete">NEXT STAGE</a>
                                                    <a href="#" class="button-stage-complete" onclick="retry()">RETRY</a>`
                        gameBoard.appendChild(msgPointsFinal)

                        if (qtPointsFinal >= 10000) {

                            var perfectStage = document.createElement('img')
                            perfectStage.src = '../img/cat-perfect-stage.jpg'
                            perfectStage.classList.add('perfect-stage')
                            msgPointsFinal.appendChild(perfectStage)

                            var perfectStageMsg = document.createElement('div')
                            perfectStageMsg.classList.add('perfect-stage-msg')
                            perfectStageMsg.innerHTML = `<h2><b>YOU ARE AWESOME!!</b></h2>`
                            msgPointsFinal.appendChild(perfectStageMsg)
                        }
 
                    }, 6500);
                
                    setTimeout(() => {

                        stageComplete = true

                    }, 6500);

                    clearInterval(heartMoonBoss)

                    clearInterval(colisaoBossY1)
                    clearInterval(colisaoBossY2)
                    clearInterval(colisaoBossY3)
                    clearInterval(colisaoBossY4)
                    clearInterval(colisaoBossY5)
                
                }

                valueBarrHpBoss = valueBarrHpBoss - (100/(hpMoonBossFixed))
                barrHpBoss.style.width = `${valueBarrHpBoss}%`

            }

        }

    }, 10);

    const colisaoBossY4 = setInterval(() => {

        var shot04Left = document.querySelector('.shot-position-4')
        shot04Left = Number(shot04Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot04Left >= 140 && moonBossLeft >= 140) {

            if (shot04Left >= moonBossLeft) {

                var shot04Left = document.querySelector('.shot-position-4')
                gameBoard.removeChild(shot04Left)

            }

        }

    }, 10);

    const colisaoBossY5 = setInterval(() => {

        var shot05Left = document.querySelector('.shot-position-5')
        shot05Left = Number(shot05Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot05Left >= 140 && moonBossLeft >= 100) {

            if (shot05Left >= (moonBossLeft + 100)) {

                var shot05Left = document.querySelector('.shot-position-5')
                gameBoard.removeChild(shot05Left)

            }

        }

    }, 10);

}, 72000);

// Colisões shot/planet01

const colisaoP01Y1 = setInterval(() => {

    var shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)
    var planet01Y1Left = document.querySelector('.planet-01-y1')
    planet01Y1Left = Number(planet01Y1.offsetLeft)

    if (shot01Left >= 140 && planet01Y1Left >= 140) {

        if (shot01Left >= planet01Y1Left) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet01Y1 = hpPlanet01Y1 - shotHadukenDMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet01Y1 == 0) {

                gameBoard.removeChild(planet01Y1)
                hpPlanet01Y1 = 1

                var explosionPlanet01Y1 = document.createElement('img')
                explosionPlanet01Y1.src = '../img/explosion-planet-01-y1.gif'
                explosionPlanet01Y1.classList.add('explosion-planet')
                explosionPlanet01Y1.style.top = `0`
                explosionPlanet01Y1.style.left = `${planet01Y1Left}px`
                gameBoard.appendChild(explosionPlanet01Y1)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y1)

                }, 963);

            }

        }

    }

}, 100);

const bombP01Y1 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y1)
        hpPlanet01Y1 = 1

    }

}, 100);

// Sistema de Hp

const heartP01Y1 = setInterval(() => {
    
    var planet01Y1Left = document.querySelector('.planet-01-y1')
    planet01Y1Left = Number(planet01Y1.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet01Y1Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y1)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y1 = 1

    }
    
}, 50);

const heartMoonBoss = setInterval(() => {
    
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

    if (moonBossLeft <= -55 && hpCat > 0) {
   
        heartStatus.innerHTML = ""
        hpCat = 0

    }
    
}, 50);

// Game Over verificação

function catThumbsUp() {

    imgCatGameOver.src = '../img/cat-thumbs-up.png'
    
}
  
function catSad() {

    imgCatGameOver.src = '../img/cat-game-over.png'
    
}

const gameOverVerification = setInterval(() => {

    if (hpCat <= 0 || stageComplete) {

        gameOver = true

        if (gameOver == true) {

            clearTimeout(sprite000)
            clearTimeout(sprite001)
            clearTimeout(sprite054)
            clearTimeout(sprite055)

            clearInterval(colisaoP01Y1)

            clearInterval(bombP01Y1)

            clearInterval(heartP01Y1)

            clearInterval(heartMoonBoss)

            if (hpCat <= 0) {

                retryMsg.style.display = 'block'

            }
                
        }

    }
    
}, 100);

function retry() {

    location.reload()

}