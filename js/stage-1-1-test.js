// Declarações iniciais

var gameBoard = document.querySelector('.game-board')
var heartStatus = document.querySelector('.heart-status')
var heartCat = document.querySelector('.heart-active')
var cat = document.querySelector('.cat')
var catPosition = 3
var hpCat = 3
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
var charge1 = document.querySelector('.charge1')
/* var txtQtBomb = document.querySelector('.qt-bomb')
txtQtBomb.innerHTML = `x ${qtBomb}` */

var texto = document.querySelector('.texto')

/* chargePower = 0 */

// hpPlanet01

var hpPlanet01Y1 = 1
var hpPlanet01Y2 = 1
var hpPlanet01Y3 = 1
var hpPlanet01Y4 = 1
var hpPlanet01Y5 = 1

// hpPlanet03

var hpPlanet03Y1 = 3
var hpPlanet03Y2 = 3
var hpPlanet03Y3 = 3
var hpPlanet03Y4 = 3
var hpPlanet03Y5 = 3

// hpPlanet05

var hpPlanet05Y1 = 5
var hpPlanet05Y2 = 5
var hpPlanet05Y3 = 5
var hpPlanet05Y4 = 5
var hpPlanet05Y5 = 5

// hpMoonBoss

var hpMoonBoss = 40
var hpMoonBossFixed = hpMoonBoss
var boxBarrHpBoss = document.querySelector('.box-barr-hp-boss')
var barrHpBoss = document.querySelector('.barr-hp-boss')
var valueBarrHpBoss = 100

//
//
//

/*
    var gundamBoss = document.createElement('img')
    gundamBoss.src = '../img/gundam-boss.gif'
    gundamBoss.classList.add('gundam-boss')
    gameBoard.appendChild(gundamBoss)
*/

//
//
//

// Funções que fazem a movimentação do personagem com o mouse

function move1() {

    cat.style.animation = "move1 0.08s 1"
    
    catPosition = 1

    setTimeout(() => {

        cat.style.top = "0px"
        
        
    }, 65);

}

function move2() {

    cat.style.animation = "move2 0.08s 1"
    
    catPosition = 2

    setTimeout(() => {

        cat.style.top = "120px"
        
        
    }, 65);

}

function move3() {

    cat.style.animation = "move3 0.08s 1"
    
    catPosition = 3

    setTimeout(() => {

        cat.style.top = "240px"
        
        
    }, 65);

}

function move4() {

    cat.style.animation = "move4 0.08s 1"
    
    catPosition = 4

    setTimeout(() => {

        cat.style.top = "360px"
        
        
    }, 65);

}

