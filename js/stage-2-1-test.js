// Declarações iniciais

var gameBoard = document.querySelector('.game-board')
var heartStatus = document.querySelector('.heart-status')
var heartCat = document.querySelector('.heart-active')
var cat = document.querySelector('.cat')
var catPosition = 3
var hpCat = 3
var shadowMove = document.querySelector('.shadow-move')
var chargeValue = 0
var shotCharging = false
var shot1DMG = 1
var shot2DMG = 3
var shot3DMG = 5
var charge1 = document.querySelector('.charge1')
var charge2 = document.querySelector('.charge2')
var charge3 = document.querySelector('.charge3')
var txtQtShotHaduken = document.querySelector('.qt-shot-haduken')
var qtShotHaduken = 150
txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
var bomb = true
var qtBomb = 1
var bombValue = 0
var controlsAllowed = false
var gameOver = false
var retryMsg = document.querySelector('.retry-msg')
var imgCatGameOver = document.querySelector('.cat-game-over')
var btnRetry = document.querySelector('.button-retry')
var msgPointsFinal = document.querySelector('.points-final')
var pointHpCat = 0
var pointQtShotHaduken = 0
var pointQtBomb = 0
var qtPointsFinal = 0
var stageComplete = false

//
//
//
//
// Texto auxiliar

var texto = document.querySelector('.texto')

// Texto auxiliar
//
//
//
//

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

var gundamPosition = 2
var hpGundamBoss = 10

//
//
//

// Funções que fazem a movimentação do personagem com o mouse

function move1() {

    cat.style.animation = "move1 0.09s 1"
    shadowMove.style.display = "block"
    charge1.style.animation = "move1-charge 0.09s 1"
    charge2.style.animation = "move1-charge 0.09s 1"
    catPosition = 1

    setTimeout(() => {
        
        cat.style.top = "0px"
        charge1.style.top = "-20px"
        charge2.style.top = "-20px"
        
    }, 60);

    setTimeout(() => {
        
        shadowMove.style.top = "0px"
        shadowMove.style.display = "none"
        
    }, 120);

}

function move2() {

    cat.style.animation = "move2 0.09s 1"
    shadowMove.style.display = "block"
    charge1.style.animation = "move2-charge 0.09s 1"
    charge2.style.animation = "move2-charge 0.09s 1"
    catPosition = 2
    
    setTimeout(() => {
        
        cat.style.top = "120px"
        charge1.style.top = "100px"
        charge2.style.top = "100px" 
        
    }, 60);
    
    setTimeout(() => {
        
        shadowMove.style.top = "120px"
        shadowMove.style.display = "none"
        
    }, 120);

}

function move3() {

    cat.style.animation = "move3 0.09s 1"
    shadowMove.style.display = "block"
    charge1.style.animation = "move3-charge 0.09s 1"
    charge2.style.animation = "move3-charge 0.09s 1"
    catPosition = 3
    
    setTimeout(() => {

        cat.style.top = "240px"
        charge1.style.top = "220px"
        charge2.style.top = "220px"
        
    }, 60);
    
    setTimeout(() => {
        
        shadowMove.style.top = "240px"
        shadowMove.style.display = "none"       
        
    }, 120);

}

function move4() {

    cat.style.animation = "move4 0.09s 1"
    shadowMove.style.display = "block"
    charge1.style.animation = "move4-charge 0.09s 1"
    charge2.style.animation = "move4-charge 0.09s 1"
    catPosition = 4
    
    setTimeout(() => {
        
        cat.style.top = "360px"
        charge1.style.top = "340px"
        charge2.style.top = "340px"
        
    }, 60);
    
    setTimeout(() => {
        
        shadowMove.style.top = "360px"
        shadowMove.style.display = "none"     
        
    }, 120);

}

function move5() {

    cat.style.animation = "move5 0.09s 1"
    shadowMove.style.display = "block"
    charge1.style.animation = "move5-charge 0.09s 1"
    charge2.style.animation = "move5-charge 0.09s 1"
    catPosition = 5
    
    setTimeout(() => {
        
        cat.style.top = "480px"
        charge1.style.top = "460px"
        charge2.style.top = "460px"
        
    }, 60);
    
    setTimeout(() => {
        
        shadowMove.style.top = "480px"
        shadowMove.style.display = "none"    
        
    }, 120);

}

function keyboardKeyDownMove() {

    var keyboardKeyMove = event.keyCode

    if ((catPosition == 1 && keyboardKeyMove == 40) || (catPosition == 1 && keyboardKeyMove == 83) || (catPosition == 1 && keyboardKeyMove == 101)) {
            
        move2()
        slideMove23 = setTimeout(move3, 200)
        slideMove34 = setTimeout(move4, 325)
        slideMove45 = setTimeout(move5, 450)

    }
        
    else if ((catPosition == 2 && keyboardKeyMove == 40) || (catPosition == 2 && keyboardKeyMove == 83) || (catPosition == 2 && keyboardKeyMove == 101)) {

        move3()
        slideMove34 = setTimeout(move4, 200)
        slideMove45 = setTimeout(move5, 325)

    } else if ((catPosition == 2 && keyboardKeyMove == 38) || (catPosition == 2 && keyboardKeyMove == 87) || (catPosition == 2 && keyboardKeyMove == 104)) {

        move1()

    }    
    
    else if ((catPosition == 3 && keyboardKeyMove == 40) || (catPosition == 3 && keyboardKeyMove == 83) || (catPosition == 3 && keyboardKeyMove == 101)) {

        move4()
        slideMove45 = setTimeout(move5, 200)

    } else if ((catPosition == 3 && keyboardKeyMove == 38) || (catPosition == 3 && keyboardKeyMove == 87) || (catPosition == 3 && keyboardKeyMove == 104)) {

        move2()
        slideMove21 = setTimeout(move1, 200)

    }
    
    else if ((catPosition == 4 && keyboardKeyMove == 40) || (catPosition == 4 && keyboardKeyMove == 83) || (catPosition == 4 && keyboardKeyMove == 101)) {

        move5()

    } else if ((catPosition == 4 && keyboardKeyMove == 38) || (catPosition == 4 && keyboardKeyMove == 87) || (catPosition == 4 && keyboardKeyMove == 104)) {

        move3()
        slideMove32 = setTimeout(move2, 200)
        slideMove21 = setTimeout(move1, 325)

    }
    
    else if ((catPosition == 5 && keyboardKeyMove == 38) || (catPosition == 5 && keyboardKeyMove == 87) || (catPosition == 5 && keyboardKeyMove == 104)) {

        move4()
        slideMove43 = setTimeout(move3, 200)
        slideMove32 = setTimeout(move2, 325)
        slideMove21 = setTimeout(move1, 450)

    } else if (retryMsg.style.display == "block" && keyboardKeyMove == 13) {

        location.reload()

    }

}