function move5() {

    cat.style.animation = "move5 0.08s 1"
    
    catPosition = 5

    setTimeout(() => {

        cat.style.top = "480px"
        
        
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

//
//
//
//

var shotCharging = false
var shotValue = 0
var down = false;

function chargeBeam() {

    shotValue++

    if (shotValue == 1) {
        charge1.style.display = "block"
    } else {
        charge1.style.display = "none"
    }

}

document.addEventListener('keydown', function () {

    var keyboardKey = event.keyCode

    if (keyboardKey == 75) {
        shotCharging = true
    }

    if ((catPosition == 1 && keyboardKey == 40) || (catPosition == 1 && keyboardKey == 83)) {
            
        move2()

    }
        
    else if ((catPosition == 2 && keyboardKey == 40) || (catPosition == 2 && keyboardKey == 83)) {

        move3()

    } else if ((catPosition == 2 && keyboardKey == 38) || (catPosition == 2 && keyboardKey == 87)) {

        move1()

    }    
    
    else if ((catPosition == 3 && keyboardKey == 40) || (catPosition == 3 && keyboardKey == 83)) {

        move4()

    } else if ((catPosition == 3 && keyboardKey == 38) || (catPosition == 3 && keyboardKey == 87)) {

        move2()

    }
    
    else if ((catPosition == 4 && keyboardKey == 40) || (catPosition == 4 && keyboardKey == 83)) {

        move5()

    } else if ((catPosition == 4 && keyboardKey == 38) || (catPosition == 4 && keyboardKey == 87)) {

        move3()

    }
    
    else if ((catPosition == 5 && keyboardKey == 38) || (catPosition == 5 && keyboardKey == 87)) {

        move4()

    }

    if (keyboardKey == 32) {

        bombing()

    }

    if (retryMsg.style.display == "block" && keyboardKey == 13) {

        location.reload()

    }

    if (down) return;

        down = true;
        shotCharging = true

        interval = setInterval(chargeBeam, 500)

        if (qtShotHaduken > 0) {
        
        if (catPosition == 1 && keyboardKey == 75) {
            
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
            
        }
        
        if (catPosition == 2 && keyboardKey == 75) {

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
        
        if (catPosition == 3 && keyboardKey == 75) {
            
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
        
        if (catPosition == 4 && keyboardKey == 75) {
            
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
        
        if (catPosition == 5 && keyboardKey == 75) {
            
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

}, false);

document.addEventListener('keyup', function () {

    down = false;

    clearInterval(interval)

    if (shotCharging && qtShotHaduken > 0) {
    
        if (shotValue == 1) {

            charge1.style.display = "block"

            if (catPosition == 1) {

                var shot1 = document.createElement('img')
                shot1.src = '../img/planet04.gif'
                shot1.classList.add('shot-position-1')
                gameBoard.appendChild(shot1)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                charge1.style.display = "none"

                setTimeout(() => {
                    gameBoard.removeChild(shot1)
                }
                , 2000)

            }

            if (catPosition == 2) {

                var shot2 = document.createElement('img')
                shot2.src = '../img/planet04.gif'
                shot2.classList.add('shot-position-2')
                gameBoard.appendChild(shot2)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                
                setTimeout(() => {
                    gameBoard.removeChild(shot2)
                }
                , 2000)
                
            }
            
            if (catPosition == 3) {
                
                var shot3 = document.createElement('img')
                shot3.src = '../img/planet04.gif'
                shot3.classList.add('shot-position-3')
                gameBoard.appendChild(shot3)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                
                setTimeout(() => {
                    gameBoard.removeChild(shot3)
                }
                , 2000)
                
            }
            
            if (catPosition == 4) {
                
                var shot4 = document.createElement('img')
                shot4.src = '../img/planet04.gif'
                shot4.classList.add('shot-position-4')
                gameBoard.appendChild(shot4)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                
                setTimeout(() => {
                    gameBoard.removeChild(shot4)
                }
                , 2000)
                
            }
            
            if (catPosition == 5) {
                
                var shot5 = document.createElement('img')
                shot5.src = '../img/planet04.gif'
                shot5.classList.add('shot-position-5')
                gameBoard.appendChild(shot5)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                
                setTimeout(() => {
                    gameBoard.removeChild(shot5)
                }
                , 2000)

            }

        } else if (shotValue > 1) {

            if (catPosition == 1) {

                var shot1 = document.createElement('img')
                shot1.src = '../img/cat.gif'
                shot1.classList.add('shot-position-1')
                gameBoard.appendChild(shot1)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0

                setTimeout(() => {
                    gameBoard.removeChild(shot1)
                }
                , 2000)

            }

            if (catPosition == 2) {

                var shot2 = document.createElement('img')
                shot2.src = '../img/cat.gif'
                shot2.classList.add('shot-position-2')
                gameBoard.appendChild(shot2)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                
                setTimeout(() => {
                    gameBoard.removeChild(shot2)
                }
                , 2000)
                
            }
            
            if (catPosition == 3) {
                
                var shot3 = document.createElement('img')
                shot3.src = '../img/cat.gif'
                shot3.classList.add('shot-position-3')
                gameBoard.appendChild(shot3)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                
                setTimeout(() => {
                    gameBoard.removeChild(shot3)
                }
                , 2000)
                
            }
            
            if (catPosition == 4) {
                
                var shot4 = document.createElement('img')
                shot4.src = '../img/cat.gif'
                shot4.classList.add('shot-position-4')
                gameBoard.appendChild(shot4)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                
                setTimeout(() => {
                    gameBoard.removeChild(shot4)
                }
                , 2000)
                
            }
            
            if (catPosition == 5) {
                
                var shot5 = document.createElement('img')
                shot5.src = '../img/cat.gif'
                shot5.classList.add('shot-position-5')
                gameBoard.appendChild(shot5)
                qtShotHaduken--
                txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
                shotCharging = false
                shotValue = 0
                
                setTimeout(() => {
                    gameBoard.removeChild(shot5)
                }
                , 2000)

            }

        }

    }

}, false);

//
//
//
//

// Stage 1-1

const sprite000 = setTimeout(() => {

    var stage1_1 = document.createElement('img')
    stage1_1.src = '../img/stage_1-1.png'
    stage1_1.classList.add('stage-start')
    gameBoard.appendChild(stage1_1)

    setTimeout(() => {
        
        gameBoard.removeChild(stage1_1)

    }, 1900);
        
}, 1000);

// Declarações dos sprites

    var planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')

    var planet01Y2 = document.createElement('img')
    planet01Y2.src = '../img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')

    var planet01Y3 = document.createElement('img')
    planet01Y3.src = '../img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')

    var planet01Y4 = document.createElement('img')
    planet01Y4.src = '../img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')

    var planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')

    var planet03Y1 = document.createElement('img')
    planet03Y1.src = '../img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')

    var planet03Y2 = document.createElement('img')
    planet03Y2.src = '../img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')

    var planet03Y3 = document.createElement('img')
    planet03Y3.src = '../img/planet03.gif'
    planet03Y3.classList.add('planet-03-y3')

    var planet03Y4 = document.createElement('img')
    planet03Y4.src = '../img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')

    var planet03Y5 = document.createElement('img')
    planet03Y5.src = '../img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')

    var planet05Y1 = document.createElement('img')
    planet05Y1.src = '../img/planet05.gif'
    planet05Y1.classList.add('planet-05-y1')

    var planet05Y2 = document.createElement('img')
    planet05Y2.src = '../img/planet05.gif'
    planet05Y2.classList.add('planet-05-y2')

    var planet05Y3 = document.createElement('img')
    planet05Y3.src = '../img/planet05.gif'
    planet05Y3.classList.add('planet-05-y3')

    var planet05Y4 = document.createElement('img')
    planet05Y4.src = '../img/planet05.gif'
    planet05Y4.classList.add('planet-05-y4')

    var planet05Y5 = document.createElement('img')
    planet05Y5.src = '../img/planet05.gif'
    planet05Y5.classList.add('planet-05-y5')

// Padrão 1

const sprite001 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 4000);

const sprite002 = setTimeout(() => {

    gameBoard.appendChild(planet01Y5)
        
}, 6500);

const sprite003 = setTimeout(() => {

    gameBoard.appendChild(planet01Y2)
        
}, 9000);

const sprite004 = setTimeout(() => {

    gameBoard.appendChild(planet01Y3)
        
}, 11500);

const sprite005 = setTimeout(() => {

    gameBoard.appendChild(planet01Y4)
        
}, 12000);

const sprite006 = setTimeout(() => {

    gameBoard.appendChild(planet03Y2)
        
}, 13500);

const sprite007 = setTimeout(() => {

    gameBoard.appendChild(planet03Y4)
        
}, 15000);

const sprite008 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 17000);

const sprite009 = setTimeout(() => {

    gameBoard.appendChild(planet03Y5)
        
}, 17500);

const sprite010 = setTimeout(() => {

    gameBoard.appendChild(planet05Y3)
        
}, 19000);

const sprite011 = setTimeout(() => {

    gameBoard.appendChild(planet01Y4)
        
}, 20000);

// Padrão 2 desce sobe

const sprite012 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 23000);

const sprite013 = setTimeout(() => {

    gameBoard.appendChild(planet01Y2)
        
}, 24000);

const sprite014 = setTimeout(() => {

    gameBoard.appendChild(planet01Y3)
        
}, 25000);

const sprite015 = setTimeout(() => {

    gameBoard.appendChild(planet01Y4)
        
}, 26000);

const sprite016 = setTimeout(() => {

    gameBoard.appendChild(planet01Y5)
        
}, 27000);

const sprite017 = setTimeout(() => {

    gameBoard.appendChild(planet01Y5)
        
}, 30000);

const sprite018 = setTimeout(() => {

    gameBoard.appendChild(planet01Y4)
        
}, 30500);

const sprite019 = setTimeout(() => {

    gameBoard.appendChild(planet01Y3)
        
}, 31000);

const sprite020 = setTimeout(() => {

    gameBoard.appendChild(planet01Y2)
        
}, 31500);

const sprite021 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 32000);

// Padrão 3 linha

const sprite022 = setTimeout(() => {

    gameBoard.appendChild(planet05Y3)
        
}, 34000);

const sprite023 = setTimeout(() => {

    gameBoard.appendChild(planet03Y4)
        
}, 36000);

const sprite024 = setTimeout(() => {

    gameBoard.appendChild(planet03Y2)
        
}, 36000);

const sprite025 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 38000);

const sprite026 = setTimeout(() => {

    gameBoard.appendChild(planet01Y5)
        
}, 38000);

// Padrão 4 sobe desce

const sprite027 = setTimeout(() => {

    gameBoard.appendChild(planet01Y5)
        
}, 41000);

const sprite028 = setTimeout(() => {

    gameBoard.appendChild(planet01Y4)
        
}, 41500);

const sprite029 = setTimeout(() => {

    gameBoard.appendChild(planet01Y3)
        
}, 42000);

const sprite030 = setTimeout(() => {

    gameBoard.appendChild(planet01Y2)
        
}, 42500);

const sprite031 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 43000);

const sprite032 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 46000);

const sprite033 = setTimeout(() => {

    gameBoard.appendChild(planet01Y2)
        
}, 46375);

const sprite034 = setTimeout(() => {

    gameBoard.appendChild(planet01Y3)
        
}, 46750);

const sprite035 = setTimeout(() => {

    gameBoard.appendChild(planet01Y4)
        
}, 47125);

const sprite036 = setTimeout(() => {

    gameBoard.appendChild(planet01Y5)
        
}, 47500);

// Padrão 5

const sprite037 = setTimeout(() => {

    gameBoard.appendChild(planet03Y5)
        
}, 49500);

const sprite038 = setTimeout(() => {

    gameBoard.appendChild(planet03Y4)
        
}, 49500);

const sprite039 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 50500);

const sprite040 = setTimeout(() => {

    gameBoard.appendChild(planet03Y1)
        
}, 52000);