function keyboardKeyDownShot() {

    if (chargeValue == 0) {
            
        if (catPosition == 1) {

            var shot1Position1 = document.createElement('img')
            shot1Position1.src = '../img/shot1.png'
            shot1Position1.classList.add('shot-position-1')
            gameBoard.appendChild(shot1Position1)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            chargeInterval = setInterval(chargeBeam, 600)
            
            setTimeout(() => {
                gameBoard.removeChild(shot1Position1)
            }
            , 1950)

        }
        
        if (catPosition == 2) {

            var shot1Position2 = document.createElement('img')
            shot1Position2.src = '../img/shot1.png'
            shot1Position2.classList.add('shot-position-2')
            gameBoard.appendChild(shot1Position2)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            chargeInterval = setInterval(chargeBeam, 600)
            
            setTimeout(() => {
                gameBoard.removeChild(shot1Position2)
            }
            , 1950)
            
        }
        
        if (catPosition == 3) {
            
            var shot1Position3 = document.createElement('img')
            shot1Position3.src = '../img/shot1.png'
            shot1Position3.classList.add('shot-position-3')
            gameBoard.appendChild(shot1Position3)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            chargeInterval = setInterval(chargeBeam, 600)
            
            setTimeout(() => {
                gameBoard.removeChild(shot1Position3)
            }
            , 1950)
            
        }
        
        if (catPosition == 4) {
            
            var shot1Position4 = document.createElement('img')
            shot1Position4.src = '../img/shot1.png'
            shot1Position4.classList.add('shot-position-4')
            gameBoard.appendChild(shot1Position4)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            chargeInterval = setInterval(chargeBeam, 600)
            
            setTimeout(() => {
                gameBoard.removeChild(shot1Position4)
            }
            , 1950)
            
        }
        
        if (catPosition == 5) {
            
            var shot1Position5 = document.createElement('img')
            shot1Position5.src = '../img/shot1.png'
            shot1Position5.classList.add('shot-position-5')
            gameBoard.appendChild(shot1Position5)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            chargeInterval = setInterval(chargeBeam, 600)
            
            setTimeout(() => {
                gameBoard.removeChild(shot1Position5)
            }
            , 1950)
            
        }

    }

}

function keyboardKeyUpShot() {

    if (chargeValue == 0) {

            clearInterval(chargeInterval)
            chargeValue = 0

    } else if (chargeValue == 1) {

        if (catPosition == 1) {

            var shot2Position1 = document.createElement('img')
            shot2Position1.src = '../img/shot2.gif'
            shot2Position1.classList.add('shot-2-position-1')
            shot2Position1.style.height = "75px"
            shot2Position1.style.top = "25px"
            gameBoard.appendChild(shot2Position1)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge1.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot2Position1)
            }
            , 1650)
            

        }
        
        if (catPosition == 2) {

            var shot2Position2 = document.createElement('img')
            shot2Position2.src = '../img/shot2.gif'
            shot2Position2.classList.add('shot-2-position-2')
            shot2Position2.style.height = "75px"
            shot2Position2.style.top = "145px"
            gameBoard.appendChild(shot2Position2)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge1.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot2Position2)
            }
            , 1650)
            

        }
        
        if (catPosition == 3) {
            
            var shot2Position3 = document.createElement('img')
            shot2Position3.src = '../img/shot2.gif'
            shot2Position3.classList.add('shot-2-position-3')
            shot2Position3.style.height = "75px"
            shot2Position3.style.top = "265px"
            gameBoard.appendChild(shot2Position3)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge1.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot2Position3)
            }
            , 1650)
            

        }
        
        if (catPosition == 4) {
            
            var shot2Position4 = document.createElement('img')
            shot2Position4.src = '../img/shot2.gif'
            shot2Position4.classList.add('shot-2-position-4')
            shot2Position4.style.height = "75px"
            shot2Position4.style.top = "385px"
            gameBoard.appendChild(shot2Position4)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge1.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot2Position4)
            }
            , 1650)
            

        }
        
        if (catPosition == 5) {
            
            var shot2Position5 = document.createElement('img')
            shot2Position5.src = '../img/shot2.gif'
            shot2Position5.classList.add('shot-2-position-5')
            shot2Position5.style.height = "75px"
            shot2Position5.style.top = "505px"
            gameBoard.appendChild(shot2Position5)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge1.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot2Position5)
            }
            , 1650)
            

        }
        
    } else if (chargeValue > 1) {

        if (catPosition == 1) {

            var shot3Position1 = document.createElement('img')
            shot3Position1.src = '../img/shot3.gif'
            shot3Position1.classList.add('shot-3-position-1')
            shot3Position1.style.height = "100px"
            shot3Position1.style.top = "10px"
            gameBoard.appendChild(shot3Position1)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge2.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot3Position1)
            }
            , 1350)
            

        }
        
        if (catPosition == 2) {

            var shot3Position2 = document.createElement('img')
            shot3Position2.src = '../img/shot3.gif'
            shot3Position2.classList.add('shot-3-position-2')
            shot3Position2.style.height = "100px"
            shot3Position2.style.top = "130px"
            gameBoard.appendChild(shot3Position2)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge2.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot3Position2)
            }
            , 1350)
            

        }
        
        if (catPosition == 3) {
            
            var shot3Position3 = document.createElement('img')
            shot3Position3.src = '../img/shot3.gif'
            shot3Position3.classList.add('shot-3-position-3')
            shot3Position3.style.height = "100px"
            shot3Position3.style.top = "250px"
            gameBoard.appendChild(shot3Position3)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge2.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot3Position3)
            }
            , 1350)
            

        }
        
        if (catPosition == 4) {
            
            var shot3Position4 = document.createElement('img')
            shot3Position4.src = '../img/shot3.gif'
            shot3Position4.classList.add('shot-3-position-4')
            shot3Position4.style.height = "100px"
            shot3Position4.style.top = "370px"
            gameBoard.appendChild(shot3Position4)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge2.style.display = "none"
            clearInterval(chargeInterval)
            
            setTimeout(() => {
                gameBoard.removeChild(shot3Position4)
            }
            , 1350)
            

        }
        
        if (catPosition == 5) {
            
            var shot3Position5 = document.createElement('img')
            shot3Position5.src = '../img/shot3.gif'
            shot3Position5.classList.add('shot-3-position-5')
            shot3Position5.style.height = "100px"
            shot3Position5.style.top = "490px"
            gameBoard.appendChild(shot3Position5)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            chargeValue = 0
            charge2.style.display = "none"
            clearInterval(chargeInterval)

            setTimeout(() => {
                gameBoard.removeChild(shot3Position5)
            }
            , 1350)
            

        }

    }

}