const sprite041 = setTimeout(() => {

    gameBoard.appendChild(planet03Y2)
        
}, 52000);

const sprite042 = setTimeout(() => {

    gameBoard.appendChild(planet01Y5)
        
}, 53000);

// Padrão 6

const sprite043 = setTimeout(() => {

    gameBoard.appendChild(planet01Y3)
    
}, 55000);

const sprite044 = setTimeout(() => {

    gameBoard.appendChild(planet05Y3)
        
}, 55500);

const sprite045 = setTimeout(() => {

    gameBoard.appendChild(planet01Y2)
        
}, 56000);

const sprite046 = setTimeout(() => {

    gameBoard.appendChild(planet01Y4)
        
}, 57000);

const sprite047 = setTimeout(() => {

    gameBoard.appendChild(planet01Y1)
        
}, 58000);

const sprite048 = setTimeout(() => {

    gameBoard.appendChild(planet01Y5)
        
}, 59000);

// Padrão 7 linha

const sprite049 = setTimeout(() => {

    gameBoard.appendChild(planet01Y3)
        
}, 61000);

const sprite050 = setTimeout(() => {

    gameBoard.appendChild(planet03Y4)
        
}, 61000);

const sprite051 = setTimeout(() => {

    gameBoard.appendChild(planet03Y2)
        
}, 61000);

const sprite052 = setTimeout(() => {

    gameBoard.appendChild(planet05Y1)
        
}, 61000);

const sprite053 = setTimeout(() => {

    gameBoard.appendChild(planet05Y5)
        
}, 61000);

// Warning

const sprite054 = setTimeout(() => {

    var warning = document.createElement('img')
    warning.src = '../img/warning.png'
    warning.classList.add('warning')
    gameBoard.appendChild(warning)

    setTimeout(() => {

        boxBarrHpBoss.style.display = 'block'
        
        setTimeout(() => {
        
            barrHpBoss.style.width = "100%"
                
        }, 1900);

    }, 1500);

    setTimeout(() => {

        gameBoard.removeChild(warning)
        
    }, 2900);

    clearTimeout(sprite000)
    clearTimeout(sprite001)
    clearTimeout(sprite002)
    clearTimeout(sprite003)
    clearTimeout(sprite004)
    clearTimeout(sprite005)
    clearTimeout(sprite006)
    clearTimeout(sprite007)
    clearTimeout(sprite008)
    clearTimeout(sprite009)
    clearTimeout(sprite010)
    clearTimeout(sprite011)
    clearTimeout(sprite012)
    clearTimeout(sprite013)
    clearTimeout(sprite014)
    clearTimeout(sprite015)
    clearTimeout(sprite016)
    clearTimeout(sprite017)
    clearTimeout(sprite018)
    clearTimeout(sprite019)
    clearTimeout(sprite020)
    clearTimeout(sprite021)
    clearTimeout(sprite022)
    clearTimeout(sprite023)
    clearTimeout(sprite024)
    clearTimeout(sprite025)
    clearTimeout(sprite026)
    clearTimeout(sprite027)
    clearTimeout(sprite028)
    clearTimeout(sprite029)
    clearTimeout(sprite030)
    clearTimeout(sprite031)
    clearTimeout(sprite032)
    clearTimeout(sprite033)
    clearTimeout(sprite034)
    clearTimeout(sprite035)
    clearTimeout(sprite036)
    clearTimeout(sprite037)
    clearTimeout(sprite038)
    clearTimeout(sprite039)
    clearTimeout(sprite040)
    clearTimeout(sprite041)
    clearTimeout(sprite042)
    clearTimeout(sprite043)
    clearTimeout(sprite044)
    clearTimeout(sprite045)
    clearTimeout(sprite046)
    clearTimeout(sprite047)
    clearTimeout(sprite048)
    clearTimeout(sprite049)
    clearTimeout(sprite050)
    clearTimeout(sprite051)
    clearTimeout(sprite052)
    clearTimeout(sprite053)

    clearInterval(colisaoShotY1)
    clearInterval(colisaoShotY2)
    clearInterval(colisaoShotY3)
    clearInterval(colisaoShotY4)
    clearInterval(colisaoShotY5)

    clearInterval(bombP01Y1)
    clearInterval(bombP01Y2)
    clearInterval(bombP01Y3)
    clearInterval(bombP01Y4)
    clearInterval(bombP01Y5)

    clearInterval(bombP03Y1)
    clearInterval(bombP03Y2)
    clearInterval(bombP03Y3)
    clearInterval(bombP03Y4)
    clearInterval(bombP03Y5)

    clearInterval(bombP05Y1)
    clearInterval(bombP05Y2)
    clearInterval(bombP05Y3)
    clearInterval(bombP05Y4)
    clearInterval(bombP05Y5)

    clearInterval(dmgPlanets)

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

// Colisões shot/eixoY1

const colisaoShotY1 = setInterval(() => {

    var shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)

    planet01Y1Left = Number(planet01Y1.offsetLeft)
    planet03Y1Left = Number(planet03Y1.offsetLeft)
    planet05Y1Left = Number(planet05Y1.offsetLeft)

    if (shot01Left >= 140 && planet01Y1Left >= 140) {

        if (shot01Left >= planet01Y1Left - 80) {

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

    if (shot01Left >= 140 && planet03Y1Left >= 140) {

        if (shot01Left >= planet03Y1Left - 80) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet03Y1 = hpPlanet03Y1 - shotHadukenDMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet03Y1 == 0) {

                gameBoard.removeChild(planet03Y1)
                hpPlanet03Y1 = 3

                var explosionPlanet03Y1 = document.createElement('img')
                explosionPlanet03Y1.src = '../img/explosion-planet-03-y1.gif'
                explosionPlanet03Y1.classList.add('explosion-planet')
                explosionPlanet03Y1.style.top = `0`
                explosionPlanet03Y1.style.left = `${planet03Y1Left}px`
                gameBoard.appendChild(explosionPlanet03Y1)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y1)

                }, 963);
            
            }

        }

    }

    if (shot01Left >= 140 && planet05Y1Left >= 140) {

        if (shot01Left >= planet05Y1Left - 80) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet05Y1 = hpPlanet05Y1 - shotHadukenDMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet05Y1 == 0) {

                gameBoard.removeChild(planet05Y1)
                hpPlanet05Y1 = 5

                var explosionPlanet05Y1 = document.createElement('img')
                explosionPlanet05Y1.src = '../img/explosion-planet-05-y1.gif'
                explosionPlanet05Y1.classList.add('explosion-planet')
                explosionPlanet05Y1.style.top = `0`
                explosionPlanet05Y1.style.left = `${planet05Y1Left}px`
                gameBoard.appendChild(explosionPlanet05Y1)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y1)

                }, 963);
            
            }

        }

    }

}, 100);