function bombing() {

    if (bomb == true) {

        bombValue = 1

        var explosionBomb = document.createElement('img')
        explosionBomb.src = '../img/bomb-explosion.gif'
        explosionBomb.classList.add('bomb-explosion')
        gameBoard.appendChild(explosionBomb)
        bomb = false
        var boxBomb = document.querySelector('.box-bomb')
        boxBomb.style.cursor = 'not-allowed'
        var cooldownBomb = document.querySelector('.cooldown-bomb')
        cooldownBomb.style.animation = 'cooldown-efect 20s 1 linear'
        var noAllowed = document.querySelector('.no-allowed')
        noAllowed.style.display = 'block'

        setTimeout(() => {

            bombValue = 0

        }, 300);

        setTimeout(() => {

            gameBoard.removeChild(explosionBomb)

        }, 350);

        setTimeout(() => {

            boxBomb.style.cursor = 'pointer'
            cooldownBomb.style.animation = 'none'
            noAllowed.style.display = 'none'
            bomb = true

        }, 20000);

    }

}

function chargeBeam() {

    chargeValue++

    if (chargeValue == 1) {

        charge1.style.display = "block"

    } else if (chargeValue == 2) {

        charge1.style.display = "none"
        charge2.style.display = "block"
        

    }

}

var keyShot = false
var keyBomb = false
var keyMoveDown = false
var keyMoveUp = false

window.addEventListener('keydown', () => {

    if (event.keyCode == 13) {

        keyboardKeyDownMove()

    }

    if (controlsAllowed == false) return

    if (event.keyCode == 72) {

        if (keyShot) return;

        keyShot = true;

        keyboardKeyDownShot()

    }

    if (event.keyCode == 32) {

        if(keyBomb) return;

        keyBomb = true;

        bombing()

    }

    if (event.keyCode == 40 || event.keyCode == 83 || event.keyCode == 101) {

        if (keyMoveDown) return;

        keyMoveDown = true;

        keyboardKeyDownMove()

    } else if (event.keyCode == 38 || event.keyCode == 87 || event.keyCode == 104) {

        if (keyMoveUp) return;

        keyMoveUp = true;

        keyboardKeyDownMove()

    }

});

window.addEventListener('keyup', () => {

    if (controlsAllowed == false) return
    
    if (event.keyCode == 72) {
        
        keyboardKeyUpShot()

        keyShot = false;

    }

    if (event.keyCode == 32) {

        keyBomb = false;

    }

    if (event.keyCode == 40 || event.keyCode == 83 || event.keyCode == 101) {

        keyMoveDown = false;
        
        if (catPosition == 2) {

            clearTimeout(slideMove23)
            clearTimeout(slideMove34)
            clearTimeout(slideMove45)

        } else if (catPosition == 3) {

            clearTimeout(slideMove34)
            clearTimeout(slideMove45)

        } else if (catPosition == 4) {

            clearTimeout(slideMove45)
        }

    } else if (event.keyCode == 38 || event.keyCode == 87 || event.keyCode == 104) {

        keyMoveUp = false;

        if (catPosition == 4) {

            clearTimeout(slideMove43)
            clearTimeout(slideMove32)
            clearTimeout(slideMove21)

        } else if (catPosition == 3) {

            clearTimeout(slideMove32)
            clearTimeout(slideMove21)

        } else if (catPosition == 2) {

            clearTimeout(slideMove21)

        }

    }

});

// Padrão Stage 1-1

const sprite000 = setTimeout(() => {

    var stage1_1 = document.createElement('img')
    stage1_1.src = '../img/stage_1-1.png'
    stage1_1.classList.add('stage-start')
    gameBoard.appendChild(stage1_1)

    setTimeout(() => {
        
        gameBoard.removeChild(stage1_1)
        controlsAllowed = true

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
planet05Y1.src = '../img/planet04.gif'
planet05Y1.classList.add('planet-05-y1')

var planet05Y2 = document.createElement('img')
planet05Y2.src = '../img/planet04.gif'
planet05Y2.classList.add('planet-05-y2')

var planet05Y3 = document.createElement('img')
planet05Y3.src = '../img/planet04.gif'
planet05Y3.classList.add('planet-05-y3')

var planet05Y4 = document.createElement('img')
planet05Y4.src = '../img/planet04.gif'
planet05Y4.classList.add('planet-05-y4')

var planet05Y5 = document.createElement('img')
planet05Y5.src = '../img/planet04.gif'
planet05Y5.classList.add('planet-05-y5')

var colunm = document.createElement('img')
colunm.src = '../img/coluna.png'
colunm.classList.add('colunm')

const colisaoColunm1 = setInterval(() => {

    var shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)  
    
    var colunmLeft = document.querySelector('.colunm')
    colunmLeft = Number(colunmLeft.offsetLeft)

    if (shot01Left >= 140 && colunmLeft >= 140) {

        if (shot01Left >= colunmLeft) {

            var shot01Left = document.querySelector('.shot-position-1')
            gameBoard.removeChild(shot01Left)

        }

    }

}, 10);

const colisaoColunm2 = setInterval(() => {

    var shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)
    var colunmLeft = document.querySelector('.colunm')
    colunmLeft = Number(colunmLeft.offsetLeft)

    if (shot02Left >= 140 && colunmLeft >= 140) {

        if (shot02Left >= colunmLeft) {

            var shot02Left = document.querySelector('.shot-position-2')
            gameBoard.removeChild(shot02Left)

        }

    }

}, 10);

const colisaoColunm3 = setInterval(() => {

    var shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)
    var colunmLeft = document.querySelector('.colunm')
    colunmLeft = Number(colunmLeft.offsetLeft)

    if (shot03Left >= 140 && colunmLeft >= 140) {

        if (shot03Left >= colunmLeft) {

            var shot03Left = document.querySelector('.shot-position-3')
            gameBoard.removeChild(shot03Left)

        }

    }
    
}, 10);

const colisaoColunm4 = setInterval(() => {

    var shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)
    var colunmLeft = document.querySelector('.colunm')
    colunmLeft = Number(colunmLeft.offsetLeft)

    if (shot04Left >= 140 && colunmLeft >= 140) {

        if (shot04Left >= colunmLeft) {

            var shot04Left = document.querySelector('.shot-position-4')
            gameBoard.removeChild(shot04Left)

        }

    }

}, 10);