// Colisões shot/eixoY2

const colisaoShotY2 = setInterval(() => {

    var shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)

    planet01Y2Left = Number(planet01Y2.offsetLeft)
    planet03Y2Left = Number(planet03Y2.offsetLeft)
    planet05Y2Left = Number(planet05Y2.offsetLeft)

    if (shot02Left >= 140 && planet01Y2Left >= 140) {

        if (shot02Left >= planet01Y2Left - 80) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet01Y2 = hpPlanet01Y2 - shotHadukenDMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet01Y2 == 0) {

                gameBoard.removeChild(planet01Y2)
                hpPlanet01Y2 = 1

                var explosionPlanet01Y2 = document.createElement('img')
                explosionPlanet01Y2.src = '../img/explosion-planet-01-y2.gif'
                explosionPlanet01Y2.classList.add('explosion-planet')
                explosionPlanet01Y2.style.top = `120px`
                explosionPlanet01Y2.style.left = `${planet01Y2Left}px`
                gameBoard.appendChild(explosionPlanet01Y2)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y2)

                }, 963);
            
            }

        }

    }

    if (shot02Left >= 140 && planet03Y2Left >= 140) {

        if (shot02Left >= planet03Y2Left - 80) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet03Y2 = hpPlanet03Y2 - shotHadukenDMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet03Y2 == 0) {

                gameBoard.removeChild(planet03Y2)
                hpPlanet03Y2 = 3

                var explosionPlanet03Y2 = document.createElement('img')
                explosionPlanet03Y2.src = '../img/explosion-planet-03-y2.gif'
                explosionPlanet03Y2.classList.add('explosion-planet')
                explosionPlanet03Y2.style.top = `120px`
                explosionPlanet03Y2.style.left = `${planet03Y2Left}px`
                gameBoard.appendChild(explosionPlanet03Y2)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y2)

                }, 963);
            
            }

        }

    }

    if (shot02Left >= 140 && planet05Y2Left >= 140) {

        if (shot02Left >= planet05Y2Left - 80) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet05Y2 = hpPlanet05Y2 - shotHadukenDMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet05Y2 == 0) {

                gameBoard.removeChild(planet05Y2)
                hpPlanet05Y2 = 5

                var explosionPlanet05Y2 = document.createElement('img')
                explosionPlanet05Y2.src = '../img/explosion-planet-05-y2.gif'
                explosionPlanet05Y2.classList.add('explosion-planet')
                explosionPlanet05Y2.style.top = `120px`
                explosionPlanet05Y2.style.left = `${planet05Y2Left}px`
                gameBoard.appendChild(explosionPlanet05Y2)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y2)

                }, 963);
            
            }

        }

    }

}, 100);

// Colisões shot/eixoY3