const colisaoColunm5 = setInterval(() => {

    var shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)
    var colunmLeft = document.querySelector('.colunm')
    colunmLeft = Number(colunmLeft.offsetLeft)

    if (shot05Left >= 140 && colunmLeft >= 140) {

        if (shot05Left >= colunmLeft) {

            var shot05Left = document.querySelector('.shot-position-5')
            gameBoard.removeChild(shot05Left)

        }

    }

}, 10);

const bombColunm = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(colunm)

    }

}, 100);

// Padrão 1

//
//
//
//

setTimeout(() => {

    var gundamBoss = document.createElement('img')
    gundamBoss.src = '../img/gundam-boss.gif'
    gundamBoss.classList.add('gundam-boss')
    gameBoard.appendChild(gundamBoss)

    planet01Y1.style.right = "50px"
    planet01Y2.style.right = "50px"
    planet01Y3.style.right = "50px"
    planet01Y4.style.right = "50px"
    planet01Y5.style.right = "50px"
    
    setInterval(() => {

        gundamPosition = Math.floor(Math.random() * 4) + 1

        if (gundamPosition == 1) {

            gundamBoss.style.animation = "move-gundam 0.5s"

            setTimeout(() => {

                gundamBoss.style.animation = "transition-gundam 0.2s"
                gundamBoss.style.top = "0px"
                
            }, 480);

            setTimeout(() => {

                gameBoard.appendChild(planet01Y1)
                gameBoard.appendChild(planet01Y2)
                gameBoard.appendChild(colunm)
                
            }, 2000);

        }

        if (gundamPosition == 2) {

            gundamBoss.style.animation = "move-gundam 0.5s"
            
            setTimeout(() => {
                
                gundamBoss.style.animation = "transition-gundam 0.2s"
                gundamBoss.style.top = "120px"
                
            }, 480);

            setTimeout(() => {

                gameBoard.appendChild(planet01Y3)
                gameBoard.appendChild(planet01Y2)
                
            }, 2000);
            
        }

        if (gundamPosition == 3) {

            gundamBoss.style.animation = "move-gundam 0.5s"
            
            setTimeout(() => {

                gundamBoss.style.animation = "transition-gundam 0.2s"
                gundamBoss.style.top = "240px"
                
            }, 480);

            setTimeout(() => {

                gameBoard.appendChild(planet01Y3)
                gameBoard.appendChild(planet01Y4)
                
            }, 2000);
            
        }

        if (gundamPosition == 4) {
            
            gundamBoss.style.animation = "move-gundam 0.5s"
            
            setTimeout(() => {

                gundamBoss.style.animation = "transition-gundam 0.2s"
                gundamBoss.style.top = "360px"
                
            }, 480);
            
            setTimeout(() => {

                gameBoard.appendChild(planet01Y5)
                gameBoard.appendChild(planet01Y4)
                
            }, 2000);

        }

        function gundamSkill() {

            gundamPosition = 2
            gundamBoss.style.top = "180px"
        
        }

        var shot02Left = document.querySelector('.shot-position-2')
        shot02Left = Number(shot02Left.offsetLeft)
    
        if (shot02Left >= 950 && gundamPosition == 2) {
    
            var shot02Left = document.querySelector('.shot-position-2')
            hpGundamBoss = hpGundamBoss - shot1DMG
            gameBoard.removeChild(shot02Left)

            if (hpGundamBoss <= 0) {

                gameBoard.removeChild(gundamBoss)
                gundamPosition = 0
                hpGundamBoss = 10

                var explosionPlanet01Y1 = document.createElement('img')
                explosionPlanet01Y1.src = '../img/explosion-planet-01-y1.gif'
                explosionPlanet01Y1.classList.add('explosion-planet')
                explosionPlanet01Y1.style.top = `120px`
                explosionPlanet01Y1.style.right = `0`
                gameBoard.appendChild(explosionPlanet01Y1)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y1)

                }, 963);

            }
    
        }
    
    }, 2000);
    
    
}, 2000);

//
//
//
//

/* const sprite001 = setTimeout(() => {

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
        
}, 38000); */

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

// Padrão Warning

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

    clearInterval(colisaoShot1Y1)
    clearInterval(colisaoShot1Y2)
    clearInterval(colisaoShot1Y3)
    clearInterval(colisaoShot1Y4)
    clearInterval(colisaoShot1Y5)

    clearInterval(colisaoShot2Y1)
    clearInterval(colisaoShot2Y2)
    clearInterval(colisaoShot2Y3)
    clearInterval(colisaoShot2Y4)
    clearInterval(colisaoShot2Y5)

    clearInterval(colisaoShot3Y1)
    clearInterval(colisaoShot3Y2)
    clearInterval(colisaoShot3Y3)
    clearInterval(colisaoShot3Y4)
    clearInterval(colisaoShot3Y5)

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