const colisaoShotY3 = setInterval(() => {

    var shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)

    planet01Y3Left = Number(planet01Y3.offsetLeft)
    planet03Y3Left = Number(planet03Y3.offsetLeft)
    planet05Y3Left = Number(planet05Y3.offsetLeft)

    if (shot03Left >= 140 && planet01Y3Left >= 140) {

        if (shot03Left >= planet01Y3Left - 80) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet01Y3 = hpPlanet01Y3 - shotHadukenDMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet01Y3 == 0) {

                gameBoard.removeChild(planet01Y3)
                hpPlanet01Y3 = 1

                var explosionPlanet01Y3 = document.createElement('img')
                explosionPlanet01Y3.src = '../img/explosion-planet-01-y3.gif'
                explosionPlanet01Y3.classList.add('explosion-planet')
                explosionPlanet01Y3.style.top = `240px`
                explosionPlanet01Y3.style.left = `${planet01Y3Left}px`
                gameBoard.appendChild(explosionPlanet01Y3)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y3)

                }, 963);
            
            }

        }

    }

    if (shot03Left >= 140 && planet03Y3Left >= 140) {

        if (shot03Left >= planet03Y3Left - 80) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet03Y3 = hpPlanet03Y3 - shotHadukenDMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet03Y3 == 0) {

                gameBoard.removeChild(planet03Y3)
                hpPlanet03Y3 = 3

                var explosionPlanet03Y3 = document.createElement('img')
                explosionPlanet03Y3.src = '../img/explosion-planet-03-y3.gif'
                explosionPlanet03Y3.classList.add('explosion-planet')
                explosionPlanet03Y3.style.top = `240px`
                explosionPlanet03Y3.style.left = `${planet03Y3Left}px`
                gameBoard.appendChild(explosionPlanet03Y3)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y3)

                }, 963);
            
            }

        }

    }

    if (shot03Left >= 140 && planet05Y3Left >= 140) {

        if (shot03Left >= planet05Y3Left - 80) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet05Y3 = hpPlanet05Y3 - shotHadukenDMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet05Y3 == 0) {

                gameBoard.removeChild(planet05Y3)
                hpPlanet05Y3 = 5

                var explosionPlanet05Y3 = document.createElement('img')
                explosionPlanet05Y3.src = '../img/explosion-planet-05-y3.gif'
                explosionPlanet05Y3.classList.add('explosion-planet')
                explosionPlanet05Y3.style.top = `240px`
                explosionPlanet05Y3.style.left = `${planet05Y3Left}px`
                gameBoard.appendChild(explosionPlanet05Y3)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y3)

                }, 963);
            
            }

        }

    }

}, 100);

// Colisões shot/eixoY4

const colisaoShotY4 = setInterval(() => {

    var shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)

    planet01Y4Left = Number(planet01Y4.offsetLeft)
    planet03Y4Left = Number(planet03Y4.offsetLeft)
    planet05Y4Left = Number(planet05Y4.offsetLeft)

    if (shot04Left >= 140 && planet01Y4Left >= 140) {

        if (shot04Left >= planet01Y4Left - 80) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet01Y4 = hpPlanet01Y4 - shotHadukenDMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet01Y4 == 0) {

                gameBoard.removeChild(planet01Y4)
                hpPlanet01Y4 = 1

                var explosionPlanet01Y4 = document.createElement('img')
                explosionPlanet01Y4.src = '../img/explosion-planet-01-y4.gif'
                explosionPlanet01Y4.classList.add('explosion-planet')
                explosionPlanet01Y4.style.top = `360px`
                explosionPlanet01Y4.style.left = `${planet01Y4Left}px`
                gameBoard.appendChild(explosionPlanet01Y4)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y4)

                }, 963);
            
            }

        }

    }

    if (shot04Left >= 140 && planet03Y4Left >= 140) {

        if (shot04Left >= planet03Y4Left - 80) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet03Y4 = hpPlanet03Y4 - shotHadukenDMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet03Y4 == 0) {

                gameBoard.removeChild(planet03Y4)
                hpPlanet03Y4 = 3

                var explosionPlanet03Y4 = document.createElement('img')
                explosionPlanet03Y4.src = '../img/explosion-planet-03-y4.gif'
                explosionPlanet03Y4.classList.add('explosion-planet')
                explosionPlanet03Y4.style.top = `360px`
                explosionPlanet03Y4.style.left = `${planet03Y4Left}px`
                gameBoard.appendChild(explosionPlanet03Y4)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y4)

                }, 963);
            
            }

        }

    }

    if (shot04Left >= 140 && planet05Y4Left >= 140) {

        if (shot04Left >= planet05Y4Left - 80) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet05Y4 = hpPlanet05Y4 - shotHadukenDMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet05Y4 == 0) {

                gameBoard.removeChild(planet05Y4)
                hpPlanet05Y4 = 5

                var explosionPlanet05Y4 = document.createElement('img')
                explosionPlanet05Y4.src = '../img/explosion-planet-05-y4.gif'
                explosionPlanet05Y4.classList.add('explosion-planet')
                explosionPlanet05Y4.style.top = `360px`
                explosionPlanet05Y4.style.left = `${planet05Y4Left}px`
                gameBoard.appendChild(explosionPlanet05Y4)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y4)

                }, 963);
            
            }

        }

    }

}, 100);