// Padrão Boss e colisão shot/boss

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
                hpMoonBoss = hpMoonBoss - shot1DMG
                gameBoard.removeChild(shot03Left)

                if (hpMoonBoss <= 30) {

                    moonBoss.src = '../img/moon-boss-30.png'

                }

                if (hpMoonBoss <= 20) {

                    moonBoss.src = '../img/moon-boss-20.png'
                
                }

                if (hpMoonBoss <= 10) {

                    moonBoss.src = '../img/moon-boss-10.png'
                
                }

                if (hpMoonBoss <= 0) {

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
                        
                    }, 1700);

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

                        msgPointsFinal.innerHTML = `<h2>POINTS:</h1> <br>
                                                    <h2>HP:.....${pointHpCat}pts</h2>
                                                    <h2>BOMB:...${pointQtBomb}pts</h2>
                                                    <h2>SHOTS:..${pointQtShotHaduken}pts</h2>
                                                    <h1>TOTAL: ${qtPointsFinal}pts</h1>
                                                    <a href="../map/map.html" class="button-stage-complete">NEXT STAGE</a>
                                                    <a href="#" class="button-stage-complete" onclick="retry()">RETRY</a>`
                        msgPointsFinal.style.display = 'block'
                        controlsAllowed = false

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
                    clearInterval(colisao2BossY3)
                    clearInterval(colisao3BossY3)
                
                }

                valueBarrHpBoss = valueBarrHpBoss - (shot1DMG*(100/(hpMoonBossFixed)))
                barrHpBoss.style.width = `${valueBarrHpBoss}%`

                if (valueBarrHpBoss <= 0) {
                    barrHpBoss.style.width = '0%'
                }

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

    const colisao2BossY3 = setInterval(() => {

        var shot03Left2 = document.querySelector('.shot-2-position-3')
        shot03Left2 = Number(shot03Left2.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot03Left2 >= 140 && moonBossLeft >= 140) {

            if (shot03Left2 >= moonBossLeft) {

                var shot03Left2 = document.querySelector('.shot-2-position-3')
                hpMoonBoss = hpMoonBoss - shot2DMG
                gameBoard.removeChild(shot03Left2)

                if (hpMoonBoss <= 30) {

                    moonBoss.src = '../img/moon-boss-30.png'

                }

                if (hpMoonBoss <= 20) {

                    moonBoss.src = '../img/moon-boss-20.png'
                
                }

                if (hpMoonBoss <= 10) {

                    moonBoss.src = '../img/moon-boss-10.png'
                
                }

                if (hpMoonBoss <= 0) {

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
                        
                    }, 1700);

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

                        msgPointsFinal.innerHTML = `<h2>POINTS:</h1> <br>
                                                    <h2>HP:.....${pointHpCat}pts</h2>
                                                    <h2>BOMB:...${pointQtBomb}pts</h2>
                                                    <h2>SHOTS:..${pointQtShotHaduken}pts</h2>
                                                    <h1>TOTAL: ${qtPointsFinal}pts</h1>
                                                    <a href="../map/map.html" class="button-stage-complete">NEXT STAGE</a>
                                                    <a href="#" class="button-stage-complete" onclick="retry()">RETRY</a>`
                        msgPointsFinal.style.display = 'block'
                        controlsAllowed = false

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
                    clearInterval(colisao2BossY3)
                    clearInterval(colisao3BossY3)
                    
                
                }

                valueBarrHpBoss = valueBarrHpBoss - (shot2DMG*(100/(hpMoonBossFixed)))
                barrHpBoss.style.width = `${valueBarrHpBoss}%`

                if (valueBarrHpBoss <= 0) {
                    barrHpBoss.style.width = '0%'
                }

            }

        }

    }, 10);

    const colisao3BossY3 = setInterval(() => {

        var shot03Left3 = document.querySelector('.shot-3-position-3')
        shot03Left3 = Number(shot03Left3.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot03Left3 >= 140 && moonBossLeft >= 140) {

            if (shot03Left3 >= moonBossLeft) {

                var shot03Left3 = document.querySelector('.shot-3-position-3')
                hpMoonBoss = hpMoonBoss - shot3DMG
                gameBoard.removeChild(shot03Left3)

                if (hpMoonBoss <= 30) {

                    moonBoss.src = '../img/moon-boss-30.png'

                }

                if (hpMoonBoss <= 20) {

                    moonBoss.src = '../img/moon-boss-20.png'
                
                }

                if (hpMoonBoss <= 10) {

                    moonBoss.src = '../img/moon-boss-10.png'
                
                }

                if (hpMoonBoss <= 0) {

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
                        
                    }, 1700);

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

                        msgPointsFinal.innerHTML = `<h2>POINTS:</h1> <br>
                                                    <h2>HP:.....${pointHpCat}pts</h2>
                                                    <h2>BOMB:...${pointQtBomb}pts</h2>
                                                    <h2>SHOTS:..${pointQtShotHaduken}pts</h2>
                                                    <h1>TOTAL: ${qtPointsFinal}pts</h1>
                                                    <a href="../map/map.html" class="button-stage-complete">NEXT STAGE</a>
                                                    <a href="#" class="button-stage-complete" onclick="retry()">RETRY</a>`
                        msgPointsFinal.style.display = 'block'
                        controlsAllowed = false

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
                    clearInterval(colisao2BossY3)
                    clearInterval(colisao3BossY3)
                
                }

                valueBarrHpBoss = valueBarrHpBoss - (shot3DMG*(100/(hpMoonBossFixed)))
                barrHpBoss.style.width = `${valueBarrHpBoss}%`

                if (valueBarrHpBoss <= 0) {
                    barrHpBoss.style.width = '0%'
                }

            }

        }

    }, 10);

}, 72000);

// Colisões shot/eixoY1

// SHOT 1 Y 1

const colisaoShot1Y1 = setInterval(() => {

    var shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)

    planet01Y1Left = Number(planet01Y1.offsetLeft)
    planet03Y1Left = Number(planet03Y1.offsetLeft)
    planet05Y1Left = Number(planet05Y1.offsetLeft)

    if (shot01Left >= 140 && planet01Y1Left >= 140) {

        if (shot01Left >= planet01Y1Left - 50) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet01Y1 = hpPlanet01Y1 - shot1DMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet01Y1 <= 0) {

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

        if (shot01Left >= planet03Y1Left - 50) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet03Y1 = hpPlanet03Y1 - shot1DMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet03Y1 <= 0) {

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

        if (shot01Left >= planet05Y1Left - 50) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet05Y1 = hpPlanet05Y1 - shot1DMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet05Y1 <= 0) {

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

// SHOT 2 Y 1

const colisaoShot2Y1 = setInterval(() => {

    var shot01Left2 = document.querySelector('.shot-2-position-1')
    shot01Left2 = Number(shot01Left2.offsetLeft)

    planet01Y1Left = Number(planet01Y1.offsetLeft)
    planet03Y1Left = Number(planet03Y1.offsetLeft)
    planet05Y1Left = Number(planet05Y1.offsetLeft)

    if (shot01Left2 >= 140 && planet01Y1Left >= 140) {

        if (shot01Left2 >= planet01Y1Left - 110) {

            var shot01Left2 = document.querySelector('.shot-2-position-1')
            hpPlanet01Y1 = hpPlanet01Y1 - shot2DMG
            gameBoard.removeChild(shot01Left2)

            if (hpPlanet01Y1 <= 0) {

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

    if (shot01Left2 >= 140 && planet03Y1Left >= 140) {

        if (shot01Left2 >= planet03Y1Left - 110) {

            var shot01Left2 = document.querySelector('.shot-2-position-1')
            hpPlanet03Y1 = hpPlanet03Y1 - shot2DMG
            gameBoard.removeChild(shot01Left2)

            if (hpPlanet03Y1 <= 0) {

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

    if (shot01Left2 >= 140 && planet05Y1Left >= 140) {

        if (shot01Left2 >= planet05Y1Left - 110) {

            var shot01Left2 = document.querySelector('.shot-2-position-1')
            hpPlanet05Y1 = hpPlanet05Y1 - shot2DMG
            gameBoard.removeChild(shot01Left2)

            if (hpPlanet05Y1 <= 0) {

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

// SHOT 3 Y 1

const colisaoShot3Y1 = setInterval(() => {

    var shot01Left3 = document.querySelector('.shot-3-position-1')
    shot01Left3 = Number(shot01Left3.offsetLeft)

    planet01Y1Left = Number(planet01Y1.offsetLeft)
    planet03Y1Left = Number(planet03Y1.offsetLeft)
    planet05Y1Left = Number(planet05Y1.offsetLeft)

    if (shot01Left3 >= 140 && planet01Y1Left >= 140) {

        if (shot01Left3 >= planet01Y1Left - 110) {

            var shot01Left3 = document.querySelector('.shot-3-position-1')
            hpPlanet01Y1 = hpPlanet01Y1 - shot3DMG
            gameBoard.removeChild(shot01Left3)

            if (hpPlanet01Y1 <= 0) {

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

    if (shot01Left3 >= 140 && planet03Y1Left >= 140) {

        if (shot01Left3 >= planet03Y1Left - 110) {

            var shot01Left3 = document.querySelector('.shot-3-position-1')
            hpPlanet03Y1 = hpPlanet03Y1 - shot3DMG
            gameBoard.removeChild(shot01Left3)

            if (hpPlanet03Y1 <= 0) {

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

    if (shot01Left3 >= 140 && planet05Y1Left >= 140) {

        if (shot01Left3 >= planet05Y1Left - 110) {

            var shot01Left3 = document.querySelector('.shot-3-position-1')
            hpPlanet05Y1 = hpPlanet05Y1 - shot3DMG
            gameBoard.removeChild(shot01Left3)

            if (hpPlanet05Y1 <= 0) {

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

// SHOT 1 Y 2

const colisaoShot1Y2 = setInterval(() => {

    var shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)

    planet01Y2Left = Number(planet01Y2.offsetLeft)
    planet03Y2Left = Number(planet03Y2.offsetLeft)
    planet05Y2Left = Number(planet05Y2.offsetLeft)

    if (shot02Left >= 140 && planet01Y2Left >= 140) {

        if (shot02Left >= planet01Y2Left - 50) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet01Y2 = hpPlanet01Y2 - shot1DMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet01Y2 <= 0) {

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

        if (shot02Left >= planet03Y2Left - 50) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet03Y2 = hpPlanet03Y2 - shot1DMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet03Y2 <= 0) {

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

        if (shot02Left >= planet05Y2Left - 50) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet05Y2 = hpPlanet05Y2 - shot1DMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet05Y2 <= 0) {

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

// SHOT 2 Y 2

const colisaoShot2Y2 = setInterval(() => {

    var shot02Left2 = document.querySelector('.shot-2-position-2')
    shot02Left2 = Number(shot02Left2.offsetLeft)

    planet01Y2Left = Number(planet01Y2.offsetLeft)
    planet03Y2Left = Number(planet03Y2.offsetLeft)
    planet05Y2Left = Number(planet05Y2.offsetLeft)

    if (shot02Left2 >= 140 && planet01Y2Left >= 140) {

        if (shot02Left2 >= planet01Y2Left - 110) {

            var shot02Left2 = document.querySelector('.shot-2-position-2')
            hpPlanet01Y2 = hpPlanet01Y2 - shot2DMG
            gameBoard.removeChild(shot02Left2)

            if (hpPlanet01Y2 <= 0) {

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

    if (shot02Left2 >= 140 && planet03Y2Left >= 140) {

        if (shot02Left2 >= planet03Y2Left - 110) {

            var shot02Left2 = document.querySelector('.shot-2-position-2')
            hpPlanet03Y2 = hpPlanet03Y2 - shot2DMG
            gameBoard.removeChild(shot02Left2)

            if (hpPlanet03Y2 <= 0) {

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

    if (shot02Left2 >= 140 && planet05Y2Left >= 140) {

        if (shot02Left2 >= planet05Y2Left - 110) {

            var shot02Left2 = document.querySelector('.shot-2-position-2')
            hpPlanet05Y2 = hpPlanet05Y2 - shot2DMG
            gameBoard.removeChild(shot02Left2)

            if (hpPlanet05Y2 <= 0) {

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

// SHOT 3 Y 2

const colisaoShot3Y2 = setInterval(() => {

    var shot02Left3 = document.querySelector('.shot-3-position-2')
    shot02Left3 = Number(shot02Left3.offsetLeft)

    planet01Y2Left = Number(planet01Y2.offsetLeft)
    planet03Y2Left = Number(planet03Y2.offsetLeft)
    planet05Y2Left = Number(planet05Y2.offsetLeft)

    if (shot02Left3 >= 140 && planet01Y2Left >= 140) {

        if (shot02Left3 >= planet01Y2Left - 110) {

            var shot02Left3 = document.querySelector('.shot-3-position-2')
            hpPlanet01Y2 = hpPlanet01Y2 - shot3DMG
            gameBoard.removeChild(shot02Left3)

            if (hpPlanet01Y2 <= 0) {

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

    if (shot02Left3 >= 140 && planet03Y2Left >= 140) {

        if (shot02Left3 >= planet03Y2Left - 110) {

            var shot02Left3 = document.querySelector('.shot-3-position-2')
            hpPlanet03Y2 = hpPlanet03Y2 - shot3DMG
            gameBoard.removeChild(shot02Left3)

            if (hpPlanet03Y2 <= 0) {

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

    if (shot02Left3 >= 140 && planet05Y2Left >= 140) {

        if (shot02Left3 >= planet05Y2Left - 110) {

            var shot02Left3 = document.querySelector('.shot-3-position-2')
            hpPlanet05Y2 = hpPlanet05Y2 - shot3DMG
            gameBoard.removeChild(shot02Left3)

            if (hpPlanet05Y2 <= 0) {

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

// SHOT 1 Y 3

const colisaoShot1Y3 = setInterval(() => {

    var shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)

    planet01Y3Left = Number(planet01Y3.offsetLeft)
    planet03Y3Left = Number(planet03Y3.offsetLeft)
    planet05Y3Left = Number(planet05Y3.offsetLeft)

    if (shot03Left >= 140 && planet01Y3Left >= 140) {

        if (shot03Left >= planet01Y3Left - 50) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet01Y3 = hpPlanet01Y3 - shot1DMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet01Y3 <= 0) {

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

        if (shot03Left >= planet03Y3Left - 50) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet03Y3 = hpPlanet03Y3 - shot1DMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet03Y3 <= 0) {

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

        if (shot03Left >= planet05Y3Left - 50) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet05Y3 = hpPlanet05Y3 - shot1DMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet05Y3 <= 0) {

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

// SHOT 2 Y 3

const colisaoShot2Y3 = setInterval(() => {

    var shot03Left2 = document.querySelector('.shot-2-position-3')
    shot03Left2 = Number(shot03Left2.offsetLeft)

    planet01Y3Left = Number(planet01Y3.offsetLeft)
    planet03Y3Left = Number(planet03Y3.offsetLeft)
    planet05Y3Left = Number(planet05Y3.offsetLeft)

    if (shot03Left2 >= 140 && planet01Y3Left >= 140) {

        if (shot03Left2 >= planet01Y3Left - 110) {

            var shot03Left2 = document.querySelector('.shot-2-position-3')
            hpPlanet01Y3 = hpPlanet01Y3 - shot2DMG
            gameBoard.removeChild(shot03Left2)

            if (hpPlanet01Y3 <= 0) {

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

    if (shot03Left2 >= 140 && planet03Y3Left >= 140) {

        if (shot03Left2 >= planet03Y3Left - 110) {

            var shot03Left2 = document.querySelector('.shot-2-position-3')
            hpPlanet03Y3 = hpPlanet03Y3 - shot2DMG
            gameBoard.removeChild(shot03Left2)

            if (hpPlanet03Y3 <= 0) {

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

    if (shot03Left2 >= 140 && planet05Y3Left >= 140) {

        if (shot03Left2 >= planet05Y3Left - 110) {

            var shot03Left2 = document.querySelector('.shot-2-position-3')
            hpPlanet05Y3 = hpPlanet05Y3 - shot2DMG
            gameBoard.removeChild(shot03Left2)

            if (hpPlanet05Y3 <= 0) {

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

// SHOT 3 Y 3

const colisaoShot3Y3 = setInterval(() => {

    var shot03Left3 = document.querySelector('.shot-3-position-3')
    shot03Left3 = Number(shot03Left3.offsetLeft)

    planet01Y3Left = Number(planet01Y3.offsetLeft)
    planet03Y3Left = Number(planet03Y3.offsetLeft)
    planet05Y3Left = Number(planet05Y3.offsetLeft)

    if (shot03Left3 >= 140 && planet01Y3Left >= 140) {

        if (shot03Left3 >= planet01Y3Left - 110) {

            var shot03Left3 = document.querySelector('.shot-3-position-3')
            hpPlanet01Y3 = hpPlanet01Y3 - shot3DMG
            gameBoard.removeChild(shot03Left3)

            if (hpPlanet01Y3 <= 0) {

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

    if (shot03Left3 >= 140 && planet03Y3Left >= 140) {

        if (shot03Left3 >= planet03Y3Left - 110) {

            var shot03Left3 = document.querySelector('.shot-3-position-3')
            hpPlanet03Y3 = hpPlanet03Y3 - shot3DMG
            gameBoard.removeChild(shot03Left3)

            if (hpPlanet03Y3 <= 0) {

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

    if (shot03Left3 >= 140 && planet05Y3Left >= 140) {

        if (shot03Left3 >= planet05Y3Left - 110) {

            var shot03Left3 = document.querySelector('.shot-3-position-3')
            hpPlanet05Y3 = hpPlanet05Y3 - shot3DMG
            gameBoard.removeChild(shot03Left3)

            if (hpPlanet05Y3 <= 0) {

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

// SHOT 1 Y 4

const colisaoShot1Y4 = setInterval(() => {

    var shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)

    planet01Y4Left = Number(planet01Y4.offsetLeft)
    planet03Y4Left = Number(planet03Y4.offsetLeft)
    planet05Y4Left = Number(planet05Y4.offsetLeft)

    if (shot04Left >= 140 && planet01Y4Left >= 140) {

        if (shot04Left >= planet01Y4Left - 50) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet01Y4 = hpPlanet01Y4 - shot1DMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet01Y4 <= 0) {

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

        if (shot04Left >= planet03Y4Left - 50) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet03Y4 = hpPlanet03Y4 - shot1DMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet03Y4 <= 0) {

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

        if (shot04Left >= planet05Y4Left - 50) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet05Y4 = hpPlanet05Y4 - shot1DMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet05Y4 <= 0) {

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

// SHOT 2 Y 4

const colisaoShot2Y4 = setInterval(() => {

    var shot04Left2 = document.querySelector('.shot-2-position-4')
    shot04Left2 = Number(shot04Left2.offsetLeft)

    planet01Y4Left = Number(planet01Y4.offsetLeft)
    planet03Y4Left = Number(planet03Y4.offsetLeft)
    planet05Y4Left = Number(planet05Y4.offsetLeft)

    if (shot04Left2 >= 140 && planet01Y4Left >= 140) {

        if (shot04Left2 >= planet01Y4Left - 110) {

            var shot04Left2 = document.querySelector('.shot-2-position-4')
            hpPlanet01Y4 = hpPlanet01Y4 - shot2DMG
            gameBoard.removeChild(shot04Left2)

            if (hpPlanet01Y4 <= 0) {

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

    if (shot04Left2 >= 140 && planet03Y4Left >= 140) {

        if (shot04Left2 >= planet03Y4Left - 110) {

            var shot04Left2 = document.querySelector('.shot-2-position-4')
            hpPlanet03Y4 = hpPlanet03Y4 - shot2DMG
            gameBoard.removeChild(shot04Left2)

            if (hpPlanet03Y4 <= 0) {

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

    if (shot04Left2 >= 140 && planet05Y4Left >= 140) {

        if (shot04Left2 >= planet05Y4Left - 110) {

            var shot04Left2 = document.querySelector('.shot-2-position-4')
            hpPlanet05Y4 = hpPlanet05Y4 - shot2DMG
            gameBoard.removeChild(shot04Left2)

            if (hpPlanet05Y4 <= 0) {

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

// SHOT 3 Y 4

const colisaoShot3Y4 = setInterval(() => {

    var shot04Left3 = document.querySelector('.shot-3-position-4')
    shot04Left3 = Number(shot04Left3.offsetLeft)

    planet01Y4Left = Number(planet01Y4.offsetLeft)
    planet03Y4Left = Number(planet03Y4.offsetLeft)
    planet05Y4Left = Number(planet05Y4.offsetLeft)

    if (shot04Left3 >= 140 && planet01Y4Left >= 140) {

        if (shot04Left3 >= planet01Y4Left - 110) {

            var shot04Left3 = document.querySelector('.shot-3-position-4')
            hpPlanet01Y4 = hpPlanet01Y4 - shot3DMG
            gameBoard.removeChild(shot04Left3)

            if (hpPlanet01Y4 <= 0) {

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

    if (shot04Left3 >= 140 && planet03Y4Left >= 140) {

        if (shot04Left3 >= planet03Y4Left - 110) {

            var shot04Left3 = document.querySelector('.shot-3-position-4')
            hpPlanet03Y4 = hpPlanet03Y4 - shot3DMG
            gameBoard.removeChild(shot04Left3)

            if (hpPlanet03Y4 <= 0) {

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

    if (shot04Left3 >= 140 && planet05Y4Left >= 140) {

        if (shot04Left3 >= planet05Y4Left - 110) {

            var shot04Left3 = document.querySelector('.shot-3-position-4')
            hpPlanet05Y4 = hpPlanet05Y4 - shot3DMG
            gameBoard.removeChild(shot04Left3)

            if (hpPlanet05Y4 <= 0) {

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

// SHOT 1 Y 5

const colisaoShot1Y5 = setInterval(() => {

    var shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)

    planet01Y5Left = Number(planet01Y5.offsetLeft)
    planet03Y5Left = Number(planet03Y5.offsetLeft)
    planet05Y5Left = Number(planet05Y5.offsetLeft)

    if (shot05Left >= 140 && planet01Y5Left >= 140) {

        if (shot05Left >= planet01Y5Left - 50) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet01Y5 = hpPlanet01Y5 - shot1DMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet01Y5 <= 0) {

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

        if (shot05Left >= planet03Y5Left - 50) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet03Y5 = hpPlanet03Y5 - shot1DMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet03Y5 <= 0) {

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

        if (shot05Left >= planet05Y5Left - 50) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet05Y5 = hpPlanet05Y5 - shot1DMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet05Y5 <= 0) {

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

// SHOT 2 Y 5

const colisaoShot2Y5 = setInterval(() => {

    var shot05Left2 = document.querySelector('.shot-2-position-5')
    shot05Left2 = Number(shot05Left2.offsetLeft)

    planet01Y5Left = Number(planet01Y5.offsetLeft)
    planet03Y5Left = Number(planet03Y5.offsetLeft)
    planet05Y5Left = Number(planet05Y5.offsetLeft)

    if (shot05Left2 >= 140 && planet01Y5Left >= 140) {

        if (shot05Left2 >= planet01Y5Left - 110) {

            var shot05Left2 = document.querySelector('.shot-2-position-5')
            hpPlanet01Y5 = hpPlanet01Y5 - shot2DMG
            gameBoard.removeChild(shot05Left2)

            if (hpPlanet01Y5 <= 0) {

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

    if (shot05Left2 >= 140 && planet03Y5Left >= 140) {

        if (shot05Left2 >= planet03Y5Left - 110) {

            var shot05Left2 = document.querySelector('.shot-2-position-5')
            hpPlanet03Y5 = hpPlanet03Y5 - shot2DMG
            gameBoard.removeChild(shot05Left2)

            if (hpPlanet03Y5 <= 0) {

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

    if (shot05Left2 >= 140 && planet05Y5Left >= 140) {

        if (shot05Left2 >= planet05Y5Left - 110) {

            var shot05Left2 = document.querySelector('.shot-2-position-5')
            hpPlanet05Y5 = hpPlanet05Y5 - shot2DMG
            gameBoard.removeChild(shot05Left2)

            if (hpPlanet05Y5 <= 0) {

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

// SHOT 3 Y 5

const colisaoShot3Y5 = setInterval(() => {

    var shot05Left3 = document.querySelector('.shot-3-position-5')
    shot05Left3 = Number(shot05Left3.offsetLeft)

    planet01Y5Left = Number(planet01Y5.offsetLeft)
    planet03Y5Left = Number(planet03Y5.offsetLeft)
    planet05Y5Left = Number(planet05Y5.offsetLeft)

    if (shot05Left3 >= 140 && planet01Y5Left >= 140) {

        if (shot05Left3 >= planet01Y5Left - 110) {

            var shot05Left3 = document.querySelector('.shot-3-position-5')
            hpPlanet01Y5 = hpPlanet01Y5 - shot3DMG
            gameBoard.removeChild(shot05Left3)

            if (hpPlanet01Y5 <= 0) {

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

    if (shot05Left3 >= 140 && planet03Y5Left >= 140) {

        if (shot05Left3 >= planet03Y5Left - 110) {

            var shot05Left3 = document.querySelector('.shot-3-position-5')
            hpPlanet03Y5 = hpPlanet03Y5 - shot3DMG
            gameBoard.removeChild(shot05Left3)

            if (hpPlanet03Y5 <= 0) {

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

    if (shot05Left3 >= 140 && planet05Y5Left >= 140) {

        if (shot05Left3 >= planet05Y5Left - 110) {

            var shot05Left3 = document.querySelector('.shot-3-position-5')
            hpPlanet05Y5 = hpPlanet05Y5 - shot3DMG
            gameBoard.removeChild(shot05Left3)

            if (hpPlanet05Y5 <= 0) {

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

// Colisões Bomb/Plante01

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

// Colisões Bomb/Plante03

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

// Colisões Bomb/Plante05

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

// Sistema de Damage Recebido

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
        hpPlanet01Y1 = 1

    }

    if (planet01Y2Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y2)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y2 = 1

    }

    if (planet01Y3Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y3)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y3 = 1

    }

    if (planet01Y4Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y4)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y4 = 1

    }

    if (planet01Y5Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y5)
        heartStatus.removeChild(heartCat)
        hpCat--
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

// Verificação Game Over

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

            clearInterval(colisaoShot1Y1)
            clearInterval(colisaoShot1Y2)
            clearInterval(colisaoShot1Y3)
            clearInterval(colisaoShot1Y4)
            clearInterval(colisaoShot1Y5)

            clearInterval(colisaoShot2Y1)
            clearInterval(colisaoShot2Y2)
            clearInterval(colisaoShot2Y3)
            clearInterval(colisaoShot2Y4)
            clearInterval(colisaoShot2Y5)

            clearInterval(colisaoShot3Y1)
            clearInterval(colisaoShot3Y2)
            clearInterval(colisaoShot3Y3)
            clearInterval(colisaoShot3Y4)
            clearInterval(colisaoShot3Y5)

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
                controlsAllowed = false

            }
                
        }

    }
    
}, 100);

function retry() {

    location.reload()

}

setInterval(() => {

    texto.innerHTML += (`${gundamPosition}`)
    
}, 1500);