// Colisões shot/eixoY5

const colisaoShotY5 = setInterval(() => {

    var shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)

    planet01Y5Left = Number(planet01Y5.offsetLeft)
    planet03Y5Left = Number(planet03Y5.offsetLeft)
    planet05Y5Left = Number(planet05Y5.offsetLeft)

    if (shot05Left >= 140 && planet01Y5Left >= 140) {

        if (shot05Left >= planet01Y5Left - 80) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet01Y5 = hpPlanet01Y5 - shotHadukenDMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet01Y5 == 0) {

                gameBoard.removeChild(planet01Y5)
                hpPlanet01Y5 = 1

                var explosionPlanet01Y5 = document.createElement('img')
                explosionPlanet01Y5.src = '../img/explosion-planet-01-y5.gif'
                explosionPlanet01Y5.classList.add('explosion-planet')
                explosionPlanet01Y5.style.top = `480px`
                explosionPlanet01Y5.style.left = `${planet01Y5Left}px`
                gameBoard.appendChild(explosionPlanet01Y5)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y5)

                }, 963);
            
            }

        }

    }

    if (shot05Left >= 140 && planet03Y5Left >= 140) {

        if (shot05Left >= planet03Y5Left - 80) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet03Y5 = hpPlanet03Y5 - shotHadukenDMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet03Y5 == 0) {

                gameBoard.removeChild(planet03Y5)
                hpPlanet03Y5 = 3

                var explosionPlanet03Y5 = document.createElement('img')
                explosionPlanet03Y5.src = '../img/explosion-planet-03-y5.gif'
                explosionPlanet03Y5.classList.add('explosion-planet')
                explosionPlanet03Y5.style.top = `480px`
                explosionPlanet03Y5.style.left = `${planet03Y5Left}px`
                gameBoard.appendChild(explosionPlanet03Y5)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y5)

                }, 963);
            
            }

        }

    }

    if (shot05Left >= 140 && planet05Y5Left >= 140) {

        if (shot05Left >= planet05Y5Left - 80) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet05Y5 = hpPlanet05Y5 - shotHadukenDMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet05Y5 == 0) {

                gameBoard.removeChild(planet05Y5)
                hpPlanet05Y5 = 5

                var explosionPlanet05Y5 = document.createElement('img')
                explosionPlanet05Y5.src = '../img/explosion-planet-05-y5.gif'
                explosionPlanet05Y5.classList.add('explosion-planet')
                explosionPlanet05Y5.style.top = `480px`
                explosionPlanet05Y5.style.left = `${planet05Y5Left}px`
                gameBoard.appendChild(explosionPlanet05Y5)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y5)

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

const bombP01Y2 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y2)
        hpPlanet01Y2 = 1

    }

}, 100);

const bombP01Y3 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y3)
        hpPlanet01Y3 = 1

    }

}, 100);

const bombP01Y4 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y4)
        hpPlanet01Y4 = 1

    }

}, 100);

const bombP01Y5 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y5)
        hpPlanet01Y5 = 1

    }

}, 100);

// Colisões shot/planet03

const bombP03Y1 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y1)
        hpPlanet03Y1 = 3

    }

}, 100);

const bombP03Y2 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y2)
        hpPlanet03Y2 = 3

    }

}, 100);

const bombP03Y3 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y3)
        hpPlanet03Y3 = 3

    }

}, 100);

const bombP03Y4 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y4)
        hpPlanet03Y4 = 3

    }

}, 100);

const bombP03Y5 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y5)
        hpPlanet03Y5 = 3

    }

}, 100);

// Colisões shot/planet05

const bombP05Y1 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y1)
        hpPlanet05Y1 = 5

    }

}, 100);

const bombP05Y2 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y2)
        hpPlanet05Y2 = 5

    }

}, 100);

const bombP05Y3 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y3)
        hpPlanet05Y3 = 5

    }

}, 100);

const bombP05Y4 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y4)
        hpPlanet05Y4 = 5

    }

}, 100);

const bombP05Y5 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y5)
        hpPlanet05Y5 = 5

    }

}, 100);

// Sistema de Hp

const dmgPlanets = setInterval(() => {
    
    var planet01Y1Left = Number(planet01Y1.offsetLeft)
    var planet01Y2Left = Number(planet01Y2.offsetLeft)
    var planet01Y3Left = Number(planet01Y3.offsetLeft)
    var planet01Y4Left = Number(planet01Y4.offsetLeft)
    var planet01Y5Left = Number(planet01Y5.offsetLeft)
    var planet03Y1Left = Number(planet03Y1.offsetLeft)
    var planet03Y2Left = Number(planet03Y2.offsetLeft)
    var planet03Y3Left = Number(planet03Y3.offsetLeft)
    var planet03Y4Left = Number(planet03Y4.offsetLeft)
    var planet03Y5Left = Number(planet03Y5.offsetLeft)
    var planet05Y1Left = Number(planet05Y1.offsetLeft)
    var planet05Y2Left = Number(planet05Y2.offsetLeft)
    var planet05Y3Left = Number(planet05Y3.offsetLeft)
    var planet05Y4Left = Number(planet05Y4.offsetLeft)
    var planet05Y5Left = Number(planet05Y5.offsetLeft)

    var heartCat = document.querySelector('.heart-active')

    if (planet01Y1Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y1)
        heartStatus.removeChild(heartCat)
        hpCat--
        texto.innerHTML = `${hpCat}`
        hpPlanet01Y1 = 1

    }

    if (planet01Y2Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y2)
        heartStatus.removeChild(heartCat)
        hpCat--
        texto.innerHTML = `${hpCat}`
        hpPlanet01Y2 = 1

    }

    if (planet01Y3Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y3)
        heartStatus.removeChild(heartCat)
        hpCat--
        texto.innerHTML = `${hpCat}`
        hpPlanet01Y3 = 1

    }

    if (planet01Y4Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y4)
        heartStatus.removeChild(heartCat)
        hpCat--
        texto.innerHTML = `${hpCat}`
        hpPlanet01Y4 = 1

    }

    if (planet01Y5Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y5)
        heartStatus.removeChild(heartCat)
        hpCat--
        texto.innerHTML = `${hpCat}`
        hpPlanet01Y5 = 1

    }

    if (planet03Y1Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y1)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y1 = 3

    }

    if (planet03Y2Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y2)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y2 = 3

    }

    if (planet03Y3Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y3)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y3 = 3

    }

    if (planet03Y4Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y4)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y4 = 3

    }

    if (planet03Y5Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y5)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y5 = 3

    }

    if (planet05Y1Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y1)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y1 = 5

    }

    if (planet05Y2Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y2)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y2 = 5

    }

    if (planet05Y3Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y3)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y3 = 5

    }

    if (planet05Y4Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y4)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y4 = 5

    }

    if (planet05Y5Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y5)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y5 = 5

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
            clearTimeout(sprite002)
            clearTimeout(sprite003)
            clearTimeout(sprite004)
            clearTimeout(sprite005)
            clearTimeout(sprite006)
            clearTimeout(sprite007)
            clearTimeout(sprite008)
            clearTimeout(sprite009)
            clearTimeout(sprite010)
            clearTimeout(sprite011)
            clearTimeout(sprite012)
            clearTimeout(sprite013)
            clearTimeout(sprite014)
            clearTimeout(sprite015)
            clearTimeout(sprite016)
            clearTimeout(sprite017)
            clearTimeout(sprite018)
            clearTimeout(sprite019)
            clearTimeout(sprite020)
            clearTimeout(sprite021)
            clearTimeout(sprite022)
            clearTimeout(sprite023)
            clearTimeout(sprite024)
            clearTimeout(sprite025)
            clearTimeout(sprite026)
            clearTimeout(sprite027)
            clearTimeout(sprite028)
            clearTimeout(sprite029)
            clearTimeout(sprite030)
            clearTimeout(sprite031)
            clearTimeout(sprite032)
            clearTimeout(sprite033)
            clearTimeout(sprite034)
            clearTimeout(sprite035)
            clearTimeout(sprite036)
            clearTimeout(sprite037)
            clearTimeout(sprite038)
            clearTimeout(sprite039)
            clearTimeout(sprite040)
            clearTimeout(sprite041)
            clearTimeout(sprite042)
            clearTimeout(sprite043)
            clearTimeout(sprite044)
            clearTimeout(sprite045)
            clearTimeout(sprite046)
            clearTimeout(sprite047)
            clearTimeout(sprite048)
            clearTimeout(sprite049)
            clearTimeout(sprite050)
            clearTimeout(sprite051)
            clearTimeout(sprite052)
            clearTimeout(sprite053)
            clearTimeout(sprite054)
            clearTimeout(sprite055)

            clearInterval(colisaoShotY1)
            clearInterval(colisaoShotY2)
            clearInterval(colisaoShotY3)
            clearInterval(colisaoShotY4)
            clearInterval(colisaoShotY5)

            clearInterval(bombP01Y1)
            clearInterval(bombP01Y2)
            clearInterval(bombP01Y3)
            clearInterval(bombP01Y4)
            clearInterval(bombP01Y5)

            clearInterval(bombP03Y1)
            clearInterval(bombP03Y2)
            clearInterval(bombP03Y3)
            clearInterval(bombP03Y4)
            clearInterval(bombP03Y5)

            clearInterval(bombP05Y1)
            clearInterval(bombP05Y2)
            clearInterval(bombP05Y3)
            clearInterval(bombP05Y4)
            clearInterval(bombP05Y5)

            clearInterval(dmgPlanets)

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